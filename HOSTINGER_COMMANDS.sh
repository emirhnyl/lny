#!/bin/bash
# Hostinger Terminalinde çalıştırılacak komutlar
# Her komutu tek tek kopyala-yapıştır yapın

echo "═══════════════════════════════════════════════════════════════"
echo "  LnY Website - Hostinger Kurulum Komutları"
echo "═══════════════════════════════════════════════════════════════"
echo ""

echo "📍 ADIM 1: Root dizinine git"
echo "Komut:"
echo "cd /root"
echo ""

echo "📍 ADIM 2: Eğer eski klasör varsa sil"
echo "Komut:"
echo "rm -rf lny-website"
echo ""

echo "📍 ADIM 3: GitHub'dan projeyi klonla"
echo "Komut:"
echo "git clone https://github.com/emirhnyl/lny.git lny-website"
echo ""

echo "📍 ADIM 4: Proje dizinine gir"
echo "Komut:"
echo "cd lny-website"
echo ""

echo "📍 ADIM 5: Node modules yükle"
echo "Komut:"
echo "npm install --legacy-peer-deps"
echo ""

echo "📍 ADIM 6: .env dosyası oluştur"
echo "Komut:"
echo "nano .env"
echo ""
echo "Aşağıdaki içeriği kopyalayıp yapıştırın:"
echo "───────────────────────────────────────────────────────────────"
cat << 'EOF'
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
echo "───────────────────────────────────────────────────────────────"
echo "Kaydet: CTRL+X, sonra Y, sonra ENTER"
echo ""

echo "📍 ADIM 7: Prisma'yı başlat"
echo "Komut:"
echo "npx prisma generate"
echo "npx prisma db push"
echo ""

echo "📍 ADIM 8: İlk build'i yap"
echo "Komut:"
echo "npm run build"
echo ""

echo "📍 ADIM 9: PM2'yi kur (eğer yoksa)"
echo "Komut:"
echo "npm install -g pm2"
echo ""

echo "📍 ADIM 10: deploy.sh'i executable yap"
echo "Komut:"
echo "chmod +x deploy.sh"
echo ""

echo "📍 ADIM 11: Uygulamayı PM2 ile başlat"
echo "Komut:"
echo "pm2 start npm --name 'lny-website' -- start"
echo "pm2 save"
echo "pm2 startup"
echo ""

echo "📍 ADIM 12: Durumu kontrol et"
echo "Komut:"
echo "pm2 status"
echo ""

echo "═══════════════════════════════════════════════════════════════"
echo "✅ Kurulum tamamlandı!"
echo "🌐 Site: https://lnarge.com"
echo "═══════════════════════════════════════════════════════════════"
