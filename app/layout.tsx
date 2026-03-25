import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Configure the Inter font to use the Latin alphabet subset
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Caravan Travel',
  description: 'Tours, Transfers & Historical Adventures in Khiva',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Apply the Inter font class to the body */}
      <body className={inter.className}>{children}</body>
    </html>
  )
}