export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: string | number;
  slug: string;
  name: string;
  nameBn?: string;
  category: string;
  categorySlug?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit: string;
  image?: string;
  price: number;
  today?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change: number;
  trend: 'up' | 'down' | 'same';
  markets?: Market[];
  description?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  productCount?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt?: string;
}

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

