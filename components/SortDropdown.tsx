'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'trending', label: 'Trending' },
  { value: 'latest', label: 'Latest arrivals' },
  { value: 'price-low', label: 'Price: Low to high' },
  { value: 'price-high', label: 'Price: High to low' },
];

interface SortDropdownProps {
  onSortChange: (value: string) => void;
  currentSort: string;
}

export default function SortDropdown({ onSortChange, currentSort }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption =
    sortOptions.find((option) => option.value === currentSort) || sortOptions[0];

  return (
    <div className="relative">
      <div className="text-xs sm:text-sm text-neutral-500 mb-2">Sort by</div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full min-w-[140px] sm:min-w-[160px] px-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-md bg-white hover:border-neutral-300 transition-colors"
      >
        <span className="text-neutral-900 truncate">{currentOption.label}</span>
        <ChevronDown
          className={`h-3 w-3 sm:h-4 sm:w-4 text-neutral-400 transition-transform flex-shrink-0 ml-2 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Overlay for mobile */}
          <div className="fixed inset-0 z-10 sm:hidden" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs sm:text-sm text-left hover:bg-neutral-50 transition-colors ${
                  option.value === currentSort
                    ? 'text-black font-medium bg-neutral-50'
                    : 'text-neutral-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
