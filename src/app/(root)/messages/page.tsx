import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function MessagesPage() {
  return (
    <main className={'container max-w-[85em] mx-auto px-4'}>
      <Card className='flex flex-1 flex-col rounded-none border-none shadow-none bg-transparent'>
        <CardHeader>
          <CardTitle>
            <h2>Messages</h2>
          </CardTitle>
          <CardDescription>
            <p>
              View and manage your messages and conversations on our platform.
            </p>
          </CardDescription>
          <CardAction className={'self-center'}>
            <Link
              href={'/'}
              className={buttonVariants({
                variant: 'default',
                size: 'sm',
              })}>
              Back to Home
            </Link>
          </CardAction>
        </CardHeader>
      </Card>
    </main>
  );
}
