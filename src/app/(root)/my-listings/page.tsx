import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Listings } from '@/features/listing/components/listings';
import { prefetchMyListings } from '@/features/listing/server/prefetch';
import { HydrateClient } from '@/trpc/server';
import {
  IconMoneybag,
  IconMoneybagMove,
  IconMoneybagPlus,
} from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SectionCards } from './_components/section-cards';

export default function MyListingsPage() {
  prefetchMyListings();

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={<div>Something went wrong fetching your listings.</div>}>
        <main className={'container max-w-[85em] mx-auto px-4'}>
          <Card className='flex flex-1 flex-col rounded-none border-none shadow-none bg-transparent'>
            <CardHeader>
              <CardTitle>
                <h2>My Listings</h2>
              </CardTitle>
              <CardDescription>
                <p>Manage your social media account listings</p>
              </CardDescription>
              <CardAction className={'self-center'}>
                <Link
                  href={'/new-listing'}
                  className={buttonVariants({
                    variant: 'default',
                    size: 'sm',
                  })}>
                  New Listings
                </Link>
              </CardAction>
            </CardHeader>

            <div className='@container/main flex flex-1 flex-col gap-2'>
              <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
                <SectionCards />
                {/* <div className='px-4 lg:px-6'>
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} /> */}

                <Card className={'shadow-none border-0 bg-transparent'}>
                  <CardContent className={'grid grid-cols-3 gap-4'}>
                    <Item
                      variant='outline'
                      className={'col-span-full md:col-span-1'}>
                      <ItemMedia variant={'icon'}>
                        <IconMoneybag />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>Earned</ItemTitle>
                      </ItemContent>
                      <ItemActions>₹0.00</ItemActions>
                    </Item>
                    <Item
                      variant='outline'
                      className={'col-span-full md:col-span-1'}>
                      <ItemMedia variant={'icon'}>
                        <IconMoneybagMove />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>Withdrawn</ItemTitle>
                      </ItemContent>
                      <ItemActions>₹0.00</ItemActions>
                    </Item>
                    <Item
                      variant='outline'
                      className={'col-span-full md:col-span-1'}>
                      <ItemMedia variant={'icon'}>
                        <IconMoneybagPlus />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>Available</ItemTitle>
                      </ItemContent>
                      <ItemActions>₹0.00</ItemActions>
                    </Item>
                  </CardContent>
                </Card>

                <Suspense fallback={<div>Loading listings...</div>}>
                  <Listings />
                </Suspense>
              </div>
            </div>
          </Card>
        </main>
      </ErrorBoundary>
    </HydrateClient>
  );
}
