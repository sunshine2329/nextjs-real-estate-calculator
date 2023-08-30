import api from '@/lib/api'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Real Estate Calculator',
  description: 'Deploying to aws with Nextjs application'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  api.setConfigure({
    baseURL: process.env.BASE_URL!,
    headers: { common: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } }
  })
  console.log('RootLayout')
  console.log(process.env.BASE_URL!)
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
