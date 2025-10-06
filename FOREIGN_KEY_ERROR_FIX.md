# 🔧 Foreign Key Constraint Hatası - Çözüm

## 🐛 Hata

```
Foreign key constraint violated on the foreign key
PrismaClientKnownRequestError: P2003
```

**Sebep:** `authorId` alanı veritabanında olmayan bir kullanıcıyı referans ediyor.

---

## ✅ Yapılan Düzeltmeler

### 1. **User Validation Eklendi**

```typescript
// Session'dan gelen kullanıcı ID'sini doğrula
const user = await prisma.user.findUnique({
  where: { id: session.user.id }
})

if (!user) {
  return NextResponse.json({ error: "User not found" }, { status: 404 })
}
```

### 2. **Logging Eklendi**

```typescript
console.log("Session user:", session.user)
console.log("Creating project with authorId:", user.id)
console.log("Project data:", projectData)
console.log("Project created successfully:", project.id)
```

Artık terminal'de detaylı bilgi görebilirsiniz!

### 3. **Doğru User ID Kullanımı**

```typescript
// ÖNCEKİ (Hatalı olabilir)
authorId: session.user.id

// ŞİMDİ (Doğrulanmış)
authorId: user.id
```

---

## 🧪 Test Adımları

### 1. **Prisma Studio'da Kontrol Edin**

Prisma Studio açıldı: **http://localhost:5555**

**Kontrol:**
1. Sol menüden **"User"** tablosunu seçin
2. Admin kullanıcısı var mı?
   - Email: `admin@lny.com.tr`
   - Role: `SUPER_ADMIN`
3. Kullanıcının **ID'sini** not edin

### 2. **Database Boşsa - Seed Çalıştırın**

Eğer User tablosu boşsa:

```bash
npm run db:seed
```

**Çıktı:**
```
✅ Super Admin created: admin@lny.com.tr
✅ Blog category created: Teknoloji
✅ Service created: Tasarım
...
🎉 Seeding completed!
```

### 3. **Çıkış Yapıp Tekrar Giriş Yapın**

```
1. Admin panel: http://localhost:3001/admin/login
2. Çıkış yapın (sağ üst)
3. Tekrar giriş yapın:
   - Email: admin@lny.com.tr
   - Password: admin123
```

**Neden?** Session'daki user ID güncellensin!

### 4. **Yeni Proje Oluşturun**

```
İçerik > Projeler > Yeni Proje
↓
Formu doldurun
↓
Oluştur butonuna tıklayın
```

### 5. **Terminal'i İzleyin**

**Başarılı olursa göreceksiniz:**

```bash
Session user: { id: 'clxxxxx', email: 'admin@lny.com.tr', ... }
Creating project with authorId: clxxxxx
Project data: { title: '...', authorId: 'clxxxxx', ... }
Project created successfully: clyyyyy
POST /api/admin/projects 201 in 150ms ✅
```

**Hata alırsanız göreceksiniz:**

```bash
User not found in database: undefined
POST /api/admin/projects 404 in 50ms ❌
```

veya

```bash
Project creation error: Foreign key constraint violated
POST /api/admin/projects 500 in 28ms ❌
```

---

## 🔍 Olası Sorunlar ve Çözümleri

### Sorun 1: User Tablosu Boş

**Belirti:**
```bash
User not found in database: clxxxxx
```

**Çözüm:**
```bash
npm run db:seed
```

### Sorun 2: Session User ID Null/Undefined

**Belirti:**
```bash
Session user: { id: undefined, ... }
```

**Çözüm:**
1. Çıkış yapın
2. Browser cache temizleyin (Ctrl + Shift + Delete)
3. Tekrar giriş yapın

### Sorun 3: Database Reset Gerekiyor

**Belirti:**
- Foreign key hataları devam ediyor
- İlişkiler bozuk

**Çözüm:**
```bash
npx prisma db push --force-reset
npm run db:seed
```

**⚠️ DİKKAT:** Tüm veriler silinir!

### Sorun 4: Session Ayarları Hatalı

**Kontrol:** `lib/auth.ts` dosyasında:

```typescript
callbacks: {
  async session({ session, token }) {
    if (token && session.user) {
      session.user.id = token.sub as string  // Bu satır önemli!
      session.user.role = token.role as string
    }
    return session
  },
  async jwt({ token, user }) {
    if (user) {
      token.sub = user.id  // Bu satır önemli!
      token.role = user.role
    }
    return token
  }
}
```

---

## 📊 Foreign Key İlişkisi

```
Project
  └─ authorId ──> User.id
```

**Kural:** Project oluşturulurken `authorId`, User tablosunda **mutlaka** var olmalı!

---

## ✅ Checklist

Test etmeden önce kontrol edin:

- [ ] Prisma Studio'da User tablosunda admin var mı?
- [ ] Admin kullanıcının ID'si geçerli mi?
- [ ] Çıkış yapıp tekrar giriş yaptınız mı?
- [ ] Browser console'da hata var mı? (F12)
- [ ] Terminal'de session user log'u görünüyor mu?
- [ ] Development server çalışıyor mu?

---

## 🚀 Test Edin!

1. ✅ Prisma Studio'yu açın: http://localhost:5555
2. ✅ User tablosunu kontrol edin
3. ✅ Gerekirse seed çalıştırın: `npm run db:seed`
4. ✅ Çıkış yapıp tekrar giriş yapın
5. ✅ Yeni proje oluşturun
6. ✅ Terminal'deki log'ları izleyin

**Başarı mesajı:**
```
POST /api/admin/projects 201 in 150ms
```

---

## 💡 Debug İpuçları

### Terminal'de Ne Görmelisiniz:

**Başarılı:**
```
Session user: { id: 'cly123abc', email: 'admin@lny.com.tr', role: 'SUPER_ADMIN' }
Creating project with authorId: cly123abc
Project data: { title: 'Test Projesi', ... }
Project created successfully: clz456def
POST /api/admin/projects 201 ✅
```

**User Yok:**
```
Session user: { id: 'cly123abc', ... }
User not found in database: cly123abc
POST /api/admin/projects 404 ❌
```

**Foreign Key Hatası:**
```
Session user: { id: undefined, ... }
Project creation error: Foreign key constraint violated
POST /api/admin/projects 500 ❌
```

---

## 🎯 Sonuç

**Yapılanlar:**
1. ✅ User validation eklendi
2. ✅ Detailed logging eklendi
3. ✅ Doğru user ID kullanımı
4. ✅ Error handling iyileştirildi

**Sonraki Adım:**
- Prisma Studio'da User tablosunu kontrol edin
- Gerekirse seed çalıştırın
- Çıkış yapıp tekrar giriş yapın
- Terminal log'larını izleyerek test edin

**Artık çalışmalı!** 🚀

---

## 📞 Hala Sorun Varsa

Terminal'deki **tam log çıktısını** paylaşın:
- Session user log'u
- Creating project log'u
- Hata mesajı

Bu bilgilerle tam çözüm bulabiliriz!
