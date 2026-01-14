import {
  IconChartArcs3,
  IconCoinRupee,
  IconListDetails,
  IconTrendingDown,
  IconTrendingUp,
  IconUsersGroup,
} from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function SectionCards() {
  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Total Listings</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            5
          </CardTitle>
          <CardAction>
            <Button variant='ghost' size={'icon-sm'}>
              <IconChartArcs3 className={'size-8'} />
            </Button>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Trending up this month <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            ₹100,000
          </CardTitle>
          <CardAction>
            <Button variant='ghost' size={'icon-sm'}>
              <IconCoinRupee className={'size-8'} />
            </Button>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Down 20% this period <IconTrendingDown className='size-4' />
          </div>
          <div className='text-muted-foreground'>
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Active Listings</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            45,678
          </CardTitle>
          <CardAction>
            <Button variant='ghost' size={'icon-sm'}>
              <IconListDetails className={'size-8'} />
            </Button>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Strong user retention <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            50
          </CardTitle>
          <CardAction>
            <Button variant='ghost' size={'icon-sm'}>
              <IconUsersGroup className={'size-8'} />
            </Button>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Steady performance increase <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
