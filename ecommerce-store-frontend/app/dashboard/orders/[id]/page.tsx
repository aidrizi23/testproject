'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/lib/store';
import api from '@/lib/api';
import { Order } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { Package, MapPin, CreditCard, Truck } from 'lucide-react';

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useAuthStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${params.id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchOrder();
    }
  }, [isAuthenticated, params.id, router]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'default';
      case 'shipped':
        return 'default';
      case 'processing':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="h-96 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container flex flex-col items-center justify-center py-16">
        <Package className="mb-4 h-16 w-16 text-muted-foreground" />
        <h2 className="mb-2 text-2xl font-bold">Order Not Found</h2>
        <p className="mb-6 text-muted-foreground">
          The order you're looking for doesn't exist
        </p>
        <Link href="/dashboard">
          <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
            Back to Dashboard
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <p className="mt-2 text-muted-foreground">Order {order.orderNumber}</p>
      </div>

      <div className="space-y-6">
        {/* Order Status */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Status</h2>
                  <Badge variant={getStatusColor(order.status) as any}>
                    {order.status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ordered on {formatDate(order.createdAt)}
                </p>
                {order.deliveredAt && (
                  <p className="text-sm text-muted-foreground">
                    Delivered on {formatDate(order.deliveredAt)}
                  </p>
                )}
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold">{formatPrice(order.totalAmount)}</p>
                <Badge variant="outline">{order.paymentStatus}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Package className="h-5 w-5" />
              Order Items
            </h2>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id}>
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border">
                      <Image
                        src={item.productImageUrl || '/placeholder.png'}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/products/${item.productId}`}
                          className="font-semibold hover:text-primary"
                        >
                          {item.productName}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold">{formatPrice(item.totalPrice)}</span>
                        <span className="text-sm text-muted-foreground">
                          ({formatPrice(item.unitPrice)} each)
                        </span>
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        {order.shippingAddress && (
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Truck className="h-5 w-5" />
                Shipping Address
              </h2>

              <div className="text-sm">
                <p className="font-medium">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.addressLine1}
                  {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
                </p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.postalCode}
                </p>
                <p className="text-muted-foreground">{order.shippingAddress.country}</p>
                {order.shippingAddress.phoneNumber && (
                  <p className="mt-2 text-muted-foreground">
                    {order.shippingAddress.phoneNumber}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment & Summary */}
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <CreditCard className="h-5 w-5" />
              Payment Summary
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.subTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{formatPrice(order.shippingCost)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>

              <div className="mt-4 rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">
                  Payment Method: {order.paymentMethod}
                </p>
                <p className="text-xs text-muted-foreground">
                  Payment Status: {order.paymentStatus}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
