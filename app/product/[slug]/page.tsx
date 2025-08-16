import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductPageClient from './ProductPageClient';
import { getProductBySlug, getAllProducts } from '@/lib/products-action';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  const mainImage = product.images[0];

  return {
    title: `${product.name} - ${product.dimensions.width_cm}x${product.dimensions.height_cm}cm | Print Store`,
    description: `${product.description} Lámina decorativa de ${product.dimensions.width_cm}x${product.dimensions.height_cm}cm en ${product.material}. Precio: $${product.price} USD.`,
    keywords: [
      product.name,
      'lámina decorativa',
      'arte para pared',
      product.effect,
      product.material,
      product.categories,
      'decoración hogar',
      'impresión alta calidad',
    ].join(', '),
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: mainImage || '/placeholder.svg',
          width: 400,
          height: 400,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [mainImage || '/placeholder.svg'],
    },
    alternates: {
      canonical: `/product/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Print Store',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability:
        product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Print Store',
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Dimensions',
        value: `${product.dimensions.width_cm} x ${product.dimensions.height_cm} cm`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Material',
        value: product.material,
      },
      {
        '@type': 'PropertyValue',
        name: 'Resolution',
        value: `${product.resolution_dpi} DPI`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Weight',
        value: `${product.weight_g}g`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPageClient product={product} />
    </>
  );
}
