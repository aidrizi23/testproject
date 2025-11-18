import { Card, CardContent } from '@/components/ui/card';

interface ProductCardSkeletonProps {
  compact?: boolean;
}

export default function ProductCardSkeleton({ compact = false }: ProductCardSkeletonProps) {
  if (compact) {
    return (
      <Card className="h-full overflow-hidden">
        <div className="aspect-square animate-pulse bg-muted" />
        <CardContent className="p-2 sm:p-3">
          <div className="mb-1 h-3 w-12 animate-pulse rounded bg-muted" />
          <div className="mb-1 h-4 w-full animate-pulse rounded bg-muted" />
          <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div className="mb-2 h-5 w-20 animate-pulse rounded bg-muted" />
          <div className="h-8 w-full animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square animate-pulse bg-muted" />
      <CardContent className="p-4">
        <div className="mb-2 h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="mb-2 h-6 w-full animate-pulse rounded bg-muted" />
        <div className="mb-2 h-4 w-full animate-pulse rounded bg-muted" />
        <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="mb-2 h-3 w-20 animate-pulse rounded bg-muted" />
        <div className="mb-3 h-8 w-32 animate-pulse rounded bg-muted" />
        <div className="h-10 w-full animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  );
}
