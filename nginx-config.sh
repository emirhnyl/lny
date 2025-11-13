#!/bin/bash

# Hostinger Nginx Yapılandırması
# Bu script Nginx'te dosya yükleme limitini artırır

echo "🔧 Nginx dosya yükleme limiti ayarlanıyor..."

# Nginx config dosyasını bul
NGINX_CONF="/etc/nginx/nginx.conf"

# Yedek al
sudo cp $NGINX_CONF ${NGINX_CONF}.backup

# Client max body size ekle (http bloğuna)
sudo sed -i '/http {/a \    client_max_body_size 50M;' $NGINX_CONF

# Nginx'i test et
sudo nginx -t

# Nginx'i yeniden başlat
sudo systemctl reload nginx

echo "✅ Nginx yapılandırması güncellendi!"
echo "📊 Maksimum dosya boyutu: 50MB"
