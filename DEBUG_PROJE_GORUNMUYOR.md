# 🔍 Proje Görünmüyor - Debug Rehberi

## Sorun
Proje oluşturdunuz ama projeler listesinde görünmüyor.

## ✅ Debug Adımları

### 1. Prisma Studio'da Kontrol Edin

Prisma Studio açıldı (http://localhost:5555):

1. **Sol menüden "Project" tablosunu seçin**
2. **Oluşturduğunuz projeyi görüyor musunuz?**
   - ✅ **Görüyorsanız**: Veritabanı OK, frontend sorunu
   - ❌ **Görmüyorsanız**: API endpoint çalışmıyor

### 2. Browser Console Kontrolü

1. **Projeler sayfasına gidin**: http://localhost:3001/content/projects
2. **F12** tuşuna basın (Developer Tools)
3. **Console** sekmesine bakın
4. **Kırmızı hatalar var mı?**

#### Olası Hatalar:

**A) 401 Unauthorized**
```
❌ Solution: Çıkış yapıp tekrar giriş yapın
```

**B) 500 Internal Server Error**
```
❌ Solution: Terminal'de API loglarını kontrol edin
```

**C) Network Error / Failed to fetch**
```
❌ Solution: Development server çalışıyor mu kontrol edin
```

### 3. Network Tab Kontrolü

1. **F12 > Network sekmesi**
2. **Sayfayı yenileyin (Ctrl + Shift + R)**
3. **"projects" isteğini bulun**
4. **Response'a bakın**:
   - `projects: []` → Veritabanında proje yok
   - `projects: [{...}]` → Proje var ama gösterilmiyor
   - `error: "..."` → API hatası

### 4. Doğru URL'de misiniz?

Projeler sayfası şurada olmalı:
```
✅ http://localhost:3001/content/projects
❌ http://localhost:3001/admin/content/projects  (YANLIŞ!)
```

### 5. Development Server Çalışıyor mu?

Terminal'de kontrol edin:
```powershell
# Eğer server durmuşsa yeniden başlatın:
npm run dev
```

## 🔧 Hızlı Çözüm Testleri

### Test 1: Veritabanını Kontrol Et
```powershell
npx prisma studio
```
Tarayıcıda açılan Prisma Studio'da Project tablosuna bakın.

### Test 2: API Endpoint Test
Tarayıcıda şu URL'i açın:
```
http://localhost:3001/api/admin/projects
```

**Beklenen sonuç:**
```json
{
  "projects": [...],
  "total": 1,
  "page": 1,
  "totalPages": 1
}
```

### Test 3: Manuel Proje Ekleme
Eğer UI çalışmıyorsa, direkt Prisma Studio'dan ekleyin:

1. Prisma Studio'da **Project** tablosunu açın
2. **Add record** butonuna tıklayın
3. Şu alanları doldurun:
   - `title`: "Test Projesi"
   - `slug`: "test-projesi"
   - `description`: "Test açıklama"
   - `content`: "Test içerik"
   - `category`: "Mekanik Tasarım"
   - `status`: "PUBLISHED"
   - `authorId`: (admin kullanıcınızın ID'si)
4. **Save** edin
5. Projeler sayfasını yenileyin

## 🐛 Olası Sorunlar ve Çözümleri

### Sorun 1: "Session expired" veya 401 hatası
**Çözüm:**
```
1. Çıkış yapın
2. Tarayıcı cache'ini temizleyin (Ctrl + Shift + Delete)
3. Yeniden giriş yapın (admin@lny.com.tr / admin123)
```

### Sorun 2: Proje ekleniyor ama görünmüyor
**Çözüm:**
```
1. Sayfayı hard refresh yapın (Ctrl + Shift + R)
2. Router.refresh() çalışmıyor olabilir
3. Manuel olarak /content/projects sayfasına gidin
```

### Sorun 3: API 500 hatası veriyor
**Çözüm:**
```powershell
# Prisma client'ı yeniden generate edin
npx prisma generate

# Database'i sıfırlayın (DİKKAT: Tüm data silinir!)
npx prisma db push --force-reset
npm run db:seed
```

### Sorun 4: TypeScript hataları
**Çözüm:**
```powershell
# TypeScript server'ı restart edin
# VS Code'da: Ctrl + Shift + P > "TypeScript: Restart TS Server"

# Veya development server'ı restart edin
npm run dev
```

## 📊 Proje Akışı

```
[Form Submit] 
    ↓
[API: POST /api/admin/projects]
    ↓
[Prisma: project.create()]
    ↓
[Database: INSERT]
    ↓
[router.push("/content/projects")]
    ↓
[API: GET /api/admin/projects]
    ↓
[Server Component: ProjectsPage]
    ↓
[ProjectsTable Component]
    ↓
[Render Projects]
```

## 🎯 Hızlı Test Komutu

Terminal'de çalıştırın:
```powershell
# Tüm projeleri listele
npx prisma studio
```

Sonra tarayıcıda açılan Prisma Studio'da Project tablosuna bakın.

## 📞 Sonuç

Lütfen şunları kontrol edin ve bana bildirin:

1. ✅ Prisma Studio'da proje görünüyor mu?
2. ✅ Browser Console'da hata var mı?
3. ✅ Network tab'de API isteği başarılı mı?
4. ✅ Hangi URL'desiniz?

Bu bilgileri aldıktan sonra sorunu tam olarak çözebilirim! 🚀
