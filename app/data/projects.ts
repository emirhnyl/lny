export interface Project {
  id: string
  title: string
  description: string
  shortDescription: string
  category: string
  tags: string[]
  duration: string
  completedAt: string
  status: 'completed' | 'in-progress' | 'planned'
  technologies: string[]
  glbUrl?: string // 3D model dosyası
  thumbnailUrl?: string // Ön izleme görseli
  images?: string[] // Galeri görselleri
  details?: {
    problem: string
    solution: string
    results: string[]
    challenges?: string[]
    testimonial?: {
      content: string
      author: string
      role: string
      company: string
    }
  }
  links?: {
    demo?: string
    github?: string
    case_study?: string
  }
}

export const projectsData: Project[] = [
  // Test projeleri kaldırıldı - Artık sadece admin panelinden eklenen projeler gösterilecek
]

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projectsData.find(project => project.id === slug)
}

export const getProjectsByCategory = (category: string): Project[] => {
  return projectsData.filter(project => project.category === category)
}

export const getFeaturedProjects = (): Project[] => {
  return projectsData.filter(project => project.status === 'completed').slice(0, 3)
}