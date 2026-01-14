'use client';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboardNavlinks } from '@/constants';
import { Route } from 'next';
import Image from 'next/image';
import Link, { useLinkStatus } from 'next/link';
import { usePathname } from 'next/navigation';

export function NavMain() {
  const pathname = usePathname();

  const items = dashboardNavlinks.navMain;

  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2'>
        <SidebarMenu>
          <SidebarMenuItem className='flex items-center gap-2'>
            <SidebarMenuButton
              tooltip='User Profile'
              className='bg-primary/20 text-primary-foreground hover:bg-primary/50 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground size-16 p-1 rounded-full mx-auto duration-200 ease-linear'>
              <Image
                src={'/user_profile.png'}
                alt='user-avatar'
                width={50}
                height={50}
                className={'w-full h-full object-cover rounded-full'}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={pathname === item.url}>
                <Link href={item.url as Route}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span> <Hint />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function Hint() {
  const { pending } = useLinkStatus();
  return (
    <span aria-hidden className={` link-hint ${pending ? 'is-pending' : ''}`} />
  );
}
