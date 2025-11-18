'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { Product, Review } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { useAuthStore, useCartStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: '',
    comment: '',
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const [productRes, reviewsRes] = await Promise.all([
          api.get(`/products/${params.id}`),
          api.get(`/reviews/product/${params.id}`),
        ]);
        setProduct(productRes.data);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!product) return;

    try {
      await addToCart(product.id, quantity);
      toast({
        title: 'Added to cart',
        description: `${quantity}x ${product.name} added to your cart.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart',
        variant: 'destructive',
      });
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!product) return;

    setSubmittingReview(true);
    try {
      await api.post('/reviews', {
        productId: product.id,
        rating: reviewData.rating,
        title: reviewData.title,
        comment: reviewData.comment,
      });

      toast({
        title: 'Review submitted',
        description: 'Thank you for your review!',
      });

      // Reset form and refresh reviews
      setReviewData({ rating: 5, title: '', comment: '' });
      setShowReviewForm(false);

      // Refresh reviews
      const reviewsRes = await api.get(`/reviews/product/${params.id}`);
      setReviews(reviewsRes.data);

      // Refresh product to update rating
      const productRes = await api.get(`/products/${params.id}`);
      setProduct(productRes.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to submit review',
        variant: 'destructive',
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="h-96 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-8">
        <p>Product not found</p>
      </div>
    );
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.mainImageUrl || '/placeholder.png'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          {product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square overflow-hidden rounded-lg border"
                >
                  <Image
                    src={image.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-sm text-muted-foreground">
              {product.categoryName}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.averageRating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                <Badge variant="destructive">Save {discount}%</Badge>
              </>
            )}
          </div>

          <div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <Separator />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                disabled={quantity >= product.stockQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              className="flex-1"
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability:</span>
                <span className="font-medium">
                  {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SKU:</span>
                <span className="font-medium">{product.sku}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          {isAuthenticated && !showReviewForm && (
            <Button onClick={() => setShowReviewForm(true)}>Write a Review</Button>
          )}
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Write Your Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setReviewData({ ...reviewData, rating: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= (hoverRating || reviewData.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({reviewData.rating} star{reviewData.rating !== 1 ? 's' : ''})
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-title">Review Title (Optional)</Label>
                  <Input
                    id="review-title"
                    placeholder="Summarize your review"
                    value={reviewData.title}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-comment">Your Review (Optional)</Label>
                  <Textarea
                    id="review-comment"
                    placeholder="Share your thoughts about this product"
                    value={reviewData.comment}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, comment: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={submittingReview}>
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowReviewForm(false);
                      setReviewData({ rating: 5, title: '', comment: '' });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.userName}</span>
                        {review.isVerifiedPurchase && (
                          <Badge variant="secondary">Verified Purchase</Badge>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  {review.title && (
                    <h4 className="mt-4 font-semibold">{review.title}</h4>
                  )}
                  {review.comment && (
                    <p className="mt-2 text-muted-foreground">{review.comment}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
