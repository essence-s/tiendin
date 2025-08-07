import { Suspense } from 'react';
import SearchView from './searchView';

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SearchView />
    </Suspense>
  );
}
