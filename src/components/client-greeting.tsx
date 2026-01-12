'use client';
// <-- hooks can only be used in client components
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
export function ClientGreeting() {
  // const trpc = useTRPC();
  // const greeting = useQuery(trpc.hello.queryOptions({ text: 'world' }));
  // if (!greeting.data) return <div>Loading...</div>;
  // return <div>{greeting.data.greeting}</div>;

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.hello.queryOptions({ text: 'world' }));
  return <div>{data.greeting}</div>;
}
