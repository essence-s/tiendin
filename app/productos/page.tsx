import { getAllProducts } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';

export const metadata = {
  title: 'Productos - Print Store',
  description: 'Explora nuestra completa colección de productos de alta calidad.',
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Todos los Productos</h1>
        <p className="text-lg text-gray-600">
          Descubre nuestra completa colección de productos de alta calidad.
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
