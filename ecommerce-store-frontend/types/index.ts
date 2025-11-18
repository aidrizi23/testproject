export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface AuthResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  sku?: string;
  categoryId: number;
  categoryName: string;
  mainImageUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  images: ProductImage[];
}

export interface ProductImage {
  id: number;
  imageUrl: string;
  displayOrder: number;
}

export interface ProductListItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  mainImageUrl?: string;
  isFeatured: boolean;
  averageRating: number;
  reviewCount: number;
  categoryName: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  parentCategoryId?: number;
  isActive: boolean;
  subCategories: Category[];
  productCount: number;
}

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  total: number;
  stockQuantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  subTotal: number;
  totalItems: number;
}

export interface Address {
  id: number;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  subTotal: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  deliveredAt?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  items: OrderItem[];
}

export interface OrderListItem {
  id: number;
  orderNumber: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  itemCount: number;
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  title?: string;
  comment?: string;
  isVerifiedPurchase: boolean;
  createdAt: string;
}
