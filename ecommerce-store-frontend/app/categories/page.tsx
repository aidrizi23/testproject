'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CategorySkeleton } from '@/components/skeletons';
import api from '@/lib/api';
import { Category } from '@/types';
import { Package } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Shop by Category</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our wide selection of {categories.length} categories
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <CategorySkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`}>
              <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-6 transition-colors group-hover:bg-primary/20">
                    <Package className="h-12 w-12 text-primary" />
                  </div>

                  <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                    {category.name}
                  </h3>

                  {category.description && (
                    <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  )}

                  <Badge variant="secondary" className="mt-auto">
                    {category.productCount} {category.productCount === 1 ? 'Product' : 'Products'}
                  </Badge>

                  {category.subCategories && category.subCategories.length > 0 && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {category.subCategories.length} subcategories
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {!loading && categories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Package className="mb-4 h-16 w-16 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">No Categories Available</h3>
          <p className="text-muted-foreground">Check back later for updates</p>
        </div>
      )}
    </div>
  );
}
