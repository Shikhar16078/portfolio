import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// The recommendations page of a LinkedIn profile, from the profile's address.
export function linkedinRecommendationsUrl(profile: string) {
  return `${profile.replace(/\/$/, "")}/details/recommendations/?detailScreenTabIndex=0`
}
