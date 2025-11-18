'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, ShoppingBag, Tag, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/lib/store';
import api from '@/lib/api';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCategories: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      router.push('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const [products, orders, categories] = await Promise.all([
          api.get('/products'),
          api.get('/orders'),
          api.get('/categories'),
        ]);

        setStats({
          totalProducts: products.data.length,
          totalOrders: orders.data.length,
          totalCategories: categories.data.length,
          pendingOrders: orders.data.filter((o: any) => o.status === 'Pending').length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [isAuthenticated, user, router]);

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/products">
          <Card className="cursor-pointer transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">Manage products</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/orders">
          <Card className="cursor-pointer transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                {stats.pendingOrders} pending
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/categories">
          <Card className="cursor-pointer transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCategories}</div>
              <p className="text-xs text-muted-foreground">Manage categories</p>
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href="/admin/products/new">
                <button className="w-full text-left text-sm hover:underline">
                  Add New Product
                </button>
              </Link>
              <Link href="/admin/categories/new">
                <button className="w-full text-left text-sm hover:underline">
                  Add New Category
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
