import ThemeToggle from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <h1 className={'text-4xl font-bold'}>Buy & Sell your Social</h1>
      <Button>Click here</Button>
      <ThemeToggle />
    </>
  );
}
