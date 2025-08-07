'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  Share2,
  Heart,
} from 'lucide-react';
import { getAllProducts } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { formatPrice, formatPriceWithCurrency, getCurrentCurrency } from '@/lib/currency';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const currency = getCurrentCurrency();

  const allProducts = getAllProducts();
  const relatedProducts = allProducts
    .filter(
      (p) => p.categories.some((cat) => product.categories.includes(cat)) && p.id !== product.id
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Breadcrumb for SEO */}
      {/* <nav
        className="flex items-center space-x-2 text-xs sm:text-sm text-neutral-500 mb-4 overflow-x-auto"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-black transition-colors whitespace-nowrap">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/search" className="hover:text-black transition-colors whitespace-nowrap">
          Productos
        </Link>
        <span>/</span>
        <Link
          href={`/search?category=${product.categories[0]}`}
          className="hover:text-black transition-colors whitespace-nowrap"
        >
          {product.categories[0]}
        </Link>
        <span>/</span>
        <span className="text-black truncate">{product.name}</span>
      </nav> */}

      {/* Back Button */}
      <Link
        href="/search"
        className="inline-flex items-center text-sm text-neutral-500 hover:text-black mb-6 sm:mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Link>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20">
          {/* Product Images */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-lg">
              <div className="aspect-square relative overflow-hidden bg-neutral-50 rounded-lg">
                <Image
                  src={product.images[selectedImage]?.url || '/placeholder.svg'}
                  alt={product.images[selectedImage]?.alt || product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <button
                    onClick={prevImage}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="mt-4 sm:mt-6 flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-neutral-50 border-2 transition-colors flex-shrink-0 ${
                      selectedImage === index
                        ? 'border-blue-500'
                        : 'border-transparent hover:border-neutral-300'
                    }`}
                  >
                    <Image
                      src={image.url || '/placeholder.svg'}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {formatPriceWithCurrency(product.price)}
                </span>
                {product.shipping.free && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Envío gratis
                  </span>
                )}
              </div>
              {/* <p className="text-sm text-neutral-500">SKU: {product.sku}</p> */}
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-black mb-3 uppercase tracking-wide">
                CATEGORÍAS
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <Link
                    key={category}
                    href={`/search?category=${encodeURIComponent(category)}`}
                    className="px-3 py-1 text-xs bg-neutral-100 text-neutral-700 rounded-full hover:bg-neutral-200 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            {/* Product Description */}
            <div>
              <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>
            </div>

            {/* Product Details - Collapsible on mobile */}
            <div className="space-y-2 text-sm">
              <details className="sm:hidden group">
                <summary className="cursor-pointer font-medium text-black mb-2 flex items-center justify-between">
                  Detalles del producto
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="space-y-2 pl-4 border-l-2 border-neutral-100">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Dimensions:</span>
                    <span className="text-neutral-900">
                      {product.dimensions.width_cm} × {product.dimensions.height_cm} cm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Material:</span>
                    <span className="text-neutral-900">{product.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Resolution:</span>
                    <span className="text-neutral-900">{product.resolution_dpi} DPI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Weight:</span>
                    <span className="text-neutral-900">{product.weight_g}g</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-neutral-500">Effect:</span>
                    <span className="text-neutral-900">{product.effect}</span>
                  </div> */}
                  {/* <div className="flex justify-between">
                    <span className="text-neutral-500">Shipping:</span>
                    <span className="text-neutral-900">
                      {product.shipping.free ? 'Envío gratis' : `${formatPrice(5)} envío`}
                    </span>
                  </div> */}
                </div>
              </details>

              {/* Desktop details */}
              <div className="hidden sm:block space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Dimensions:</span>
                  <span className="text-neutral-900">
                    {product.dimensions.width_cm} × {product.dimensions.height_cm} cm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Material:</span>
                  <span className="text-neutral-900">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Resolution:</span>
                  <span className="text-neutral-900">{product.resolution_dpi} DPI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Weight:</span>
                  <span className="text-neutral-900">{product.weight_g}g</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-neutral-500">Effect:</span>
                  <span className="text-neutral-900">{product.effect}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Shipping:</span>
                  <span className="text-neutral-900">
                    {product.shipping.free ? 'Envío gratis' : `${formatPrice(5)} envío`}
                  </span>
                </div> */}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className="text-sm font-medium text-black mb-3 uppercase tracking-wide">
                CANTIDAD
              </h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-400 transition-colors"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium" aria-label={`Cantidad: ${quantity}`}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-400 transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-colors flex-1 sm:flex-none sm:min-w-[200px]"
                >
                  {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
                </Button>

                <div className="flex gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="flex-1 sm:flex-none"
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`}
                    />
                    <span className="ml-2 sm:hidden">Favoritos</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="flex-1 sm:flex-none"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="ml-2 sm:hidden">Compartir</span>
                  </Button>
                </div>
              </div>

              {product.stock > 0 && product.stock <= 5 && (
                <p className="text-orange-600 text-sm">Solo quedan {product.stock} en stock</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 sm:mt-24 max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-6 sm:mb-8">
            Productos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
