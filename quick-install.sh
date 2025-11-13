#!/bin/bash
# Hostinger Hızlı Kurulum - Tek Seferde

echo "🚀 LnY Website kurulumu başlıyor..."

# Root dizinine git
cd /root

# Eski klasörü sil (varsa)
rm -rf lny-website

# GitHub'dan klonla
git clone https://github.com/emirhnyl/lny.git lny-website
cd lny-website

# Dependencies yükle
echo "📦 Dependencies yükleniyor..."
npm install --legacy-peer-deps

# .env oluştur
echo "📝 .env dosyası oluşturuluyor..."
cat > .env << 'EOF'
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth
NEXTAUTH_SECRET="HSvw8FXhnmJ1U/puPb6PYhm+2OXT+BBCI5l5vqmW/dA="
NEXTAUTH_URL="https://lnarge.com"

# Site Configuration  
NEXT_PUBLIC_SITE_URL=https://lnarge.com

# Hostinger Email Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@lnarge.com
SMTP_PASS=Emir0102031213.

# Email routing
MAIL_TO=info@lnarge.com

# Environment
NODE_ENV=production
EOF

# Prisma
echo "🗄️ Prisma başlatılıyor..."
npx prisma generate
npx prisma db push

# Build
echo "🔨 Build yapılıyor..."
npm run build

# PM2 kur
echo "📦 PM2 kuruluyor..."
npm install -g pm2

# Deploy script'i executable yap
chmod +x deploy.sh

# PM2 ile başlat
echo "🚀 Uygulama başlatılıyor..."
pm2 start npm --name "lny-website" -- start
pm2 save
pm2 startup

# Status
pm2 status

echo ""
echo "✅ Kurulum tamamlandı!"
echo "🌐 Site: https://lnarge.com"
echo "📱 Admin: https://lnarge.com/admin/login"
echo ""
echo "🔍 Kontrol komutları:"
echo "  pm2 status"
echo "  pm2 logs lny-website"
echo "  pm2 restart lny-website"
