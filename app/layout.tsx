import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PerfectPorn',
  description: 'Web site with best porn video',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center ">
          <Header />
          <section className="mt-[72px] py-6 px-12 w-full">
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}
