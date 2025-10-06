import { notFound } from 'next/navigation'
import { ScrollSection } from '@/components/common/scroll-section'
import { MagneticButton } from '@/components/common/magnetic-button'
import HolographicBackground from '@/components/backgrounds/holographic-background'
import ProjectDetailViewer from '@/app/components/ProjectDetailViewer'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Tag, ExternalLink, Github, CheckCircle, Target, Users } from 'lucide-react'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

// Revalidate every 60 seconds
export const revalidate = 60

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true }
  })
  
  return projects.map((project) => ({
    slug: project.slug
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  
  const project = await prisma.project.findUnique({
    where: { slug, status: "PUBLISHED" }
  })
  
  if (!project) {
    return {
      title: 'Proje Bulunamadı - LnY',
    }
  }

  const tags = project.tags ? project.tags.split(',').map(t => t.trim()) : []

  return {
    title: `${project.title} - LnY`,
    description: project.description,
    keywords: [...tags, 'LnY', 'proje', project.category].join(', '),
    openGraph: {
      title: `${project.title} - LnY Projesi`,
      description: project.description,
      type: 'article',
      images: project.thumbnailUrl ? [project.thumbnailUrl] : []
    }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  
  // First try to fetch from database
  const dbProject: any = await prisma.project.findUnique({
    where: { 
      slug,
      status: "PUBLISHED"
    }
  })

  let project

  if (dbProject) {
    // Transform database project to expected format
    project = {
      id: dbProject.slug,
      title: dbProject.title,
      description: dbProject.description,
      shortDescription: dbProject.description,
      category: dbProject.category,
      tags: dbProject.tags ? dbProject.tags.split(',').map((tag: string) => tag.trim()) : [],
      duration: dbProject.duration || '-',
      completedAt: dbProject.publishedAt?.toISOString().split('T')[0] || dbProject.createdAt.toISOString().split('T')[0],
      status: 'completed' as const,
      technologies: dbProject.technologies ? dbProject.technologies.split(',').map((tech: string) => tech.trim()) : 
                    dbProject.tags ? dbProject.tags.split(',').map((tag: string) => tag.trim()) : [],
      glbUrl: dbProject.glbModelUrl || undefined,
      images: dbProject.images ? dbProject.images.split(',').map((img: string) => img.trim()) : undefined,
      details: (dbProject.problem || dbProject.solution || dbProject.results) ? {
        problem: dbProject.problem || 'Proje detayları',
        solution: dbProject.solution || dbProject.content || '',
        results: dbProject.results ? dbProject.results.split(',').map((r: string) => r.trim()) : [],
        challenges: dbProject.challenges ? dbProject.challenges.split(',').map((c: string) => c.trim()) : undefined,
        testimonial: (dbProject.testimonialContent && dbProject.testimonialAuthor) ? {
          content: dbProject.testimonialContent,
          author: dbProject.testimonialAuthor,
          role: dbProject.testimonialRole || '',
          company: dbProject.testimonialCompany || ''
        } : undefined
      } : undefined,
      links: (dbProject.demoUrl || dbProject.githubUrl) ? {
        demo: dbProject.demoUrl || undefined,
        github: dbProject.githubUrl || undefined
      } : undefined
    }
  } else {
    // Fallback to static data
    const { getProjectBySlug } = await import('@/app/data/projects')
    project = getProjectBySlug(slug)
  }

  if (!project) {
    notFound()
  }

  return (
    <HolographicBackground intensity="medium">
      <div className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Link href="/projects">
            <MagneticButton className="inline-flex items-center gap-2 text-gray-300 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Projelere Dön
            </MagneticButton>
          </Link>
        </div>

        {/* Hero Section with 3D Viewer */}
        <ScrollSection className="pb-12 bg-gradient-to-br from-transparent via-black/20 to-black/40">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              
              {/* Project Header */}
              <div className="mb-8">
                <div className="mb-6">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                    project.status === 'completed' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : project.status === 'in-progress'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {project.status === 'completed' ? 'Tamamlandı' : 
                     project.status === 'in-progress' ? 'Devam Ediyor' : 'Planlanıyor'}
                  </span>
                </div>

                <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                  {project.title}
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
                  {project.description}
                </p>

                {/* Project Meta Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 border border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-gray-400">Kategori</span>
                    </div>
                    <span className="text-white font-semibold">{project.category}</span>
                  </div>
                  
                  <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 border border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-gray-400">Süre</span>
                    </div>
                    <span className="text-white font-semibold">{project.duration}</span>
                  </div>
                  
                  <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 border border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-gray-400">Tamamlanma</span>
                    </div>
                    <span className="text-white font-semibold">
                      {new Date(project.completedAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>

                  <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 border border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-gray-400">Teknolojiler</span>
                    </div>
                    <span className="text-white font-semibold text-sm">
                      {project.technologies.slice(0, 2).join(', ')}
                      {project.technologies.length > 2 && ` +${project.technologies.length - 2}`}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag: string) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.links?.demo && (
                    <Link href={project.links.demo}>
                      <MagneticButton className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-full font-semibold hover:bg-primary/80 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        Canlı Demo
                      </MagneticButton>
                    </Link>
                  )}
                  {project.links?.github && (
                    <Link href={project.links.github}>
                      <MagneticButton className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-500 transition-colors">
                        <Github className="w-4 h-4" />
                        GitHub
                      </MagneticButton>
                    </Link>
                  )}
                </div>
              </div>

              {/* 3D Model Viewer */}
              <div className="mb-12">
                <ProjectDetailViewer
                  glbUrl={project.glbUrl}
                  title={project.title}
                  description={project.shortDescription}
                  className="w-full"
                  autoPlay={true}
                />
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Content Sections */}
        <div className="container mx-auto px-4 pb-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Project Details */}
              {project.details && (
                <>
                  {/* Problem */}
                  <ScrollSection className="bg-black/20 backdrop-blur-md rounded-xl p-8 border border-gray-800">
                    <div className="flex items-center gap-3 mb-6">
                      <Target className="w-6 h-6 text-red-400" />
                      <h2 className="font-heading text-2xl font-bold text-white">Problem</h2>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {project.details.problem}
                    </p>
                  </ScrollSection>

                  {/* Solution */}
                  <ScrollSection className="bg-black/20 backdrop-blur-md rounded-xl p-8 border border-gray-800">
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircle className="w-6 h-6 text-blue-400" />
                      <h2 className="font-heading text-2xl font-bold text-white">Çözüm</h2>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {project.details.solution}
                    </p>
                  </ScrollSection>

                  {/* Results */}
                  <ScrollSection className="bg-black/20 backdrop-blur-md rounded-xl p-8 border border-gray-800">
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <h2 className="font-heading text-2xl font-bold text-white">Sonuçlar</h2>
                    </div>
                    <div className="space-y-4">
                      {project.details.results.map((result: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-gray-300">{result}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollSection>

                  {/* Challenges */}
                  {project.details.challenges && project.details.challenges.length > 0 && (
                    <ScrollSection className="bg-black/20 backdrop-blur-md rounded-xl p-8 border border-gray-800">
                      <h2 className="font-heading text-2xl font-bold text-white mb-6">Teknik Zorluklar</h2>
                      <div className="space-y-4">
                        {project.details.challenges.map((challenge: string, index: number) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-gray-300">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollSection>
                  )}

                  {/* Testimonial */}
                  {project.details.testimonial && (
                    <ScrollSection className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-8 border border-primary/20">
                      <blockquote className="text-lg text-gray-300 italic mb-4">
                        "{project.details.testimonial.content}"
                      </blockquote>
                      <div className="text-primary font-semibold">
                        — {project.details.testimonial.author}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {project.details.testimonial.role}, {project.details.testimonial.company}
                      </div>
                    </ScrollSection>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              
              {/* Technologies */}
              <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-gray-800">
                <h3 className="font-heading text-xl font-bold text-white mb-4">Teknolojiler</h3>
                <div className="space-y-2">
                  {project.technologies.map((tech: string) => (
                    <div key={tech} className="bg-gray-800/50 rounded-lg px-3 py-2 text-gray-300 text-sm">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Projects */}
              <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-gray-800">
                <h3 className="font-heading text-xl font-bold text-white mb-4">İlgili Projeler</h3>
                <div className="space-y-3">
                  <Link href="/projects">
                    <div className="group bg-gray-800/30 rounded-lg p-3 hover:bg-gray-800/50 transition-colors cursor-pointer">
                      <h4 className="text-white text-sm font-medium group-hover:text-primary transition-colors">
                        Tüm Projeleri Gör
                      </h4>
                      <p className="text-gray-400 text-xs mt-1">
                        {project.category} kategorisi
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HolographicBackground>
  )
}
