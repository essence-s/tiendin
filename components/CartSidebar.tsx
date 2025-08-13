'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/currency';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
const whatsappNumber = process.env.NEXT_PUBLIC_WS;

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  let message = 'Hola, quiero cotizar estos productos:\n';
  items.forEach((item) => {
    message += `- ${item.product.name} x${item.quantity}\n`;
  });

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5" />
            <span>Carrito de Compras</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
                <Button onClick={onClose} asChild>
                  <Link href="/search">Continuar Comprando</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <Image
                        src={item.product.images[0]?.url || '/placeholder.svg'}
                        alt={item.product.images[0]?.alt || item.product.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{item.product.name}</h4>
                        <p className="text-gray-600 text-sm">{formatPrice(item.product.price)}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 mt-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="space-y-2">
                  {/* <Button asChild className="w-full" onClick={onClose}>
                    <Link href="/checkout">Proceder al Checkout</Link>
                  </Button> */}

                  <div className="relative inline-flex h-12 overflow-hidden rounded-lg w-full p-[3px] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f8f8f8_0%,#78F4D1FC_40%,#67EA82_80%,#0aff0a40_100%)]" />
                    <Button asChild>
                      <Link
                        onClick={onClose}
                        // href="/checkout"
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                        target="_blank"
                        className="items-center justify-center inline-flex h-full w-full text-white font-semibold rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-colors duration-200 shadow-lg backdrop-blur-3xl"
                      >
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.52 3.48A11.8 11.8 0 0 0 12 0C5.37 0 0 5.37 0 12a11.8 11.8 0 0 0 3.48 8.52l-1.6 5.88 6.04-1.6A11.8 11.8 0 0 0 24 12c0-3.17-1.24-6.17-3.48-8.52zM12 21.6a9.6 9.6 0 0 1-5.12-1.43l-.36-.21-3.6.96.96-3.6-.21-.36A9.6 9.6 0 1 1 21.6 12a9.56 9.56 0 0 1-9.6 9.6z" />
                        </svg>
                        Cotizar por WhatsApp
                      </Link>
                    </Button>
                  </div>

                  <Button variant="outline" className="w-full" onClick={onClose} asChild>
                    <Link href="/search">Continuar Comprando</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-red-500 hover:text-red-700"
                    onClick={clearCart}
                  >
                    Vaciar Carrito
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
