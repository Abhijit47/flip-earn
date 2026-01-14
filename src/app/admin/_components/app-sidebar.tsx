import { NavMain } from '@/app/admin/_components/nav-main';
import { NavUser } from '@/app/admin/_components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { IconFlipHorizontal } from '@tabler/icons-react';
import Link from 'next/link';
import { NavSecondary } from './nav-secondary';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenuButton tooltip={'Home'} asChild>
          <Link href={'/'} className={'inline-flex items-center gap-2'}>
            <IconFlipHorizontal />
            FlipNEarn
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <NavSecondary />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
