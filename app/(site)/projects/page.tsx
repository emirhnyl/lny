import { ScrollSection } from '@/components/common/scroll-section'
import { MagneticButton } from '@/components/common/magnetic-button'
import HolographicBackground from '@/components/backgrounds/holographic-background'
import { prisma } from '@/lib/prisma'
import { projectsData as staticProjects } from '@/app/data/projects'
import ProjectsClient from './projects-client'

export const metadata = {
  title: "Projelerimiz - LnY",
  description: "LnY'nin gerçekleştirdiği AR-GE, mekanik tasarım ve yazılım geliştirme projeleri. İnteraktif 3D modellerle projelerimizi keşfedin."
}

// Revalidate every 60 seconds
export const revalidate = 60

export default async function ProjectsPage() {
  // Fetch published projects from database
  const dbProjects = await prisma.project.findMany({
    where: {
      status: "PUBLISHED"
    },
    orderBy: [
      { featured: 'desc' },
      { publishedAt: 'desc' }
    ],
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      content: true,
      category: true,
      tags: true,
      glbModelUrl: true,
      thumbnailUrl: true,
      images: true,
      featured: true,
      publishedAt: true,
      createdAt: true
    }
  })

  // Transform database projects to match the expected format
  const dynamicProjects = dbProjects.map(project => ({
    id: project.slug,
    title: project.title,
    description: project.description,
    shortDescription: project.description,
    category: project.category,
    tags: project.tags ? project.tags.split(',').map(tag => tag.trim()) : [],
    duration: '-',
    completedAt: project.publishedAt?.toISOString().split('T')[0] || project.createdAt.toISOString().split('T')[0],
    status: 'completed' as const,
    technologies: project.tags ? project.tags.split(',').map(tag => tag.trim()) : [],
    glbUrl: project.glbModelUrl || undefined,
    images: project.images ? project.images.split(',').map(img => img.trim()) : undefined
  }))

  // Combine static and dynamic projects
  const projectsData = [...staticProjects, ...dynamicProjects]

  return (
    <HolographicBackground intensity="medium">
      <div className="pt-20">
        {/* Hero Section */}
        <ScrollSection className="py-20 bg-gradient-to-br from-transparent via-black/20 to-black/40">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-white">
                Projelerimiz
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Projelerimizi interaktif 3D modeller üzerinden keşfederek, 
                her çalışmanın teknik detaylarını ve mühendislik yaklaşımını inceleyebilirsiniz.
              </p>
              <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>3D Model ile Görüntüleme</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>İnteraktif Kontroller</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Tam Ekran Görüntüleme</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Client Component with Interactive Features */}
        <ProjectsClient projectsData={projectsData} />

        {/* CTA Section */}
        <ScrollSection className="py-20 bg-gray-50 dark:bg-dark-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8">
                Bir Sonraki Proje Sizinki Olsun
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
                Projelerimizi inceleyip 3D modellerle tanıştınız. Şimdi sizin projenizi hayata geçirelim!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton
                  href="/contact"
                  className="bg-primary hover:bg-primary/90 text-dark px-12 py-4 text-lg font-semibold"
                >
                  Projenizi Değerlendirin
                </MagneticButton>
                
                <MagneticButton
                  href="/about"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-dark px-12 py-4 text-lg font-semibold"
                >
                  Hakkımızda
                </MagneticButton>
              </div>
            </div>
          </div>
        </ScrollSection>
      </div>
    </HolographicBackground>
  )
}
