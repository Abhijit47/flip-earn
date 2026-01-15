import { buttonVariants } from '@/components/ui/button';
import { Card, CardAction, CardHeader, CardTitle } from '@/components/ui/card';
import MarketPlaceListingCards from '@/features/listing/components/listings';
import { prefetchPublicListings } from '@/features/listing/server/prefetch';
import { HydrateClient } from '@/trpc/server';
import { ChevronLeftCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Filters from './_components/filters';
import { FiltersDialog } from './_components/filters-dialog';

export default function MarketPlacePage() {
  prefetchPublicListings();

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={<div>Something went wrong loading the marketplace.</div>}>
        <main className={'container max-w-[85em] mx-auto px-4'}>
          <Card className='rounded-none border-none shadow-none bg-transparent'>
            <CardHeader className={'px-0'}>
              <CardTitle className={'inline-flex items-center gap-2'}>
                <Link
                  href={'/'}
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'icon-sm',
                  })}>
                  <ChevronLeftCircle className='h-5 w-5' />
                </Link>
                <h2>Marketplaces</h2>
              </CardTitle>

              <CardAction className={'lg:hidden block justify-end'}>
                <FiltersDialog />
              </CardAction>
            </CardHeader>

            <div className={'grid grid-cols-12 gap-6'}>
              <Filters />

              <Suspense fallback={<div>Loading Listings...</div>}>
                <MarketPlaceListingCards placement='marketplace' />
              </Suspense>
            </div>
          </Card>
        </main>
      </ErrorBoundary>
    </HydrateClient>
  );
}
