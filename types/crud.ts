export interface Store {
  id: string;
  name: string;
  cellphone: string;
  address: string;
}

export interface Product {
  id: string;
  emoji: string;
  name: string;
  description: string;
  stock: number;
  provider: string;
  original_price: number;
  sale_price: number;
}

export interface ProductWithProvider extends Omit<Product, "provider"> {
  provider: Provider;
}

export interface Provider {
  id: string;
  name: string;
  cellphone: string;
  address: string;
}
