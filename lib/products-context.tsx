'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, ProductsContextType } from './types';
import { fetchProducts } from './products-action';

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [productsData, setProducts] = useState([] as Product[]);
  const value: ProductsContextType = {
    products: productsData,
    getAllProducts,
    getProductById,
    getProductBySlug,
    getProductsByCategory,
    getAllCategories,
    searchProducts,
    getSearchSuggestions,
    generateSlug,
    getSitemapProducts,
  };

  function getAllProducts(): Product[] {
    return productsData as Product[];
  }

  function getProductById(id: number): Product | undefined {
    return productsData.find((product) => product.id === id) as Product | undefined;
  }

  function getProductBySlug(slug: string): Product | undefined {
    return productsData.find((product) => product.slug === slug) as Product | undefined;
  }

  function getProductsByCategory(category: string): Product[] {
    return productsData.filter((product) => product.categories.includes(category)) as Product[];
  }

  function getAllCategories(): string[] {
    const categories = new Set<string>();
    productsData.forEach((product) => {
      product.categories.forEach((category) => {
        categories.add(category);
      });
    });
    return Array.from(categories).sort();
  }

  function searchProducts(query: string): Product[] {
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

  function getSearchSuggestions(query: string, limit: number = 5): Product[] {
    if (!query.trim()) return [];

    const results = searchProducts(query);
    return results.slice(0, limit);
  }

  function generateSlug(name: string): string {
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
  function getSitemapProducts() {
    return getAllProducts().map((product) => ({
      slug: product.slug,
      lastModified: new Date().toISOString(),
    }));
  }

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a ProductsProvider');
  }
  return context;
}
