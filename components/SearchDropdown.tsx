'use client';

import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { formatPrice } from '@/lib/currency';
import { useProducts } from '@/lib/products-context';
import { Product } from '@/lib/types';

interface SearchDropdownProps {
  onClose?: () => void;
}

export default function SearchDropdown({ onClose }: SearchDropdownProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { getSearchSuggestions } = useProducts();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length >= 1) {
      const results = getSearchSuggestions(query, 6);
      setSuggestions(results);
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
      onClose?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          const selectedProduct = suggestions[selectedIndex];
          router.push(`/product/${selectedProduct.slug}`);
          setIsOpen(false);
          setQuery('');
          onClose?.();
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`);
    setIsOpen(false);
    setQuery('');
    onClose?.();
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-lg">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          className="w-full pl-4 pr-20 py-2 border-neutral-200 focus:border-neutral-400 focus:ring-0 text-sm"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Search Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="py-2">
            {suggestions.map((product, index) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.slug)}
                className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-neutral-50 transition-colors text-left ${
                  selectedIndex === index ? 'bg-neutral-50' : ''
                }`}
              >
                <div className="relative w-12 h-12 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={product.images[0] || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-black truncate">{product.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm font-medium text-blue-600">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {product.categories.slice(0, 2).map((category) => (
                        <span
                          key={category}
                          className="text-xs text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded"
                        >
                          {category}
                        </span>
                      ))}
                      {product.categories.length > 2 && (
                        <span className="text-xs text-neutral-400">
                          +{product.categories.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {query.trim() && (
            <div className="border-t border-neutral-100 px-4 py-3">
              <button
                onClick={handleSubmit}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Ver todos los resultados para "{query}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
