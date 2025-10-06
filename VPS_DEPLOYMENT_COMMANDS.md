# 🚀 VPS Web Terminal - Deployment Komutları

## Hostinger VPS Web Terminal'de çalıştırılacak komutlar

### 📋 Adım 1: Node.js Kurulumu (Eğer yoksa)

```bash
# Node.js 20.x LTS kurulumu
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Doğrula
node --version
npm --version
```

### 📋 Adım 2: PM2 Process Manager Kurulumu

```bash
sudo npm install -g pm2
pm2 --version
```

### 📋 Adım 3: Proje Klasörünü Oluştur ve Git Clone

```bash
# Web root'a git
cd /home

# Proje klasörü oluştur
mkdir -p lnarge
cd lnarge

# GitHub'dan projeyi clone et
git clone https://github.com/emirhnyl/lny.git .

# Klasöre gir
ls -la
```

### 📋 Adım 4: Environment Variables Ayarla

```bash
# .env.local dosyası oluştur
cat > .env.local << 'EOF'
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
EOF

# Dosyayı kontrol et
cat .env.local

# Güvenli izinler ver
chmod 600 .env.local
```

### 📋 Adım 5: Dependencies Kur ve Build Al

```bash
# Dependencies kur
npm install

# Production build (2-5 dakika sürebilir)
npm run build
```

### 📋 Adım 6: PM2 ile Uygulamayı Başlat

```bash
# PM2 ecosystem dosyası oluştur
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'lnarge-website',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    cwd: '/home/lnarge',
    instances: 1,
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# PM2 ile başlat
pm2 start ecosystem.config.js

# Sistem başlangıcında otomatik başlat
pm2 startup
pm2 save

# Durumu kontrol et
pm2 status
pm2 logs lnarge-website --lines 30
```

### 📋 Adım 7: Nginx Yapılandırması

```bash
# Nginx config dosyası oluştur
sudo cat > /etc/nginx/sites-available/lnarge.com << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name lnarge.com www.lnarge.com;

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
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }

    client_max_body_size 25M;
}
EOF

# Symbolic link oluştur
sudo ln -s /etc/nginx/sites-available/lnarge.com /etc/nginx/sites-enabled/

# Default config'i kaldır (eğer varsa)
sudo rm -f /etc/nginx/sites-enabled/default

# Nginx test
sudo nginx -t

# Nginx restart
sudo systemctl restart nginx
sudo systemctl status nginx
```

### 📋 Adım 8: SSL Sertifikası (Let's Encrypt)

```bash
# Certbot kur
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# SSL sertifikası al
sudo certbot --nginx -d lnarge.com -d www.lnarge.com

# Email gir ve talimatları takip et
# Otomatik yenileme test
sudo certbot renew --dry-run
```

### 📋 Adım 9: Firewall Ayarları

```bash
# UFW firewall kur
sudo apt install ufw -y

# Temel portları aç
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS

# Etkinleştir
sudo ufw --force enable
sudo ufw status
```

---

## ✅ Deployment Sonrası Kontroller

### 1. Uygulama Çalışıyor mu?

```bash
# PM2 durumu
pm2 status

# Logları izle
pm2 logs lnarge-website

# Port kontrolü
sudo netstat -tulpn | grep 3000
curl http://localhost:3000
```

### 2. Nginx Çalışıyor mu?

```bash
# Nginx durumu
sudo systemctl status nginx

# Port kontrolü
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Log kontrolü
sudo tail -f /var/log/nginx/error.log
```

### 3. DNS Yönlendirmesi

```bash
# Domain'in IP'yi çözümleyip çözümlemediğini kontrol et
nslookup lnarge.com
dig lnarge.com
```

### 4. Test E-postası Gönder

```bash
# API test endpoint'i
curl http://localhost:3000/api/test-email
curl -X POST http://localhost:3000/api/test-email
```

---

## 🔄 Güncelleme (Update) Komutları

Site güncellemesi için:

```bash
# Proje klasörüne git
cd /home/lnarge

# Son değişiklikleri çek
git pull origin main

# Dependencies güncelle
npm install

# Yeniden build
npm run build

# PM2 restart
pm2 restart lnarge-website

# Logları kontrol et
pm2 logs lnarge-website --lines 50
```

---

## 🐛 Sorun Giderme Komutları

### Uygulama başlamıyor

```bash
# PM2 loglarını kontrol et
pm2 logs lnarge-website --err --lines 100

# PM2'yi sıfırla
pm2 delete lnarge-website
pm2 start ecosystem.config.js

# Port kullanımda mı?
sudo lsof -i :3000
sudo kill -9 $(sudo lsof -t -i:3000)
```

### Memory/Performance Sorunları

```bash
# Memory durumu
free -m

# Disk durumu
df -h

# PM2 monitoring
pm2 monit

# Cache temizle
cd /home/lnarge
rm -rf .next
npm run build
pm2 restart lnarge-website
```

### Nginx Sorunları

```bash
# Nginx logları
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Config test
sudo nginx -t

# Nginx restart
sudo systemctl restart nginx
```

---

## 📝 Hızlı Komut Özeti (Tek Seferde Kopyala-Yapıştır)

**Tüm deployment işlemi (Node.js ve PM2 kurulu ise):**

```bash
# 1. Proje kurulumu
cd /home && mkdir -p lnarge && cd lnarge
git clone https://github.com/emirhnyl/lny.git .

# 2. Environment variables
cat > .env.local << 'EOF'
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@lnarge.com
SMTP_PASS=Emir0102031213.
MAIL_TO=info@lnarge.com
NEXT_PUBLIC_SITE_URL=https://lnarge.com
NODE_ENV=production
EOF

# 3. Build
npm install && npm run build

# 4. PM2 başlat
pm2 start npm --name "lnarge-website" -- start
pm2 startup && pm2 save

# 5. Durum kontrol
pm2 status && pm2 logs lnarge-website --lines 20
```

---

## 🎯 Son Adım: DNS Ayarları

Hostinger DNS Management'tan:
1. A Record: lnarge.com → VPS IP Adresi
2. A Record: www.lnarge.com → VPS IP Adresi

DNS yayılması 5-30 dakika sürebilir.

---

## ✅ Checklist

- [ ] Node.js kurulu (`node --version`)
- [ ] PM2 kurulu (`pm2 --version`)
- [ ] Proje clone edildi
- [ ] .env.local oluşturuldu
- [ ] npm install tamamlandı
- [ ] npm run build başarılı
- [ ] PM2 ile başlatıldı (`pm2 status`)
- [ ] Nginx yapılandırıldı
- [ ] SSL sertifikası kuruldu
- [ ] Firewall ayarlandı
- [ ] DNS yönlendirmesi yapıldı
- [ ] https://lnarge.com açılıyor
- [ ] İletişim formu çalışıyor
- [ ] E-posta gönderimi test edildi

---

**Hazır! 🚀 Hostinger VPS Web Terminal'de bu komutları sırayla çalıştır.**
