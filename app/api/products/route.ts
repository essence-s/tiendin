import { Product } from '@/lib/types';
import { google } from 'googleapis';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({
      auth,
      version: 'v4',
    });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'productos!A2:Q', // Rango de la primera columna de la segunda hoja (puedes ajustarlo según tus necesidades)
    });

    const rows = response.data.values || [];
    // Definir manualmente los títulos de columna
    const titles = [
      'id',
      'name',
      'slug',
      'sku',
      'price',
      'stock',
      'categories',
      'images',
      'description',
      'dimensions',
      'weight_g',
      'orientation',
      'effect',
      'material',
      'resolution_dpi',
      'shipping',
      'variantes',
    ];
    // Formatear los datos
    const productsData = rows.map((row) => {
      const obj: any = {};
      row.forEach((field, idx) => {
        obj[titles[idx]] = field || '';
      });
      return {
        ...obj,
        price: parseFloat(obj.price),
        stock: parseInt(obj.stock),
        weight_g: parseInt(obj.weight_g),
        resolution_dpi: parseInt(obj.resolution_dpi),

        images: JSON.parse(obj.images.replace(/'/g, '"')),
        variantes: JSON.parse(obj.variantes.replace(/'/g, '"')),
        shipping: JSON.parse(obj.shipping.replace(/'/g, '"')),
        categories: JSON.parse(obj.categories.replace(/'/g, '"')),
        dimensions: JSON.parse(obj.dimensions.replace(/'/g, '"')),
      } as Product;
    });

    //     const variantes = JSON.parse(variantesStr.replace(/'/g, '"'));

    // // Convertir a Objeto
    // const shipping = JSON.parse(shippingStr.replace(/'/g, '"'));

    // revalidatePath('/catalog')
    // return dataCategoria

    const dda = [
      {
        id: 1,
        name: 'Lámina 3D Universo Paralelo',
        slug: 'lamina-3d-universo-paralelo',
        sku: 'LAM3D-UNI-24x30',
        price: 45.0,
        stock: 50,
        categories: ['Ciencia ficción', 'Anime', 'Cultura pop'],
        images: [
          'https://picsum.photos/200/300?random=1',
          'https://picsum.photos/200/300?random=2',
          'https://picsum.photos/200/300?random=3',
        ],
        description:
          'Lámina lenticular con efecto 3D que simula movimiento y profundidad al cambiar el ángulo de visión.',
        dimensions: { width_cm: 24, height_cm: 30, depth_mm: 2 },
        weight_g: 200,
        orientation: 'vertical',
        effect: '3D',
        material: 'papel fotográfico brillante',
        resolution_dpi: 300,
        shipping: {
          free: false,
          weight_kg: 0.2,
          dimensions_cm: { length: 30, width: 24, height: 3 },
        },
        variantes: ['sin marco', 'con marco negro'],
      },
      {
        id: 2,
        name: 'Lámina 3D Formas Futuristas',
        slug: 'lamina-3d-formas-futuristas',
        sku: 'LAM-GEO-3D-30x40',
        price: 35.0,
        stock: 30,
        categories: ['Arte digital', 'Diseño', 'Decorativo'],
        images: ['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400'],
        description:
          'Lámina con diseño abstracto en 3D que cambia según el ángulo. Ideal para dar un toque moderno a cualquier espacio.',
        dimensions: { width_cm: 30, height_cm: 40, depth_mm: 2 },
        weight_g: 250,
        orientation: 'vertical',
        effect: '3D',
        material: 'papel fotográfico mate',
        resolution_dpi: 300,
        shipping: {
          free: false,
          weight_kg: 0.25,
          dimensions_cm: { length: 40, width: 30, height: 3 },
        },
        variantes: ['sin marco', 'con marco blanco'],
      },
      {
        id: 3,
        name: 'Lámina 3D Círculos Dinámicos',
        slug: 'lamina-3d-circulos-dinamicos',
        sku: 'LAM-CIR-3D-20x25',
        price: 25.0,
        stock: 40,
        categories: ['Diseño', 'Decorativo', 'Arte moderno'],
        images: ['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400'],
        description:
          'Círculos superpuestos en distintos planos que dan la sensación de profundidad y movimiento.',
        dimensions: { width_cm: 20, height_cm: 25, depth_mm: 2 },
        weight_g: 150,
        orientation: 'vertical',
        effect: '3D',
        material: 'papel fotográfico brillante',
        resolution_dpi: 300,
        shipping: {
          free: false,
          weight_kg: 0.15,
          dimensions_cm: { length: 25, width: 20, height: 3 },
        },
        variantes: ['sin marco', 'con marco negro'],
      },
      {
        id: 4,
        name: 'Lámina 3D Colores en Movimiento',
        slug: 'lamina-3d-colores-movimiento',
        sku: 'LAM-COLOR-3D-40x50',
        price: 55.0,
        stock: 20,
        categories: ['Arte', 'Decorativo', 'Colorido'],
        images: ['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400'],
        description:
          'Una explosión de color en movimiento gracias al efecto lenticular 3D. Perfecta para ambientes creativos.',
        dimensions: { width_cm: 40, height_cm: 50, depth_mm: 2 },
        weight_g: 300,
        orientation: 'vertical',
        effect: '3D',
        material: 'papel fotográfico mate',
        resolution_dpi: 300,
        shipping: {
          free: true,
          weight_kg: 0.3,
          dimensions_cm: { length: 50, width: 40, height: 3 },
        },
        variantes: ['sin marco', 'con marco dorado'],
      },
      {
        id: 5,
        name: 'Lámina 3D Naturaleza Viva',
        slug: 'lamina-3d-naturaleza-viva',
        sku: 'LAM-NAT-3D-30x30',
        price: 40.0,
        stock: 25,
        categories: ['Naturaleza', 'Decorativo', 'Zen'],
        images: ['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400'],
        description:
          'Paisaje natural que cobra vida con efecto 3D. Ideal para crear un ambiente relajante.',
        dimensions: { width_cm: 30, height_cm: 30, depth_mm: 2 },
        weight_g: 220,
        orientation: 'cuadrada',
        effect: '3D',
        material: 'papel fotográfico brillante',
        resolution_dpi: 300,
        shipping: {
          free: false,
          weight_kg: 0.22,
          dimensions_cm: { length: 30, width: 30, height: 3 },
        },
        variantes: ['sin marco', 'con marco madera'],
      },
      {
        id: 6,
        name: 'Lámina 3D Frase Motivacional',
        slug: 'lamina-3d-frase-motivacional',
        sku: 'LAM-FRASE-3D-25x35',
        price: 30.0,
        stock: 35,
        categories: ['Motivación', 'Decorativo', 'Tipografía'],
        images: ['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400'],
        description:
          'Frase inspiradora con efecto de profundidad que resalta cada palabra desde diferentes ángulos.',
        dimensions: { width_cm: 25, height_cm: 35, depth_mm: 2 },
        weight_g: 180,
        orientation: 'vertical',
        effect: '3D',
        material: 'papel fotográfico mate',
        resolution_dpi: 300,
        shipping: {
          free: false,
          weight_kg: 0.18,
          dimensions_cm: { length: 35, width: 25, height: 3 },
        },
        variantes: ['sin marco', 'con marco negro'],
      },
      {
        id: 7,
        name: 'Lámina 3D Dragon Ball Z',
        slug: 'lamina-3d-dragon-ball-z',
        sku: 'LAM-DBZ-3D-30x40',
        price: 42.0,
        stock: 18,
        categories: ['Anime', 'Acción', 'Cultura pop'],
        images: ['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400'],
        description:
          'Los guerreros más legendarios de Dragon Ball Z cobran vida en esta lámina con efecto 3D impactante.',
        dimensions: { width_cm: 30, height_cm: 40, depth_mm: 2 },
        weight_g: 240,
        orientation: 'vertical',
        effect: '3D',
        material: 'papel fotográfico brillante',
        resolution_dpi: 300,
        shipping: {
          free: false,
          weight_kg: 0.24,
          dimensions_cm: { length: 40, width: 30, height: 3 },
        },
        variantes: ['sin marco', 'con marco negro', 'con marco blanco'],
      },
      {
        id: 8,
        name: 'Lámina 3D Messi Campeón',
        slug: 'lamina-3d-messi-campeon',
        sku: 'LAM-MESSI-3D-40x50',
        price: 48.0,
        stock: 12,
        categories: ['Deportes', 'Fútbol', 'Héroes'],
        images: ['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400'],
        description:
          'Un momento inolvidable: Messi levantando la Copa del Mundo en una lámina que cobra vida con efecto 3D.',
        dimensions: { width_cm: 40, height_cm: 50, depth_mm: 2 },
        weight_g: 320,
        orientation: 'vertical',
        effect: '3D',
        material: 'papel fotográfico mate',
        resolution_dpi: 300,
        shipping: {
          free: true,
          weight_kg: 0.32,
          dimensions_cm: { length: 50, width: 40, height: 3 },
        },
        variantes: ['sin marco', 'con marco dorado', 'con marco celeste'],
      },
    ];

    // return dda;
    // return productsData as Product[];
    // console.log(productsData);
    // return productsData;
    return new Response(JSON.stringify(productsData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error; // Puedes manejar el error según tus necesidades
  }
}

// export async function POST(req: Request) {
//   const body = await req.json();

//   if (body.secret !== process.env.REVALIDATE_SECRET) {
//     return new Response('Invalid secret', { status: 401 });
//   }

//   if (!body.path && !body.tag) {
//     return new Response('Path or tag is required', { status: 400 });
//   }

//   if (body.path) {
//     revalidatePath(body.path, 'layout');
//   }

//   if (body.tag) {
//     revalidateTag(body.tag);
//   }

//   return new Response('Revalidated', { status: 200 });
// }
