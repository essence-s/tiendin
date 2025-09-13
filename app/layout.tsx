import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { getCurrentCurrency } from '@/lib/currency';
import MainLayout from '@/layouts/MainLayout';
import { ProductsProvider } from '@/lib/products-context';
import { getSEOConfig } from '@/lib/site-config';

const inter = Inter({ subsets: ['latin'] });

const SEOConfig = getSEOConfig();

export const metadata: Metadata = {
  title: {
    default: SEOConfig.defaultTitle,
    template: SEOConfig.titleTemplate,
  },
  description: SEOConfig.defaultDescription,
  keywords: SEOConfig.keywords,
  authors: [{ name: SEOConfig.author }],
  creator: SEOConfig.author,
  publisher: SEOConfig.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://syhc.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://syhc.vercel.app',
    title: SEOConfig.defaultTitle,
    description: SEOConfig.defaultDescription,
    siteName: SEOConfig.author,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEOConfig.defaultTitle,
    description: SEOConfig.defaultDescription,
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
        <link rel="canonical" href="https://syhc.vercel.app" />
        <meta name="currency" content={currency.code} />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <ProductsProvider>
            <MainLayout>{children}</MainLayout>
          </ProductsProvider>
        </CartProvider>
      </body>
    </html>
  );
}
