'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/currency';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0];

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="aspect-square relative overflow-hidden bg-neutral-100 rounded-lg">
        <Image
          src={mainImage?.url || '/placeholder.svg'}
          alt={mainImage?.alt || product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-black group-hover:underline">{product.name}</h3>
        <p className="text-sm font-medium text-blue-600">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
