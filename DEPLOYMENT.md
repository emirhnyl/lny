# 🚀 Deployment Guide - Hostinger VPS

## Ön Gereksinimler

- ✅ Node.js 18+ kurulu olmalı
- ✅ Git kurulu olmalı
- ✅ PM2 (Process Manager) kurulu olmalı
- ✅ Nginx web sunucusu yapılandırılmış olmalı

---

## 🔧 Hostinger VPS'e Deployment

### 1. VPS'e Bağlan

SSH ile Hostinger VPS'e bağlan:

```bash
ssh root@your-vps-ip
# veya
ssh username@your-vps-ip
```

### 2. Node.js Kurulumu (Eğer yoksa)

```bash
# Node.js 20.x LTS kurulumu
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Doğrula
node --version
npm --version
```

### 3. PM2 Process Manager Kurulumu

```bash
sudo npm install -g pm2
pm2 --version
```

### 4. Proje Klasörünü Oluştur

```bash
# Web root klasörü
cd /var/www
# veya home directory
cd ~

# Proje klasörü oluştur
sudo mkdir -p lnarge.com
sudo chown -R $USER:$USER lnarge.com
cd lnarge.com
```

### 5. GitHub'dan Projeyi Clone Et

```bash
# HTTPS ile
git clone https://github.com/YOUR_USERNAME/lny-main.git .

# veya SSH ile (SSH key eklediysen)
git clone git@github.com:YOUR_USERNAME/lny-main.git .
```

### 6. Environment Variables Ayarla

```bash
# .env.local dosyası oluştur
nano .env.local
```

Aşağıdaki içeriği yapıştır:

```bash
# Email Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@lnarge.com
SMTP_PASS=Emir0102031213.

# Email routing
MAIL_TO=info@lnarge.com

# Site Configuration  
NEXT_PUBLIC_SITE_URL=https://lnarge.com

# Production
NODE_ENV=production
```

Kaydet ve çık: `Ctrl+X`, `Y`, `Enter`

### 7. Dependencies Kur ve Build Al

```bash
# Dependencies kur
npm install

# Production build
npm run build
```

Build süreci 2-5 dakika sürebilir.

### 8. PM2 ile Uygulamayı Başlat

```bash
# PM2 ecosystem dosyası oluştur
pm2 init simple
```

`ecosystem.config.js` dosyasını düzenle:

```bash
nano ecosystem.config.js
```

İçeriği şununla değiştir:

```javascript
module.exports = {
  apps: [{
    name: 'lnarge-website',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    cwd: '/var/www/lnarge.com',
    instances: 1,
    exec_mode: 'cluster',
    watch: false,
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

PM2'yi başlat:

```bash
# Uygulamayı başlat
pm2 start ecosystem.config.js

# Sistem yeniden başladığında otomatik başlat
pm2 startup
pm2 save

# Durumu kontrol et
pm2 status
pm2 logs lnarge-website
```

### 9. Nginx Yapılandırması

Nginx config dosyası oluştur:

```bash
sudo nano /etc/nginx/sites-available/lnarge.com
```

Aşağıdaki yapılandırmayı ekle:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name lnarge.com www.lnarge.com;

    # SSL için Let's Encrypt yönlendirmesi (sonra eklenecek)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout ayarları
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files için optimizasyon
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }

    # File upload limiti
    client_max_body_size 25M;
}
```

Nginx'i etkinleştir ve yeniden başlat:

```bash
# Symbolic link oluştur
sudo ln -s /etc/nginx/sites-available/lnarge.com /etc/nginx/sites-enabled/

# Test et
sudo nginx -t

# Yeniden başlat
sudo systemctl restart nginx
```

### 10. SSL Sertifikası (Let's Encrypt)

```bash
# Certbot kur
sudo apt install certbot python3-certbot-nginx -y

# SSL sertifikası al
sudo certbot --nginx -d lnarge.com -d www.lnarge.com

# Email gir ve talimatları takip et
# Otomatik yenileme için:
sudo certbot renew --dry-run
```

---

## 🔄 Güncelleme (Update) İşlemi

Kod değişikliklerini VPS'e deploy etmek için:

```bash
# VPS'e bağlan
ssh username@your-vps-ip

# Proje klasörüne git
cd /var/www/lnarge.com

# Son değişiklikleri çek
git pull origin main

# Dependencies güncelle (gerekirse)
npm install

# Yeniden build al
npm run build

# PM2'yi yeniden başlat
pm2 restart lnarge-website

# Logları kontrol et
pm2 logs lnarge-website --lines 50
```

---

## 📊 Monitoring ve Management

### PM2 Komutları

```bash
# Durumu göster
pm2 status

# Logları izle
pm2 logs lnarge-website

# Restart
pm2 restart lnarge-website

# Stop
pm2 stop lnarge-website

# Delete
pm2 delete lnarge-website

# Monitoring dashboard
pm2 monit
```

### Disk Kullanımı Kontrolü

```bash
# Disk durumu
df -h

# node_modules temizliği (gerekirse)
cd /var/www/lnarge.com
rm -rf node_modules
npm install --production
```

### Memory Kullanımı

```bash
# Memory durumu
free -m

# PM2 memory kullanımı
pm2 list
```

---

## 🐛 Sorun Giderme

### Uygulama Başlamıyor

```bash
# PM2 loglarını kontrol et
pm2 logs lnarge-website --err

# Port kullanımda mı?
sudo lsof -i :3000
sudo netstat -tulpn | grep 3000

# Process'i öldür
sudo kill -9 PID
```

### Nginx Hataları

```bash
# Nginx logları
sudo tail -f /var/nginx/error.log

# Config test
sudo nginx -t

# Nginx restart
sudo systemctl restart nginx
```

### Email Gönderilmiyor

```bash
# Environment variables kontrol
cat .env.local

# SMTP port kontrolü
telnet smtp.hostinger.com 587

# Application logları
pm2 logs lnarge-website | grep -i email
```

### Build Hataları

```bash
# Cache temizle
rm -rf .next
npm run build

# Node version kontrol
node --version  # 18+ olmalı

# Memory hatası varsa
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

---

## 🔒 Güvenlik

### Firewall Ayarları

```bash
# UFW firewall kur
sudo apt install ufw

# Temel portları aç
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS

# Etkinleştir
sudo ufw enable
sudo ufw status
```

### File Permissions

```bash
cd /var/www/lnarge.com

# Ownership
sudo chown -R $USER:$USER .

# Permissions
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;

# .env.local özel izin
chmod 600 .env.local
```

---

## 📝 Checklist

- [ ] VPS'e SSH bağlantısı çalışıyor
- [ ] Node.js 18+ kurulu
- [ ] PM2 kurulu
- [ ] Nginx kurulu ve yapılandırılmış
- [ ] GitHub'dan proje clone edildi
- [ ] .env.local oluşturuldu ve SMTP ayarları doğru
- [ ] npm install tamamlandı
- [ ] npm run build başarılı
- [ ] PM2 ile uygulama başlatıldı
- [ ] Nginx reverse proxy yapılandırıldı
- [ ] Domain DNS'i VPS IP'ye yönlendirildi
- [ ] SSL sertifikası kuruldu
- [ ] İletişim formu test edildi
- [ ] E-posta gönderimi çalışıyor

---

## 🆘 Destek

Sorun yaşarsan:
1. PM2 loglarını kontrol et: `pm2 logs lnarge-website`
2. Nginx loglarını kontrol et: `sudo tail -f /var/nginx/error.log`
3. Environment variables'ı doğrula: `cat .env.local`
4. Port kullanımını kontrol et: `sudo lsof -i :3000`
