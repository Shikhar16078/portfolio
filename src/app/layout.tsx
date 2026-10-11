import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import MotionProvider from '@/components/motion-provider';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { personalData } from '@/lib/data';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(personalData.siteUrl),
  title: `${personalData.name} | Portfolio`,
  description: personalData.bio,
  // The one address search engines should list, whichever domain the page was reached on.
  alternates: { canonical: '/' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Reveals start hidden and are animated in by JS; without JS, just show them. */}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
        {/* Vercel Web Analytics: page views and visitors, reported only from Vercel deployments. */}
        <Analytics />
      </body>
    </html>
  );
}
