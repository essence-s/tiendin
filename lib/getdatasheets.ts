'use server';

import { Product } from './types';
import { google } from 'googleapis';

export const getDataSheets = async () => {
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
      range: 'productos!A2:Q',
    });

    const rows = response.data.values || [];

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

    return productsData;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};
