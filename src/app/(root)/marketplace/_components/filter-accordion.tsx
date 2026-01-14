'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { niches, platforms } from '@/lib/validators/listing-schemas';
import { useState } from 'react';

export default function FilterAccordion() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 8000]);
  const isMobile = useIsMobile();

  const accordionContent = (
    <>
      <AccordionItem value='platform'>
        <AccordionTrigger>Platform</AccordionTrigger>
        <AccordionContent className='flex flex-col gap-4 text-balance'>
          <ul
            className={cn(
              'space-y-1',
              isMobile ? 'grid grid-cols-2 gap-2' : 'grid'
            )}>
            {platforms.map((platform) => (
              <li key={platform} className='capitalize'>
                <Label id={platform} className='inline-flex items-center gap-2'>
                  <Checkbox id={platform} defaultChecked />
                  {platform}
                </Label>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='price-range'>
        <AccordionTrigger>Price Range</AccordionTrigger>
        <AccordionContent className='py-4 space-y-2'>
          <Slider
            value={priceRange}
            max={100000}
            step={100}
            onValueChange={(value: [number, number]) => setPriceRange(value)}
          />
          <div className={'flex items-center justify-between'}>
            <span className='font-medium'>₹{priceRange[0]}</span>
            <span className='font-medium'>₹{priceRange[1]}</span>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='minimum-followers'>
        <AccordionTrigger>Minimum Followers</AccordionTrigger>
        <AccordionContent className='flex flex-col gap-4 text-balance'>
          <div>
            <Label htmlFor='followers' className={'sr-only'}>
              Minimum Followers
            </Label>
            <Input id='followers' placeholder='Any amount' />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='niche'>
        <AccordionTrigger>Niche</AccordionTrigger>
        <AccordionContent className='flex flex-col gap-4 text-balance'>
          <div>
            <Label htmlFor='niche' className={'sr-only'}>
              Niche
            </Label>
            <Select>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a niche' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Niche</SelectLabel>
                  {niches.map((niche) => (
                    <SelectItem key={niche} value={niche}>
                      {niche}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='account-status'>
        <AccordionTrigger>Account Status</AccordionTrigger>
        <AccordionContent className='flex flex-col gap-4 text-balance'>
          <div>
            <Label htmlFor='verified'>
              <Checkbox id='verified' defaultChecked />
              Verified accounts only
            </Label>
          </div>
          <div>
            <Label htmlFor='monetized'>
              <Checkbox id='monetized' defaultChecked />
              Monetized accounts only
            </Label>
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );

  if (!isMobile) {
    return (
      <Accordion
        type='multiple'
        className='w-full'
        defaultValue={['platform', 'price-range', 'minimum-followers']}>
        {accordionContent}
      </Accordion>
    );
  } else {
    return (
      <Accordion
        type='single'
        collapsible
        className='w-full'
        defaultValue='platform'>
        {accordionContent}
      </Accordion>
    );
  }
}
