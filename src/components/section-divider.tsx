import { cn } from "@/lib/utils";

const SectionDivider = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full h-20 md:h-28 lg:h-36 overflow-hidden", className)}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1440 120H0V26.25C120 48.125 240 70 360 70C480 70 600 48.125 720 26.25C840 4.375 960 -17.5 1080 -17.5C1200 -17.5 1320 4.375 1440 26.25V120Z"
          className="fill-hero dark:fill-background"
        ></path>
      </svg>
    </div>
  );
};

export default SectionDivider;
