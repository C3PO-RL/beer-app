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

export interface BeerCardProps {
  beer: Beer;
  onSelect: () => void;
}
