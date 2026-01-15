'use client';

import { Book, Menu, Sunset, Trees, Zap } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  type Icon,
  IconBuildingStore,
  IconHome2,
  IconListSearch,
  IconMessageCircle,
} from '@tabler/icons-react';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatedThemeToggler } from '../extended/animated-theme-toggler';

const data = {
  logo: {
    url: 'https://www.shadcnblocks.com',
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg',
    alt: 'logo',
    title: 'Shadcnblocks.com',
  },
  menu: [
    { title: 'Home', url: '#' },
    {
      title: 'Products',
      url: '#',
      items: [
        {
          title: 'Blog',
          description: 'The latest industry news, updates, and info',
          icon: <Book className='size-5 shrink-0' />,
          url: '#',
        },
        {
          title: 'Company',
          description: 'Our mission is to innovate and empower the world',
          icon: <Trees className='size-5 shrink-0' />,
          url: '#',
        },
        {
          title: 'Careers',
          description: 'Browse job listing and discover our workspace',
          icon: <Sunset className='size-5 shrink-0' />,
          url: '#',
        },
        {
          title: 'Support',
          description:
            'Get in touch with our support team or visit our community forums',
          icon: <Zap className='size-5 shrink-0' />,
          url: '#',
        },
      ],
    },
    {
      title: 'Resources',
      url: '#',
      items: [
        {
          title: 'Help Center',
          description: 'Get all the answers you need right here',
          icon: <Zap className='size-5 shrink-0' />,
          url: '#',
        },
        {
          title: 'Contact Us',
          description: 'We are here to help you with any questions you have',
          icon: <Sunset className='size-5 shrink-0' />,
          url: '#',
        },
        {
          title: 'Status',
          description: 'Check the current status of our services and APIs',
          icon: <Trees className='size-5 shrink-0' />,
          url: '#',
        },
        {
          title: 'Terms of Service',
          description: 'Our terms and conditions for using our services',
          icon: <Book className='size-5 shrink-0' />,
          url: '#',
        },
      ],
    },
    {
      title: 'Pricing',
      url: '#',
    },
    {
      title: 'Blog',
      url: '#',
    },
  ],
  auth: {
    login: { title: 'Login', url: '#' },
    signup: { title: 'Sign up', url: '#' },
  },
};

const navlinks: {
  id: string;
  title: string;
  url: Route;
  icon: Icon;
}[] = [
  {
    id: crypto.randomUUID(),
    title: 'Home',
    url: '/',
    icon: IconHome2,
  },
  {
    id: crypto.randomUUID(),
    title: 'Marketplace',
    url: '/marketplace',
    icon: IconBuildingStore,
  },
  {
    id: crypto.randomUUID(),
    title: 'Messages',
    url: '/messages',
    icon: IconMessageCircle,
  },
  {
    id: crypto.randomUUID(),
    title: 'My Listings',
    url: '/my-listings',
    icon: IconListSearch,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className={cn('py-4', 'bg-background', 'shadow-sm sticky top-0 z-50')}>
      <div className='container max-w-[85em] mx-auto px-4'>
        {/* Desktop Menu */}
        <nav className='hidden items-center justify-between lg:flex'>
          <div className='flex items-center gap-6'>
            {/* Logo */}
            <Link prefetch href={'/'} className='flex items-center gap-2'>
              {/* <img
                src={data.logo.src}
                className='max-h-8 dark:invert'
                alt={data.logo.alt}
              /> */}
              <span className='text-lg font-semibold tracking-tighter'>
                flipEarn.
              </span>
            </Link>
            <div className='flex items-center'>
              <NavigationMenu>
                <NavigationMenuList>
                  {navlinks.map((item) => (
                    <NavigationMenuItem key={item.id}>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          'group text-sm font-medium rounded-none',
                          'bg-transparent hover:bg-transparent',
                          'focus:bg-transparent',
                          'data-active:bg-transparent border-b-2 border-transparent',
                          pathname === item.url && 'border-b-2 border-current'
                        )}>
                        <Link prefetch href={item.url as Route}>
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className='flex gap-2'>
            <AnimatedThemeToggler />
            <Button asChild variant='outline' size='sm'>
              <Link href={'/login'}>Login</Link>
            </Button>
            <Button asChild size='sm'>
              <Link href={'/sign-up'}>Sign Up</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className='block lg:hidden'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <Link prefetch href={'/'} className='flex items-center gap-2'>
              <img
                src={data.logo.src}
                className='max-h-8 dark:invert'
                alt={data.logo.alt}
              />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline' size='icon'>
                  <Menu className='size-4' />
                </Button>
              </SheetTrigger>
              <SheetContent className='overflow-y-auto'>
                <SheetHeader>
                  <SheetTitle>
                    <Link
                      prefetch
                      href={'/'}
                      className='flex items-center gap-2'>
                      <img
                        src={data.logo.src}
                        className='max-h-8 dark:invert'
                        alt={data.logo.alt}
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className='flex flex-col gap-6 p-4'>
                  <NavigationMenu>
                    <NavigationMenuList className={'flex-col text-start'}>
                      {navlinks.map((item) => (
                        <NavigationMenuItem key={item.id}>
                          <NavigationMenuLink
                            asChild
                            className={cn(
                              'group text-sm font-medium rounded-none',
                              'bg-transparent hover:bg-transparent',
                              'focus:bg-transparent',
                              'data-active:bg-transparent border-b-2 border-transparent',
                              pathname === item.url &&
                                'border-b-2 border-current'
                            )}>
                            <Link prefetch href={item.url as Route}>
                              {item.title}
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>

                  <div className='flex flex-col gap-3'>
                    <Button asChild variant='outline'>
                      <Link href={'/login'}>Login</Link>
                    </Button>
                    <Button asChild>
                      <Link href={'/sign-up'}>Sign Up</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
