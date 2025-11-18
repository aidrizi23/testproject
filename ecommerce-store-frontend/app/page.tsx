'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Package, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCarousel from '@/components/ProductCarousel';
import api from '@/lib/api';
import { ProductListItem, Category } from '@/types';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<ProductListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get('/products/featured'),
          api.get('/categories'),
        ]);
        setFeaturedProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to Your Favorite Online Store
            </h1>
            <p className="mb-8 text-lg text-blue-100 sm:text-xl">
              Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast, free shipping on orders over $50.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" variant="secondary" className="gap-2">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-800">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Best Prices</h3>
              <p className="text-muted-foreground">
                Competitive prices on thousands of products
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Fast Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on orders over $50
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Secure Shopping</h3>
              <p className="text-muted-foreground">
                Your data is safe and secure with us
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          {loading ? (
            <div className="h-64 animate-pulse rounded-lg bg-muted" />
          ) : (
            <ProductCarousel products={featuredProducts} title="Featured Products" />
          )}
          <div className="mt-6 text-center">
            <Link href="/products">
              <Button variant="outline">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-muted/40 py-16">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
            <p className="mt-2 text-muted-foreground">
              Browse our wide selection of categories
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <h3 className="font-semibold group-hover:text-primary">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {category.productCount} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
