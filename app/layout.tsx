import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Qualified Labor - Find Trade Work. Find Trade Workers.',
  description: 'Connect apprentices with contractors. Plumbing, electrical, HVAC, carpentry. No job boards. No bullshit. Just matches.',
  openGraph: {
    title: 'Qualified Labor',
    description: 'Find Trade Work. Find Trade Workers.',
    type: 'website',
    url: 'https://qualifiedlabor.net',
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
