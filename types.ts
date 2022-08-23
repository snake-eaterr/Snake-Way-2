export interface User {
  username: string;
  id: string;
}

export interface Review {
  id: string;
  rating: number;
  text: string;
  created: string;
  postedBy: User;

}

export interface Product {
  label: string;
  description: string;
  stock: number;
  price: number;
  category: string;
  updated?: string;
  created: string;
  rating: string;
  reviews: Review[];
  id: string;
}



export interface Values {
  username: string;
  password: string;
}

export interface ReturnedUser {
  username: string;
  id: string;
}

export interface Token {
  value: string;
}

export interface Order {
  orderedProduct: Product;
  quantity: number;
  address: string;
  created: string;
  id: string;
  user: ReturnedUser;
  finished: boolean;
  shipped: boolean;
}

export interface CartEntry {
  product: Product;
  quantity: number;
}