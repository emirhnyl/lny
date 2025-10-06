import { ScrollSection } from '@/components/common/scroll-section'
// import { LogoMark } from '@/components/hero/logo-mark' // Artık kullanılmıyor
import HolographicBackground from '@/components/backgrounds/holographic-background'

export const metadata = {
  title: "Hakkımızda - LnY",
  description: "LnY'nin hikayesi, misyonu ve vizyonu. Logaritmik büyüme felsefesiyle teknoloji ve inovasyonda öncülük ediyoruz."
}

export default function AboutPage() {
  return (
    <HolographicBackground intensity="medium">
      <div className="pt-20">
        {/* Hero Section */}
        <ScrollSection className="py-20 bg-gradient-to-br from-transparent via-black/20 to-black/40">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <img 
                src="/logo.jpg" 
                alt="LnY ArGe Logo" 
                className="w-24 h-24 mx-auto mb-8 object-contain"
              />
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-white">
                LnY Hikâyesi
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Logaritmik büyüme felsefesiyle kurduğumuz LnY, teknoloji ve inovasyonda 
                sürdürülebilir çözümler geliştiren bir AR-GE şirketidir.
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* Mission & Vision */}
        <ScrollSection className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-primary">
                  Misyonumuz
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Türk sanayisinin teknolojik dönüşümünde öncü rol oynayarak, 
                  AR-GE danışmanlığı, mekanik tasarım ve yazılım otomasyon çözümleriyle 
                  işletmelerin logaritmik büyümesine katkıda bulunmak.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">
                      İnovasyon odaklı çözümlerle rekabet gücünü artırma
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">
                      Sürdürülebilir teknolojik gelişim sağlama
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">
                      Bilgi transferi ve kapasite geliştirme
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-primary">
                  Vizyonumuz
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  2030 yılına kadar Türkiye'nin önde gelen teknoloji danışmanlık şirketi 
                  olmak ve uluslararası pazarlarda Türk mühendislik çözümlerini temsil etmek.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">
                      Teknokent ekosisteminde lider pozisyon
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">
                      Uluslararası işbirlikleri ve projeler
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">
                      Sürdürülebilir büyüme ve inovasyon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Values */}
        <ScrollSection className="py-20 bg-gray-50 dark:bg-dark-100">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-16">
              Değerlerimiz
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4">İnovasyon</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Sürekli öğrenme ve gelişimle teknolojinin sınırlarını zorluyoruz
                </p>
              </div>
              
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4">İşbirliği</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Müşterilerimizle güçlü ortaklıklar kurarak ortak başarı sağlıyoruz
                </p>
              </div>
              
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4">Hızlı Çözüm</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Etkin metodlarla hızlı ve kaliteli çözümler üretiyoruz
                </p>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Team */}
        <ScrollSection className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8">
                Teknopark Ekosistemi
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                Kırıkkale Teknopark bünyesinde yer alan Ln-ArGe, üniversite-sanayi işbirliği 
                çerçevesinde akademik bilgi birikimi ile endüstriyel deneyimi harmanlayarak 
                çözümler üretmektedir.
              </p>
              
              <div className="grid md:grid-cols-2 gap-12 mt-16">
                <div className="text-left">
                  <h3 className="font-heading font-bold text-2xl mb-4 text-primary">
                    Akademik Bağlantılar
                  </h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                    <li>• CBÜ Makine Mühendisliği</li>
                    <li>• Celal Bayar Üniversitesi Teknokent</li>
                    <li>• Kırıkkale Üniversitesi Teknokent</li>
                    <li>• TÜBİTAK MAM işbirliği</li>
                  </ul>
                </div>
                
                <div className="text-left">
                  <h3 className="font-heading font-bold text-2xl mb-4 text-primary">
                    Sektörel Kapsam
                  </h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                    <li>• Otomotiv ve Yan Sanayi</li>
                    <li>• Makine İmalat</li>
                    <li>• Enerji ve Çevre</li>
                    <li>• Savunma Sanayi</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>
      </div>
    </HolographicBackground>
  )
}
