'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore, useWishlistStore, useCartStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
    toast({
      title: 'Removed from wishlist',
      description: 'Product has been removed from your wishlist',
    });
  };

  const handleAddToCart = async (productId: number) => {
    setLoading({ ...loading, [productId]: true });
    try {
      await addToCart(productId, 1);
      toast({
        title: 'Added to cart',
        description: 'Product has been added to your cart',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to add to cart',
        variant: 'destructive',
      });
    } finally {
      setLoading({ ...loading, [productId]: false });
    }
  };

  const handleMoveToCart = async (productId: number) => {
    await handleAddToCart(productId);
    removeFromWishlist(productId);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
          <p className="mt-2 text-muted-foreground">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {wishlist.length > 0 && (
          <Button
            variant="outline"
            onClick={() => {
              if (confirm('Are you sure you want to clear your wishlist?')) {
                clearWishlist();
                toast({
                  title: 'Wishlist cleared',
                  description: 'All items have been removed from your wishlist',
                });
              }
            }}
          >
            Clear All
          </Button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Heart className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-bold">Your wishlist is empty</h2>
            <p className="mb-6 text-center text-muted-foreground">
              Save items you love by clicking the heart icon on product pages
            </p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product) => (
            <Card key={product.id} className="group overflow-hidden">
              <CardContent className="p-0">
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={product.mainImageUrl || '/placeholder.png'}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.stockQuantity === 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute right-2 top-2"
                      >
                        Out of Stock
                      </Badge>
                    )}
                    {product.isFeatured && product.stockQuantity > 0 && (
                      <Badge className="absolute right-2 top-2">Featured</Badge>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="mb-2 line-clamp-2 font-semibold transition-colors hover:text-primary">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mb-3 flex items-baseline gap-2">
                    <span className="text-lg font-bold">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      size="sm"
                      onClick={() => handleMoveToCart(product.id)}
                      disabled={product.stockQuantity === 0 || loading[product.id]}
                    >
                      <ShoppingCart className="mr-1 h-4 w-4" />
                      {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
