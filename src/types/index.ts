export interface Source {
  id: string;
  name: string;
  description?: string;
  type: 'public' | 'paid';
  selected: boolean;
}

export interface SearchResult {
  id: string;
  productName: string;
  supplier: string;
  price: number;
  source: string;
}

export interface FilterOption {
  id: string;
  label: string;
  active: boolean;
}

export interface User {
  name: string;
  initials: string;
  role: string;
}

export interface SavedProduct extends SearchResult {
  quantity?: number;
}

export interface GroupedProduct {
  productName: string;
  quantity: number;
  prices: Array<{
    source: string;
    price: number;
    supplier: string;
  }>;
  averagePrice: number;
  totalValue: number;
}