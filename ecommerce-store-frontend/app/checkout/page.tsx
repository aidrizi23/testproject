'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuthStore, useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Address } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { cart, fetchCart } = useCartStore();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA',
    phoneNumber: '',
    isDefault: false,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const loadData = async () => {
      try {
        await fetchCart();
        const response = await api.get<Address[]>('/users/me/addresses');
        setAddresses(response.data);
        const defaultAddress = response.data.find((addr) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress.id);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [isAuthenticated, fetchCart, router]);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post<Address>('/users/me/addresses', newAddress);
      setAddresses([...addresses, response.data]);
      setSelectedAddress(response.data.id);
      setShowNewAddress(false);
      toast({
        title: 'Success',
        description: 'Address added successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add address',
        variant: 'destructive',
      });
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast({
        title: 'Error',
        description: 'Please select a shipping address',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/orders', {
        shippingAddressId: selectedAddress,
        paymentMethod: 'CreditCard',
      });
      toast({
        title: 'Success!',
        description: 'Your order has been placed successfully',
      });
      router.push(`/dashboard/orders`);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to place order',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <p>Your cart is empty</p>
      </div>
    );
  }

  const tax = cart.subTotal * 0.1;
  const shipping = cart.subTotal > 50 ? 0 : 10;
  const total = cart.subTotal + tax + shipping;

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    selectedAddress === address.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedAddress(address.id)}
                >
                  <div className="font-semibold">
                    {address.firstName} {address.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {address.addressLine1}
                    {address.addressLine2 && `, ${address.addressLine2}`}
                    <br />
                    {address.city}, {address.state} {address.postalCode}
                    <br />
                    {address.country}
                    {address.phoneNumber && (
                      <>
                        <br />
                        {address.phoneNumber}
                      </>
                    )}
                  </div>
                </div>
              ))}

              {showNewAddress ? (
                <form onSubmit={handleAddAddress} className="space-y-4 rounded-lg border p-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input
                        required
                        value={newAddress.firstName}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input
                        required
                        value={newAddress.lastName}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, lastName: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Address Line 1</Label>
                    <Input
                      required
                      value={newAddress.addressLine1}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, addressLine1: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address Line 2</Label>
                    <Input
                      value={newAddress.addressLine2}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, addressLine2: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        required
                        value={newAddress.city}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, city: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input
                        required
                        value={newAddress.state}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, state: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Postal Code</Label>
                      <Input
                        required
                        value={newAddress.postalCode}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, postalCode: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      value={newAddress.phoneNumber}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, phoneNumber: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Save Address</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowNewAddress(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <Button variant="outline" onClick={() => setShowNewAddress(true)}>
                  Add New Address
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

              <div className="mb-4 space-y-2">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.productName} x{item.quantity}
                    </span>
                    <span>{formatPrice(item.total)}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

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

              <Button
                className="mt-6 w-full"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={loading || !selectedAddress}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
