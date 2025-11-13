# 🚀 Otomatik Deployment - GitHub Actions ile Hostinger'a Deploy

Bu konfigürasyon ile GitHub'a kod gönderdiğinizde (push) otomatik olarak Hostinger sunucunuza deploy edilir.

## 📋 Gereksinimler

- GitHub Repository
- Hostinger hosting hesabı (SSH erişimi olan)
- Node.js 18+ (Hostinger'da kurulu olmalı)
- PM2 (Process manager)

## 🔧 Kurulum Adımları

### 1. GitHub Repository'yi Hazırlayın

Projenizi GitHub'a yükleyin:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/lny-website.git
git push -u origin main
```

### 2. Hostinger'da SSH Erişimini Aktifleştirin

✅ SSH'ınız zaten aktif! Terminal bilgileriniz:

- **Host:** `72.60.180.1` (veya `srv1033350`)
- **Port:** `22` (standart SSH portu)
- **Username:** `root`
- **Password:** Terminal'e giriş için kullandığınız şifre
- **IPv6:** `2a02:4780:41:5353::1` (opsiyonel)

### 3. Hostinger'da Projeyi Klonlayın

Terminaliniz zaten açık, direkt devam edin:

```bash
# Zaten root olarak bağlısınız
cd /root
git clone https://github.com/KULLANICI_ADINIZ/lny-website.git
cd lny-website
```

Node modules'ı yükleyin:

```bash
npm install --legacy-peer-deps
```

### 4. Hostinger'da .env Dosyasını Oluşturun

```bash
nano .env
```

Aşağıdaki içeriği yapıştırın (değerleri kendi bilgilerinizle değiştirin):

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth
NEXTAUTH_SECRET="BURAYA-GÜÇLÜ-BİR-ŞİFRE-YAZIN"
NEXTAUTH_URL="https://lnarge.com"

# Site Configuration  
NEXT_PUBLIC_SITE_URL=https://lnarge.com

# Email Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@lnarge.com
SMTP_PASS=EMAIL-ŞİFRENİZ

# Email routing
MAIL_TO=info@lnarge.com

# Environment
NODE_ENV=production
```

Kaydet ve çık: `CTRL+X`, sonra `Y`, sonra `ENTER`

### 5. Prisma'yı Başlatın

```bash
npx prisma generate
npx prisma db push
```

### 6. İlk Build'i Yapın

```bash
npm run build
```

### 7. PM2'yi Kurun ve Başlatın

PM2'yi global olarak kurun:

```bash
npm install -g pm2
```

Uygulamayı PM2 ile başlatın:

```bash
pm2 start npm --name "lny-website" -- start
pm2 save
pm2 startup
```

### 8. GitHub Secrets'ı Ekleyin

GitHub repository'nizde:

1. **Settings** > **Secrets and variables** > **Actions** > **New repository secret**
2. Aşağıdaki secrets'ları ekleyin:

#### SSH Bilgileri:
- `SSH_HOST`: `72.60.180.1` (veya `srv1033350`)
- `SSH_USER`: `root`
- `SSH_PASSWORD`: Terminalinize giriş için kullandığınız şifre
- `SSH_PORT`: `22`
- `DEPLOY_PATH`: `/root/lny-website`

#### Environment Variables:
- `DATABASE_URL`: `file:./prisma/dev.db`
- `NEXTAUTH_SECRET`: Güçlü bir random string (aşağıda nasıl oluşturulacağını göreceksiniz)
- `NEXTAUTH_URL`: `https://lnarge.com`
- `NEXT_PUBLIC_SITE_URL`: `https://lnarge.com`
- `SMTP_HOST`: `smtp.hostinger.com`
- `SMTP_PORT`: `587`
- `SMTP_USER`: `info@lnarge.com`
- `SMTP_PASS`: `Emir0102031213.`
- `MAIL_TO`: `info@lnarge.com`

**NEXTAUTH_SECRET oluşturmak için terminalinizde:**
```bash
openssl rand -base64 32
```

### 9. deploy.sh Script'ini Executable Yapın

Hostinger SSH'da:

```bash
cd ~/lny-website
chmod +x deploy.sh
```

## 🎯 Kullanım

Artık her kod değişikliğinde otomatik deploy:

```bash
git add .
git commit -m "Değişiklik açıklaması"
git push origin main
```

GitHub Actions otomatik olarak:
1. ✅ Kodu çeker
2. ✅ Dependencies'i yükler
3. ✅ Build yapar
4. ✅ Hostinger'a SSH ile bağlanır
5. ✅ Sunucuda kodu günceller
6. ✅ PM2 ile uygulamayı yeniden başlatır

## 📊 Deployment Status Kontrolü

### GitHub'da:
- Repository > **Actions** sekmesinden deployment durumunu izleyin

### Hostinger'da:
```bash
# PM2 status
pm2 status

# PM2 logs
pm2 logs lny-website

# PM2 monitoring
pm2 monit
```

## 🔍 Deployment Log'larını İnceleme

Hostinger SSH'da:

```bash
cat ~/deployment.log
```

## 🛠️ Troubleshooting

### Deployment Başarısız Olursa:

1. GitHub Actions log'larını kontrol edin
2. SSH bilgilerinin doğru olduğundan emin olun
3. Hostinger'da manuel deploy deneyin:

```bash
cd ~/lny-website
./deploy.sh
```

### PM2 Sorunları:

```bash
# Uygulamayı durdur
pm2 stop lny-website

# Uygulamayı baştan başlat
pm2 delete lny-website
pm2 start npm --name "lny-website" -- start
pm2 save
```

### Database Sorunları:

```bash
cd ~/lny-website
npx prisma generate
npx prisma db push
```

## 🔒 Güvenlik Notları

1. **Şifreleri asla kod içinde paylaşmayın**
2. GitHub Secrets'ı kullanın
3. `.env` dosyasını `.gitignore`'a ekleyin
4. SSH şifrelerini güçlü tutun

## 📱 Manuel Deployment (Gerekirse)

Hostinger SSH'da:

```bash
cd ~/lny-website
git pull origin main
npm ci --legacy-peer-deps
npm run build
npx prisma generate
npx prisma db push
pm2 restart lny-website
```

## 🎉 Tebrikler!

Artık her `git push` yaptığınızda siteniz otomatik olarak güncellenecek! 🚀

---

**Not:** İlk kurulumda sorun yaşarsanız, GitHub Actions log'larını ve Hostinger SSH terminal çıktısını kontrol edin.
