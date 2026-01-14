import { ClientGreeting } from '@/components/client-greeting';
import { AvatarCircles } from '@/components/extended/avatar-circles';
import { Highlighter } from '@/components/extended/highlighter';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { HydrateClient } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default async function Home() {
  // const greeting = await caller.hello({ text: 'from tRPC server' });
  // prefetch(trpc.hello.queryOptions({ text: 'from tRPC server' }));

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <main className={'mx-auto w-full max-w-3xl space-y-12'}>
          <Card
            className={'bg-transparent rounded-none border-none shadow-none'}>
            <CardContent
              className={
                'flex flex-col items-center justify-center gap-6 py-20'
              }>
              <AvatarCircles
                numPeople={99}
                avatarUrls={[
                  {
                    imageUrl: '/user_profile.png',
                    profileUrl: 'https://github.com/dillionverma',
                  },
                  {
                    imageUrl: '/user_profile.png',
                    profileUrl: 'https://github.com/dillionverma',
                  },
                  {
                    imageUrl: '/user_profile.png',
                    profileUrl: 'https://github.com/dillionverma',
                  },
                  {
                    imageUrl: '/user_profile.png',
                    profileUrl: 'https://github.com/dillionverma',
                  },
                  {
                    imageUrl: '/user_profile.png',
                    profileUrl: 'https://github.com/dillionverma',
                  },
                ]}
              />
              <h1 className={'text-6xl font-bold text-center tracking-normal'}>
                Buy & Sell your{' '}
                <Highlighter action='underline' color='#FF9800'>
                  Social
                </Highlighter>{' '}
                <span>Profiles</span> online.
              </h1>
              <p
                className={
                  'max-w-xl text-center text-lg text-muted-foreground'
                }>
                A secure marketplace to buy and sell Instagram, YouTube,
                Twitter, Telegram and more - fast, safe and hassle-free.
              </p>
            </CardContent>

            <CardFooter>
              <InputGroup className={'h-12'}>
                <InputGroupInput placeholder='Type to search...' />
                <InputGroupAddon align='inline-end'>
                  <InputGroupButton variant='secondary' size={'sm'}>
                    Search
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className={'text-center'}>
              <CardTitle>
                <h2 className={'text-4xl font-semibold'}>Latest Listings</h2>
              </CardTitle>
              <CardDescription>
                <p>Discover the hottest social profiles available right now.</p>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className={'text-center'}>
              <CardTitle>
                <h2 className={'text-4xl font-semibold'}>Choose Your Plan</h2>
              </CardTitle>
              <CardDescription>
                <p>
                  Start for free and scale up as you grow. Find the perfect plan
                  for your content creation needs.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className={
              'bg-linear-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30'
            }>
            <CardHeader className={'text-center'}>
              <AnimatedGradientTextDemo />
              <CardTitle>
                <h2 className={'text-4xl font-semibold'}>
                  Sell your Social Accounts
                  <span className='bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent'>
                    with Confidence
                  </span>{' '}
                  & Earn Money
                </h2>
              </CardTitle>
              <CardDescription>
                <p>
                  We are the leading social media marketplace that connects
                  brands with their customers With our user-friendly interface.
                </p>
              </CardDescription>
            </CardHeader>
            <CardFooter className={'flex items-center justify-center'}>
              <RainbowButton size={'lg'} asChild>
                <Link href='/sign-up'>Get Started Today</Link>
              </RainbowButton>
            </CardFooter>
          </Card>
          <Suspense fallback={<div>Loading...</div>}>
            <ClientGreeting />
          </Suspense>
        </main>
      </ErrorBoundary>
    </HydrateClient>
  );
}

import { ChevronRight } from 'lucide-react';

import { AnimatedGradientText } from '@/components/extended/animated-gradient-text';
import { RainbowButton } from '@/components/extended/rainbow-button';
import { cn } from '@/lib/utils';
import { IconRocket } from '@tabler/icons-react';
import Link from 'next/link';

export function AnimatedGradientTextDemo() {
  return (
    <div className='group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]'>
      <span
        className={cn(
          'animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-linear-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-size-[300%_100%] p-px'
        )}
        style={{
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'subtract',
          WebkitClipPath: 'padding-box',
        }}
      />
      <IconRocket className={'size-4'} />{' '}
      <hr className='mx-2 h-4 w-px shrink-0 bg-neutral-500' />
      <AnimatedGradientText className='text-sm font-medium'>
        Trusted by Millions
      </AnimatedGradientText>
      <ChevronRight className='ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
    </div>
  );
}
