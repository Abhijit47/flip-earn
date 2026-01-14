import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
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
  IconBrandInstagram,
  IconBrandPinterest,
  IconBrandTiktok,
  IconBrandTwitch,
  IconBrandYoutube,
  IconMapPin2,
  IconRosetteDiscountCheck,
  IconTrendingUp,
  IconUsers,
} from '@tabler/icons-react';
import { ChevronRightCircle } from 'lucide-react';
import Link from 'next/link';

export default function ListingCards() {
  return (
    <div
      className={
        'col-span-full lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4'
      }>
      {data.map((list) => (
        <Card key={list.id} className={'pt-0'}>
          <div
            className={
              'bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-xl text-white text-center text-sm font-semibold'
            }>
            Featured
          </div>
          <CardHeader>
            <CardAction
              className={
                'col-start-1 row-span-1 self-start justify-self-start'
              }>
              <list.thumbnail />
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
                <IconTrendingUp className={'size-4'} /> {list.engagement}{' '}
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
            <CardDescription>
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
              <ChevronRightCircle className='h-5 w-5' />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export const data = [
  {
    id: crypto.randomUUID(),
    title: 'Tech YouTube Channel with 120k Subscribers',
    username: '@TechSavvyAlex',
    platform: 'Tiktok',
    followers: '120.0K',
    engagement: '4%',
    price: '7,500',
    status: 'active',
    niche: 'Technology',
    country: 'US',
    monthlyViews: '500K',
    ageRange: '18-34',
    thumbnail: IconBrandYoutube,
    description:
      'Viral fitness content and consistent posting schedule. Brand deals available and audience in the US & UK.',
    isVerified: true,
    isMonetized: true,
    isPlatformVerified: true,
    isFeatured: true,
    screenshots: [
      '/image_1.jpg',
      '/image_2.jpg',
      '/image_3.jpg',
      '/image_4.jpg',
    ],
    createdAt: '2024-05-10',
  },
  {
    id: crypto.randomUUID(),
    title: 'Travel Instagram Page with 50k Followers',
    username: '@wanderlust.sophia',
    platform: 'Youtube',
    followers: '50.0K',
    engagement: '3%',
    price: '2,800',
    status: 'active',
    niche: 'Travel',
    country: 'UK',
    monthlyViews: '150K',
    ageRange: '25-44',
    thumbnail: IconBrandInstagram,
    description:
      'Established tech channel with high engagement and steady ad revenue. Includes full transfer and assets.',
    isVerified: true,
    isMonetized: true,
    isPlatformVerified: true,
    isFeatured: true,
    screenshots: [
      '/image_1.jpg',
      '/image_2.jpg',
      '/image_3.jpg',
      '/image_4.jpg',
    ],
    createdAt: '2024-06-01',
  },
  {
    id: crypto.randomUUID(),
    title: 'Fashion Pinterest Board with 90k Monthly Views',
    username: '@stylebyalex',
    platform: 'Instagram',
    followers: '15.0K',
    engagement: '4%',
    price: '950',
    status: 'active',
    niche: 'Fashion',
    country: 'CA',
    monthlyViews: '90K',
    ageRange: '18-34',
    thumbnail: IconBrandPinterest,
    description:
      'Beautifully curated travel page with loyal audience and collaboration history with travel brands.',
    isVerified: true,
    isMonetized: true,
    isPlatformVerified: true,
    isFeatured: true,
    screenshots: [
      '/image_1.jpg',
      '/image_2.jpg',
      '/image_3.jpg',
      '/image_4.jpg',
    ],
    createdAt: '2024-05-20',
  },
  {
    id: crypto.randomUUID(),
    title: 'Fitness TikTok with 300k Followers',
    username: '@fitwithdavid',
    platform: 'Pinterest',
    followers: '300.0K',
    engagement: '5%',
    price: '12,500',
    status: 'pending',
    niche: 'Fitness',
    country: 'AU',
    monthlyViews: '200K',
    ageRange: '18-44',
    thumbnail: IconBrandTiktok,
    description:
      'Highly active fashion and design inspiration board with organic traffic and steady audience growth.',
    isVerified: true,
    isMonetized: true,
    isPlatformVerified: true,
    screenshots: [
      '/image_1.jpg',
      '/image_2.jpg',
      '/image_3.jpg',
      '/image_4.jpg',
    ],
    createdAt: '2024-04-15',
  },
  {
    id: crypto.randomUUID(),
    title: 'Music Twitch Channel with 20k Followers',
    username: '@SophiaBeats',
    platform: 'Twitch',
    followers: '20.0K',
    engagement: '6%',
    price: '3,800',
    status: 'sold',
    niche: 'Music',
    country: 'US',
    monthlyViews: '75K',
    ageRange: '18-34',
    thumbnail: IconBrandTwitch,
    description:
      'Active music streaming channel with loyal audience and consistent income from subscribers and donations.',
    isVerified: true,
    isMonetized: true,
    isPlatformVerified: true,
    isFeatured: true,
    screenshots: [
      '/image_1.jpg',
      '/image_2.jpg',
      '/image_3.jpg',
      '/image_4.jpg',
    ],
    createdAt: '2024-03-30',
  },
];
