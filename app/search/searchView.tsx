'use client';
export const dynamic = 'force-dynamic';

import { Filter } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { use, useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Sidebar from '@/components/Sidebar';
import SortDropdown from '@/components/SortDropdown';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Product } from '@/lib/types';
import Link from 'next/link';

export default function SearchView({
  allProducts: promiseAllProducts,
}: {
  allProducts: Promise<Product[]>;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const [sortBy, setSortBy] = useState('relevance');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const allProducts = use(promiseAllProducts);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.categories.some((cat) => cat.toLowerCase().includes(lowercaseQuery)) ||
          product.material.toLowerCase().includes(lowercaseQuery) ||
          product.effect.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter((product) => product.categories.includes(category));
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'latest':
          return b.id - a.id; // Assuming higher ID means newer
        case 'trending':
          return Math.random() - 0.5; // Random for demo
        default:
          return 0; // Relevance - keep original order
      }
    });

    return sorted;
  }, [allProducts, query, category, sortBy]);

  const getPageTitle = () => {
    if (query && category) {
      return `"${query}" in ${category}`;
    } else if (query) {
      return `Search results for "${query}"`;
    } else if (category) {
      return category;
    }
    return 'All Products';
  };

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 sm:w-96 overflow-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <Sidebar onCategorySelect={() => setIsSidebarOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          {/* Mobile Sort */}
          <div className="flex-shrink-0">
            <SortDropdown onSortChange={setSortBy} currentSort={sortBy} />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 lg:mb-8 space-y-4 sm:space-y-0">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2 truncate">
                {getPageTitle()}
              </h1>
              <p className="text-sm text-neutral-500">
                {filteredAndSortedProducts.length} product
                {filteredAndSortedProducts.length !== 1 ? 's' : ''}
                {query && <span className="hidden sm:inline"> matching "{query}"</span>}
                {category && <span className="hidden sm:inline"> in {category}</span>}
              </p>

              {/* Mobile query/category info */}
              {(query || category) && (
                <div className="flex flex-wrap gap-2 mt-2 sm:hidden">
                  {query && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      Search: "{query}"
                    </span>
                  )}
                  {category && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Category: {category}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Desktop Sort Dropdown */}
            <div className="hidden lg:block flex-shrink-0">
              <SortDropdown onSortChange={setSortBy} currentSort={sortBy} />
            </div>
          </div>

          {/* Products Grid */}
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="max-w-md mx-auto">
                <p className="text-neutral-500 mb-4 text-sm sm:text-base">No products found.</p>
                {(query || category) && (
                  <Button asChild variant="outline">
                    <Link href="/search">View all products</Link>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
