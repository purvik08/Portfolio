import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/layout/LenisProvider';
import CustomCursor from '@/components/layout/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Purvik Prajapati — Robotics & Embedded Systems Engineer',
  description:
    'Portfolio of Purvik Prajapati — Robotics & Embedded Systems Engineer, AI/ML Developer, and Computer Vision Specialist from Surat, India. Specializing in ESP32, ROS 2, KiCad PCB design, and edge AI.',
  keywords: [
    'Purvik Prajapati',
    'Robotics Engineer',
    'Embedded Systems',
    'ESP32',
    'ROS 2',
    'Computer Vision',
    'AI ML',
    'KiCad',
    'PCB Design',
    'Drone',
    'Portfolio',
  ],
  authors: [{ name: 'Purvik Prajapati', url: 'https://github.com/purvik08' }],
  openGraph: {
    title: 'Purvik Prajapati — Robotics & Embedded Systems Engineer',
    description:
      'Portfolio of Purvik Prajapati — Robotics & Embedded Systems Engineer and AI/ML Developer from Surat, India.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Purvik Prajapati — Robotics & Embedded Systems Engineer',
    description: 'Portfolio of Purvik Prajapati — Robotics & Embedded Systems Engineer from Surat, India.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} dark`} suppressHydrationWarning>
      <body className="antialiased bg-charcoal-950 text-white overflow-x-hidden">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
