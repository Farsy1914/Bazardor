import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind Class merge helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর
export function toBengaliNumber(num: number | string): string {
  const englishToBengaliMap: { [key: string]: string } = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };

  return num
    .toString()
    .replace(/[0-9]/g, (match) => englishToBengaliMap[match] || match);
}

// কারেন্সি ফরম্যাটিং (যেমন: ১৪৮ টাকা)
export function formatPrice(price: number): string {
  return `${toBengaliNumber(price.toLocaleString('bn-BD'))} টাকা`;
}