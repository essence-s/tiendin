export interface ProductImage {
  url: string;
  type: 'image';
  alt: string;
}
export interface ProductVideo {
  url: string;
  thumbnail: string;
  alt: string;
  type: 'video';
  duration?: number; // in seconds
}

export interface ProductYouTubeVideo {
  url: string; // YouTube URL (cualquier formato)
  videoId?: string; // Se extraerá automáticamente
  thumbnail?: string; // Se generará automáticamente si no se proporciona
  alt: string;
  type: 'youtube';
  title?: string;
  duration?: number; // in seconds
}

export type ProductMedia = ProductImage | ProductVideo | ProductYouTubeVideo;

export interface ProductDimensions {
  width_cm: number;
  height_cm: number;
  depth_mm: number;
}

export interface ShippingInfo {
  free: boolean;
  weight_kg: number;
  dimensions_cm: {
    length: number;
    width: number;
    height: number;
  };
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  stock: number;
  categories: string[];
  images: string[];
  // images: ProductImage[];
  videos: string[];
  description: string;
  dimensions: ProductDimensions;
  weight_g: number;
  orientation: string;
  effect: string;
  material: string;
  resolution_dpi: number;
  shipping: ShippingInfo;
  variantes: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export interface ProductsContextType {
  products: Product[];
  getAllProducts: () => Product[];
  getProductById: (id: number) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getAllCategories: () => string[];
  searchProducts: (query: string) => Product[];
  getSearchSuggestions: (query: string, limit: number) => Product[];
  generateSlug: (name: string) => string;
  getSitemapProducts: () => void;
}

export interface SearchResult {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  categories: string[];
}
