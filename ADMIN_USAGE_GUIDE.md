# Admin Panel - Kullanım Kılavuzu

## 🚀 Başlangıç

Admin paneliniz başarıyla kuruldu! Artık sitenizin tüm içeriğini buradan yönetebilirsiniz.

### İlk Adımlar

1. **Giriş Yapın**: `/admin/login` sayfasından giriş yapın
2. **İlk Kullanıcı Oluşturma**: Eğer kullanıcı yoksa, terminalden seed script'ini çalıştırın:
   ```bash
   npm run seed
   ```

## 📋 Özellikler

### 1. Dashboard
- Site istatistikleri
- Son aktiviteler
- Hızlı aksiyonlar
- Özet bilgiler

### 2. İçerik Yönetimi

#### Projeler
- **Yeni Proje Ekle**: Portfolyonuza proje ekleyin
- **Proje Düzenle**: Mevcut projeleri güncelleyin
- **3D Model Yükleme**: GLB formatında 3D modeller ekleyin
- **Kategori ve Etiketler**: Projeleri organize edin
- **Durum Kontrolü**: Taslak, Yayında, Arşiv

#### Blog
- Blog yazıları oluşturun ve yayınlayın
- Kategoriler ile organize edin
- Zengin metin editörü ile içerik oluşturun
- Kapak görseli ve meta bilgileri ekleyin

#### Sayfalar
- **Ana Sayfa**: Hero section, başlıklar
- **Hakkımızda**: Şirket bilgileri
- **Hizmetler**: Sunduğunuz hizmetler
- **İletişim**: İletişim bilgileri ve form ayarları

#### Hizmetler
- Hizmet ekleme ve düzenleme
- Sıralama özelliği
- Aktif/Pasif durumu

### 3. Medya Kütüphanesi
- Dosya yükleme (resim, GLB, PDF)
- Klasör organizasyonu
- URL kopyalama
- Galeri görünümü

### 4. Form Yönetimi
- İletişim formlarını görüntüleme
- Durum takibi (Yeni, İşleniyor, Tamamlandı, Spam)
- Mesaj detayları
- Filtreleme ve arama

### 5. Analitik
- Proje istatistikleri
- Form başvuru analizi
- Kategori dağılımı
- Performans metrikleri

### 6. Kullanıcı Yönetimi
- Admin kullanıcıları ekleme
- Rol yönetimi (Super Admin, Admin, Editor, Author, Viewer)
- Kullanıcı aktivitesi
- Yetki kontrolü

### 7. Ayarlar
- **Genel**: Site adı, açıklama, URL
- **SEO**: Meta bilgileri, anahtar kelimeler
- **İletişim**: E-posta, telefon, adres
- **Sosyal Medya**: Sosyal medya linkleri
- **E-posta**: SMTP ayarları

## 🔐 Rol Yetkileri

### Super Admin
- Tüm yetkilere sahip
- Kullanıcı yönetimi
- Sistem ayarları

### Admin
- İçerik yönetimi
- Kullanıcı yönetimi (sınırlı)
- Ayarlar (sınırlı)

### Editor
- İçerik ekleme ve düzenleme
- Medya yükleme
- Form görüntüleme

### Author
- İçerik ekleme (kendi içerikleri)
- Medya yükleme

### Viewer
- Sadece görüntüleme

## 📝 İçerik Oluşturma

### Proje Ekleme
1. Sol menüden **İçerik > Projeler** seçin
2. **Yeni Proje** butonuna tıklayın
3. Proje bilgilerini doldurun:
   - Başlık ve slug (URL dostu isim)
   - Kısa açıklama
   - Detaylı içerik (zengin metin editörü)
   - Kategori ve etiketler
   - 3D model URL'i (.glb dosyası)
   - Kapak görseli ve galeri resimleri
4. Durumu seçin (Taslak/Yayında)
5. **Oluştur** butonuna tıklayın

### Blog Yazısı Ekleme
1. **İçerik > Blog** menüsüne gidin
2. **Yeni Yazı** butonuna tıklayın
3. Yazı bilgilerini doldurun
4. Kategori seçin veya yeni kategori oluşturun
5. Kapak görseli ekleyin
6. Yayınlayın

### Medya Yükleme
1. **Medya** menüsüne gidin
2. Dosyaları sürükle-bırak veya seç
3. Klasör seçin (opsiyonel)
4. Yükleyin
5. URL'i kopyalayıp içeriklerde kullanın

## 🎨 Sayfa Düzenleme

### Ana Sayfa
1. **İçerik > Sayfalar > Ana Sayfa**
2. Hero section başlık ve alt başlığını düzenleyin
3. Buton metni ve linkini ayarlayın
4. Kaydedin

### Diğer Sayfalar
Benzer şekilde Hakkımızda, İletişim ve Hizmetler sayfalarını düzenleyebilirsiniz.

## 🔧 API Endpoints

Admin paneli aşağıdaki API endpoint'leri kullanır:

- `/api/admin/projects` - Proje yönetimi
- `/api/admin/blog` - Blog yönetimi
- `/api/admin/forms` - Form yönetimi
- `/api/admin/services` - Hizmet yönetimi
- `/api/admin/users` - Kullanıcı yönetimi
- `/api/admin/settings` - Ayarlar
- `/api/admin/media/upload` - Medya yükleme

## 🆘 Sorun Giderme

### Giriş yapamıyorum
- Kullanıcı oluşturulmuş mu kontrol edin
- Seed script'ini çalıştırın: `npm run seed`

### Medya yüklenmiyor
- `public/uploads`, `public/images/uploads`, `public/models/uploads` klasörlerinin yazma iznine sahip olduğundan emin olun

### 3D modeller görünmüyor
- GLB dosya yolunun doğru olduğundan emin olun
- Dosyanın `public/models/` altında olduğunu kontrol edin

## 📱 Responsive Tasarım

Admin paneli tüm cihazlarda çalışır:
- Desktop: Tam özellikli
- Tablet: Optimize edilmiş
- Mobil: Temel işlevler

## 🌙 Dark Mode

Admin paneli otomatik olarak sistem temasını algılar ve dark mode destekler.

## 📊 Veritabanı

SQLite veritabanı kullanılıyor. Production'da PostgreSQL'e geçiş için:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 🚀 Deployment

1. Veritabanını production'a taşıyın
2. Environment variables'ları ayarlayın
3. Build alın: `npm run build`
4. Başlatın: `npm start`

## 📞 Destek

Sorularınız için:
- GitHub Issues
- Email: info@ln-arge.com

---

**Not**: Bu admin paneli sürekli geliştirilmektedir. Önerilerinizi bekliyoruz!
