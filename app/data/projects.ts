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
  images?: string[]
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
  {
    id: 'otomotiv-parca-cfd',
    title: 'Airfoil Areodinamik Şekil Optimizasyonu',
    description: 'Otomotiv yan sanayi aerodinamik optimizasyon çalışması',
    shortDescription: 'Aerodinamik optimizasyon ve CFD analizi ile performans artışı',
    category: 'Mekanik Tasarım',
    tags: ['CFD', 'Aerodinamik'],
    duration: '3 ay',
    completedAt: '2024-08-15',
    status: 'completed',
    technologies: ['SolidWorks', 'ANSYS Fluent', 'CFD'],
    glbUrl: '/models/projects/155mm_he_shell_m51a5.glb', // Kendi tasarımım
    images: ['/images/projects/otomotiv-1.jpg', '/images/projects/otomotiv-2.jpg'],
    details: {
      problem: 'Otomotiv parçasının aerodinamik performansının yetersiz olması ve yakıt tüketiminin artması.',
      solution: 'CFD analizi ile hava akışı optimizasyonu yapılarak parça geometrisi yeniden tasarlandı.',
      results: [
        'Aerodinamik direncin %23 azaltılması',
        'Yakıt tüketiminde %8 iyileşme',
        'Üretim maliyetinin %15 düşürülmesi'
      ],
      challenges: [
        'Karmaşık geometri analizi',
        'Çok parametreli optimizasyon',
        'Üretim kısıtlarının dikkate alınması'
      ],
      testimonial: {
        content: 'LnY ekibinin CFD analizi sayesinde parçamızın performansını önemli ölçüde artırdık. Sonuçlar beklentilerimizi aştı.',
        author: 'Mehmet Kaya',
        role: 'R&D Müdürü',
        company: 'OtoTech A.Ş.'
      }
    },
    links: {
      case_study: '/projects/otomotiv-parca-cfd'
    }
  },
  {
    id: 'endustriyel-otomasyon',
    title: 'Endüstriyel Otomasyon Sistemi',
    description: 'Gıda hattı için geliştirilmiş otomasyon çözümü',
    shortDescription: 'PLC tabanlı otomasyon sistemi ile verimlilik artışı',
    category: 'Yazılım',
    tags: ['Otomasyon', 'PLC', 'SCADA'],
    duration: '4 ay',
    completedAt: '2024-09-20',
    status: 'completed',
    technologies: ['PLC Programming', 'SCADA', 'HMI'],
    glbUrl: '/models/projects/test-cube.glb',
    images: ['/images/projects/otomasyon-1.jpg', '/images/projects/otomasyon-2.jpg'],
    details: {
      problem: 'Manuel üretim hatlarında verimlilik düşüklüğü ve insan hatası riski.',
      solution: 'PLC tabanlı otomasyon sistemi ile tüm süreçlerin dijitalleştirilmesi.',
      results: [
        'Üretim verimliliğinde %35 artış',
        'İnsan hatasının %90 azalması',
        'Enerji tüketiminde %20 tasarruf'
      ],
      challenges: [
        'Mevcut sisteme entegrasyon',
        'Operator eğitimi',
        'Kesintisiz geçiş süreci'
      ],
      testimonial: {
        content: 'Otomasyon sistemimiz sayesinde üretimimiz çok daha verimli hale geldi. LnY ekibine teşekkürler.',
        author: 'Ayşe Demir',
        role: 'Üretim Müdürü',
        company: 'FoodPro Ltd.'
      }
    },
    links: {
      case_study: '/projects/endustriyel-otomasyon'
    }
  },
  {
    id: 'interaktif-3d-model',
    title: 'İnteraktif 3D Model Görüntüleyici',
    description: 'Web tabanlı profesyonel 3D model inceleme platformu',
    shortDescription: 'WebGL ve Three.js ile geliştirilmiş interaktif platform',
    category: 'Yazılım',
    tags: ['3D', 'WebGL', 'Three.js', 'React'],
    duration: '2 ay',
    completedAt: '2024-10-01',
    status: 'completed',
    technologies: ['Three.js', 'React', 'WebGL', 'TypeScript'],
    glbUrl: '/models/projects/otomotiv-parca.glb',
    images: ['/images/projects/3d-viewer-1.jpg', '/images/projects/3d-viewer-2.jpg'],
    details: {
      problem: 'Müşterilerin 3D modelleri incelemek için pahalı yazılımlara ihtiyaç duyması.',
      solution: 'Web tarayıcısında çalışan profesyonel 3D görüntüleyici geliştirimi.',
      results: [
        'Müşteri memnuniyetinde %40 artış',
        'Sunum sürelerinde %50 azalma',
        'Yazılım maliyetlerinde %80 tasarruf'
      ],
      challenges: [
        'Büyük dosya boyutları optimizasyonu',
        'Tarayıcı uyumluluğu',
        'Performans optimizasyonu'
      ],
      testimonial: {
        content: 'Müşterilerimize modelleri web üzerinden gösterebilmek harika! Çok profesyonel bir çözüm.',
        author: 'Can Özkan',
        role: 'Proje Yöneticisi',
        company: 'DesignHub'
      }
    },
    links: {
      demo: '/viewer',
      case_study: '/projects/interaktif-3d-model'
    }
  },
  {
    id: 'tubitak-1501',
    title: 'TÜBİTAK 1501 Projesi',
    description: 'Yenilikçi malzeme geliştirme AR-GE projesi',
    shortDescription: 'İnovasyon odaklı AR-GE çalışması',
    category: 'AR-GE',
    tags: ['AR-GE', 'Malzeme', 'İnovasyon'],
    duration: '18 ay',
    completedAt: '2024-07-30',
    status: 'completed',
    technologies: ['Material Science', 'R&D', 'Testing'],
    glbUrl: '/models/projects/test-cube.glb',
    images: ['/images/projects/tubitak-1.jpg', '/images/projects/tubitak-2.jpg'],
    details: {
      problem: 'Geleneksel malzemelerin yüksek sıcaklık uygulamalarında yetersiz kalması.',
      solution: 'Yeni nesil kompozit malzeme geliştirme ve test süreçleri.',
      results: [
        'Patent başvurusu yapıldı',
        'Sıcaklık direnci %60 artırıldı',
        'Üretim maliyeti %30 azaltıldı'
      ],
      challenges: [
        'Uzun test süreçleri',
        'Çoklu disiplin koordinasyonu',
        'Standart uyumluluk süreçleri'
      ],
      testimonial: {
        content: 'LnY ekibi ile yürüttüğümüz TÜBİTAK projesi çok başarılı geçti. İnovatif yaklaşımları takdire şayan.',
        author: 'Prof. Dr. Zeynep Yılmaz',
        role: 'Proje Koordinatörü',
        company: 'İTÜ'
      }
    },
    links: {
      case_study: '/projects/tubitak-1501'
    }
  }
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