import { Metadata } from 'next'

export const seoConfig: Metadata = {
  title: {
    default: 'LnY - Logaritmik Büyüme ve Yenilik',
    template: '%s | LnY'
  },
  description: 'AR-GE Danışmanlığı, Mekanik Tasarım ve Yazılım Otomasyonu ile işletmenizi geleceğe taşıyoruz. TÜBİTAK destekleri, CFD analiz, endüstriyel otomasyon.',
  keywords: [
    'AR-GE danışmanlığı',
    'TÜBİTAK destek',
    'mekanik tasarım',
    'CFD analiz',
    'yazılım otomasyon',
    'endüstriyel çözüm',
    'inovasyon',
    'teknopark'
  ],
  authors: [{ name: 'LnY Team' }],
  creator: 'LnY',
  publisher: 'LnY',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lny.com.tr'),
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/tr',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: '/',
    title: 'LnY - Logaritmik Büyüme ve Yenilik',
    description: 'AR-GE Danışmanlığı, Mekanik Tasarım ve Yazılım Otomasyonu ile işletmenizi geleceğe taşıyoruz.',
    siteName: 'LnY',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LnY - Logaritmik Büyüme ve Yenilik',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LnY - Logaritmik Büyüme ve Yenilik',
    description: 'AR-GE Danışmanlığı, Mekanik Tasarım ve Yazılım Otomasyonu ile işletmenizi geleceğe taşıyoruz.',
    images: ['/og-image.png'],
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
    google: 'google-verification-code',
    yandex: 'yandex-verification-code',
  },
}
