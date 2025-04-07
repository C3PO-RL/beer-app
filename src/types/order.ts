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

export interface Customer {
  id: string;
  name: string;
  email: string;
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
  customer?: Customer;
}

export interface OrderCardProps {
  order: Order;
  isPast?: boolean;
}
