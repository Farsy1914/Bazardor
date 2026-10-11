export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'same';
  image?: string;
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