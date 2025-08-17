'use client';

import Image from 'next/image';
import { Play, ImageIcon } from 'lucide-react';
import type { ProductMedia } from '@/lib/types';

interface MediaThumbnailsProps {
  media: ProductMedia[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function MediaThumbnails({ media, selectedIndex, onSelect }: MediaThumbnailsProps) {
  if (media.length <= 1) return null;

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-4 sm:mt-6 flex space-x-2 overflow-x-auto pb-2">
      {media.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-neutral-50 border-2 transition-colors flex-shrink-0 ${
            selectedIndex === index
              ? 'border-blue-500'
              : 'border-transparent hover:border-neutral-300'
          }`}
        >
          <Image
            src={item.type === 'video' ? item.thumbnail : item.url}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="64px"
          />

          {/* Media Type Overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            {item.type === 'video' ? (
              <div className="flex flex-col items-center">
                <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                {item.duration && (
                  <span className="text-white text-xs mt-1 bg-black/50 px-1 rounded">
                    {formatDuration(item.duration)}
                  </span>
                )}
              </div>
            ) : (
              <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>

          {/* Selection Indicator */}
          {selectedIndex === index && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
          )}
        </button>
      ))}
    </div>
  );
}
