"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  snapCount: number
  selectedIndex: number
  scrollTo: (index: number) => void
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    // Reads Embla's state straight from the API, re-rendering on select/reInit events.
    const subscribe = React.useCallback(
      (onChange: () => void) => {
        if (!api) return () => {}
        api.on("select", onChange)
        api.on("reInit", onChange)
        return () => {
          api.off("select", onChange)
          api.off("reInit", onChange)
        }
      },
      [api]
    )
    const useEmblaValue = <T,>(read: (api: NonNullable<CarouselApi>) => T, fallback: T) =>
      React.useSyncExternalStore(subscribe, () => (api ? read(api) : fallback), () => fallback)

    const canScrollPrev = useEmblaValue((a) => a.canScrollPrev(), false)
    const canScrollNext = useEmblaValue((a) => a.canScrollNext(), false)
    const snapCount = useEmblaValue((a) => a.scrollSnapList().length, 0)
    const selectedIndex = useEmblaValue((a) => a.selectedScrollSnap(), 0)

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const scrollTo = React.useCallback((index: number) => {
      api?.scrollTo(index)
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api) {
        return
      }

      if (setApi) {
        setApi(api)
      }
    }, [api, setApi])

    // Depth while slides move: a card partly outside the viewport turns away from the centre, shrinks
    // and fades in proportion to how much of it is hidden, and incoming cards do the reverse. It follows
    // Embla's scroll position, so dragging drives it directly. Fully visible cards are left untouched,
    // so nothing changes at rest. Targets the [data-slide-card] element inside each slide (Embla moves
    // the slides themselves). Skipped for reduced motion.
    React.useEffect(() => {
      if (!api || orientation === "vertical") return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      const tween = () => {
        const view = api.rootNode().getBoundingClientRect()
        for (const slide of api.slideNodes()) {
          const card = slide.querySelector<HTMLElement>("[data-slide-card]")
          if (!card) continue
          // Measure the card's parent: it excludes the slide's gap padding (which sits outside the
          // viewport) and isn't moved by the transform written below. 2px tolerance for rounding.
          const r = (card.parentElement ?? slide).getBoundingClientRect()
          const visible = Math.max(0, Math.min(r.right, view.right + 2) - Math.max(r.left, view.left - 2)) / r.width
          const hidden = 1 - Math.min(1, visible)
          if (hidden < 0.005) {
            card.style.transform = ""
            card.style.opacity = ""
            continue
          }
          // Left of centre turns its left edge away; right of centre, its right edge.
          const side = r.left + r.width / 2 < view.left + view.width / 2 ? -1 : 1
          card.style.transform = `perspective(1200px) rotateY(${side * 16 * hidden}deg) scale(${1 - 0.12 * hidden})`
          card.style.opacity = String(1 - 0.75 * hidden)
        }
      }

      tween()
      api.on("scroll", tween)
      api.on("reInit", tween)
      return () => {
        api.off("scroll", tween)
        api.off("reInit", tween)
      }
    }, [api, orientation])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          snapCount,
          selectedIndex,
          scrollTo,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} data-reveal-clip="" className="overflow-hidden cursor-grab active:cursor-grabbing select-none">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "group/arrow absolute h-8 w-8 rounded-full disabled:hidden",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover/arrow:-translate-x-0.5" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "group/arrow absolute h-8 w-8 rounded-full disabled:hidden",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/arrow:translate-x-0.5" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

const CarouselPagination = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { snapCount, selectedIndex, scrollTo } = useCarousel()

  return (
    <div
      ref={ref}
      className={cn("flex justify-center gap-2 mt-4", className)}
      {...props}
    >
      {Array.from({ length: snapCount }, (_, index) => (
        <Button
          key={index}
          variant="outline"
          size="icon"
          // The active dot stretches into a pill; width eases so the row slides rather than jumps.
          className={cn("h-2 w-2 rounded-full transition-[width,background-color] duration-300 ease-out", {
            "w-5 bg-primary": selectedIndex === index,
          })}
          onClick={() => scrollTo(index)}
        >
          <span className="sr-only">Go to slide {index + 1}</span>
        </Button>
      ))}
    </div>
  )
})
CarouselPagination.displayName = "CarouselPagination"


export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselPagination
}
