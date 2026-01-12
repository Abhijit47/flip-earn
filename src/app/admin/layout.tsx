import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FlipNEarn Admin',
  description: 'Admin panel for FlipNEarn application.',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
