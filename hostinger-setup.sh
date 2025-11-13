#!/bin/bash
# LnY Website - Hostinger İlk Kurulum Scripti
# Bu scripti terminalinize kopyalayıp çalıştırın

echo "🚀 LnY Website Kurulumu Başlıyor..."

# 1. Node.js versiyonunu kontrol et
echo "📦 Node.js versiyonu kontrol ediliyor..."
node --version
npm --version

# 2. Git kurulu mu kontrol et
if ! command -v git &> /dev/null; then
    echo "Git kuruluyor..."
    apt-get update
    apt-get install -y git
fi

# 3. GitHub'dan projeyi klonla
echo "📥 Proje GitHub'dan klonlanıyor..."
cd /root

# Eğer klasör varsa sil
if [ -d "lny-website" ]; then
    echo "⚠️  Eski lny-website klasörü bulundu, siliniyor..."
    rm -rf lny-website
fi

# BURAYA KENDİ GITHUB REPO URL'İNİZİ YAZIN!
git clone https://github.com/KULLANICI_ADINIZ/lny-website.git
cd lny-website

# 4. Node modules'ı yükle
echo "📦 Dependencies yükleniyor..."
npm install --legacy-peer-deps

# 5. .env dosyasını oluştur
echo "📝 .env dosyası oluşturuluyor..."
cat > .env << 'EOF'
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth - Bu şifreyi değiştirin!
NEXTAUTH_SECRET="BURAYA-openssl-rand-base64-32-CIKTISINI-YAPISITIRIN"
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

echo "⚠️  ÖNEMLI: .env dosyasındaki NEXTAUTH_SECRET'ı düzenleyin!"
echo "Şunu çalıştırın: openssl rand -base64 32"
echo "Sonra: nano .env (ve NEXTAUTH_SECRET değerini yapıştırın)"
echo ""
read -p "NEXTAUTH_SECRET'ı güncellediniz mi? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Lütfen önce NEXTAUTH_SECRET'ı güncelleyin:"
    echo "1. openssl rand -base64 32"
    echo "2. nano .env"
    echo "3. NEXTAUTH_SECRET satırını yapıştırın"
    echo "4. CTRL+X, Y, ENTER ile kaydedin"
    echo "5. Bu scripti tekrar çalıştırın"
    exit 1
fi

# 6. Prisma'yı başlat
echo "🗄️  Prisma başlatılıyor..."
npx prisma generate
npx prisma db push

# 7. İlk build'i yap
echo "🔨 İlk build yapılıyor..."
npm run build

# 8. PM2'yi kur
echo "📦 PM2 kuruluyor..."
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

# 9. deploy.sh'i executable yap
echo "🔧 deploy.sh executable yapılıyor..."
chmod +x deploy.sh

# 10. Uygulamayı PM2 ile başlat
echo "🚀 Uygulama PM2 ile başlatılıyor..."
pm2 start npm --name "lny-website" -- start
pm2 save
pm2 startup

echo ""
echo "✅ Kurulum tamamlandı!"
echo ""
echo "📊 PM2 Status:"
pm2 status

echo ""
echo "🌐 Site: https://lnarge.com"
echo "📱 Admin: https://lnarge.com/admin/login"
echo ""
echo "📝 Sonraki Adımlar:"
echo "1. GitHub'a kod push edin"
echo "2. GitHub Secrets ekleyin (QUICK_SETUP.md)"
echo "3. Otomatik deployment aktif olacak!"
echo ""
echo "🔍 Kontrol Komutları:"
echo "- pm2 status           # Uygulama durumu"
echo "- pm2 logs lny-website # Loglar"
echo "- pm2 restart lny-website # Yeniden başlat"
echo ""
