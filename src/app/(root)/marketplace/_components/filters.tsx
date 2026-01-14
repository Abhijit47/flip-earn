'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FunnelIcon, XCircleIcon } from 'lucide-react';
import FilterAccordion from './filter-accordion';

export default function Filters() {
  return (
    <Card className={'hidden lg:block lg:col-span-3 gap-2 px-2'}>
      <CardHeader>
        <CardTitle className={'h-full'}>
          <p className={'inline-flex items-center gap-2'}>
            <FunnelIcon className='size-4' />
            Filters
          </p>
        </CardTitle>
        <CardAction>
          <Button variant={'ghost'} size={'icon-sm'}>
            <XCircleIcon className={'size-4'} />
          </Button>
        </CardAction>
      </CardHeader>
      <Separator className={'mb-4'} />
      <CardContent className={'px-2'}>
        <div>
          <Label className={'sr-only'}>Search</Label>
          <Input placeholder='Search by username, platform, niche..' />
        </div>
        <FilterAccordion />
      </CardContent>
    </Card>
  );
}
