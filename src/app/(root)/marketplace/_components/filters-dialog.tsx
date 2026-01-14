'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FunnelIcon } from 'lucide-react';
import FilterAccordion from './filter-accordion';

export function FiltersDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} size={'sm'}>
          <FunnelIcon className='size-4' /> Filters
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle>Filter Listings</DialogTitle>
          <DialogDescription>
            Adjust your listing filters below.
          </DialogDescription>
        </DialogHeader>
        <Separator className={''} />
        <div className='grid gap-4'>
          <div>
            <Label className={'sr-only'}>Search</Label>
            <Input placeholder='Search by username, platform, niche..' />
          </div>
          <FilterAccordion />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
