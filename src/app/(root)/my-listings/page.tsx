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
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import {
  IconBrandInstagram,
  IconBrandPinterest,
  IconBrandTiktok,
  IconBrandTwitch,
  IconBrandYoutube,
  IconMoneybag,
  IconMoneybagMove,
  IconMoneybagPlus,
} from '@tabler/icons-react';
import {
  EyeClosedIcon,
  Lock,
  PenBoxIcon,
  StarIcon,
  Trash2Icon,
  TrendingUp,
  UsersIcon,
} from 'lucide-react';
import Link from 'next/link';
import { SectionCards } from './_components/section-cards';

const dummyList = [
  {
    id: crypto.randomUUID(),
    title: 'Tech YouTube Channel with 120k Subscribers',
    username: '@TechSavvyAlex',
    followers: '120.0K',
    engagement: '4%',
    price: '$7,500',
    status: 'active',
    isMonetized: true,
    thumbnail: IconBrandYoutube,
  },
  {
    id: crypto.randomUUID(),
    title: 'Travel Instagram Page with 50k Followers',
    username: '@wanderlust.sophia',
    followers: '50.0K',
    engagement: '3%',
    price: '$2,800',
    status: 'active',
    isMonetized: false,
    thumbnail: IconBrandInstagram,
  },
  {
    id: crypto.randomUUID(),
    title: 'Fashion Pinterest Board with 90k Monthly Views',
    username: '@stylebyalex',
    followers: '15.0K',
    engagement: '4%',
    price: '$950',
    status: 'active',
    isMonetized: true,
    thumbnail: IconBrandPinterest,
  },
  {
    id: crypto.randomUUID(),
    title: 'Fitness TikTok with 300k Followers',
    username: '@fitwithdavid',
    followers: '300.0K',
    engagement: '5%',
    price: '$12,500',
    status: 'pending',
    isMonetized: true,
    thumbnail: IconBrandTiktok,
  },
  {
    id: crypto.randomUUID(),
    title: 'Music Twitch Channel with 20k Followers',
    username: '@SophiaBeats',
    followers: '20.0K',
    engagement: '6%',
    price: '$3,800',
    status: 'sold',
    isMonetized: true,
    thumbnail: IconBrandTwitch,
  },
];

export default function MyListingsPage() {
  return (
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

            <Card className={'shadow-none border-0 bg-transparent'}>
              <CardContent>
                <div className={'grid grid-cols-1 md:grid-cols-3 gap-6'}>
                  {dummyList.map((list) => (
                    <Card key={list.id} className={'gap-4 py-4'}>
                      <CardAction
                        className={
                          'flex items-center justify-between w-full px-6'
                        }>
                        <list.thumbnail className='size-6 inline-block' />
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
                        <CardTitle>{list.title}</CardTitle>
                        <CardDescription>{list.username}</CardDescription>
                      </CardHeader>

                      <CardContent>
                        <CardDescription>
                          <div>
                            <p className={'inline-flex items-center gap-1'}>
                              <UsersIcon className='size-4' />
                              {list.followers} followers
                            </p>
                            <p className={'inline-flex items-center gap-1'}>
                              <TrendingUp className='size-4' />{' '}
                              {list.engagement}
                              engagements
                            </p>
                          </div>

                          <div>{list.status === 'active' ? <></> : <></>}</div>
                        </CardDescription>
                        <Separator className={'mt-4'} />
                      </CardContent>
                      <CardFooter className={'w-full justify-between'}>
                        <CardAction>
                          <h3 className={'text-2xl font-bold'}>{list.price}</h3>
                        </CardAction>
                        <CardAction
                          className={'self-end justify-self-end space-x-2'}>
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Card>
    </main>
  );
}
