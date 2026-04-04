import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Configure the Inter font to use the Latin alphabet subset
const inter = Inter({ subsets: ['latin'] })

// UPGRADED SEO METADATA
export const metadata: Metadata = {
  title: 'Caravan Travel | Khiva Tours, Transfers & Historical Adventures',
  description: 'Experience the best of ancient Khorezm. We offer private tours, desert fortress expeditions, and comfortable intercity transfers in Khiva, Uzbekistan.',
  keywords: 'Khiva tours, Uzbekistan travel, Khorezm fortresses, Khiva transfers, Ayaz Qala, Tuproq Qala, private guide Khiva',
  openGraph: {
    title: 'Caravan Travel | Premium Khiva Tours',
    description: 'Discover the ancient city of Khiva and desert fortresses with our guided tours and comfortable transfers.',
    url: 'https://caravantrips.uz',
    siteName: 'Caravan Travel',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Apply the Inter font class to the body */}
      <body className={inter.className}>{children}</body>
    </html>
  )
}