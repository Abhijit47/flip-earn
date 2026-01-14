import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardAction, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeftCircle } from 'lucide-react';
import Link from 'next/link';

type PageProps = {
  params: Promise<{ sellerId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ChatWithSellerPage({ params }: PageProps) {
  const sellerId = (await params).sellerId;

  return (
    <main className={'container max-w-[85em] mx-auto px-4'}>
      <Card className='rounded-none border-none shadow-none bg-transparent'>
        <CardHeader className={'px-0'}>
          <CardTitle className={'inline-flex items-center gap-2'}>
            <Link
              href={'/'}
              className={buttonVariants({
                variant: 'outline',
                size: 'icon-sm',
              })}>
              <ChevronLeftCircle className='h-5 w-5' />
            </Link>
            <h2>Chat with Seller {sellerId}</h2>
          </CardTitle>

          <CardAction>
            <Button>Action</Button>
          </CardAction>
        </CardHeader>
      </Card>
    </main>
  );
}
