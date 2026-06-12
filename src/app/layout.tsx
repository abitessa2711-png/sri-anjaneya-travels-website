import type { Metadata, Viewport } from 'next';
import './globals.css';
import ThemeWrapper from '@/components/ThemeWrapper';

export const metadata: Metadata = {
  title: 'Sri Anjaneya Tours & Travels | Premium Car Rental & Taxi Services',
  description: 'Self-driving car rentals, taxi booking service, business class travel, airport pickup/drop, and corporate travel in Trichy. "Travel With Comfort, Reach With Trust."',
  keywords: 'Sri Anjaneya Travels, Car Rental Trichy, Self Drive Cars Trichy, Taxi Services Trichy, Airport Pickup Trichy, Innova Rental Trichy, Tour Operators Trichy',
  authors: [{ name: 'Sri Anjaneya Tours & Travels' }],
  metadataBase: new URL('https://srianjaneyatravels.vercel.app'),
  openGraph: {
    title: 'Sri Anjaneya Tours & Travels | Premium Car Rental & Taxi',
    description: 'Rent premium self-driving cars, book local/outstation cabs, and enjoy business-class travel with Trichy\'s most trusted travel brand.',
    url: 'https://srianjaneyatravels.vercel.app',
    siteName: 'Sri Anjaneya Travels',
    images: [
      {
        url: '/assets/flyer_1.jpg',
        width: 1200,
        height: 630,
        alt: 'Sri Anjaneya Tours & Travels Fleet',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#090d16',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}

