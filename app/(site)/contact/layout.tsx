import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim - LnY',
  description: 'LnY ile iletişime geçin. Projeleriniz için ücretsiz danışmanlık alın.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
