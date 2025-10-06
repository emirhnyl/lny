# 🚀 LnY Admin Paneli - Quick Start Guide

## 📋 Döküman İndeksi

Oluşturulan 3 ana dokümantasyon dosyası:

1. **`ADMIN_PANEL_ARCHITECTURE.md`** - Detaylı Mimari ve Site Haritası
2. **`ADMIN_IMPLEMENTATION_GUIDE.md`** - Kurulum ve Kod Örnekleri  
3. **`ADMIN_VISUAL_ARCHITECTURE.md`** - Görsel Diyagramlar ve Akışlar

---

## ⚡ Hızlı Başlangıç

### 1️⃣ Gerekli Bağımlılıkları Yükle

```powershell
# Temel bağımlılıklar
npm install next@latest react@latest react-dom@latest typescript

# UI ve Form
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install react-hook-form zod @hookform/resolvers

# Database ve Auth
npm install prisma @prisma/client next-auth bcryptjs
npm install -D @types/bcryptjs prisma

# State ve Data
npm install @tanstack/react-query @tanstack/react-table zustand

# Utilities
npm install clsx tailwind-merge sonner lucide-react

# Rich Text Editor
npm install @tiptap/react @tiptap/starter-kit

# Charts
npm install recharts date-fns
```

### 2️⃣ Prisma Setup

```powershell
# Prisma başlat
npx prisma init

# Schema'yı kopyala (ADMIN_PANEL_ARCHITECTURE.md'den)
# Sonra migration yap
npx prisma migrate dev --name init

# Prisma Client oluştur
npx prisma generate

# Database'i görüntüle
npx prisma studio
```

### 3️⃣ Environment Variables

`.env.local` oluştur:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lny_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="super-secret-key-change-in-production"

# S3 (Medya için)
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
AWS_S3_BUCKET="lny-media"

# Email
RESEND_API_KEY="re_xxxxx"
RESEND_FROM_EMAIL="noreply@lny.com.tr"

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4️⃣ Klasör Yapısını Oluştur

```powershell
# Admin sayfaları
New-Item -Path "app/(admin)/dashboard" -ItemType Directory -Force
New-Item -Path "app/(admin)/content/projects" -ItemType Directory -Force
New-Item -Path "app/(admin)/content/blog" -ItemType Directory -Force
New-Item -Path "app/(admin)/media" -ItemType Directory -Force
New-Item -Path "app/(admin)/design" -ItemType Directory -Force
New-Item -Path "app/(admin)/seo" -ItemType Directory -Force
New-Item -Path "app/(admin)/forms" -ItemType Directory -Force
New-Item -Path "app/(admin)/users" -ItemType Directory -Force
New-Item -Path "app/(admin)/settings" -ItemType Directory -Force

# API routes
New-Item -Path "app/api/admin/auth" -ItemType Directory -Force
New-Item -Path "app/api/admin/projects" -ItemType Directory -Force
New-Item -Path "app/api/admin/blog" -ItemType Directory -Force
New-Item -Path "app/api/admin/media" -ItemType Directory -Force
New-Item -Path "app/api/admin/users" -ItemType Directory -Force

# Components
New-Item -Path "components/admin/layout" -ItemType Directory -Force
New-Item -Path "components/admin/ui" -ItemType Directory -Force
New-Item -Path "components/admin/forms" -ItemType Directory -Force
New-Item -Path "components/admin/widgets" -ItemType Directory -Force

# Lib
New-Item -Path "lib/admin" -ItemType Directory -Force
```

### 5️⃣ shadcn/ui Setup

```powershell
# shadcn/ui başlat
npx shadcn-ui@latest init

# Gerekli bileşenleri yükle
npx shadcn-ui@latest add button input textarea label
npx shadcn-ui@latest add select dialog dropdown-menu
npx shadcn-ui@latest add tabs table card badge avatar
npx shadcn-ui@latest add toast switch checkbox
```

---

## 📂 Temel Dosyalar

### Ana Dosyalar Oluşturma Sırası

1. **Database Models** - `prisma/schema.prisma`
2. **Auth Config** - `lib/admin/auth.ts`
3. **Permissions** - `lib/admin/permissions.ts`
4. **Admin Layout** - `app/(admin)/layout.tsx`
5. **Sidebar** - `components/admin/layout/AdminSidebar.tsx`
6. **Header** - `components/admin/layout/AdminHeader.tsx`
7. **Dashboard** - `app/(admin)/dashboard/page.tsx`
8. **API Routes** - `app/api/admin/*/route.ts`

**Detaylı kod örnekleri için:** `ADMIN_IMPLEMENTATION_GUIDE.md`

---

## 🎯 Özellik Önceliklendirmesi

### Phase 1: Temel (Hafta 1-2) - MUST HAVE
- ✅ Authentication (Login/Logout)
- ✅ User Management
- ✅ Admin Layout (Sidebar, Header)
- ✅ Dashboard (Temel stats)
- ✅ Database setup

### Phase 2: İçerik (Hafta 3-4) - MUST HAVE
- ✅ Project CRUD
- ✅ Blog CRUD  
- ✅ Media Library (Upload/List)
- ✅ Form Submissions (View)

### Phase 3: Gelişmiş (Hafta 5-6) - SHOULD HAVE
- ✅ Rich Text Editor
- ✅ SEO Management
- ✅ Settings Manager
- ✅ Analytics Dashboard
- ✅ Email Templates

### Phase 4: Ekstra (Hafta 7-8) - NICE TO HAVE
- 🔄 Advanced Analytics
- 🔄 Bulk Operations
- 🔄 Activity Logs
- 🔄 2FA
- 🔄 Automated Backups

---

## 🎨 Admin Panel URL Yapısı

```
/admin/login                    # Giriş
/admin/dashboard                # Ana sayfa
/admin/content/projects         # Proje listesi
/admin/content/projects/new     # Yeni proje
/admin/content/projects/[id]    # Proje düzenle
/admin/content/blog             # Blog listesi
/admin/content/blog/new         # Yeni yazı
/admin/content/blog/[id]        # Yazı düzenle
/admin/content/pages            # Sayfa yönetimi
/admin/content/services         # Hizmet yönetimi
/admin/media                    # Medya kütüphanesi
/admin/design                   # Tasarım ayarları
/admin/seo                      # SEO yönetimi
/admin/forms                    # Form başvuruları
/admin/users                    # Kullanıcı yönetimi
/admin/settings                 # Genel ayarlar
/admin/analytics                # Analitik raporlar
```

---

## 👥 Kullanıcı Rolleri (Özet)

| Rol          | Projeler | Blog | Medya | Ayarlar | Kullanıcılar |
|--------------|----------|------|-------|---------|--------------|
| SUPER_ADMIN  | ✅ Tümü  | ✅ Tümü | ✅ Tümü | ✅ Tümü  | ✅ Tümü |
| ADMIN        | ✅ Tümü  | ✅ Tümü | ✅ Tümü | ⚠️ Sınırlı | ⚠️ Sınırlı |
| EDITOR       | ✅ Tümü  | ✅ Tümü | ⚠️ Ekle/Düzenle | ❌ | ❌ |
| AUTHOR       | ⚠️ Kendi | ⚠️ Kendi | ⚠️ Sadece Ekle | ❌ | ❌ |
| VIEWER       | 👁️ Görüntüle | 👁️ Görüntüle | 👁️ Görüntüle | ❌ | ❌ |

---

## 🔒 Güvenlik Checklist

- [ ] JWT token authentication
- [ ] Password hashing (bcrypt)
- [ ] Role-based permissions
- [ ] Input validation (Zod)
- [ ] SQL injection protection (Prisma)
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Rate limiting
- [ ] File upload validation
- [ ] HTTPS only in production
- [ ] Secure cookies (httpOnly, secure)
- [ ] Session timeout
- [ ] Activity logging

---

## 📊 Core Features Checklist

### Authentication ✅
- [ ] Login/Logout
- [ ] Password reset
- [ ] Session management
- [ ] JWT tokens
- [ ] 2FA (optional)

### Projects 📁
- [ ] List with filters
- [ ] Create/Edit/Delete
- [ ] GLB model upload
- [ ] Image gallery
- [ ] Status management
- [ ] SEO fields
- [ ] Publish/Unpublish

### Blog ✍️
- [ ] Post CRUD
- [ ] Rich text editor
- [ ] Categories
- [ ] Tags
- [ ] Scheduling
- [ ] SEO optimization

### Media 🖼️
- [ ] File upload (drag & drop)
- [ ] Image preview
- [ ] GLB viewer
- [ ] Organize by folders
- [ ] Search & filter
- [ ] Metadata editing

### Forms 📧
- [ ] View submissions
- [ ] Status tracking
- [ ] Export to CSV
- [ ] Email notifications
- [ ] Auto-reply

### Users 👤
- [ ] User CRUD
- [ ] Role assignment
- [ ] Permission matrix
- [ ] Activity tracking

### Settings ⚙️
- [ ] Site configuration
- [ ] Theme customization
- [ ] Email settings
- [ ] SEO defaults
- [ ] Integrations

### Analytics 📈
- [ ] Traffic overview
- [ ] Content performance
- [ ] Form analytics
- [ ] Export reports

---

## 🛠️ Useful Commands

```powershell
# Development
npm run dev

# Build
npm run build

# Start production
npm run start

# Prisma Studio
npx prisma studio

# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name [migration_name]

# Seed database
npx prisma db seed

# Reset database
npx prisma migrate reset

# Check types
npx tsc --noEmit

# Lint
npm run lint
```

---

## 📚 Referans Linkler

### Documentation
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- NextAuth: https://next-auth.js.org
- TanStack Query: https://tanstack.com/query
- shadcn/ui: https://ui.shadcn.com

### Libraries
- React Hook Form: https://react-hook-form.com
- Zod: https://zod.dev
- Tiptap: https://tiptap.dev
- Recharts: https://recharts.org
- Lucide Icons: https://lucide.dev

---

## 🎯 İlk Admin Kullanıcısı Oluşturma

```typescript
// scripts/create-admin.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@lny.com.tr',
      name: 'Admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
      emailVerified: new Date(),
    },
  })
  
  console.log('✅ Admin created:', admin.email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Çalıştır:
```powershell
npx ts-node scripts/create-admin.ts
```

---

## 🚨 Troubleshooting

### Database Connection Error
```powershell
# PostgreSQL çalışıyor mu kontrol et
# Connection string doğru mu?
npx prisma db push
```

### Prisma Client Error
```powershell
# Client'ı yeniden oluştur
npx prisma generate
```

### TypeScript Errors
```powershell
# Types'ı kontrol et
npx tsc --noEmit
```

### Authentication Not Working
- `.env.local` dosyası var mı?
- `NEXTAUTH_SECRET` ayarlandı mı?
- `NEXTAUTH_URL` doğru mu?

---

## 📞 Destek ve İletişim

Sorun yaşarsanız:
1. Önce ilgili `.md` dosyasını inceleyin
2. TypeScript hatalarını kontrol edin
3. Browser console'a bakın
4. Network tab'ı inceleyin

---

## 🎉 Başarı Kriterleri

Admin paneli tamamlandığında şunları yapabileceksiniz:

✅ Güvenli giriş yapabilme
✅ Proje ekleyip düzenleyebilme (GLB modeller dahil)
✅ Blog yazıları yönetebilme
✅ Medya kütüphanesini kullanabilme
✅ Form başvurularını görüntüleyebilme
✅ Kullanıcı yönetimi yapabilme
✅ Site ayarlarını değiştirebilme
✅ SEO ayarlarını yapabilme
✅ Analitik raporları görüntüleyebilme

---

## 📈 Next Steps After Completion

1. **Testing**: Unit ve integration testler yaz
2. **Documentation**: API dokümantasyonu oluştur
3. **Deployment**: Production ortamına deploy et
4. **Monitoring**: Error tracking (Sentry) ekle
5. **Optimization**: Performance iyileştirmeleri
6. **Training**: Kullanıcı eğitimi ver

---

## 🎓 Öğrenme Kaynakları

- **Next.js 15 App Router**: https://nextjs.org/docs/app
- **Prisma Best Practices**: https://www.prisma.io/docs/guides
- **NextAuth.js Tutorial**: https://next-auth.js.org/getting-started
- **React Hook Form**: https://react-hook-form.com/get-started
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

---

**Version:** 1.0.0
**Last Updated:** 6 Ekim 2025
**Status:** 📋 Ready for Implementation

**Tahmini Tamamlanma Süresi:** 6-8 hafta
**Zorluk Seviyesi:** Orta-İleri
**Tech Stack:** Next.js 15 + Prisma + NextAuth + TypeScript

---

## 💡 Pro Tips

1. **Incrementally Build**: Her özelliği tek tek ekle ve test et
2. **Version Control**: Her major feature için git commit at
3. **Code Review**: Mümkünse başkasına kod review yaptır
4. **Documentation**: Kod yazarken yorum ekle
5. **Testing**: Her yeni feature'ı test et
6. **Security First**: Güvenliği baştan düşün
7. **Performance**: Lazy loading ve code splitting kullan
8. **User Experience**: Admin kullanıcısından feedback al

---

🎯 **Başarılar! Admin panelinizi oluşturmaya başlayabilirsiniz!**
