import Link from 'next/link';
import { CheckCircle, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CheckoutSuccessPage() {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Pedido Confirmado!</h1>
        <p className="text-lg text-gray-600">
          Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Detalles del Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Número de Pedido:</span>
            <span className="font-mono text-blue-600">#{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Fecha:</span>
            <span>{new Date().toLocaleDateString('es-ES')}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Estado:</span>
            <span className="text-green-600 font-medium">Confirmado</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Preparación</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Tu pedido está siendo preparado en nuestro almacén. 
              Recibirás una notificación cuando esté listo para envío.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="w-5 h-5" />
              <span>Envío</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Tiempo estimado de entrega: 3-5 días hábiles. 
              Te enviaremos el número de seguimiento por email.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center space-y-4">
        <p className="text-gray-600">
          Hemos enviado un email de confirmación con todos los detalles de tu pedido.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/productos">Continuar Comprando</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Volver al Inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
