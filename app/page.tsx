import { getAllProducts } from '@/lib/products-action';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// import { useProducts } from '@/lib/products-context';

export default async function HomePage() {
  const products = await getAllProducts();
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-24 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6 leading-tight">
          PRINT STORE
        </h1>
        <p className="text-lg sm:text-xl text-neutral-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          High-quality products for the modern lifestyle. Discover our curated collection of
          essentials.
        </p>
        <Button
          asChild
          className="bg-black hover:bg-neutral-800 text-white px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base"
        >
          <Link href="/search">Shop Now</Link>
        </Button>
      </section>

      {/* Featured Products */}
      <section className="py-8 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-12 space-y-4 sm:space-y-0">
          <h2 className="text-xl sm:text-2xl font-bold text-black">Featured Products</h2>
          <Link
            href="/search"
            className="text-sm text-neutral-500 hover:text-black transition-colors self-start sm:self-auto"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-x-6 lg:gap-y-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
