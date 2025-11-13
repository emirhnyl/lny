import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ScrollSection } from '@/components/common/scroll-section'
import { MagneticButton } from '@/components/common/magnetic-button'
import HolographicBackground from '@/components/backgrounds/holographic-background'
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react'
import Image from 'next/image'

// Generate static params for all published blog posts
export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true }
  })

  return posts.map((post) => ({
    slug: post.slug
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: { title: true, content: true }
  })

  if (!post) return { title: 'Blog Yazısı Bulunamadı' }

  return {
    title: `${post.title} - LnY Blog`,
    description: post.content.substring(0, 160)
  }
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const post = await prisma.blogPost.findFirst({
    where: {
      OR: [
        { slug, status: 'PUBLISHED' },
        { slug, status: 'DRAFT' } // For preview
      ]
    },
    include: {
      author: true,
      category: true
    }
  })

  if (!post) {
    notFound()
  }

  const tags = post.tags ? post.tags.split(',').map(tag => tag.trim()) : []
  const readTime = Math.ceil(post.content.split(' ').length / 200) // ~200 words per minute

  // Get related posts
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      status: 'PUBLISHED',
      categoryId: post.categoryId,
      id: { not: post.id }
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
    include: {
      category: true,
      author: { select: { name: true } }
    }
  })

  return (
    <HolographicBackground intensity="low">
      <div className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <MagneticButton
            href="/blog"
            variant="ghost"
            className="text-gray-600 dark:text-gray-400 hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Bloga Dön
          </MagneticButton>
        </div>

        {/* Article Header */}
        <ScrollSection className="py-12">
          <article className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Category & Status */}
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 text-sm font-medium bg-primary/20 text-primary rounded-full">
                  {post.category.name}
                </span>
                {post.status === 'DRAFT' && (
                  <span className="px-4 py-1.5 text-sm font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full">
                    Taslak
                  </span>
                )}
                {post.featured && (
                  <span className="px-4 py-1.5 text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                     Öne Çıkan
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{post.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {post.publishedAt 
                      ? new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })
                      : new Date(post.createdAt).toLocaleDateString('tr-TR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })
                    }
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{readTime} dk okuma</span>
                </div>
              </div>

              {/* Cover Image */}
              {post.coverImage && (
                <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Content */}
              <div 
                className="prose prose-lg dark:prose-invert max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-gray-200 dark:border-gray-700">
                  <Tag className="w-4 h-4 text-gray-400 mr-2" />
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-dark-200 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author Info */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 rounded-2xl p-8 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">
                      {post.authorName ? post.authorName.charAt(0).toUpperCase() : (post.author.name?.charAt(0) || 'L')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-1">
                      {post.authorName || post.author.name || 'LnY Ekibi'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {post.authorBio || 'LnY Mühendislik Ekibi'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </ScrollSection>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <ScrollSection className="py-20 bg-gray-50 dark:bg-dark-100">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="font-heading text-3xl font-bold mb-12 text-center">
                  İlgili Yazılar
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => {
                    const relatedReadTime = Math.ceil(relatedPost.content.split(' ').length / 200)
                    return (
                      <article
                        key={relatedPost.id}
                        className="group bg-white dark:bg-dark-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                      >
                        {relatedPost.coverImage ? (
                          <div className="relative aspect-video overflow-hidden">
                            <Image
                              src={relatedPost.coverImage}
                              alt={relatedPost.title}
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
                              {relatedPost.category.name}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {relatedReadTime} dk
                            </span>
                          </div>
                          
                          <h3 className="font-heading font-bold text-lg mb-3 text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          
                          <MagneticButton
                            href={`/blog/${relatedPost.slug}`}
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary/80 mt-4"
                          >
                            Okuyun →
                          </MagneticButton>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </ScrollSection>
        )}
      </div>
    </HolographicBackground>
  )
}
