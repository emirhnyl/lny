import { ScrollSection } from '@/components/common/scroll-section'
import { MagneticButton } from '@/components/common/magnetic-button'
import HolographicBackground from '@/components/backgrounds/holographic-background'

export const metadata = {
  title: "Blog - LnY",
  description: "AR-GE, mekanik tasarım ve yazılım geliştirme alanlarında teknik makaleler ve industri içgörüleri."
}

const blogPosts = [
  {
    id: 'cfd-analiz-temelleri',
    title: 'CFD Analizinin Temelleri ve Endüstriyel Uygulamaları',
    excerpt: 'Computational Fluid Dynamics (CFD) analizinin temel prensipleri ve otomotiv, havacılık sektörlerindeki uygulamaları hakkında detaylı rehber.',
    content: `
## CFD Nedir?

Computational Fluid Dynamics (CFD), akışkanların hareketini ve ısı transferini bilgisayar simülasyonları ile analiz eden bir mühendislik dalıdır.

### Temel Prensipler

1. **Navier-Stokes Denklemleri**: Akışkanların hareketini tanımlayan temel matematik formüllerdir
2. **Mesh Oluşturma**: 3D modelin küçük elemanlara bölünmesi işlemi
3. **Sınır Koşulları**: Modelin sınırlarında tanımlanan fiziksel koşullar

### Endüstriyel Uygulamalar

#### Otomotiv Sektörü
- Aerodinamik optimizasyonu
- Motor soğutma sistemi analizi
- Klima sistemleri tasarımı

#### Havacılık ve Uzay
- Uçak kanat tasarımı
- Türbülans analizleri
- Yakıt sistemi optimizasyonu

### Yazılım Araçları

**ANSYS Fluent**: Endüstri standardı CFD yazılımı
**OpenFOAM**: Açık kaynak CFD platformu
**SolidWorks Flow Simulation**: CAD entegre CFD aracı

### Sonuç

CFD analizi, modern mühendislikte vazgeçilmez bir araç haline gelmiştir. Doğru yaklaşım ve deneyimle, fiziksel test maliyetlerini önemli ölçüde azaltabilir.
    `,
    date: '15 Ekim 2024',
    author: 'LnY Mühendislik Ekibi',
    category: 'Teknoloji',
    tags: ['CFD', 'Analiz', 'Mühendislik'],
    readTime: '8 dk',
    image: '/blog/cfd-blog.jpg'
  }
]

const categories = ['Tümü', 'Teknoloji', 'AR-GE', 'Yazılım', 'Mekanik']

export default function BlogPage() {
  return (
    <HolographicBackground intensity="medium">
      <div className="pt-20">
        {/* Hero Section */}
        <ScrollSection className="py-20 bg-gradient-to-br from-transparent via-black/20 to-black/40">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-white">
                Blog
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Mühendislik, teknoloji ve inovasyon üzerine uzman görüşleri
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* Categories */}
        <ScrollSection className="py-12 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* Blog Posts */}
        <ScrollSection className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white dark:bg-dark-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Featured Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-6xl opacity-30">📝</div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h2 className="font-heading font-bold text-xl mb-3 text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-dark-200 text-gray-700 dark:text-gray-300 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">LnY</span>
                        </div>
                        <div className="text-sm">
                          <div className="text-gray-900 dark:text-gray-100 font-medium">{post.author}</div>
                          <div className="text-gray-500 dark:text-gray-400">{post.date}</div>
                        </div>
                      </div>
                      
                      <MagneticButton
                        href={`/blog/${post.id}`}
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80"
                      >
                        Okuyun →
                      </MagneticButton>
                    </div>
                  </div>
                </article>
              ))}
              
              {/* Coming Soon Posts */}
              {[1, 2].map((i) => (
                <div
                  key={`coming-${i}`}
                  className="bg-white dark:bg-dark-50 rounded-2xl shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4 opacity-50">✏️</div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-gray-600 dark:text-gray-400">
                      Yakında
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500 text-sm">
                      Yeni içeriklerimiz hazırlanıyor
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* Newsletter Section */}
        <ScrollSection className="py-20 bg-gray-50 dark:bg-dark-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8">
                Yeniliklerden Haberdar Olun
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
                Blog yazılarımız ve sektör güncellemeleri için bültenimize abone olun
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-200"
                />
                <MagneticButton
                  className="bg-primary hover:bg-primary/90 text-dark px-8 py-4 font-semibold"
                >
                  Abone Ol
                </MagneticButton>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
              </p>
            </div>
          </div>
        </ScrollSection>
      </div>
    </HolographicBackground>
  )
}
