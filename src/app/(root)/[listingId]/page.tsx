import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { data } from '../marketplace/_components/listing-cards';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import {
  IconCalendarCheck,
  IconCircleCheck,
  IconEye,
  IconMap,
  IconMessages,
  IconTrendingUp,
  IconUsers,
  IconXboxX,
} from '@tabler/icons-react';
import { BadgeCheckIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
type PageProps = {
  params: Promise<{ listingId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const singleData = data[0];

const sellerDetails = {
  id: crypto.randomUUID(),
  name: 'Alex Johnson',
  email: 'creator1@example.com',
  avatar: '/user_profile.png',
  joinedAt: '24th March, 2021',
};

export default async function ListingPage({ params }: PageProps) {
  const listingId = (await params).listingId;
  return (
    <main className={'container max-w-[85em] mx-auto px-4'}>
      <Card className='rounded-none border-none shadow-none bg-transparent'>
        {listingId}
        <div className={'grid grid-cols-12 gap-6'}>
          <div className={'col-span-full xl:col-span-9 space-y-6'}>
            <Item variant='outline'>
              <ItemMedia variant={'icon'}>
                <BadgeCheckIcon className='size-5' />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  <h2 className={'text-xl font-semibold'}>
                    {singleData.title}
                  </h2>
                </ItemTitle>
                <ItemDescription>
                  {singleData.username} &sdot;
                  {singleData.platform}
                </ItemDescription>
                <div className={'space-x-4'}>
                  <Badge>
                    {singleData.isVerified ? (
                      <IconCircleCheck />
                    ) : (
                      <IconXboxX />
                    )}

                    {singleData.isVerified ? 'Verified' : 'Unverified'}
                  </Badge>
                  <Badge>
                    {singleData.isMonetized ? (
                      <IconCircleCheck />
                    ) : (
                      <IconXboxX />
                    )}

                    {singleData.isMonetized ? 'Monetized' : 'Not Monetized'}
                  </Badge>
                </div>
              </ItemContent>
              <ItemActions className={'flex-col justify-end'}>
                <p className={'text-2xl font-bold'}>₹{singleData.price}</p>
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
                    {singleData.screenshots.map((image, index) => (
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
                  className={
                    'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
                  }>
                  <div className={'grid gap-1 justify-items-center'}>
                    <div className={'size-10 p-1 rounded-full bg-accent'}>
                      <IconUsers className={'size-full'} />
                    </div>
                    <h4 className={'text-xl font-semibold'}>
                      {singleData.followers}
                    </h4>
                    <p className={'text-sm'}>Followers</p>
                  </div>

                  <div className={'grid gap-1 justify-items-center'}>
                    <div className={'size-10 p-1 rounded-full bg-accent'}>
                      <IconTrendingUp className={'size-full'} />
                    </div>
                    <h4 className={'text-xl font-semibold'}>
                      {singleData.engagement}%
                    </h4>
                    <p className={'text-sm'}>Engagement</p>
                  </div>

                  <div className={'grid gap-1 justify-items-center'}>
                    <div className={'size-10 p-1 rounded-full bg-accent'}>
                      <IconEye className={'size-full'} />
                    </div>
                    <h4 className={'text-xl font-semibold'}>
                      {singleData.monthlyViews}
                    </h4>
                    <p className={'text-sm'}>Monthly Views</p>
                  </div>

                  <div className={'grid gap-1 justify-items-center'}>
                    <div className={'size-10 p-1 rounded-full bg-accent'}>
                      <IconCalendarCheck className={'size-full'} />
                    </div>
                    <h4 className={'text-xl font-semibold'}>
                      {singleData.createdAt}
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
                  <p>{singleData.description}</p>
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
                    <p className={'font-semibold text-sm'}>
                      {singleData.niche}
                    </p>
                  </CardDescription>
                  <CardDescription>
                    <p className={'text-muted-foreground'}>Audience Age</p>
                    <p className={'font-semibold text-sm'}>
                      {singleData.ageRange}
                    </p>
                  </CardDescription>
                  <CardDescription>
                    <p className={'text-muted-foreground'}>Monetization</p>
                    <p className={'font-semibold text-sm'}>
                      {singleData.isMonetized ? 'Enabled' : 'Disabled'}
                    </p>
                  </CardDescription>
                  <CardDescription>
                    <p className={'text-muted-foreground'}>Primary Country</p>
                    <p
                      className={
                        'font-semibold text-sm inline-flex items-center gap-1'
                      }>
                      <IconMap className={'size-4'} />
                      {singleData.country}
                    </p>
                  </CardDescription>
                  <CardDescription>
                    <p className={'text-muted-foreground'}>Platform Verified</p>
                    <p className={'font-semibold text-sm'}>
                      {singleData.isPlatformVerified ? 'Yes' : 'No'}
                    </p>
                  </CardDescription>
                  <CardDescription>
                    <p className={'text-muted-foreground'}>Status</p>
                    <p className={'font-semibold text-sm capitalize'}>
                      {singleData.status}
                    </p>
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className={'col-span-full xl:col-span-3'}>
            <Card className={'gap-2'}>
              <CardHeader className={''}>
                <div className={'flex items-center gap-4'}>
                  <CardAction
                    className={'col-start-1 justify-self-center self-center '}>
                    <Image
                      src={sellerDetails.avatar}
                      alt={sellerDetails.name}
                      width={50}
                      height={50}
                      className='rounded-full object-cover'
                    />
                  </CardAction>
                  <div>
                    <CardTitle className={'mr-auto'}>
                      <h2 className={'text-lg font-medium'}>
                        {sellerDetails.name}
                      </h2>
                    </CardTitle>
                    <CardDescription>
                      <p>{sellerDetails.email}</p>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className={''}>
                <CardDescription className={'flex items-center'}>
                  <IconCalendarCheck className={'size-4'} />
                  Joined on {sellerDetails.joinedAt}
                </CardDescription>
              </CardContent>
              <CardFooter className={'w-full'}>
                <Link
                  href={`/chat/${sellerDetails.id}`}
                  className={buttonVariants({
                    className: 'w-full justify-center',
                  })}>
                  <IconMessages className={'size-4'} /> Chat
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Card>
    </main>
  );
}
