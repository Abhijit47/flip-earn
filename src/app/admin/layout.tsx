import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Metadata } from 'next';
import { AppSidebar } from './_components/app-sidebar';
import SiteHeader from './_components/site-header';

export const metadata: Metadata = {
  title: 'FlipNEarn Admin',
  description: 'Admin panel for FlipNEarn application.',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className={'relative'}>
        <SiteHeader />
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col gap-2'>
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
