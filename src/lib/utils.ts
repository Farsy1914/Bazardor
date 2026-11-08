import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// API Endpoints & Backup Fallbacks
export const MAIN_API_URL = "https://openapi.programming-hero.com/api/bazardor";
export const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
export const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

// Product Interface Export
export interface Product {
  id: number | string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit: string;
  image: string;
  today: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets?: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

// API Fetch Utility with Fallback
export async function fetchFromAPI(endpoint: string) {
  const urls = [
    `${MAIN_API_URL}${endpoint}`,
    `${BASE_URL_1}${endpoint}`,
    `${BASE_URL_2}${endpoint}`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        return data?.data || data;
      }
    } catch (err) {
      console.warn(`Fetch failed for ${url}, trying fallback...`);
    }
  }
  return [];
}

// Utility Helpers
export function toBengaliNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null || num === '') {
    return '০';
  }

  const englishToBengaliMap: { [key: string]: string } = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };

  return num
    .toString()
    .replace(/[0-9]/g, (match) => englishToBengaliMap[match] || match);
}

export function formatPrice(price: number | undefined | null): string {
  if (price === undefined || price === null || isNaN(Number(price))) {
    return '০ টাকা';
  }
  return `${toBengaliNumber(Number(price))} টাকা`;
}

export function getBanglaDate(): string {
  const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];
  const now = new Date();
  const day = days[now.getDay()];
  const date = toBengaliNumber(now.getDate());
  const month = months[now.getMonth()];
  const year = toBengaliNumber(now.getFullYear());
  return `${day}, ${date} ${month}, ${year}`;
}

export function getUnitBn(unit: string): string {
  const unitMap: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };
  return unitMap[unit] || `প্রতি ${unit}`;
}