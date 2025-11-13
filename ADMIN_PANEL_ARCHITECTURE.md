# 🎯 LnY Admin Paneli - Mimari ve Site Haritası

## 📋 İçindekiler
1. [Genel Bakış](#genel-bakış)
2. [Site Haritası](#site-haritası)
3. [Teknik Mimari](#teknik-mimari)
4. [Veritabanı Şeması](#veritabanı-şeması)
5. [API Endpoints](#api-endpoints)
6. [Güvenlik](#güvenlik)
7. [Kullanıcı Rolleri](#kullanıcı-rolleri)

---

## 🌐 Genel Bakış

Admin paneli, LnY web sitesinin tüm içerik ve yapılandırmalarını merkezi bir noktadan yönetmenizi sağlayan kapsamlı bir CMS (Content Management System) olacaktır.

### Temel Özellikler
- ✅ Kullanıcı dostu drag & drop arayüzü
- ✅ Gerçek zamanlı önizleme
- ✅ Medya yönetimi (resim, GLB model dosyaları)
- ✅ SEO yönetimi
- ✅ Multi-language hazırlığı
- ✅ İstatistik ve analitik
- ✅ Rol bazlı yetkilendirme

---

## 🗺️ Site Haritası

```
/admin
│
├── /login                          # Giriş sayfası
├── /forgot-password                # Şifre sıfırlama
│
├── /dashboard                      # Ana kontrol paneli
│   ├── İstatistikler özeti
│   ├── Son aktiviteler
│   ├── Hızlı aksiyonlar
│   └── Sistem durumu
│
├── /content                        # İçerik Yönetimi
│   │
│   ├── /pages                      # Sayfa Yönetimi
│   │   ├── /home                   # Ana Sayfa
│   │   │   ├── Hero Section
│   │   │   │   ├── Başlık/Alt başlık
│   │   │   │   ├── CTA butonları
│   │   │   │   └── Arka plan ayarları
│   │   │   ├── Services Highlight
│   │   │   ├── Growth Section
│   │   │   └── Stats Section
│   │   │
│   │   ├── /about                  # Hakkımızda
│   │   │   ├── Hero
│   │   │   ├── Mission/Vision
│   │   │   ├── Team Members
│   │   │   ├── Values
│   │   │   └── Timeline
│   │   │
│   │   ├── /services               # Hizmetler
│   │   │   ├── Service Cards (3 ana hizmet)
│   │   │   │   ├── Tasarım (AR-GE)
│   │   │   │   ├── Analiz (Mekanik)
│   │   │   │   └── Yazılım
│   │   │   ├── Detailed Sections
│   │   │   │   ├── Features listesi
│   │   │   │   └── Process steps
│   │   │   └── CTA Section
│   │   │
│   │   ├── /contact                # İletişim
│   │   │   ├── Form ayarları
│   │   │   ├── Email şablonları
│   │   │   ├── İletişim bilgileri
│   │   │   └── Harita ayarları
│   │   │
│   │   └── /custom-pages           # Özel sayfalar
│   │       └── Yeni sayfa ekle/düzenle
│   │
│   ├── /projects                   # Projeler Yönetimi
│   │   ├── Liste görünümü
│   │   │   ├── Filtreleme (kategori, durum, tarih)
│   │   │   ├── Arama
│   │   │   └── Sıralama
│   │   ├── Yeni proje ekle
│   │   │   ├── Temel bilgiler
│   │   │   │   ├── Başlık
│   │   │   │   ├── Slug (URL)
│   │   │   │   ├── Açıklama (kısa/uzun)
│   │   │   │   ├── Kategori
│   │   │   │   ├── Tags
│   │   │   │   └── Durum (tamamlandı/devam ediyor/planlı)
│   │   │   ├── Medya
│   │   │   │   ├── GLB model upload
│   │   │   │   ├── Resim galerisi
│   │   │   │   └── Video linki
│   │   │   ├── Proje detayları
│   │   │   │   ├── Problem
│   │   │   │   ├── Çözüm
│   │   │   │   ├── Sonuçlar
│   │   │   │   ├── Challenges
│   │   │   │   └── Testimonial
│   │   │   ├── Teknik bilgiler
│   │   │   │   ├── Süre
│   │   │   │   ├── Tamamlanma tarihi
│   │   │   │   ├── Teknolojiler
│   │   │   │   └── Client adı
│   │   │   └── SEO ayarları
│   │   └── Proje düzenle/sil
│   │
│   ├── /blog                       # Blog Yönetimi
│   │   ├── Yazı listesi
│   │   │   ├── Taslaklar
│   │   │   ├── Yayınlananlar
│   │   │   └── Planlanmış
│   │   ├── Yeni yazı ekle
│   │   │   ├── Başlık/Slug
│   │   │   ├── İçerik (Rich Text Editor)
│   │   │   ├── Kapak görseli
│   │   │   ├── Kategori
│   │   │   ├── Etiketler
│   │   │   ├── Yazar
│   │   │   ├── Yayın tarihi
│   │   │   └── SEO ayarları
│   │   ├── Kategoriler
│   │   │   ├── Liste/Ekle/Düzenle
│   │   │   └── Sıralama
│   │   └── Etiketler
│   │       └── Liste/Ekle/Düzenle
│   │
│   └── /testimonials               # Müşteri Yorumları
│       ├── Liste görünümü
│       ├── Yeni yorum ekle
│       │   ├── İsim/Pozisyon/Şirket
│       │   ├── Yorum metni
│       │   ├── Fotoğraf
│       │   ├── Rating (1-5)
│       │   └── Onay durumu
│       └── Düzenle/Sil
│
├── /media                          # Medya Kütüphanesi
│   ├── /images                     # Resimler
│   │   ├── Upload (drag & drop)
│   │   ├── Galeriler
│   │   ├── Filtreleme
│   │   └── Toplu işlemler
│   ├── /models                     # 3D Modeller (.glb)
│   │   ├── Upload
│   │   ├── Önizleme
│   │   └── Proje eşleştirme
│   ├── /documents                  # Dökümanlar
│   │   └── PDF, Excel vs.
│   └── /videos                     # Videolar
│       └── Link veya upload
│
├── /design                         # Tasarım Ayarları
│   ├── /theme                      # Tema Özelleştirme
│   │   ├── Renkler
│   │   │   ├── Primary (#F5C10E)
│   │   │   ├── Secondary
│   │   │   ├── Dark/Light mode
│   │   │   └── Accent colors
│   │   ├── Typography
│   │   │   ├── Font aileleri
│   │   │   ├── Font boyutları
│   │   │   └── Line heights
│   │   ├── Spacing
│   │   └── Border radius
│   │
│   ├── /logo-branding              # Logo ve Marka
│   │   ├── Logo upload (SVG, PNG)
│   │   ├── Favicon
│   │   ├── Social media images
│   │   └── Watermark
│   │
│   ├── /animations                 # Animasyon Ayarları
│   │   ├── Hero canvas ayarları
│   │   ├── Scroll animasyonları
│   │   ├── Transition speeds
│   │   └── Enable/disable toggles
│   │
│   └── /components                 # Bileşen Ayarları
│       ├── Header
│       │   ├── Logo pozisyonu
│       │   ├── Menu items
│       │   └── CTA buton
│       ├── Footer
│       │   ├── Sosyal medya linkler
│       │   ├── İletişim bilgileri
│       │   └── Copyright text
│       └── Custom Cursor
│           └── Enable/disable
│
├── /seo                            # SEO & Marketing
│   ├── /meta-tags                  # Meta Etiketler
│   │   ├── Global ayarlar
│   │   │   ├── Site title template
│   │   │   ├── Default description
│   │   │   └── Keywords
│   │   └── Sayfa bazlı override
│   │
│   ├── /open-graph                 # Open Graph
│   │   ├── OG Image generator
│   │   ├── Twitter cards
│   │   └── LinkedIn preview
│   │
│   ├── /structured-data            # Schema.org
│   │   ├── Organization schema
│   │   ├── Service schema
│   │   ├── Project schema
│   │   └── Breadcrumb schema
│   │
│   ├── /sitemap                    # Site Haritası
│   │   ├── Otomatik oluşturma
│   │   ├── Priority ayarları
│   │   └── Changefreq ayarları
│   │
│   ├── /redirects                  # Yönlendirmeler
│   │   ├── 301 yönlendirmeler
│   │   └── URL rewrites
│   │
│   └── /analytics                  # Analitik Entegrasyonları
│       ├── Google Analytics
│       ├── Google Search Console
│       ├── Meta Pixel
│       └── Custom tracking codes
│
├── /forms                          # Form Yönetimi
│   ├── /contact-form               # İletişim Formu
│   │   ├── Alan düzenleme
│   │   │   ├── Ad/Soyad
│   │   │   ├── Email
│   │   │   ├── Telefon
│   │   │   ├── Şirket
│   │   │   ├── Hizmet seçimi
│   │   │   ├── Mesaj
│   │   │   └── Dosya upload
│   │   ├── Validation kuralları
│   │   ├── Email bildirimleri
│   │   │   ├── Admin email
│   │   │   ├── Otomatik yanıt
│   │   │   └── Email şablonları
│   │   ├── reCAPTCHA ayarları
│   │   └── Başarı/Hata mesajları
│   │
│   ├── /submissions                # Gelen Başvurular
│   │   ├── Liste görünümü
│   │   ├── Filtreleme/Arama
│   │   ├── Durum takibi
│   │   │   ├── Yeni
│   │   │   ├── İnceleniyor
│   │   │   ├── Yanıtlandı
│   │   │   └── Arşivlendi
│   │   ├── Notlar ekle
│   │   └── Export (CSV, Excel)
│   │
│   └── /custom-forms               # Özel Formlar
│       └── Form builder (drag & drop)
│
├── /email                          # Email Yönetimi
│   ├── /templates                  # Email Şablonları
│   │   ├── Contact form response
│   │   ├── Welcome email
│   │   ├── Newsletter
│   │   └── Custom templates
│   ├── /smtp-settings              # SMTP Ayarları
│   │   ├── Provider seçimi (Resend, SendGrid, etc.)
│   │   └── API credentials
│   └── /email-logs                 # Email Logları
│       ├── Gönderilen emailler
│       └── Hata logları
│
├── /users                          # Kullanıcı Yönetimi
│   ├── /list                       # Kullanıcı Listesi
│   │   ├── Filtreleme (rol, durum)
│   │   └── Arama
│   ├── /add-new                    # Yeni Kullanıcı
│   │   ├── Temel bilgiler
│   │   ├── Rol atama
│   │   ├── Yetki ayarları
│   │   └── Email davetiyesi
│   ├── /roles                      # Rol Yönetimi
│   │   ├── Admin
│   │   ├── Editor
│   │   ├── Author
│   │   └── Viewer
│   └── /permissions                # Yetki Matrisi
│       └── Detaylı yetki ayarları
│
├── /settings                       # Genel Ayarlar
│   ├── /general                    # Genel
│   │   ├── Site adı
│   │   ├── Site açıklaması
│   │   ├── Timezone
│   │   ├── Dil
│   │   └── Date/Time format
│   │
│   ├── /company                    # Şirket Bilgileri
│   │   ├── Şirket adı
│   │   ├── Adres
│   │   ├── Telefon
│   │   ├── Email
│   │   ├── Social media links
│   │   └── Teknokent bilgileri
│   │
│   ├── /technical                  # Teknik Ayarlar
│   │   ├── Cache yönetimi
│   │   ├── CDN ayarları
│   │   ├── Image optimization
│   │   ├── Performance settings
│   │   └── API rate limiting
│   │
│   ├── /security                   # Güvenlik
│   │   ├── 2FA ayarları
│   │   ├── IP whitelist
│   │   ├── Login attempts
│   │   ├── Session timeout
│   │   └── Security logs
│   │
│   ├── /backup                     # Yedekleme
│   │   ├── Otomatik yedekleme
│   │   ├── Manuel yedekleme
│   │   ├── Restore
│   │   └── Backup history
│   │
│   └── /integrations               # Entegrasyonlar
│       ├── Payment gateways
│       ├── CRM systems
│       ├── Cloud storage
│       └── Third-party APIs
│
├── /analytics                      # Analitik & Raporlar
│   ├── /overview                   # Genel Bakış
│   │   ├── Ziyaretçi istatistikleri
│   │   ├── Sayfa görüntülemeleri
│   │   ├── Bounce rate
│   │   └── Avg. session duration
│   │
│   ├── /traffic                    # Trafik Analizi
│   │   ├── Kaynaklar
│   │   ├── Cihazlar
│   │   ├── Lokasyonlar
│   │   └── Gerçek zamanlı
│   │
│   ├── /content-performance        # İçerik Performansı
│   │   ├── En çok görüntülenen projeler
│   │   ├── Popüler blog yazıları
│   │   └── Engagement metrics
│   │
│   ├── /forms                      # Form Analitiği
│   │   ├── Conversion rate
│   │   ├── Drop-off points
│   │   └── Submission trends
│   │
│   └── /reports                    # Raporlar
│       ├── Özel rapor oluştur
│       ├── Scheduled reports
│       └── Export (PDF, CSV)
│
├── /notifications                  # Bildirimler
│   ├── In-app notifications
│   ├── Email notifications
│   └── Notification settings
│
└── /help                           # Yardım & Destek
    ├── /documentation              # Dokümantasyon
    ├── /tutorials                  # Video tutorials
    ├── /faq                        # SSS
    └── /support                    # Destek talebi
```

---

## 🏗️ Teknik Mimari

### 1. Frontend Stack
```
Next.js 15 (App Router)
├── TypeScript
├── React 18
├── Tailwind CSS
├── shadcn/ui (Komponen kütüphanesi)
├── Radix UI (Primitives)
├── TanStack Table (Veri tabloları)
├── TanStack Query (Data fetching)
├── React Hook Form (Form yönetimi)
├── Zod (Validation)
├── Framer Motion (Animasyonlar)
└── Zustand (State management)
```

### 2. Backend Stack
```
Next.js API Routes
├── Prisma ORM
├── PostgreSQL veya MongoDB
├── NextAuth.js (Authentication)
├── AWS S3 / Cloudinary (File storage)
├── Redis (Caching)
└── Resend (Email service)
```

### 3. Dosya Yapısı
```
app/
├── (admin)/
│   ├── layout.tsx              # Admin layout wrapper
│   ├── dashboard/
│   │   └── page.tsx
│   ├── content/
│   │   ├── pages/
│   │   ├── projects/
│   │   └── blog/
│   ├── media/
│   ├── design/
│   ├── seo/
│   ├── forms/
│   ├── users/
│   ├── settings/
│   └── analytics/
│
├── api/
│   ├── admin/
│   │   ├── auth/
│   │   ├── projects/
│   │   ├── blog/
│   │   ├── media/
│   │   ├── settings/
│   │   └── analytics/
│   └── [...otherRoutes]
│
├── components/
│   ├── admin/
│   │   ├── layout/
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminHeader.tsx
│   │   │   └── AdminBreadcrumb.tsx
│   │   ├── ui/
│   │   │   ├── DataTable.tsx
│   │   │   ├── RichTextEditor.tsx
│   │   │   ├── FileUploader.tsx
│   │   │   ├── ColorPicker.tsx
│   │   │   └── ImageGallery.tsx
│   │   ├── forms/
│   │   │   ├── ProjectForm.tsx
│   │   │   ├── BlogForm.tsx
│   │   │   └── ServiceForm.tsx
│   │   └── widgets/
│   │       ├── StatsCard.tsx
│   │       ├── ActivityFeed.tsx
│   │       └── QuickActions.tsx
│   └── [...site components]
│
├── lib/
│   ├── admin/
│   │   ├── auth.ts
│   │   ├── permissions.ts
│   │   ├── api-client.ts
│   │   └── utils.ts
│   └── [...other libs]
│
└── prisma/
    └── schema.prisma
```

---

## 🗄️ Veritabanı Şeması

### Core Tables

```prisma
// schema.prisma

// ============= USER MANAGEMENT =============

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String    // Hashed
  role          Role      @default(EDITOR)
  avatar        String?
  isActive      Boolean   @default(true)
  emailVerified DateTime?
  
  // Relations
  posts         BlogPost[]
  projects      Project[]
  sessions      Session[]
  accounts      Account[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  lastLoginAt   DateTime?
  
  @@map("users")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("sessions")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

enum Role {
  SUPER_ADMIN
  ADMIN
  EDITOR
  AUTHOR
  VIEWER
}

// ============= CONTENT MANAGEMENT =============

model Project {
  id                String    @id @default(cuid())
  title             String
  slug              String    @unique
  description       String    @db.Text
  shortDescription  String
  category          String
  tags              String[]
  duration          String?
  completedAt       String?
  status            ProjectStatus @default(IN_PROGRESS)
  
  // Technical
  technologies      String[]
  client            String?
  
  // Media
  glbUrl            String?
  images            String[]
  videoUrl          String?
  
  // Details
  problem           String?   @db.Text
  solution          String?   @db.Text
  results           String[]
  challenges        String[]
  
  // Testimonial
  testimonialContent String?  @db.Text
  testimonialAuthor  String?
  testimonialRole    String?
  testimonialCompany String?
  
  // Links
  demoUrl           String?
  githubUrl         String?
  caseStudyUrl      String?
  
  // SEO
  metaTitle         String?
  metaDescription   String?
  metaKeywords      String[]
  ogImage           String?
  
  // Visibility
  isPublished       Boolean   @default(false)
  publishedAt       DateTime?
  isFeatured        Boolean   @default(false)
  viewCount         Int       @default(0)
  
  // Relations
  authorId          String
  author            User      @relation(fields: [authorId], references: [id])
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([slug])
  @@index([category])
  @@index([status])
  @@index([isPublished])
  @@map("projects")
}

enum ProjectStatus {
  COMPLETED
  IN_PROGRESS
  PLANNED
}

model BlogPost {
  id              String    @id @default(cuid())
  title           String
  slug            String    @unique
  content         String    @db.Text
  excerpt         String?
  coverImage      String?
  
  // Categorization
  categoryId      String
  category        BlogCategory @relation(fields: [categoryId], references: [id])
  tags            BlogTag[]
  
  // SEO
  metaTitle       String?
  metaDescription String?
  metaKeywords    String[]
  ogImage         String?
  
  // Publishing
  status          PostStatus @default(DRAFT)
  isPublished     Boolean    @default(false)
  publishedAt     DateTime?
  scheduledFor    DateTime?
  
  // Stats
  viewCount       Int        @default(0)
  readingTime     Int?       // in minutes
  
  // Relations
  authorId        String
  author          User       @relation(fields: [authorId], references: [id])
  
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt
  
  @@index([slug])
  @@index([categoryId])
  @@index([status])
  @@index([isPublished])
  @@map("blog_posts")
}

enum PostStatus {
  DRAFT
  PUBLISHED
  SCHEDULED
  ARCHIVED
}

model BlogCategory {
  id          String     @id @default(cuid())
  name        String     @unique
  slug        String     @unique
  description String?
  color       String?    // Hex color
  icon        String?
  order       Int        @default(0)
  
  posts       BlogPost[]
  
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  @@map("blog_categories")
}

model BlogTag {
  id        String     @id @default(cuid())
  name      String     @unique
  slug      String     @unique
  
  posts     BlogPost[]
  
  createdAt DateTime   @default(now())
  
  @@map("blog_tags")
}

// ============= PAGE CONTENT MANAGEMENT =============

model PageSection {
  id            String   @id @default(cuid())
  pageId        String
  sectionType   String   // hero, services, stats, cta, etc.
  order         Int
  isVisible     Boolean  @default(true)
  
  // Flexible JSON content
  content       Json     // Stores section-specific data
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([pageId])
  @@map("page_sections")
}

model Service {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String   @db.Text
  icon        String?
  features    String[]
  process     String[]
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  
  // SEO
  metaTitle   String?
  metaDescription String?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("services")
}

// ============= FORM MANAGEMENT =============

model FormSubmission {
  id          String   @id @default(cuid())
  formType    String   // contact, quote, custom
  
  // Contact form specific
  name        String?
  email       String?
  phone       String?
  company     String?
  service     String?
  message     String?  @db.Text
  fileUrl     String?
  
  // Custom form data
  data        Json?    // For flexible form data
  
  // Status
  status      SubmissionStatus @default(NEW)
  notes       String?  @db.Text
  assignedTo  String?
  
  // Metadata
  ipAddress   String?
  userAgent   String?
  referrer    String?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([formType])
  @@index([status])
  @@index([createdAt])
  @@map("form_submissions")
}

enum SubmissionStatus {
  NEW
  IN_REVIEW
  REPLIED
  ARCHIVED
}

// ============= MEDIA MANAGEMENT =============

model Media {
  id          String    @id @default(cuid())
  filename    String
  originalName String
  mimeType    String
  size        Int       // bytes
  url         String
  thumbnailUrl String?
  
  // Metadata
  width       Int?
  height      Int?
  alt         String?
  caption     String?
  
  // Organization
  folder      String?
  tags        String[]
  
  // Usage tracking
  usageCount  Int       @default(0)
  
  // Relations
  uploadedBy  String
  uploader    User      @relation(fields: [uploadedBy], references: [id])
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@index([mimeType])
  @@index([folder])
  @@map("media")
}

// ============= TESTIMONIALS =============

model Testimonial {
  id        String   @id @default(cuid())
  content   String   @db.Text
  author    String
  role      String
  company   String
  avatar    String?
  rating    Int?     @default(5)
  
  isApproved Boolean @default(false)
  isFeatured Boolean @default(false)
  
  projectId  String?  // Optional link to project
  
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  @@map("testimonials")
}

// ============= SITE SETTINGS =============

model Settings {
  id        String   @id @default(cuid())
  key       String   @unique
  value     Json
  group     String   // general, theme, seo, email, etc.
  
  updatedAt DateTime @updatedAt
  updatedBy String?
  
  @@index([group])
  @@map("settings")
}

// ============= ANALYTICS =============

model PageView {
  id        String   @id @default(cuid())
  path      String
  userAgent String?
  referer   String?
  ipAddress String?
  country   String?
  city      String?
  
  createdAt DateTime @default(now())
  
  @@index([path])
  @@index([createdAt])
  @@map("page_views")
}

// ============= ACTIVITY LOG =============

model ActivityLog {
  id          String   @id @default(cuid())
  userId      String?
  action      String   // created, updated, deleted, published
  entity      String   // project, blog_post, user, etc.
  entityId    String?
  changes     Json?    // What changed
  ipAddress   String?
  
  createdAt   DateTime @default(now())
  
  @@index([userId])
  @@index([entity])
  @@index([createdAt])
  @@map("activity_logs")
}
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/admin/auth/login
POST   /api/admin/auth/logout
POST   /api/admin/auth/register
POST   /api/admin/auth/forgot-password
POST   /api/admin/auth/reset-password
GET    /api/admin/auth/me
POST   /api/admin/auth/refresh
POST   /api/admin/auth/verify-2fa
```

### Projects
```
GET    /api/admin/projects              # List all
GET    /api/admin/projects/:id          # Get one
POST   /api/admin/projects              # Create
PUT    /api/admin/projects/:id          # Update
DELETE /api/admin/projects/:id          # Delete
PATCH  /api/admin/projects/:id/publish  # Publish/Unpublish
POST   /api/admin/projects/bulk-action  # Bulk operations
GET    /api/admin/projects/:id/analytics # Project stats
```

### Blog
```
GET    /api/admin/blog/posts
GET    /api/admin/blog/posts/:id
POST   /api/admin/blog/posts
PUT    /api/admin/blog/posts/:id
DELETE /api/admin/blog/posts/:id
PATCH  /api/admin/blog/posts/:id/publish

GET    /api/admin/blog/categories
POST   /api/admin/blog/categories
PUT    /api/admin/blog/categories/:id
DELETE /api/admin/blog/categories/:id

GET    /api/admin/blog/tags
POST   /api/admin/blog/tags
DELETE /api/admin/blog/tags/:id
```

### Media
```
POST   /api/admin/media/upload          # Single/Multiple
GET    /api/admin/media                 # List with filters
GET    /api/admin/media/:id
DELETE /api/admin/media/:id
POST   /api/admin/media/bulk-delete
PATCH  /api/admin/media/:id             # Update metadata
```

### Forms
```
GET    /api/admin/forms/submissions
GET    /api/admin/forms/submissions/:id
PATCH  /api/admin/forms/submissions/:id # Update status
DELETE /api/admin/forms/submissions/:id
POST   /api/admin/forms/submissions/export
```

### Settings
```
GET    /api/admin/settings              # Get all or by group
GET    /api/admin/settings/:key
PUT    /api/admin/settings/:key
POST   /api/admin/settings/bulk-update
```

### Users
```
GET    /api/admin/users
GET    /api/admin/users/:id
POST   /api/admin/users
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id
PATCH  /api/admin/users/:id/toggle-active
POST   /api/admin/users/:id/reset-password
```

### Analytics
```
GET    /api/admin/analytics/overview
GET    /api/admin/analytics/traffic
GET    /api/admin/analytics/content-performance
GET    /api/admin/analytics/forms
POST   /api/admin/analytics/export
```

### Pages & Services
```
GET    /api/admin/pages/:page/sections
PUT    /api/admin/pages/:page/sections/:id
POST   /api/admin/pages/:page/sections/reorder

GET    /api/admin/services
POST   /api/admin/services
PUT    /api/admin/services/:id
DELETE /api/admin/services/:id
POST   /api/admin/services/reorder
```

---

## 🔒 Güvenlik

### 1. Authentication & Authorization
- NextAuth.js ile güvenli authentication
- JWT token based sistem
- Refresh token rotation
- 2FA (Two-Factor Authentication) desteği
- Session management
- IP-based access control

### 2. Rol Bazlı Yetkilendirme
```typescript
// Yetki Matrisi

SUPER_ADMIN:
  - Tüm yetkiler
  - User management
  - System settings
  - Backup/Restore

ADMIN:
  - Content CRUD (tümü)
  - Media management
  - Form submissions
  - Analytics
  - User management (limited)
  - Settings (limited)

EDITOR:
  - Content CRUD (tümü)
  - Media upload/edit
  - Form submissions (view)
  - Publish/Unpublish

AUTHOR:
  - Content create/edit (own)
  - Media upload
  - Cannot publish
  - Cannot delete

VIEWER:
  - View only
  - No edit rights
  - Analytics view
```

### 3. API Security
- Rate limiting
- CORS configuration
- Input validation (Zod)
- SQL injection protection (Prisma)
- XSS protection
- CSRF tokens
- File upload validation
- Image optimization & sanitization

### 4. Data Protection
- Encrypted passwords (bcrypt)
- Encrypted sensitive settings
- Regular backups
- Audit logs
- GDPR compliance ready

---

## 👥 Kullanıcı Rolleri ve İzinler

### Super Admin (Full Access)
✅ Tüm sistem erişimi
✅ Kullanıcı oluşturma/silme
✅ Sistem ayarları
✅ Backup/Restore
✅ Tüm logları görme

### Admin (Management)
✅ İçerik yönetimi (tümü)
✅ Kullanıcı düzenleme (sınırlı)
✅ Analitik raporlar
✅ Form yönetimi
✅ Medya yönetimi
⛔ Sistem kritik ayarlar

### Editor (Content Manager)
✅ Proje oluştur/düzenle/sil
✅ Blog yazı oluştur/düzenle/sil
✅ Yayınlama/geri alma
✅ Medya upload/düzenle
✅ Form başvurularını görme
⛔ Kullanıcı yönetimi
⛔ Sistem ayarları

### Author (Content Creator)
✅ İçerik oluştur/düzenle (sadece kendi)
✅ Medya upload
✅ Taslak kaydet
⛔ Yayınlama
⛔ Silme
⛔ Başkalarının içeriği

### Viewer (Read-only)
✅ Tüm içerikleri görüntüleme
✅ Analitik raporları görme
⛔ Herhangi bir değişiklik yapma

---

## 📊 Dashboard Widget'ları

### Ana Sayfa Özeti
1. **İstatistik Kartları**
   - Toplam Projeler
   - Toplam Blog Yazıları
   - Bekleyen Form Başvuruları
   - Aylık Ziyaretçi

2. **Son Aktiviteler**
   - Son 10 aktivite logu
   - Gerçek zamanlı güncelleme

3. **Hızlı Aksiyonlar**
   - Yeni Proje Ekle
   - Yeni Blog Yazısı
   - Form Başvurularını İncele
   - Medya Upload

4. **Performans Grafikleri**
   - Aylık trafik trendi
   - İçerik yayınlama trendi
   - Form submission trendi

5. **Sistem Durumu**
   - Disk kullanımı
   - Database status
   - API health
   - Last backup

---

## 🎨 UI/UX Özellikleri

### Design System
- **Renkler**: LnY brand colors (#F5C10E primary)
- **Typography**: Montserrat + Inter
- **Dark/Light Mode**: Destekli
- **Responsive**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliant

### Key Components
1. **Rich Text Editor**: Tiptap veya Lexical
2. **Drag & Drop**: react-beautiful-dnd
3. **File Upload**: React Dropzone
4. **Data Tables**: TanStack Table (sorting, filtering, pagination)
5. **Charts**: Recharts veya Chart.js
6. **Toast Notifications**: Sonner
7. **Modal/Dialog**: Radix UI Dialog
8. **Color Picker**: React Color
9. **Date Picker**: React Day Picker
10. **Image Editor**: Cropper.js integration

### Animasyonlar
- Smooth page transitions
- Loading states
- Success/Error feedback
- Skeleton loaders
- Hover effects

---

## 🚀 Performans Optimizasyonları

1. **Image Optimization**
   - Next.js Image component
   - WebP format
   - Lazy loading
   - Responsive images

2. **Caching**
   - Redis caching
   - ISR (Incremental Static Regeneration)
   - Client-side caching (TanStack Query)

3. **Database**
   - Indexed queries
   - Connection pooling
   - Query optimization

4. **API**
   - Response compression
   - Pagination
   - Field selection
   - Rate limiting

---

## 📱 Mobile Optimization

- Responsive admin panel
- Touch-friendly controls
- Mobile-specific layouts
- Progressive Web App (PWA) hazırlığı

---

## 🌍 Multi-language Hazırlığı

- i18n setup (next-intl)
- Content translation interface
- Language switcher
- RTL support hazırlığı

---

## 🔄 Workflow & Automation

1. **Content Workflow**
   - Draft → Review → Scheduled → Published
   - Approval system
   - Version history

2. **Automated Tasks**
   - Scheduled publishing
   - Automatic backups
   - Email notifications
   - Sitemap generation
   - Cache invalidation

3. **Webhooks**
   - Content published event
   - Form submission event
   - Custom webhooks

---

## 📈 Next Steps (Implementation Roadmap)

### Phase 1: Foundation (Week 1-2)
- ✅ Database schema & migration
- ✅ Authentication system
- ✅ Basic admin layout
- ✅ User management

### Phase 2: Core Features (Week 3-4)
- ✅ Project management
- ✅ Blog management
- ✅ Media library
- ✅ Form submissions

### Phase 3: Advanced Features (Week 5-6)
- ✅ SEO management
- ✅ Analytics dashboard
- ✅ Settings management
- ✅ Email templates

### Phase 4: Polish & Testing (Week 7-8)
- ✅ UI/UX refinement
- ✅ Performance optimization
- ✅ Security audit
- ✅ User acceptance testing

---

## 📝 Notlar

Bu admin paneli:
- **Modüler** yapıda tasarlandı
- **Ölçeklenebilir** mimari
- **Güvenlik** odaklı
- **Kullanıcı dostu** arayüz
- **Performans** optimize edilmiş
- **SEO** dostu
- **Mobile** uyumlu

Tüm bileşenler **type-safe** ve **test edilebilir** yapıda olacak.

---

**Son Güncelleme:** 6 Ekim 2025
**Versiyon:** 1.0.0
**Durum:** 🎯 Planlama Tamamlandı - Implementation Ready
