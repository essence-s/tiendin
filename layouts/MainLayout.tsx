import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllCategories } from '@/lib/products-action';
import WhatsappFloat from '@/components/WhatsappFloat';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-white">
      <WhatsappFloat />
      <Header categories={categories} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
