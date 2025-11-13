# 🎯 LnY Admin Paneli - Başlangıç Rehberi

## 🚀 Hızlı Başlangıç

### 1️⃣ Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Prisma Client oluştur
npm run db:generate
```

### 2️⃣ Database Kurulumu

**.env.local** dosyasını düzenleyin:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lny_admin"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key"
```

**Database'i oluşturun:**

```bash
# Database push (migration olmadan)
npm run db:push

# Test verileri ekle (admin user + sample data)
npm run db:seed
```

### 3️⃣ Development Server

```bash
npm run dev
```

**Admin Paneline Git:** http://localhost:3000/admin/login

**Test Kullanıcı:**
- Email: `admin@lny.com.tr`
- Şifre: `admin123`

---

## 📚 Dokümantasyon

- **LNY_ADMIN-MAIN.md** - Ana dosya (durum, yapı, özellikler)
- **ADMIN_PANEL_ARCHITECTURE.md** - Detaylı mimari
- **ADMIN_IMPLEMENTATION_GUIDE.md** - Kod örnekleri
- **ADMIN_VISUAL_ARCHITECTURE.md** - Görsel diyagramlar

---

## 🎯 Tamamlanan Özellikler

✅ Authentication (NextAuth + JWT)
✅ Admin Layout (Sidebar + Header)
✅ Dashboard (Stats + Activity)
✅ Projeler Listesi
✅ Database (14 model)
✅ Rol Sistemi (5 seviye)
✅ Permission Sistemi

---

## 🔄 Sonraki Adımlar

⏳ Proje CRUD (Create, Update, Delete)
⏳ Blog Yönetimi
⏳ Medya Kütüphanesi
⏳ Form Başvuruları
⏳ Kullanıcı Yönetimi

---

## 🐛 Sorun mu var?

1. `LNY_ADMIN-MAIN.md` dosyasına bakın
2. Database bağlantısını kontrol edin
3. `.env.local` ayarlarını kontrol edin

---

## 📊 Komutlar

```bash
# Development
npm run dev

# Database
npm run db:generate  # Prisma Client oluştur
npm run db:push      # Database'e push
npm run db:seed      # Test verileri ekle
npm run db:studio    # Prisma Studio aç

# Build
npm run build
npm run start
```

---

© 2025 LnY - Admin Panel v1.0.0
