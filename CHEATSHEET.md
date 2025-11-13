# 🚀 Hostinger Deployment Cheat Sheet

## 📌 Sunucu Bilgileriniz

```
IP Adresi:    72.60.180.1
IPv6:         2a02:4780:41:5353::1
Hostname:     srv1033350
Kullanıcı:    root
SSH Port:     22
Proje Yolu:   /root/lny-website
```

## 🔑 GitHub Secrets (Kopyala-Yapıştır)

Repository > Settings > Secrets and variables > Actions > New repository secret

```yaml
SSH_HOST: 72.60.180.1
SSH_USER: root
SSH_PASSWORD: [Terminalinize giriş şifreniz]
SSH_PORT: 22
DEPLOY_PATH: /root/lny-website

DATABASE_URL: file:./prisma/dev.db
NEXTAUTH_SECRET: [openssl rand -base64 32 çıktısı]
NEXTAUTH_URL: https://lnarge.com
NEXT_PUBLIC_SITE_URL: https://lnarge.com

SMTP_HOST: smtp.hostinger.com
SMTP_PORT: 587
SMTP_USER: info@lnarge.com
SMTP_PASS: Emir0102031213.
MAIL_TO: info@lnarge.com
```

## 🎯 Hızlı Kurulum (3 Adım)

### 1️⃣ GitHub Secrets Ekle
Yukarıdaki değerleri GitHub Secrets'a ekleyin.

### 2️⃣ Hostinger Terminalinde Kur

```bash
# 1. NEXTAUTH_SECRET oluştur
openssl rand -base64 32
# Çıkan değeri kopyalayın!

# 2. Kurulum scriptini indir ve çalıştır
cd /root
curl -o setup.sh https://raw.githubusercontent.com/KULLANICI_ADINIZ/lny-website/main/hostinger-setup.sh
chmod +x setup.sh
./setup.sh
# Script sizden NEXTAUTH_SECRET'ı yapıştırmanızı isteyecek
```

### 3️⃣ GitHub'a Push Yap

```bash
git add .
git commit -m "Auto deployment configured"
git push origin main
```

## 📝 Kullanışlı Komutlar

### PM2 Komutları
```bash
pm2 status                    # Durum kontrolü
pm2 logs lny-website          # Logları görüntüle
pm2 restart lny-website       # Yeniden başlat
pm2 stop lny-website          # Durdur
pm2 start lny-website         # Başlat
pm2 delete lny-website        # Sil
pm2 monit                     # Gerçek zamanlı izleme
```

### Git Komutları
```bash
cd /root/lny-website
git status                    # Durum kontrolü
git pull origin main          # Son kodu çek
git log --oneline -5          # Son 5 commit
```

### Database Komutları
```bash
cd /root/lny-website
npx prisma studio             # Database UI açar
npx prisma db push            # Schema'yı güncelle
npx prisma generate           # Client'ı yenile
```

### Build Komutları
```bash
cd /root/lny-website
npm run build                 # Production build
npm start                     # Üretim modunda başlat
npm run dev                   # Development mode
```

### Log Komutları
```bash
cat ~/deployment.log          # Deployment logları
pm2 logs lny-website --lines 50  # Son 50 log
tail -f ~/deployment.log      # Canlı log takibi
```

## 🔧 Manuel Deployment

GitHub Actions çalışmıyorsa manuel deploy:

```bash
cd /root/lny-website
./deploy.sh
```

veya adım adım:

```bash
cd /root/lny-website
git pull origin main
npm ci --legacy-peer-deps
npm run build
npx prisma generate
npx prisma db push
pm2 restart lny-website
```

## 🐛 Sorun Giderme

### Site Açılmıyor?
```bash
pm2 status lny-website        # Çalışıyor mu?
pm2 logs lny-website          # Hata var mı?
pm2 restart lny-website       # Yeniden başlat
```

### Build Hatası?
```bash
cd /root/lny-website
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
pm2 restart lny-website
```

### Database Hatası?
```bash
cd /root/lny-website
npx prisma generate
npx prisma db push
pm2 restart lny-website
```

### Port Meşgul?
```bash
lsof -i :3000                 # Port'u kim kullanıyor?
pm2 delete all                # Tüm PM2 süreçlerini sil
pm2 start npm --name "lny-website" -- start
```

## 📊 Sistem İzleme

### Sistem Durumu
```bash
htop                          # CPU/RAM kullanımı
df -h                         # Disk kullanımı
free -h                       # RAM kullanımı
```

### Node.js Versiyonu
```bash
node --version
npm --version
```

### PM2 Güncelleme
```bash
npm install -g pm2@latest
pm2 update
```

## 🔄 Deployment Akışı

```
Yerel Değişiklik
      ↓
git add .
git commit -m "message"
git push origin main
      ↓
GitHub Actions Tetiklenir
      ↓
Build & Test
      ↓
SSH ile Hostinger'a Bağlan
      ↓
/root/lny-website/deploy.sh
      ↓
Git Pull
      ↓
npm ci
      ↓
npm run build
      ↓
PM2 Restart
      ↓
Site Canlı! ✅
```

## 📱 Hızlı Test

```bash
# Deployment testi
cd /root/lny-website
echo "Test" >> test.txt
git add test.txt
git commit -m "Test deployment"
git push origin main
# GitHub Actions'da takip edin

# Temizlik
rm test.txt
```

## 🌐 URL'ler

- **Site:** https://lnarge.com
- **Admin:** https://lnarge.com/admin/login
- **API:** https://lnarge.com/api/admin/projects

## 📞 Hızlı Destek

Sorun mu var?

1. `pm2 logs lny-website` ile logları kontrol et
2. GitHub Actions > Son çalışma > Logları incele
3. `cat ~/deployment.log` ile deployment loglarını oku

---

**İpucu:** Bu dosyayı bookmark'layın, sık kullanacaksınız! 🔖
