'use client'

import { useState } from 'react'
import { ScrollSection } from '@/components/common/scroll-section'
import { MagneticButton } from '@/components/common/magnetic-button'
import SimpleGLBViewer from '@/app/components/SimpleGLBViewer'
import { Project } from '@/app/data/projects'

interface ProjectsClientProps {
  projectsData: Project[]
}

export default function ProjectsClient({ projectsData }: ProjectsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const categories = ['Tümü', 'AR-GE', 'Mekanik Tasarım', 'Yazılım']
  const allTags = projectsData.flatMap(project => project.tags)
  const uniqueTags = [...new Set(allTags)]

  // Filter projects based on selected category and tag
  const filteredProjects = projectsData.filter(project => {
    const categoryMatch = selectedCategory === 'Tümü' || project.category === selectedCategory
    const tagMatch = !selectedTag || project.tags.includes(selectedTag)
    return categoryMatch && tagMatch
  })

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSelectedTag(null) // Reset tag when category changes
  }

  const handleTagToggle = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  return (
    <>
      {/* Filter Section */}
      <ScrollSection className="py-12 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                  selectedCategory === category
                    ? 'border-primary bg-primary text-dark font-semibold'
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Tag Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-primary text-dark font-semibold'
                    : 'bg-gray-100 dark:bg-dark-200 text-gray-700 dark:text-gray-300 hover:bg-primary/20'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Results Info */}
          <div className="text-center mt-6 text-gray-600 dark:text-gray-400">
            {filteredProjects.length} proje gösteriliyor
            {selectedCategory !== 'Tümü' && (
              <span> • Kategori: <span className="font-semibold text-primary">{selectedCategory}</span></span>
            )}
            {selectedTag && (
              <span> • Etiket: <span className="font-semibold text-primary">#{selectedTag}</span></span>
            )}
          </div>
        </div>
      </ScrollSection>

      {/* Projects Grid with 3D Models */}
      <ScrollSection className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white dark:bg-dark-50 border border-gray-200 dark:border-gray-700"
              >
                {/* 3D Model Viewer */}
                <div className="aspect-video">
                  <SimpleGLBViewer
                    glbUrl={project.glbUrl || '/models/projects/test-cube.glb'}
                    className="w-full h-full rounded-t-2xl"
                  />
                </div>
                
                <div className="p-6">
                  {/* Status and Category */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                      {project.category}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      project.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : project.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {project.status === 'completed' ? 'Tamamlandı' : 
                       project.status === 'in-progress' ? 'Devam Ediyor' : 'Planlandı'}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-heading font-bold text-xl mb-3 text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.shortDescription}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-dark-200 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-dark-200 text-gray-500 dark:text-gray-400 rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Duration and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div className="font-medium">{project.duration}</div>
                      <div className="text-xs">{new Date(project.completedAt).toLocaleDateString('tr-TR')}</div>
                    </div>
                    
                    <MagneticButton
                      href={`/projects/${project.id}`}
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                      Detaylar →
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-50">🔍</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                Aradığınız kriterlerde proje bulunamadı
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Farklı kategori veya etiket seçeneklerini deneyebilirsiniz
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('Tümü')
                  setSelectedTag(null)
                }}
                className="px-6 py-3 bg-primary text-dark rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                Tüm Projeleri Göster
              </button>
            </div>
          )}
        </div>
      </ScrollSection>
    </>
  )
}