# İletişim Formu Test Talimatları

## ✅ Yapılandırma Tamamlandı

### DNS Kayıtları (Hostinger) - Doğrulandı ✅
- **MX Kayıtları**: mx1.hostinger.com ve mx2.hostinger.com
- **SPF Kaydı**: v=spf1 include:_spf.mail.hostinger.com ~all
- **DKIM Kayıtları**: 3 adet CNAME kaydı mevcut
- **DMARC Kaydı**: v=DMARC1; p=none

### Kod Değişiklikleri - Tamamlandı ✅
- ✅ E-posta alıcı adresi: **info@lnarge.com**
- ✅ SMTP yapılandırması: Hostinger (smtp.hostinger.com:587)
- ✅ Dosya ekleri destekleniyor (25MB'a kadar)
- ✅ Footer ve iletişim sayfasında email güncellemesi

### .env.local Değişkenleri - Hazır ✅
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@lnarge.com
SMTP_PASS=Emir0102031213.
MAIL_TO=info@lnarge.com
```

---

## 🚀 Test Adımları

### 1. Development Sunucusunu Başlat

```powershell
cd C:\Users\lnarg\Desktop\lny-main
npm run dev
```

Sunucu başlatıldığında: http://localhost:3000

### 2. SMTP Yapılandırmasını Kontrol Et

**Tarayıcıda aç:**
```
http://localhost:3000/api/test-email
```

**Görmek istediğin çıktı:**
```json
{
  "smtp_configured": {
    "host": "smtp.hostinger.com",
    "port": "587",
    "user": "info@lnarge.com",
    "pass": "SET"
  }
}
```

### 3. Test E-postası Gönder (POST Request)

**PowerShell'de:**
```powershell
Invoke-WebRequest -Method POST -Uri http://localhost:3000/api/test-email
```

**Beklenen sonuç:**
- HTTP 200 yanıtı
- info@lnarge.com adresine "🧪 Test Email - Hostinger SMTP" konulu e-posta

### 4. İletişim Formunu Test Et

1. Tarayıcıda aç: http://localhost:3000/contact
2. Formu doldur:
   - **Ad Soyad**: Test Kullanıcı
   - **E-posta**: test@example.com
   - **Telefon**: +90 530 123 45 67
   - **Şirket**: Test Şirketi
   - **Hizmet**: Tasarım
   - **Mesaj**: Bu bir test mesajıdır.
   - **Dosya**: İsteğe bağlı (PDF, STEP, DWG, GLB, STL - max 25MB)
3. "Mesajı Gönder" butonuna tıkla

**Beklenen sonuç:**
- ✅ "Form başarıyla gönderildi!" mesajı
- ✅ info@lnarge.com adresine e-posta gelir:
  - Konu: 🚀 LnY İletişim: Test Kullanıcı - Tasarım
  - Gönderen: info@lnarge.com
  - Reply-To: test@example.com
  - İçerik: HTML formatında tüm form verileri
  - Ek: Yüklenen dosya (varsa)

---

## 🔍 Hata Ayıklama

### E-posta Gelmiyorsa

1. **Sunucu loglarını kontrol et** (PowerShell'de npm run dev çalışırken):
   - "Email sent successfully via Hostinger SMTP" mesajını ara
   - Hata varsa detaylarını oku

2. **SMTP şifresini doğrula**:
   - Hostinger hPanel > E-posta > Hesaplar
   - info@lnarge.com şifresini sıfırla/doğrula
   - .env.local dosyasına güncelle

3. **Spam klasörünü kontrol et**:
   - info@lnarge.com'un inbox'ını kontrol et
   - Spam/Junk klasörüne bakın

4. **Port/Firewall kontrolü**:
   ```powershell
   Test-NetConnection -ComputerName smtp.hostinger.com -Port 587
   ```
   - TcpTestSucceeded: True olmalı

### Sık Karşılaşılan Hatalar

| Hata | Çözüm |
|------|-------|
| `535 Authentication failed` | SMTP_PASS yanlış - şifreyi doğrula |
| `ETIMEDOUT` | Port 587 engellenmiş - firewall kontrol et |
| `ECONNREFUSED` | SMTP_HOST yanlış veya sunucu erişilemiyor |
| `Invalid sender` | SMTP_USER ile FROM adresi uyuşmuyor |

---

## 📧 E-posta İçeriği Formatı

Gönderilen e-postalar şu bilgileri içerir:

```
🚀 Ln-ArGe - İletişim Formu

İletişim Bilgileri:
├─ Ad Soyad: [form_name]
├─ Email: [form_email]
├─ Telefon: [form_phone]
├─ Şirket: [form_company]
└─ Hizmet: [form_service]

Mesaj:
[form_message]

Ek Dosya: [dosya_adi] (varsa)

Bu mesaj LnY web sitesi iletişim formu üzerinden gönderilmiştir.
Gönderim Zamanı: [timestamp]
```

---

## 🚀 Production'a Deploy (Hostinger VPS/Vercel)

### Hostinger VPS'de

1. Environment değişkenlerini ayarla:
```bash
export SMTP_HOST=smtp.hostinger.com
export SMTP_PORT=587
export SMTP_USER=info@lnarge.com
export SMTP_PASS="Emir0102031213."
export MAIL_TO=info@lnarge.com
export NODE_ENV=production
```

2. Build ve çalıştır:
```bash
npm run build
npm start
```

### Vercel'de

Vercel Dashboard > Project Settings > Environment Variables:
- `SMTP_HOST` = smtp.hostinger.com
- `SMTP_PORT` = 587
- `SMTP_USER` = info@lnarge.com
- `SMTP_PASS` = Emir0102031213.
- `MAIL_TO` = info@lnarge.com

---

## ✅ Checklist

- [ ] npm run dev çalıştı
- [ ] /api/test-email (GET) doğru yapılandırmayı gösteriyor
- [ ] /api/test-email (POST) test e-postası gönderdi
- [ ] info@lnarge.com'a test e-postası ulaştı
- [ ] /contact sayfası form gönderiyor
- [ ] Form gönderiminden sonra info@lnarge.com'a e-posta geldi
- [ ] E-posta HTML formatında ve doğru bilgilerle
- [ ] Dosya eki çalışıyor (test ettiysen)
- [ ] Reply-To alanı form dolduranın e-postası

---

## 📞 Destek

Sorun yaşarsan:
1. Terminal/Console loglarını kontrol et
2. Browser Developer Tools > Network sekmesinde /api/contact isteğini incele
3. Hostinger hPanel > E-posta > E-posta Günlükleri'ni kontrol et
