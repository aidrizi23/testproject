'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuthStore, useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { cart, fetchCart, updateCartItem, removeFromCart } = useCartStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const loadCart = async () => {
      try {
        await fetchCart();
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [isAuthenticated, fetchCart, router]);

  const handleUpdateQuantity = async (cartItemId: number, quantity: number) => {
    try {
      await updateCartItem(cartItemId, quantity);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update cart',
        variant: 'destructive',
      });
    }
  };

  const handleRemove = async (cartItemId: number) => {
    try {
      await removeFromCart(cartItemId);
      toast({
        title: 'Success',
        description: 'Item removed from cart',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove item',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="h-96 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center py-16">
        <ShoppingBag className="mb-4 h-24 w-24 text-muted-foreground" />
        <h2 className="mb-2 text-2xl font-bold">Your cart is empty</h2>
        <p className="mb-6 text-muted-foreground">
          Add some products to your cart to get started
        </p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const tax = cart.subTotal * 0.1;
  const shipping = cart.subTotal > 50 ? 0 : 10;
  const total = cart.subTotal + tax + shipping;

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 overflow-hidden rounded-lg border">
                        <Image
                          src={item.imageUrl || '/placeholder.png'}
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
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.id,
                                  Math.min(item.stockQuantity, item.quantity + 1)
                                )
                              }
                              disabled={item.quantity >= item.stockQuantity}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleRemove(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right font-semibold">
                        {formatPrice(item.total)}
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cart.subTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Add {formatPrice(50 - cart.subTotal)} more to get free shipping!
                </p>
              )}

              <Link href="/checkout">
                <Button className="mt-6 w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/products">
                <Button variant="outline" className="mt-2 w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
