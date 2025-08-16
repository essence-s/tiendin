import { Product } from './types';

const vercelUrl = process.env.VERCEL_URL;
const baseUrl = vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000';

export async function fetchProducts(): Promise<Product[]> {
  console.log(baseUrl);
  const res = await fetch(`${baseUrl}/api/products`);
  const data = res.json();
  console.log(data);
  return data;
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await fetchProducts();
  return products;
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((product) => product.id === id) as Product | undefined;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((product) => product.slug === slug) as Product | undefined;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((product) => product.categories.includes(category)) as Product[];
}

export async function getAllCategories(): Promise<string[]> {
  const categories = new Set<string>();
  const products = await getAllProducts();
  products.forEach((product) => {
    product.categories.forEach((category) => {
      categories.add(category);
    });
  });
  return Array.from(categories).sort();
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return [];

  const lowercaseQuery = query.toLowerCase();
  const products = await getAllProducts();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      // product.description.toLowerCase().includes(lowercaseQuery) ||

      // product.categories.some((category) => category.toLowerCase().includes(lowercaseQuery)) ||
      product.categories.some((category) => category.toLowerCase().includes(lowercaseQuery))

    // product.material.toLowerCase().includes(lowercaseQuery) ||
    // product.effect.toLowerCase().includes(lowercaseQuery) ||
    // product.sku.toLowerCase().includes(lowercaseQuery)
  ) as Product[];
}

export async function getSearchSuggestions(query: string, limit: number = 5): Promise<Product[]> {
  if (!query.trim()) return [];

  const results = await searchProducts(query);
  return results.slice(0, limit);
}

export async function generateSlug(name: string): Promise<string> {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

// Generate sitemap data
export async function getSitemapProducts() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
    lastModified: new Date().toISOString(),
  }));
}
