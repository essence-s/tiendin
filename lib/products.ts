import { Product } from './types';
import productsData from '../data/products.json';

export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getProductById(id: number): Product | undefined {
  return productsData.find((product) => product.id === id) as Product | undefined;
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.find((product) => product.slug === slug) as Product | undefined;
}

export function getProductsByCategory(category: string): Product[] {
  return productsData.filter((product) => product.categories.includes(category)) as Product[];
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  productsData.forEach((product) => {
    product.categories.forEach((category) => {
      categories.add(category);
    });
  });
  return Array.from(categories).sort();
}

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return [];

  const lowercaseQuery = query.toLowerCase();
  return productsData.filter(
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

export function getSearchSuggestions(query: string, limit: number = 5): Product[] {
  if (!query.trim()) return [];

  const results = searchProducts(query);
  return results.slice(0, limit);
}

export function generateSlug(name: string): string {
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
export function getSitemapProducts() {
  return getAllProducts().map((product) => ({
    slug: product.slug,
    lastModified: new Date().toISOString(),
  }));
}
