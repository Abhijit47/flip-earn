import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FlipNEarn Authentication',
  description: 'Authentication for FlipNEarn application.',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
