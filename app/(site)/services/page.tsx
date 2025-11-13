import { ServiceCard } from '@/components/cards/service-card'
import { ScrollSection } from '@/components/common/scroll-section'
import HolographicBackground from '@/components/backgrounds/holographic-background'

// Next.js 15 App Router'da metadata kullanıyoruz
export const metadata = {
  title: 'Hizmetler - LnY',
  description: 'AR-GE Danışmanlığı, Mekanik Tasarım ve Yazılım Otomasyon hizmetlerimiz hakkında detaylı bilgi.',
}

export default function ServicesPage() {
  const services = [
    {
      id: 'arge',
      title: 'Tasarım',
      description: 'Fikirlerinizi üretime hazır, yenilikçi ve estetik 3D tasarımlara dönüştürüyoruz.',
      icon: '',
      href: '/services#arge',
      features: [
        'Üretime uygun 3D CAD modelleme ve detaylı teknik çizimler',
        'Özel makine ve ekipman tasarımı',
        'Ürün geliştirme ve prototipleme çözümleri',
        'Ergonomik ve estetik ürün tasarımları',
        'Üretim maliyeti ve verimliliği odaklı tasarım optimizasyonu'
      ],
      process: [
        'İhtiyaç ve Konsept Belirleme',
        'Ön Tasarım ve Konsept Çalışmaları',
        'Detaylı 3D CAD Modelleme',
        'Prototip ve Revizyon Süreci',
        'Nihai Tasarım ve Teknik Dokümantasyon Teslimi'
      ]
    },
    {
      id: 'mekanik',
      title: 'Analiz',
      description: 'FEA ve CFD simülasyonlarıyla yapısal dayanım, akış performansı ve termal davranışı optimize ediyoruz.',
      icon: '',
      href: '/services#mekanik',
      features: [
        'Yapısal analiz (FEA) ile dayanım ve yorulma ömrü hesaplamaları',
        'Akışkanlar mekaniği analizleri (CFD) ve ısı transferi simülasyonları',
        'Termal ve titreşim analizleri',
        'Montaj ve çalışma koşullarına uygun yük simülasyonları',
        'Performans ve güvenilirlik optimizasyonu'
      ],
      process: [
        'Problem Tanımı ve Veri Toplama',
        'Model Hazırlama ve Simülasyon Kurulumu',
        'Sayısal Analiz ve Hesaplamalar',
        'Sonuçların Yorumlanması ve Optimizasyon',
        'Raporlama ve Nihai Teslimat'
      ]
    },
    {
      id: 'yazilim',
      title: 'Yazılım',
      description: 'Endüstriyel otomasyon, veri analizi ve yazılım çözümleri.',
      icon: '',
      href: '/services#yazilim',
      features: [
        'Özel mühendislik yazılımları ve otomasyon sistemleri geliştirme',
        'IoT & Endüstri 4.0 çözümleri',
        'Veri toplama, raporlama ve üretim izleme sistemleri',
        'Web & mobil uygulama geliştirme',
      ],
      process: [
        'İhtiyaç Analizi ve Sistem Tasarımı',
        'Proje Planlama ve Altyapı Seçimi',
        'Yazılım Geliştirme ve Entegrasyon',
        'Test, Devreye Alma ve Eğitim',
        'Teknik Dokümantasyon ve Sürekli Destek'
      ]
    }
  ]

  return (
    <HolographicBackground intensity="medium">
      <div className="pt-20">
        {/* Hero Section */}
        <ScrollSection className="py-20 bg-gradient-to-br from-transparent via-black/20 to-black/40">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-white">
                Hizmetlerimiz
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Ana uzmanlık alanlarımızda logaritmik büyüme sağlayacak çözümler sunuyoruz
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* Services Grid */}
        <ScrollSection className="py-20 bg-gradient-to-br from-transparent via-black/10 to-black/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  href={service.href}
                  features={service.features}
                />
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* Detailed Services */}
        <div className="py-20 bg-gray-50 dark:bg-dark-100">
          {services.map((service, index) => (
            <ScrollSection key={service.id} className={index > 0 ? 'pt-20' : ''}>
              <div className="container mx-auto px-4">
                <div id={service.id} className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <div className="text-6xl mb-6">{service.icon}</div>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                      {service.title}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-16">
                    <div>
                      <h3 className="font-heading text-2xl font-bold mb-8 text-primary">
                        Sunduğumuz Hizmetler
                      </h3>
                      <div className="space-y-4">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-heading text-2xl font-bold mb-8 text-primary">
                        Süreç ve Teslimatlar
                      </h3>
                      <div className="space-y-6">
                        {service.process.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-primary font-semibold text-sm">
                                {stepIndex + 1}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 pt-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollSection>
          ))}
        </div>

        {/* CTA Section */}
        <ScrollSection className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8">
                Projeniz için Başlayalım
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
                Uzman ekibimizle projenizin ihtiyaçlarını değerlendirelim ve 
                size özel çözüm önerisini hazırlayalım.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-dark font-semibold text-lg rounded-xl transition-colors"
                >
                  Teklif Al
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary hover:bg-primary/10 font-semibold text-lg rounded-xl transition-colors"
                >
                  Projelerimizi İncele
                </a>
              </div>
            </div>
          </div>
        </ScrollSection>
      </div>
    </HolographicBackground>
  )
}
