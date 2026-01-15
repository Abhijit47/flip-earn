'use client';

import { Button } from '@/components/ui/button';
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
import { SelectListing } from '@/drizzle/schema';
import { IconBrandYoutube } from '@tabler/icons-react';
import {
  EyeClosedIcon,
  Lock,
  PenBoxIcon,
  StarIcon,
  Trash2Icon,
  TrendingUp,
  UsersIcon,
} from 'lucide-react';
import { useGetMyListings } from '../hooks/use-listings';

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
