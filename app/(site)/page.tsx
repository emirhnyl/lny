'use client'

import HeroSimple from '@/components/hero/hero-simple'
import HolographicBackground from '@/components/backgrounds/holographic-background'
import { ServiceCard } from '@/components/cards/service-card'
import { MagneticButton } from '@/components/common/magnetic-button'
import { ScrollSection } from '@/components/common/scroll-section'
import SmoothScroll from '@/components/common/smooth-scroll'
import { generateOrganizationSchema } from '@/lib/seo'
import Script from 'next/script'

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema()

  return (
    <>
      {/* Schema.org JSON-LD */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      
      <SmoothScroll targetSection="services">
      
      {/* Hero Section */}
      <section 
        data-hero-section
        className="relative h-screen overflow-hidden"
      >
        <HeroSimple />
      </section>

      {/* Rest of page with holographic background */}
      <HolographicBackground intensity="medium" className="min-h-screen">
        
        {/* Services Highlight */}
        <ScrollSection 
          data-section="services" 
          className="py-20 min-h-screen flex items-center"
        >
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-16 text-white">
              Hizmetlerimiz
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <ServiceCard
                title="Tasarım"
                description="Fikirlerinizi üretime hazır, yenilikçi ve estetik 3D tasarımlara dönüştürüyoruz. Ürünlerinizi daha verimli, dayanıklı ve maliyet avantajlı hale getiriyoruz."
                icon=""
                href="/services#arge"
              />
              <ServiceCard
                title="Analiz"
                description="FEA ve CFD analizleriyle tasarımlarınızın dayanımını ve performansını önceden test ediyor, riskleri en aza indirerek en uygun mühendislik çözümlerini sunuyoruz."
                icon=""
                href="/services#mekanik"
              />
              <ServiceCard
                title="Yazılım"
                description="Endüstriyel süreçlerinizi hızlandıran özel yazılım ve otomasyon çözümleri geliştiriyoruz. Dijitalleşme ile verimliliğinizi artırıyor, rekabette öne geçiriyoruz."
                icon=""
                href="/services#yazilim"
              />
            </div>
          </div>
        </ScrollSection>

        {/* Growth Section */}
        <ScrollSection className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-white">
              Logaritmik Büyüme
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-300">
              ln(y) eğrisi gibi sürekli ve kararlı bir büyüme modeli ile işletmenizi 
              geleceğe hazırlıyoruz. Her proje, bir sonraki adımın temelini oluşturur.
            </p>
            <div className="relative max-w-4xl mx-auto">
              <svg
                href="/services#arge"
                className="w-full h-64"
                viewBox="0 0 800 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F5C10E" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#F5C10E" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 250 Q200 200 350 150 Q500 100 750 50"
                  stroke="url(#growthGradient)"
                  strokeWidth="4"
                  fill="none"
                  className="animate-draw-line"
                  style={{
                    strokeDasharray: 1000,
                    strokeDashoffset: 1000,
                  }}
                />
                {[100, 250, 400, 550, 700].map((x, i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={230 - i * 40}
                    r="6"
                    fill="#F5C10E"
                    className="animate-pulse-glow"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </ScrollSection>

      </HolographicBackground>
    </SmoothScroll>
    </>
  )
}
