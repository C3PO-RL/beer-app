export interface Beer {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Stock {
  last_updated: string;
  beers: Beer[];
}

export interface OrderItem {
  name: string;
  price_per_unit: number;
  total: number;
  quantity: number;
  image?: string;
}

export interface Round {
  created: string;
  items: {
    name: string;
    quantity: number;
    price?: number;
  }[];
}

export interface Order {
  id?: string;
  created: string;
  paid: boolean;
  subtotal: number;
  taxes: number;
  discounts: number;
  items: OrderItem[];
  rounds: Round[];
}

export interface Customer {
  name: string;
  phone: string;
  address: string;
  houseNumber: string;
  city: string;
}
