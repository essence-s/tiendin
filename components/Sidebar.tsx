'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getAllCategories } from '@/lib/products';

interface SidebarProps {
  onCategorySelect?: () => void;
}

export default function Sidebar({ onCategorySelect }: SidebarProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const categories = getAllCategories();

  const handleCategoryClick = () => {
    onCategorySelect?.();
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-neutral-900 mb-4">Collections</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/search"
                onClick={handleCategoryClick}
                className={`block text-sm transition-colors py-1 ${
                  !currentCategory ? 'text-black font-medium' : 'text-neutral-500 hover:text-black'
                }`}
              >
                All
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/search?category=${encodeURIComponent(category)}`}
                  onClick={handleCategoryClick}
                  className={`block text-sm transition-colors py-1 ${
                    currentCategory === category
                      ? 'text-black font-medium'
                      : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
