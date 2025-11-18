'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';
import { OrderListItem } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';

export default function AdminOrdersPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { toast } = useToast();
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      router.push('/');
      return;
    }

    fetchOrders();
  }, [isAuthenticated, user, router]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: number, status: string) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status });
      toast({ title: 'Success', description: 'Order status updated successfully' });
      fetchOrders();
      setSelectedOrder(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update order',
        variant: 'destructive',
      });
    }
  };

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

  if (!user?.isAdmin) return null;

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Order Management</h1>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{order.orderNumber}</h3>
                    <Badge variant={getStatusColor(order.status) as any}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)} • {order.itemCount} items
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">{formatPrice(order.totalAmount)}</p>
                </div>

                <Dialog open={selectedOrder?.id === order.id} onOpenChange={(open) => {
                  if (!open) setSelectedOrder(null);
                }}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}>
                      Manage
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Order Status</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Order: {order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">Current Status: {order.status}</p>
                      </div>

                      <div className="space-y-2">
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => handleStatusUpdate(order.id, 'Processing')}
                        >
                          Mark as Processing
                        </Button>
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => handleStatusUpdate(order.id, 'Shipped')}
                        >
                          Mark as Shipped
                        </Button>
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => handleStatusUpdate(order.id, 'Delivered')}
                        >
                          Mark as Delivered
                        </Button>
                        <Button
                          className="w-full"
                          variant="destructive"
                          onClick={() => handleStatusUpdate(order.id, 'Cancelled')}
                        >
                          Cancel Order
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
