import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const detectDeviceOS = (userAgent: string): { storeLink: string } => {
  let storeLink = ''; // Default value for store link
  
  if (/android/i.test(userAgent)) {
    storeLink = 'https://play.google.com/store/apps/details?id=com.orderlayapp&pli=1'; // Play Store link
  }
  else if (/iPad|iPhone|iPod/.test(userAgent)) {
    storeLink = 'https://apps.apple.com/us/app/orderlay/id6504802718'; // App Store link
  }
  else {
    storeLink = 'https://play.google.com/store/apps/details?id=com.orderlayapp&pli=1'; // No store link for unsupported OS
  }

  return { storeLink }; // Return the appropriate store link
};