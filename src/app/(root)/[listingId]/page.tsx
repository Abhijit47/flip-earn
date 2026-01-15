import { ListingDetails } from '@/features/listing/components/listings';
import { prefetchPublicListing } from '@/features/listing/server/prefetch';
import { HydrateClient } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
type PageProps = {
  params: Promise<{ listingId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ListingPage({ params }: PageProps) {
  const listingId = (await params).listingId;
  prefetchPublicListing(listingId);

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={<div>Something went wrong loading the listing.</div>}>
        <main className={'container max-w-[85em] mx-auto px-4'}>
          <Suspense fallback={<div>Loading listing details...</div>}>
            <ListingDetails id={listingId} />
          </Suspense>
        </main>
      </ErrorBoundary>
    </HydrateClient>
  );
}
