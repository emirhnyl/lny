# ⚡ Hızlı Kurulum Kılavuzu - Otomatik Deployment

## 🎯 Amaç
GitHub'a kod yüklediğinizde otomatik olarak Hostinger'a deploy edilmesi.

## ✅ 3 Adımda Kurulum

### 1️⃣ GitHub Secrets Ekleyin

GitHub Repository > Settings > Secrets and variables > Actions > New repository secret

Eklenecek secrets:

```
SSH_HOST=72.60.180.1
SSH_USER=root
SSH_PASSWORD=sizin-ssh-sifreniz
SSH_PORT=22
DEPLOY_PATH=/root/lny-website

DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_SECRET=random-guclu-sifre-buraya
NEXTAUTH_URL=https://lnarge.com
NEXT_PUBLIC_SITE_URL=https://lnarge.com
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@lnarge.com
SMTP_PASS=Emir0102031213.
MAIL_TO=info@lnarge.com
```

**NOT:** SSH_PASSWORD'u terminalinize giriş için kullandığınız şifre ile değiştirin.

### 2️⃣ Hostinger'da İlk Kurulumu Yapın

Terminaliniz zaten açık, şimdi sadece şu komutları çalıştırın:

```bash
# Zaten root@srv1033350 olarak bağlısınız, direkt devam edin:
```bash
cd ~
git clone https://github.com/KULLANICI_ADINIZ/lny-website.git
cd lny-website

# .env dosyasını oluşturun
nano .env
# (Yukarıdaki environment variables'ı yapıştırın)

# Kurulumu yapın
npm install --legacy-peer-deps
npx prisma generate
npx prisma db push
npm run build

# PM2'yi kurun ve başlatın
npm install -g pm2
pm2 start npm --name "lny-website" -- start
pm2 save
pm2 startup

# Script'i executable yapın
chmod +x deploy.sh
```

### 3️⃣ GitHub'a Push Yapın

```bash
git add .
git commit -m "Auto deployment configured"
git push origin main
```

## 🎉 Tamamlandı!

Artık her `git push` yaptığınızda:
- ✅ GitHub Actions devreye girer
- ✅ Kod Hostinger'a otomatik deploy edilir
- ✅ PM2 uygulamayı yeniden başlatır

## 🔍 Kontrol

- **GitHub:** Repository > Actions (deployment durumu)
- **Hostinger:** `pm2 status` (uygulama durumu)
- **Log:** `cat ~/deployment.log`

## 📞 Destek

Sorun olursa `AUTO_DEPLOYMENT.md` dosyasındaki troubleshooting bölümüne bakın.
