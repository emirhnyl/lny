# 🚀 LnY Website - Otomatik Deployment Sistemi Kuruldu!

## ✅ Neler Eklendi?

### 1. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Her `git push` sonrası otomatik deployment
- Build ve test işlemleri
- Hostinger'a SSH ile otomatik deploy

### 2. Deployment Script (`deploy.sh`)
- Hostinger'da çalışan otomatik deployment scripti
- Git pull, npm install, build, PM2 restart
- Detaylı log kaydı

### 3. Dökümantasyon
- **AUTO_DEPLOYMENT.md**: Detaylı kurulum rehberi
- **QUICK_SETUP.md**: Hızlı başlangıç kılavuzu
- **.env.example.production**: Production environment şablonu

## 🎯 Nasıl Çalışır?

```bash
# Kod değişikliği yap
git add .
git commit -m "Değişiklik açıklaması"
git push origin main

# GitHub Actions otomatik olarak:
# ✅ Kodu test eder
# ✅ Build yapar
# ✅ Hostinger'a deploy eder
# ✅ PM2 ile uygulamayı yeniden başlatır
```

## 📋 Kurulum Gereksinimler

1. **GitHub Repository** oluşturun
2. **GitHub Secrets** ekleyin (detaylar QUICK_SETUP.md'de)
3. **Hostinger'da ilk kurulumu** yapın (SSH ile)
4. **Deploy!** 🚀

## 🔧 İlk Kurulum

1. **GitHub Secrets ekleyin:**
   - `SSH_HOST`, `SSH_USER`, `SSH_PASSWORD`, `SSH_PORT`, `DEPLOY_PATH`
   - Environment variables (DATABASE_URL, NEXTAUTH_SECRET, vb.)

2. **Hostinger'da kurulum yapın:**
   ```bash
   ssh -pPORT USER@HOST
   cd ~
   git clone https://github.com/USER/lny-website.git
   cd lny-website
   npm install --legacy-peer-deps
   chmod +x deploy.sh
   # .env dosyasını oluşturun
   pm2 start npm --name "lny-website" -- start
   ```

3. **Push yapın:**
   ```bash
   git push origin main
   ```

## 📚 Dökümantasyon

- **QUICK_SETUP.md** - 3 adımda hızlı kurulum
- **AUTO_DEPLOYMENT.md** - Detaylı kurulum ve troubleshooting
- **.env.example.production** - Production environment şablonu

## 🔍 Deployment Kontrolü

- **GitHub:** Repository > Actions
- **Hostinger:** `pm2 status lny-website`
- **Logs:** `cat ~/deployment.log`

## ⚠️ Önemli Notlar

1. `.env` dosyasını asla GitHub'a yüklemeyin (zaten .gitignore'da)
2. GitHub Secrets'a tüm hassas bilgileri ekleyin
3. İlk kurulumda SSH bilgilerini doğru girdiğinizden emin olun
4. PM2'nin Hostinger'da kurulu olduğundan emin olun

## 🎉 Tamamlandı!

Artık sadece `git push` yapmanız yeterli, geri kalan her şey otomatik! 🚀

---

**Sonraki Adımlar:**
1. QUICK_SETUP.md dosyasını okuyun
2. GitHub Secrets'ı ekleyin
3. Hostinger'da ilk kurulumu yapın
4. İlk deployment'ı test edin

**Sorularınız için:** AUTO_DEPLOYMENT.md dosyasındaki troubleshooting bölümüne bakın.
