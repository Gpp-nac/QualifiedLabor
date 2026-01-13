import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Qualified Labor | Hire Skilled Tradespeople & Find Trade Jobs',
  description: 'Connect with skilled plumbers, electricians, HVAC techs, carpenters & welders. Contractors: hire pre-vetted trade workers. Workers: find local trade jobs. No job boards. Direct matches.',
  keywords: [
    'hire plumber',
    'hire electrician',
    'trade jobs near me',
    'plumbing apprentice jobs',
    'electrical apprentice',
    'HVAC technician jobs',
    'skilled trades hiring',
    'construction workers',
    'find trade workers',
    'trade labor marketplace',
  ],
  authors: [{ name: 'Qualified Labor' }],
  creator: 'Qualified Labor',
  publisher: 'Qualified Labor',
  metadataBase: new URL('https://qualifiedlabor.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Qualified Labor | Hire Skilled Tradespeople & Find Trade Jobs',
    description: 'Connect with skilled plumbers, electricians, HVAC techs & more. Contractors hire workers. Workers find jobs. Direct matches, no middleman.',
    type: 'website',
    url: 'https://qualifiedlabor.net',
    siteName: 'Qualified Labor',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qualified Labor | Hire Skilled Tradespeople & Find Trade Jobs',
    description: 'Connect with skilled plumbers, electricians, HVAC techs & more. Direct matches between contractors and trade workers.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you have them:
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-ql-charcoal antialiased">
        {children}
      </body>
    </html>
  )
}
