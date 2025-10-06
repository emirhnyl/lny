import { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  openGraph?: {
    title: string
    description: string
    url: string
    images?: string[]
    type?: 'website' | 'article'
  }
  twitter?: {
    card: 'summary' | 'summary_large_image'
    title: string
    description: string
    images?: string[]
  }
  schema?: any
}

export function generateSEOMetadata(config: SEOConfig): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lny.com.tr'
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords?.join(', '),
    
    // Canonical URL
    alternates: {
      canonical: config.canonical || baseUrl,
    },
    
    // Open Graph
    openGraph: {
      title: config.openGraph?.title || config.title,
      description: config.openGraph?.description || config.description,
      url: config.openGraph?.url || baseUrl,
      siteName: 'LnY - Logaritmik Büyüme ve Yenilik',
      locale: 'tr_TR',
      type: config.openGraph?.type || 'website',
      images: config.openGraph?.images || [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'LnY - Logaritmik Büyüme ve Yenilik',
        }
      ],
    },
    
    // Twitter
    twitter: {
      card: config.twitter?.card || 'summary_large_image',
      title: config.twitter?.title || config.title,
      description: config.twitter?.description || config.description,
      images: config.twitter?.images || [`${baseUrl}/og-image.jpg`],
      creator: '@lny_tech',
      site: '@lny_tech',
    },
    
    // Additional metadata
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
    
    // Language alternatives
    other: {
      'language': 'tr',
      'geo.region': 'TR',
      'geo.placename': 'Ankara',
      'geo.position': '39.925018;32.836956',
      'ICBM': '39.925018, 32.836956',
    },
  }
}

export function generateProjectSchema(project: {
  title: string
  description: string
  category: string
  client: string
  completedDate: string | null
  tags: string[]
  technologies: string[]
  testimonial?: {
    text: string
    author: string
    position: string
  }
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lny.com.tr'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    creator: {
      '@type': 'Organization',
      name: 'LnY - Logaritmik Büyüme ve Yenilik',
      url: baseUrl,
    },
    datePublished: project.completedDate || new Date().toISOString(),
    genre: project.category,
    keywords: [...project.tags, ...project.technologies].join(', '),
    ...(project.testimonial && {
      review: {
        '@type': 'Review',
        reviewBody: project.testimonial.text,
        author: {
          '@type': 'Person',
          name: project.testimonial.author,
          jobTitle: project.testimonial.position,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5,
        }
      }
    })
  }
}

export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lny.com.tr'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LnY - Logaritmik Büyüme ve Yenilik',
    alternateName: 'LnY',
    url: baseUrl,
    logo: `${baseUrl}/logo.jpg`,
    image: `${baseUrl}/og-image.jpg`,
    description: 'AR-GE Danışmanlığı, Mekanik Tasarım ve Yazılım Otomasyonu ile işletmenizi geleceğe taşıyoruz.',
    foundingDate: '2023',
    
    // Contact Information
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-xxx-xxx-xx-xx',
      contactType: 'customer service',
      areaServed: 'TR',
      availableLanguage: ['tr', 'en']
    },
    
    // Address
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Teknokent',
      addressLocality: 'Ankara',
      addressCountry: 'TR'
    },
    
    // Services
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AR-GE Danışmanlığı',
          description: 'TÜBİTAK destekleri ve inovasyon süreçlerinde uzman danışmanlık'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mekanik Tasarım',
          description: 'CAD tasarım, CFD analiz ve simülasyon hizmetleri'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Yazılım Otomasyon',
          description: 'Endüstriyel otomasyon ve yazılım çözümleri'
        }
      }
    ],
    
    // Social Media
    sameAs: [
      'https://linkedin.com/company/lny-tech',
      'https://github.com/lny-tech',
      'https://twitter.com/lny_tech'
    ]
  }
}

export function generateServiceSchema(service: {
  name: string
  description: string
  features: string[]
  process: string[]
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lny.com.tr'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'LnY - Logaritmik Büyüme ve Yenilik',
      url: baseUrl
    },
    areaServed: 'TR',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${baseUrl}/contact`,
      servicePhone: '+90-xxx-xxx-xx-xx'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: service.features.map((feature, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature
        },
        position: index + 1
      }))
    }
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lny.com.tr'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`
    }))
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}