import { Header } from '@/components/common/header'
import { Footer } from '@/components/common/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Ln ArGe",
  description: "AR-GE Danışmanlığı, Mekanik Tasarım ve Yazılım Otomasyonu ile işletmenizi geleceğe taşıyoruz.",
  keywords: ["AR-GE", "Danışmanlık", "Mekanik Tasarım", "Yazılım", "Otomasyon", "İnovasyon"],
  openGraph: {
    title: "Ln ArGe",
    description: "AR-GE Danışmanlığı, Mekanik Tasarım ve Yazılım Otomasyonu ile işletmenizi geleceğe taşıyoruz.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ln ArGe",
    description: "AR-GE Danışmanlığı, Mekanik Tasarım ve Yazılım Otomasyonu ile işletmenizi geleceğe taşıyoruz.",
  }
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden smooth-scroll">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
