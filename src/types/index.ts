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