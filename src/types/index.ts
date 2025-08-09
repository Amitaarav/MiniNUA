export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: ProductRating;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface OrderItemSummary {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItemSummary[];
  totalAmount: number;
  createdAt: string;
  name: string;
  email: string;
  address: string;
}

export interface ProductState {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  filter: { title: string; category: string };
}

export interface ProductDetailState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export interface ShoppingCartState {
  items: CartItem[];
  grandTotal: number;
}

export interface CheckoutState {
  isSubmitting: boolean;
  success: boolean;
  error: string | null;
}

export interface DataCacheState {
  productList: Product[] | null;
  productDetails: Record<string, Product> | null;
}