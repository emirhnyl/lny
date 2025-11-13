# Node.js Kurulum Rehberi (Windows)

## ⚠️ Durum
Node.js ve npm sisteminizde kurulu değil. Projeyi çalıştırmak için gerekli.

---

## 🚀 Hızlı Kurulum Adımları

### 1. Node.js İndir

**Önerilen Yöntem: LTS (Long Term Support) Sürümü**

🔗 **İndirme Linki**: https://nodejs.org/

- Sol taraftaki yeşil butona tıkla: **"XX.X.X LTS (Recommended for most users)"**
- Windows Installer (.msi) - 64-bit otomatik indirilecek

**Alternatif Direkt Link** (Ekim 2025 için güncel):
- https://nodejs.org/dist/v20.17.0/node-v20.17.0-x64.msi

### 2. Kurulumu Başlat

1. İndirilen `.msi` dosyasına çift tıkla
2. Kurulum sihirbazını takip et:
   - ✅ **"Next"** butonuna tıkla
   - ✅ **License Agreement**: "I accept" seç → Next
   - ✅ **Destination Folder**: Varsayılan bırak (C:\Program Files\nodejs\) → Next
   - ✅ **Custom Setup**: 
     - ⚠️ **ÖNEMLİ**: "Add to PATH" seçeneğinin işaretli olduğundan emin ol
     - Tüm özellikleri varsayılan bırak → Next
   - ✅ **Tools for Native Modules**: (İsteğe bağlı - Python/C++ tools)
     - Atlayabilirsin → Next
   - ✅ **"Install"** butonuna tıkla
   - Yönetici izni isteyecek → **"Yes"** de

3. Kurulum tamamlandığında **"Finish"** butonuna tıkla

### 3. Kurulumu Doğrula

**ÖNEMLİ**: PowerShell'i KAPAT ve YENİDEN AÇ (PATH değişkenlerinin güncellenmesi için)

Yeni PowerShell penceresinde:

```powershell
# Node.js versiyonunu kontrol et
node --version
# Beklenen çıktı: v20.17.0 (veya benzeri)

# npm versiyonunu kontrol et
npm --version
# Beklenen çıktı: 10.x.x (veya benzeri)
```

Her iki komut da versiyon numarası döndürmelidir.

---

## 🔧 Kurulum Sonrası: Projeyi Çalıştır

### 4. Proje Bağımlılıklarını Kur

```powershell
cd C:\Users\lnarg\Desktop\lny-main
npm install
```

Bu komut:
- `package.json` dosyasındaki tüm bağımlılıkları indirir
- `node_modules` klasörü oluşturur
- 2-5 dakika sürebilir

### 5. Development Sunucusunu Başlat

```powershell
npm run dev
```

Başarılı olursa:
```
▲ Next.js 15.0.0
- Local:        http://localhost:3000
- ready started server on 0.0.0.0:3000
```

### 6. Siteyi Aç

Tarayıcıda: **http://localhost:3000**

---

## 🧪 E-posta Sistemini Test Et

Sunucu çalıştıktan sonra:

### Test 1: SMTP Yapılandırma Kontrolü
```
http://localhost:3000/api/test-email
```

### Test 2: Test E-postası Gönder
Yeni PowerShell penceresinde:
```powershell
Invoke-WebRequest -Method POST -Uri http://localhost:3000/api/test-email
```

### Test 3: İletişim Formunu Kullan
```
http://localhost:3000/contact
```

Form doldur ve gönder → **info@lnarge.com** adresine e-posta gelecek

---

## 🐛 Sorun Giderme

### npm hala bulunamıyor (Kurulum sonrası)

**Çözüm 1: PowerShell'i yeniden başlat**
- Tüm PowerShell pencerelerini kapat
- Yeni PowerShell aç
- `npm --version` tekrar dene

**Çözüm 2: PATH'i manuel kontrol et**
```powershell
$env:Path -split ';' | Select-String nodejs
```
Çıktıda `C:\Program Files\nodejs\` görmelisin.

**Çözüm 3: PATH'e manuel ekle (geçici)**
```powershell
$env:Path += ";C:\Program Files\nodejs\"
npm --version
```

**Çözüm 4: PATH'e kalıcı ekle**
1. Windows Ayarlar → Sistem → Hakkında → Gelişmiş sistem ayarları
2. "Ortam Değişkenleri" butonuna tıkla
3. "Sistem değişkenleri" altında "Path" seç → Düzenle
4. Yeni → Ekle: `C:\Program Files\nodejs\`
5. Tamam → Tamam → Tamam
6. PowerShell'i yeniden başlat

### npm install hataları

**EACCES / Permission Denied**
```powershell
# PowerShell'i Yönetici olarak çalıştır (sağ tık → Run as Administrator)
cd C:\Users\lnarg\Desktop\lny-main
npm install
```

**Network/Timeout Errors**
```powershell
# npm registry'yi temizle ve tekrar dene
npm cache clean --force
npm install --verbose
```

### Port 3000 zaten kullanımda

```powershell
# Başka bir port kullan
npm run dev -- -p 3001
```

Sonra: http://localhost:3001

---

## 📦 Alternatif: Chocolatey ile Kurulum (İleri Seviye)

Eğer Chocolatey paket yöneticisi kuruluysa:

```powershell
# PowerShell'i Yönetici olarak aç
choco install nodejs-lts -y
```

---

## ✅ Kurulum Tamamlandı Checklist

- [ ] Node.js LTS sürümü indirildi
- [ ] Kurulum yapıldı (Add to PATH seçili)
- [ ] PowerShell yeniden başlatıldı
- [ ] `node --version` çalışıyor
- [ ] `npm --version` çalışıyor
- [ ] `npm install` tamamlandı (node_modules oluştu)
- [ ] `npm run dev` çalıştı
- [ ] http://localhost:3000 açılıyor
- [ ] İletişim formu test edildi
- [ ] info@lnarge.com'a e-posta geldi

---

## 🆘 Yardım

Kurulum sırasında sorun yaşarsan:
1. Hata mesajını tam olarak kaydet
2. Hangi adımda takıldığını not et
3. `node --version` ve `npm --version` çıktılarını paylaş

Node.js resmi dokümantasyon:
https://nodejs.org/en/download/package-manager
