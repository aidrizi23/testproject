'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductListItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useAuthStore, useCartStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: ProductListItem;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { isAuthenticated } = useAuthStore();
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const router = useRouter();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      await addToCart(product.id, 1);
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart',
        variant: 'destructive',
      });
    }
  };

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  if (compact) {
    return (
      <Link href={`/products/${product.id}`}>
        <Card className="group h-full overflow-hidden transition-all hover:shadow-md">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.mainImageUrl || '/placeholder.png'}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 150px, 200px"
            />
            {discount > 0 && (
              <Badge className="absolute right-1 top-1 text-xs" variant="destructive">
                -{discount}%
              </Badge>
            )}
          </div>

          <CardContent className="p-2 sm:p-3">
            <div className="mb-1 flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.averageRating.toFixed(1)}</span>
            </div>

            <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-tight">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold sm:text-base">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <Button
              className="mt-2 h-8 w-full text-xs"
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
              size="sm"
            >
              <ShoppingCart className="mr-1 h-3 w-3" />
              {product.stockQuantity === 0 ? 'Out' : 'Add'}
            </Button>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.mainImageUrl || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {discount > 0 && (
            <Badge className="absolute right-2 top-2" variant="destructive">
              -{discount}%
            </Badge>
          )}
          {product.stockQuantity < 10 && product.stockQuantity > 0 && (
            <Badge className="absolute left-2 top-2" variant="secondary">
              Only {product.stockQuantity} left
            </Badge>
          )}
          {product.stockQuantity === 0 && (
            <Badge className="absolute left-2 top-2" variant="destructive">
              Out of Stock
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{product.averageRating.toFixed(1)}</span>
            <span>({product.reviewCount})</span>
          </div>

          <h3 className="mb-2 line-clamp-2 font-semibold">{product.name}</h3>

          <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>

          <div className="mb-2 text-xs text-muted-foreground">
            {product.categoryName}
          </div>

          <div className="mb-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
