export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  exchangeRate: number; // Rate from USD
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    exchangeRate: 1,
  },
  PEN: {
    code: 'PEN',
    symbol: 'S/',
    name: 'Sol Peruano',
    exchangeRate: 3.75, // 1 USD = 3.75 PEN (puedes ajustar según el tipo de cambio actual)
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    exchangeRate: 0.85,
  },
  MXN: {
    code: 'MXN',
    symbol: '$',
    name: 'Peso Mexicano',
    exchangeRate: 18.5,
  },
};

// Configuración principal - CAMBIA AQUÍ PARA CAMBIAR LA MONEDA DE TODA LA TIENDA
export const DEFAULT_CURRENCY = 'PEN'; // Cambia a 'USD', 'EUR', 'MXN', etc.

export function getCurrentCurrency(): CurrencyConfig {
  return CURRENCIES[DEFAULT_CURRENCY];
}

export function formatPrice(price: number, currencyCode?: string): string {
  const currency = currencyCode ? CURRENCIES[currencyCode] : getCurrentCurrency();
  // const convertedPrice = priceInUSD * currency.exchangeRate;
  const convertedPrice = price;

  // Format with proper decimals
  const formattedPrice = convertedPrice.toFixed(2);

  // Handle different symbol positions
  if (currency.code === 'PEN') {
    return `${currency.symbol}${formattedPrice}`;
  } else if (currency.code === 'EUR') {
    return `${formattedPrice}${currency.symbol}`;
  } else {
    return `${currency.symbol}${formattedPrice}`;
  }
}

export function formatPriceWithCurrency(price: number, currencyCode?: string): string {
  const currency = currencyCode ? CURRENCIES[currencyCode] : getCurrentCurrency();
  const formattedPrice = formatPrice(price, currencyCode);
  return `${formattedPrice} ${currency.code}`;
}

// export function formatPrice(priceInUSD: number, currencyCode?: string): string {
//   const currency = currencyCode ? CURRENCIES[currencyCode] : getCurrentCurrency();
//   const convertedPrice = priceInUSD * currency.exchangeRate;

//   // Format with proper decimals
//   const formattedPrice = convertedPrice.toFixed(2);

//   // Handle different symbol positions
//   if (currency.code === 'PEN') {
//     return `${currency.symbol}${formattedPrice}`;
//   } else if (currency.code === 'EUR') {
//     return `${formattedPrice}${currency.symbol}`;
//   } else {
//     return `${currency.symbol}${formattedPrice}`;
//   }
// }

// export function formatPriceWithCurrency(priceInUSD: number, currencyCode?: string): string {
//   const currency = currencyCode ? CURRENCIES[currencyCode] : getCurrentCurrency();
//   const formattedPrice = formatPrice(priceInUSD, currencyCode);
//   return `${formattedPrice} ${currency.code}`;
// }

// Función para convertir precio de una moneda a otra
export function convertPrice(price: number, fromCurrency: string, toCurrency: string): number {
  const fromRate = CURRENCIES[fromCurrency]?.exchangeRate || 1;
  const toRate = CURRENCIES[toCurrency]?.exchangeRate || 1;

  // Convert to USD first, then to target currency
  const priceInUSD = price / fromRate;
  return priceInUSD * toRate;
}

// Hook para usar en componentes React (opcional)
export function useCurrency() {
  const currency = getCurrentCurrency();

  return {
    currency,
    formatPrice: (price: number) => formatPrice(price),
    formatPriceWithCurrency: (price: number) => formatPriceWithCurrency(price),
  };
}
