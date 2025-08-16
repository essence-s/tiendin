import { Suspense } from 'react';
import SearchView from './searchView';
import { getAllProducts } from '@/lib/products-action';

export default async function SearchPage() {
  const allProducts = getAllProducts();
  return (
    <Suspense
      fallback={<div className="w-full h-[95vh] flex justify-center items-center">Cargando...</div>}
    >
      <SearchView allProducts={allProducts} />
    </Suspense>
  );
}
