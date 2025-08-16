import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllCategories } from '@/lib/products-action';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  // const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-white">
      {/* <Header categories={categories} /> */}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
