import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * This function is used to combine multiple class names and merge them into a single string.
 * It uses the clsx library to combine the class names and the tailwind-merge library to merge them.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
