'use client';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SelectListing, SelectUser } from '@/drizzle/schema';
import {
  IconBrandYoutube,
  IconListDetails,
  IconMapPin2,
  IconMessages,
  IconRosetteDiscountCheck,
  IconTrendingUp,
  IconUsers,
} from '@tabler/icons-react';
import {
  ChevronRightCircleIcon,
  EyeClosedIcon,
  Lock,
  PenBoxIcon,
  StarIcon,
  Trash2Icon,
  TrendingUp,
  UsersIcon,
} from 'lucide-react';
import Link from 'next/link';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { formatDate } from '@/lib/helpers';
import {
  IconCalendarCheck,
  IconCircleCheck,
  IconEye,
  IconMap,
  IconXboxX,
} from '@tabler/icons-react';
import { BadgeCheckIcon } from 'lucide-react';
import Image from 'next/image';

import { ArrowUpRightIcon } from 'lucide-react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { cn } from '@/lib/utils';
import {
  useGetMyListings,
  usePublicListing,
  usePublicListings,
} from '../hooks/use-listings';

function EmptyListing() {
  return (
    <Empty className={'w-full border-2 border-dashed'}>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <IconListDetails />
        </EmptyMedia>
        <EmptyTitle>No Listings Found</EmptyTitle>
        <EmptyDescription>
          We didn&apos;t find any listings. Get started by creating your first
          listing.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className='flex gap-2'>
          <Button asChild>
            <Link href='/new-listing'>Create Listing</Link>
          </Button>
          <Button variant='outline'>Import Project</Button>
        </div>
      </EmptyContent>
      <Button
        variant='link'
        asChild
        className='text-muted-foreground'
        size='sm'>
        <Link href='#'>
          Learn More <ArrowUpRightIcon />
        </Link>
      </Button>
    </Empty>
  );
}

export function Listings() {
  return (
    <Card className={'shadow-none border-0 bg-transparent'}>
      <CardContent>
        <ListingsCards />
      </CardContent>
    </Card>
  );
}

function ListingsCards() {
  const { data: listings } = useGetMyListings();

  if (!listings || listings.length === 0) {
    return <EmptyListing />;
  }

  return (
    <div className={'grid grid-cols-1 md:grid-cols-3 gap-6'}>
      {listings.map((list) => (
        <ListingsCard key={list.id} listing={list} />
      ))}
    </div>
  );
}

function ListingsCard({ listing }: { listing: SelectListing }) {
  return (
    <Card className={'gap-4 py-4'}>
      <CardAction className={'flex items-center justify-between w-full px-6'}>
        <IconBrandYoutube className='size-6 inline-block' />
        <div>
          <Button variant={'ghost'} size={'icon-sm'}>
            <Lock className={'size-4'} />
          </Button>
          <Button variant={'ghost'} size={'icon-sm'}>
            <StarIcon className={'size-4 stroke-yellow-400'} />
          </Button>
        </div>
      </CardAction>

      <CardHeader>
        <CardTitle>{listing?.title}</CardTitle>
        <CardDescription>{listing?.username}</CardDescription>
      </CardHeader>

      <CardContent>
        <CardDescription>
          <div>
            <p className={'inline-flex items-center gap-1'}>
              <UsersIcon className='size-4' />
              {listing?.followers} followers
            </p>
            <p className={'inline-flex items-center gap-1'}>
              <TrendingUp className='size-4' /> {listing?.engagements}
              engagements
            </p>
          </div>

          <div>{listing?.status === 'active' ? <></> : <></>}</div>
        </CardDescription>
        <Separator className={'mt-4'} />
      </CardContent>
      <CardFooter className={'w-full justify-between'}>
        <CardAction>
          <h3 className={'text-2xl font-bold'}>{listing.price}</h3>
        </CardAction>
        <CardAction className={'self-end justify-self-end space-x-2'}>
          <Button variant={'outline'} size={'icon-sm'}>
            <Trash2Icon className={'size-4'} />
          </Button>
          <Button variant={'outline'} size={'icon-sm'}>
            <PenBoxIcon className={'size-4'} />
          </Button>
          <Button variant={'outline'} size={'icon-sm'}>
            <EyeClosedIcon className={'size-4'} />
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}

// Marketplace Listing Cards
export default function MarketPlaceListingCards({
  placement,
}: {
  placement: 'marketplace' | 'homepage';
}) {
  const { data: listings } = usePublicListings();

  if (!listings || listings.length === 0) {
    return (
      <div
        className={cn(
          placement === 'marketplace' &&
            'col-span-full w-full content-center lg:col-span-9 grid grid-cols-1',
          placement === 'homepage' && 'w-full flex flex-col gap-4'
        )}>
        <EmptyListing />
      </div>
    );
  }

  return (
    <div
      className={cn(
        placement === 'marketplace' &&
          'col-span-full lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4',
        placement === 'homepage' && 'w-full flex flex-col gap-4'
      )}>
      {listings.map((list) => (
        <ListingCardV2 key={list.id} list={list} />
      ))}
    </div>
  );
}
export function ListingCardV2({ list }: { list: SelectListing }) {
  return (
    <Card key={list.id} className={'pt-0'}>
      <div
        className={
          'bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-xl text-white text-center text-sm font-semibold'
        }>
        Featured
      </div>
      <CardHeader>
        <CardAction
          className={'col-start-1 row-span-1 self-start justify-self-start'}>
          {/* Need to add dynamically */}
          <IconBrandYoutube />
        </CardAction>
        <CardTitle>
          <h2>{list.title}</h2>
        </CardTitle>
        <CardDescription>
          {list.username} - {list.platform}
        </CardDescription>

        <CardAction>
          <IconRosetteDiscountCheck />
        </CardAction>
      </CardHeader>

      <CardContent className={'space-y-4'}>
        <CardDescription className={'flex items-center justify-between'}>
          <p className={'inline-flex items-center gap-2'}>
            <IconUsers className={'size-4'} /> {list.followers} Followers
          </p>
          <p className={'inline-flex items-center gap-2'}>
            <IconTrendingUp className={'size-4'} /> {list.engagements}{' '}
            Engagements
          </p>
        </CardDescription>
        <CardDescription className={'flex items-center gap-2'}>
          <Badge className={'capitalize'} variant={'destructive'}>
            {list.niche}
          </Badge>
          <p className={'inline-flex items-center gap-2'}>
            <IconMapPin2 className={'size-4'} />
            {list.country}
          </p>
        </CardDescription>
        <CardDescription className={'line-clamp-2'}>
          <p>{list.description}</p>
        </CardDescription>
      </CardContent>
      <CardFooter className={'w-full flex items-center justify-between'}>
        <CardAction className={'self-center'}>
          <p className={'text-2xl font-bold'}>₹{list.price}</p>
        </CardAction>
        <Link
          href={`/${list.id}`}
          className={buttonVariants({
            size: 'sm',
          })}>
          More Details
          <ChevronRightCircleIcon className='h-5 w-5' />
        </Link>
      </CardFooter>
    </Card>
  );
}

// Lisitng details
export function ListingDetails({ id }: { id: string }) {
  const { data: listing } = usePublicListing(id);

  return (
    <Card className='rounded-none border-none shadow-none bg-transparent'>
      <div className={'grid grid-cols-12 gap-6'}>
        <ListingDeatils listing={listing} />
        <ListingSellerInfo seller={listing.owner} />
      </div>
    </Card>
  );
}

export function ListingDeatils({ listing }: { listing: SelectListing }) {
  return (
    <div className={'col-span-full xl:col-span-9 space-y-6'}>
      <Item variant='outline'>
        <ItemMedia variant={'icon'}>
          <BadgeCheckIcon className='size-5' />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            <h2 className={'text-xl font-semibold'}>{listing.title}</h2>
          </ItemTitle>
          <ItemDescription>
            {listing.username} &sdot;
            {listing.platform}
          </ItemDescription>
          <div className={'space-x-4'}>
            <Badge>
              {listing.verified ? <IconCircleCheck /> : <IconXboxX />}

              {listing.verified ? 'Verified' : 'Unverified'}
            </Badge>
            <Badge>
              {listing.monetized ? <IconCircleCheck /> : <IconXboxX />}

              {listing.monetized ? 'Monetized' : 'Not Monetized'}
            </Badge>
          </div>
        </ItemContent>
        <ItemActions className={'flex-col justify-end'}>
          <p className={'text-2xl font-bold'}>₹{listing.price}</p>
          <span className={'self-end'}>USD</span>
        </ItemActions>
      </Item>
      <Card>
        <CardHeader>
          <CardTitle>Screenshots & Proof</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel className='w-full'>
            <CarouselContent>
              {listing.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className='aspect-20/9'>
                    <Image
                      src={image}
                      alt={`Screenshot ${index + 1}`}
                      width={800}
                      height={450}
                      className='rounded-md object-cover w-full h-full'
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={'-left-6'} />
            <CarouselNext className={'-right-6'} />
          </Carousel>
        </CardContent>
      </Card>

      <Card className={'gap-4 py-4 px-0'}>
        <CardHeader className={'px-4'}>
          <CardTitle>Account Metrics</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <div
            className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}>
            <div className={'grid gap-1 justify-items-center'}>
              <div className={'size-10 p-1 rounded-full bg-accent'}>
                <IconUsers className={'size-full'} />
              </div>
              <h4 className={'text-xl font-semibold'}>{listing.followers}</h4>
              <p className={'text-sm'}>Followers</p>
            </div>

            <div className={'grid gap-1 justify-items-center'}>
              <div className={'size-10 p-1 rounded-full bg-accent'}>
                <IconTrendingUp className={'size-full'} />
              </div>
              <h4 className={'text-xl font-semibold'}>
                {listing.engagements}%
              </h4>
              <p className={'text-sm'}>Engagement</p>
            </div>

            <div className={'grid gap-1 justify-items-center'}>
              <div className={'size-10 p-1 rounded-full bg-accent'}>
                <IconEye className={'size-full'} />
              </div>
              <h4 className={'text-xl font-semibold'}>
                {listing.monthlyViews}
              </h4>
              <p className={'text-sm'}>Monthly Views</p>
            </div>

            <div className={'grid gap-1 justify-items-center'}>
              <div className={'size-10 p-1 rounded-full bg-accent'}>
                <IconCalendarCheck className={'size-full'} />
              </div>
              <h4 className={'text-xl font-semibold'}>
                {formatDate(listing.createdAt)}
              </h4>
              <p className={'text-sm'}>Listed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={'gap-4 py-4 px-0'}>
        <CardHeader className={'px-4'}>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <CardDescription>
            <p>{listing.description}</p>
          </CardDescription>
        </CardContent>
      </Card>

      <Card className={'gap-4 py-4 px-0'}>
        <CardHeader className={'px-4'}>
          <CardTitle>Additional Details</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
            <CardDescription>
              <p className={'text-muted-foreground'}>Niche</p>
              <p className={'font-semibold text-sm'}>{listing.niche}</p>
            </CardDescription>
            <CardDescription>
              <p className={'text-muted-foreground'}>Audience Age</p>
              <p className={'font-semibold text-sm'}>{listing.ageRange}</p>
            </CardDescription>
            <CardDescription>
              <p className={'text-muted-foreground'}>Monetization</p>
              <p className={'font-semibold text-sm'}>
                {listing.monetized ? 'Enabled' : 'Disabled'}
              </p>
            </CardDescription>
            <CardDescription>
              <p className={'text-muted-foreground'}>Primary Country</p>
              <p
                className={
                  'font-semibold text-sm inline-flex items-center gap-1'
                }>
                <IconMap className={'size-4'} />
                {listing.country}
              </p>
            </CardDescription>
            <CardDescription>
              <p className={'text-muted-foreground'}>Platform Verified</p>
              <p className={'font-semibold text-sm'}>
                {listing.platformAssured ? 'Yes' : 'No'}
              </p>
            </CardDescription>
            <CardDescription>
              <p className={'text-muted-foreground'}>Status</p>
              <p className={'font-semibold text-sm capitalize'}>
                {listing.status}
              </p>
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ListingSellerInfo({
  seller,
}: {
  seller: Pick<SelectUser, 'id' | 'name' | 'email' | 'image' | 'createdAt'>;
}) {
  return (
    <div className={'col-span-full xl:col-span-3'}>
      <Card className={'gap-2'}>
        <CardHeader className={''}>
          <div className={'flex items-center gap-4'}>
            <CardAction
              className={'col-start-1 justify-self-center self-center '}>
              <Image
                src={seller.image!}
                alt={seller.name}
                width={50}
                height={50}
                className='rounded-full object-cover'
              />
            </CardAction>
            <div>
              <CardTitle className={'mr-auto'}>
                <h2 className={'text-lg font-medium'}>{seller.name}</h2>
              </CardTitle>
              <CardDescription>
                <p>{seller.email}</p>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className={''}>
          <CardDescription className={'flex items-center'}>
            <IconCalendarCheck className={'size-4'} />
            Joined on {formatDate(seller.createdAt)}
          </CardDescription>
        </CardContent>
        <CardFooter className={'w-full'}>
          <Link
            href={`/chat/${seller.id}`}
            className={buttonVariants({
              className: 'w-full justify-center',
            })}>
            <IconMessages className={'size-4'} /> Chat
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
