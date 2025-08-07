import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { getCurrentCurrency } from '@/lib/currency';
import MainLayout from '@/layouts/MainLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Print Store - Láminas decorativas de alta calidad',
    template: '%s | Print Store',
  },
  description:
    'Descubre nuestra colección de láminas decorativas con efectos 3D y diseños modernos. Arte para pared de alta calidad con impresión profesional.',
  keywords:
    'láminas decorativas, arte para pared, decoración hogar, impresión alta calidad, láminas 3D, diseño moderno, papel fotográfico',
  authors: [{ name: 'Print Store' }],
  creator: 'Print Store',
  publisher: 'Print Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://printstore.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://printstore.com',
    title: 'Print Store - Láminas decorativas de alta calidad',
    description:
      'Descubre nuestra colección de láminas decorativas con efectos 3D y diseños modernos.',
    siteName: 'Print Store',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Print Store - Láminas decorativas de alta calidad',
    description:
      'Descubre nuestra colección de láminas decorativas con efectos 3D y diseños modernos.',
    creator: '@printstore',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const currency = getCurrentCurrency();

  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://printstore.com" />
        <meta name="currency" content={currency.code} />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <MainLayout>{children}</MainLayout>
        </CartProvider>
      </body>
    </html>
  );
}
