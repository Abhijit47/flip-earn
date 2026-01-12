import { ClientGreeting } from '@/components/client-greeting';
import ThemeToggle from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';
import { caller, HydrateClient, prefetch, trpc } from '@/trpc/server';
import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default async function Home() {
  const greeting = await caller.hello({ text: 'from tRPC server' });
  prefetch(trpc.hello.queryOptions({ text: 'from tRPC server' }));

  return (
    <HydrateClient>
      {greeting.greeting}
      <h1 className={'text-4xl font-bold'}>Buy & Sell your Social</h1>
      <Button>Click here</Button>
      <ThemeToggle />
      <Link href={'/login'}>Login</Link>
      <Link href={'/sign-up'}>Sign up</Link>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientGreeting />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
