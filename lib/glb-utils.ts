/**
 * GLB Dosya Yönetimi Helper'ları
 * Projelerinizde GLB dosyalarını kolayca yönetmek için yardımcı fonksiyonlar
 */

// GLB dosya yolları için sabitler
export const GLB_PATHS = {
  PROJECT_MODELS: '/models/projects/',
  BACKUP_MODELS: '/models/backup/',
  TEMP_MODELS: '/models/temp/'
} as const

// Mevcut GLB dosyaları
export const AVAILABLE_GLB_FILES = [
  '155mm_he_shell_m51a5.glb',
  'test-cube.glb',
  'otomotiv-parca.glb',
  // Yeni dosyalarınızı buraya ekleyin
] as const

// GLB dosya URL'si oluşturucu
export const createGLBUrl = (filename: string): string => {
  return `${GLB_PATHS.PROJECT_MODELS}${filename}`
}

// Dosya varlığını kontrol eden fonksiyon (client-side)
export const checkGLBFileExists = async (filename: string): Promise<boolean> => {
  try {
    const response = await fetch(createGLBUrl(filename), { method: 'HEAD' })
    return response.ok
  } catch (error) {
    console.warn(`GLB dosyası bulunamadı: ${filename}`)
    return false
  }
}

// Fallback GLB dosyası
export const DEFAULT_GLB = 'test-cube.glb'

// GLB dosyası validator'ı
export const validateGLBPath = (glbUrl: string): boolean => {
  return glbUrl.endsWith('.glb') && glbUrl.startsWith('/models/projects/')
}

// Yeni proje için GLB template'i
export const createProjectWithGLB = (
  id: string,
  title: string,
  glbFilename: string,
  options: {
    description?: string
    category?: string
    tags?: string[]
    technologies?: string[]
  } = {}
) => {
  return {
    id,
    title,
    description: options.description || 'Proje açıklaması...',
    shortDescription: options.description?.substring(0, 100) + '...' || 'Kısa açıklama...',
    category: options.category || 'Mekanik Tasarım',
    tags: options.tags || ['3D Model'],
    duration: '3 ay',
    completedAt: new Date().toISOString().split('T')[0],
    status: 'completed' as const,
    technologies: options.technologies || ['SolidWorks'],
    glbUrl: createGLBUrl(glbFilename),
    images: [],
    details: {
      problem: 'Problem tanımı...',
      solution: 'Çözüm açıklaması...',
      results: ['Sonuç 1', 'Sonuç 2'],
    },
    links: {
      case_study: `/projects/${id}`
    }
  }
}

// GLB dosya boyutu kontrol fonksiyonu
export const getGLBFileInfo = async (filename: string) => {
  try {
    const response = await fetch(createGLBUrl(filename), { method: 'HEAD' })
    const contentLength = response.headers.get('content-length')
    return {
      exists: response.ok,
      size: contentLength ? parseInt(contentLength) : null,
      sizeFormatted: contentLength ? formatBytes(parseInt(contentLength)) : 'Bilinmiyor'
    }
  } catch (error) {
    return {
      exists: false,
      size: null,
      sizeFormatted: 'Bilinmiyor'
    }
  }
}

// Byte formatter
const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

// Kullanım örneği:
/*
// Yeni proje ekleme
const yeniProje = createProjectWithGLB(
  'benim-tasarimim',
  'Benim Harika Tasarımım',
  'benim-tasarim.glb',
  {
    description: 'Bu benim yeni 3D tasarımım',
    category: 'Mekanik Tasarım',
    tags: ['3D', 'CAD', 'Tasarım'],
    technologies: ['SolidWorks', 'KeyShot']
  }
)

// projects.ts dosyasına ekleyin:
// export const projectsData: Project[] = [
//   ...mevcut projeler,
//   yeniProje
// ]
*/