import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // İlk admin kullanıcısını oluştur
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lny.com.tr' },
    update: {},
    create: {
      email: 'admin@lny.com.tr',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  })
  
  console.log('✅ Super Admin created:', admin.email)

  // Blog kategorileri
  const categories = [
    {
      name: 'Teknoloji',
      slug: 'teknoloji',
      description: 'Teknoloji ve yenilik haberleri',
    },
    {
      name: 'Mühendislik',
      slug: 'muhendislik',
      description: 'Mühendislik projeleri ve çözümleri',
    },
    {
      name: 'Yazılım',
      slug: 'yazilim',
      description: 'Yazılım geliştirme ve teknolojileri',
    },
    {
      name: 'Tasarım',
      slug: 'tasarim',
      description: '3D tasarım ve modelleme',
    },
  ]

  for (const cat of categories) {
    const category = await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
    console.log('✅ Blog category created:', category.name)
  }

  // Örnek hizmetler
  const services = [
    {
      title: 'Tasarım',
      slug: 'tasarim',
      description: 'Fikirlerinizi üretime hazır, yenilikçi ve estetik 3D tasarımlara dönüştürüyoruz.',
      features: JSON.stringify([
        'Üretime uygun 3D CAD modelleme',
        'Özel makine ve ekipman tasarımı',
        'Ürün geliştirme ve prototipleme',
      ]),
      orderIndex: 1,
    },
    {
      title: 'Analiz',
      slug: 'analiz',
      description: 'FEA ve CFD simülasyonlarıyla yapısal dayanım, akış performansı ve termal davranışı optimize ediyoruz.',
      features: JSON.stringify([
        'Yapısal analiz (FEA)',
        'Akışkanlar mekaniği analizleri (CFD)',
        'Termal ve titreşim analizleri',
      ]),
      orderIndex: 2,
    },
    {
      title: 'Yazılım',
      slug: 'yazilim',
      description: 'Endüstriyel otomasyon, veri analizi ve yazılım çözümleri.',
      features: JSON.stringify([
        'Özel mühendislik yazılımları',
        'IoT & Endüstri 4.0 çözümleri',
        'Web & mobil uygulama geliştirme',
      ]),
      orderIndex: 3,
    },
  ]

  for (const service of services) {
    const created = await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    })
    console.log('✅ Service created:', created.title)
  }

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
