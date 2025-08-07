'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { getAllCategories } from '@/lib/products';
import SearchDropdown from './SearchDropdown';
import CartSidebar from './CartSidebar';

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const categories = getAllCategories();

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center">
                <span className="text-sm font-medium tracking-wide">PRINT STORE</span>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link 
                  href="/search" 
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  All
                </Link>
                {categories.slice(0, 4).map((category) => (
                  <Link 
                    key={category}
                    href={`/search?category=${encodeURIComponent(category)}`} 
                    className="text-sm text-neutral-500 hover:text-black transition-colors"
                  >
                    {category}
                  </Link>
                ))}
                {categories.length > 4 && (
                  <div className="relative group">
                    <button className="text-sm text-neutral-500 hover:text-black transition-colors">
                      More
                    </button>
                    <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[150px]">
                      <div className="py-2">
                        {categories.slice(4).map((category) => (
                          <Link
                            key={category}
                            href={`/search?category=${encodeURIComponent(category)}`}
                            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </nav>
            </div>

            {/* Search Bar */}
            <div className="flex-1 mx-8 hidden md:block">
              <SearchDropdown />
            </div>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-neutral-500 hover:text-black transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-neutral-500 hover:text-black transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="space-y-4">
                {/* Mobile Search */}
                <div className="px-2">
                  <SearchDropdown onClose={() => setIsMobileMenuOpen(false)} />
                </div>
                
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-2">
                  <Link
                    href="/search"
                    className="px-2 py-2 text-sm text-neutral-500 hover:text-black transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    All Products
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/search?category=${encodeURIComponent(category)}`}
                      className="px-2 py-2 text-sm text-neutral-500 hover:text-black transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
