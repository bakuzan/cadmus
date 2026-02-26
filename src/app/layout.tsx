import type { Metadata } from 'next';

import NavBar from '@/components/NavBar';
import Toaster from '@/components/Toaster';

import getPageTitle from '@/utils/getPageTitle';

import './globals.css';
import './table.css';
import './tooltip.css';

export const metadata: Metadata = {
  title: getPageTitle(),
  description: 'Cadmus is an application to manage books.',
  icons: ['/favicon.ico']
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster>
          <NavBar />
          <main className="main">{children}</main>
        </Toaster>
      </body>
    </html>
  );
}
