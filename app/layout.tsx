import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.onetapalert.com'),
  title: {
    default: 'One Tap Alert Blog — Personal Safety Tips & Emergency Guides',
    template: '%s | One Tap Alert Blog',
  },
  description:
    'Expert guides on personal safety, emergency preparedness, campus safety, and how to stay protected with One Tap Alert — your SOS safety app.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  verification: {
    google: '8NoElrRwVcTZWyoNC2tibt__sO-45gFnW0fpCubhew8',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
