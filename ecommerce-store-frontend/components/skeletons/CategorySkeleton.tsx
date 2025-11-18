import { Card, CardContent } from '@/components/ui/card';

export default function CategorySkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="flex flex-col items-center p-8 text-center">
        <div className="mb-4 h-24 w-24 animate-pulse rounded-full bg-muted" />
        <div className="mb-2 h-6 w-32 animate-pulse rounded bg-muted" />
        <div className="mb-3 h-4 w-full animate-pulse rounded bg-muted" />
        <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
      </CardContent>
    </Card>
  );
}
