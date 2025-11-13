import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import './globals.css'
import './quill-styles.css'
import { ThemeProvider } from '@/lib/theme-provider'
import { Providers } from '@/lib/providers'
import { LenisProvider } from '@/lib/lenis-provider'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'LnY - Logaritmik Büyüme ve Yenilik',
    template: '%s | LnY'
  },
  description: 'AR-GE Danışmanlığı, Mekanik Tasarım ve Yazılım Otomasyonu ile işletmenizi geleceğe taşıyoruz.',
  keywords: [
    'AR-GE danışmanlığı',
    'TÜBİTAK destek', 
    'mekanik tasarım',
    'CFD analiz',
    'yazılım otomasyon'
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${montserrat.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.jpg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.jpg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.jpg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.jpg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#F5C10E" />
      </head>
      <body className="font-inter antialiased bg-white dark:bg-dark text-gray-900 dark:text-gray-100" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LenisProvider>
            <Providers>
              {children}
            </Providers>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
