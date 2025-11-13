import { ScrollSection } from '@/components/common/scroll-section'
import { MagneticButton } from '@/components/common/magnetic-button'
import HolographicBackground from '@/components/backgrounds/holographic-background'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'

export const metadata = {
  title: "Blog - LnY",
  description: "Mühendislik, teknoloji ve inovasyon üzerine uzman görüşleri ve teknik makaleler."
}

export const revalidate = 10 // Revalidate every 10 seconds

export default async function BlogPage() {
  // Fetch published blog posts and categories
  const [blogPosts, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' }
      ],
      include: {
        category: true,
        author: {
          select: { name: true }
        }
      }
    }),
    prisma.blogCategory.findMany({
      orderBy: { name: 'asc' }
    })
  ])

  const allCategories = ['Tümü', ...categories.map(cat => cat.name)]

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
              {allCategories.map((category) => (
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
              {blogPosts.map((post) => {
                const tags = post.tags ? post.tags.split(',').map(t => t.trim()) : []
                const readTime = Math.ceil(post.content.split(' ').length / 200)
                const excerpt = post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                
                return (
                  <article
                    key={post.id}
                    className="group bg-white dark:bg-dark-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  >
                    {/* Featured Image */}
                    {post.coverImage ? (
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <div className="text-6xl opacity-30">📝</div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                          {post.category.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {readTime} dk
                        </span>
                      </div>
                      
                      <h2 className="font-heading font-bold text-xl mb-3 text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">
                        {excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-dark-200 text-gray-700 dark:text-gray-300 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                        {tags.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-dark-200 text-gray-500 dark:text-gray-400 rounded">
                            +{tags.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {post.authorName ? post.authorName.charAt(0).toUpperCase() : (post.author.name?.charAt(0) || 'L')}
                            </span>
                          </div>
                          <div className="text-sm">
                            <div className="text-gray-900 dark:text-gray-100 font-medium">
                              {post.authorName || post.author.name || 'LnY Ekibi'}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {post.publishedAt 
                                ? new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })
                                : new Date(post.createdAt).toLocaleDateString('tr-TR', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })
                              }
                            </div>
                          </div>
                        </div>
                        
                        <MagneticButton
                          href={`/blog/${post.slug}`}
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80"
                        >
                          Okuyun →
                        </MagneticButton>
                      </div>
                    </div>
                  </article>
                )
              })}
              
              {/* Coming Soon Posts - Only show if less than 3 posts */}
              {blogPosts.length < 3 && Array.from({ length: 3 - blogPosts.length }).map((_, i) => (
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
