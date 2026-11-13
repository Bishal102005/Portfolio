import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { ME } from '@/lib/constants/portfolioData';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap'
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  title: `${ME.name} – Portfolio, bound as a book`,
  description: `Portfolio of ${ME.name}, ${ME.role.toLowerCase()}. Turn the pages to read each project.`,
  authors: [{ name: ME.name }],
  keywords: [
    'Bishal Saha',
    'Creative Developer',
    'Three.js',
    'Next.js',
    'WebGL',
    'Portfolio',
    'Interactive 3D Book'
  ],
  openGraph: {
    title: `${ME.name} – Portfolio, bound as a book`,
    description: `Portfolio of ${ME.name}, ${ME.role.toLowerCase()}. Turn the pages to read each project.`,
    type: 'website',
    locale: 'en_US'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#efe5d0' },
    { media: '(prefers-color-scheme: dark)', color: '#2c231f' }
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: ME.name,
    jobTitle: ME.role,
    email: ME.email,
    sameAs: ME.links.map(([, url]) => url)
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

