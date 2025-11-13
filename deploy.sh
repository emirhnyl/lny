#!/bin/bash

# LnY Website - Automatic Deployment Script
# Bu script Hostinger sunucusunda çalışacak

set -e  # Hata durumunda durur

echo "🚀 Starting deployment..."

# Renk kodları
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Proje dizini
PROJECT_DIR="$HOME/lny-website"

# Log dosyası
LOG_FILE="$HOME/deployment.log"

# Tarih damgası
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo -e "${YELLOW}[$TIMESTAMP] Deployment başladı${NC}" | tee -a $LOG_FILE

# Git repository'yi güncelle
echo -e "${YELLOW}📥 Kod güncelleniyor...${NC}"
cd $PROJECT_DIR

if [ -d ".git" ]; then
    git fetch --all
    git reset --hard origin/main
    echo -e "${GREEN}✓ Git güncellendi${NC}" | tee -a $LOG_FILE
else
    echo -e "${RED}✗ Git repository bulunamadı!${NC}" | tee -a $LOG_FILE
    exit 1
fi

# Node modules'ı güncelle
echo -e "${YELLOW}📦 Dependencies yükleniyor...${NC}"
npm ci --legacy-peer-deps
echo -e "${GREEN}✓ Dependencies yüklendi${NC}" | tee -a $LOG_FILE

# .env dosyasını kontrol et
if [ ! -f ".env" ]; then
    echo -e "${RED}✗ .env dosyası bulunamadı!${NC}" | tee -a $LOG_FILE
    exit 1
fi

# Prisma generate
echo -e "${YELLOW}🗄️  Prisma client oluşturuluyor...${NC}"
npx prisma generate
echo -e "${GREEN}✓ Prisma client oluşturuldu${NC}" | tee -a $LOG_FILE

# Database migration
echo -e "${YELLOW}🗄️  Database güncelleniyor...${NC}"
npx prisma db push --accept-data-loss
echo -e "${GREEN}✓ Database güncellendi${NC}" | tee -a $LOG_FILE

# Build project
echo -e "${YELLOW}🔨 Proje build ediliyor...${NC}"
npm run build
echo -e "${GREEN}✓ Build tamamlandı${NC}" | tee -a $LOG_FILE

# PM2 ile uygulamayı yeniden başlat
echo -e "${YELLOW}🔄 Uygulama yeniden başlatılıyor...${NC}"

if pm2 list | grep -q "lny-website"; then
    pm2 restart lny-website
    echo -e "${GREEN}✓ Uygulama yeniden başlatıldı${NC}" | tee -a $LOG_FILE
else
    pm2 start npm --name "lny-website" -- start
    pm2 save
    echo -e "${GREEN}✓ Uygulama başlatıldı${NC}" | tee -a $LOG_FILE
fi

# Deployment tamamlandı
echo -e "${GREEN}✅ Deployment başarıyla tamamlandı!${NC}" | tee -a $LOG_FILE
echo -e "${GREEN}🌐 Site: https://lnarge.com${NC}"

# PM2 status
pm2 status lny-website

exit 0
