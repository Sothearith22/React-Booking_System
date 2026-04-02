import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with clsx logic
 * @param {...string} inputs 
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
