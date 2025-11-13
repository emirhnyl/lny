# LnY - Logaritmik Büyüme ve Yenilik

Modern, yüksek performanslı Next.js 15 web sitesi. AR-GE danışmanlığı, mekanik tasarım ve yazılım otomasyon hizmetleri sunan LnY markası için geliştirilmiştir.

## 🚀 Teknoloji Stack'i

- **Next.js 15** - App Router ile
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animasyonlar
- **React Three Fiber** - 3D shader arka plan
- **Lenis** - Smooth scroll
- **next-seo** - SEO optimizasyonu
- **Lucide React** - İkonlar

## 🎨 Tasarım Sistemi

### Marka Renkleri
- **Sarı/Primary**: `#F5C10E`
- **Siyah/Dark**: `#111111`
- **Gri tonları**: `#F9FAFB` → `#111827`

### Tipografi
- **Başlıklar**: Montserrat (Google Fonts)
- **Metin**: Inter (Google Fonts)

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- pnpm (önerilir) veya npm/yarn

### Adımlar

```bash
# Depoyu klonla
git clone [repo-url]
cd lny-website

# Bağımlılıkları yükle
pnpm install

# Geliştirme sunucusunu başlat
pnpm dev

# Build oluştur
pnpm build

# Production sunucusunu başlat
pnpm start
```

### Ortam Değişkenleri

`.env.local` dosyası oluşturun:

```env
# reCAPTCHA (opsiyonel)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Resend Email API (opsiyonel)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=info@lny.com.tr

# Site URL (production)
NEXT_PUBLIC_SITE_URL=https://lny.com.tr
```

## 🏗️ Proje Yapısı

```
├── app/                    # Next.js App Router
│   ├── (site)/            # Site sayfaları
│   │   ├── page.tsx       # Ana sayfa
│   │   ├── about/         # Hakkımızda
│   │   ├── services/      # Hizmetler
│   │   ├── projects/      # Projeler
│   │   ├── blog/          # Blog
│   │   └── contact/       # İletişim
│   ├── api/               # API routes
│   │   └── contact/       # Contact form handler
│   ├── globals.css        # Global CSS
│   └── layout.tsx         # Root layout
│
├── components/            # Reusable components
│   ├── common/           # Header, Footer, etc.
│   ├── hero/             # Hero section components
│   ├── forms/            # Form components
│   └── cards/            # Card components
│
├── lib/                  # Utilities and configurations
│   ├── utils.ts          # Helper functions
│   ├── seo-config.ts     # SEO configuration
│   └── providers.tsx     # Context providers
│
├── public/               # Static assets
│   ├── logo.svg          # Logo
│   ├── favicon.ico       # Favicon
│   └── og-image.png      # Open Graph image
│
└── styles/               # Additional styles
```

## ✨ Özellikler

### 🎭 Animasyonlar
- **Hero Canvas**: React Three Fiber ile shader tabanlı arka plan
- **Logo Mark**: SVG çizim animasyonu (ln(y) eğrisi + yıldırım)
- **Scroll Animasyonları**: Bölümler görünür olduğunda reveal efektleri
- **Magnetic Buttons**: Mouse etkileşimi ile magnetik butonlar
- **Custom Cursor**: Etkileşimli özel cursor

### 📱 Responsive Design
- Mobile-first yaklaşım
- Touch-friendly interface
- Adaptive layouts

### ⚡ Performans
- Image optimization (next/image)
- Code splitting
- Lazy loading
- 60fps animasyonlar
- Lighthouse 90+ score hedefi

### 🌙 Dark/Light Theme
- System tema desteği
- Smooth geçişler
- Tüm bileşenlerde tutarlı tema

### 🔍 SEO
- next-seo konfigürasyonu
- Sitemap otomatik oluşturma
- Schema.org işaretlemeleri
- Open Graph desteği

## 📄 Sayfalar

### 🏠 Ana Sayfa
- Animated hero section
- Hizmet öne çıkanları
- Logaritmik büyüme gösterimi
- CTA butonları

### ℹ️ Hakkımızda
- Şirket hikayesi
- Misyon/Vizyon
- Değerler
- Teknokent ekosistemi bilgisi

### 🛠️ Hizmetler
- Tasarım
- Mekanik Tasarım & Analiz
- Yazılım & Otomasyon
- Süreç detayları

### 💼 Projeler
- Filtrelenebilir grid
- Etiket sistemi (CFD, Pres, Otomasyon)
- Detay sayfaları ([slug])
- Problem→Çözüm→Sonuç yapısı

### 📝 Blog
- MDX desteği
- Kategori/etiket sistemi
- Örnek yazı içeriği

### 📞 İletişim
- Form validasyonu
- Dosya yükleme (PDF/STEP/DWG)
- reCAPTCHA v3 placeholder
- Başarı/hata toast mesajları

## 🛠️ Geliştirme

### Komutlar

```bash
# Geliştirme
pnpm dev              # Development server
pnpm build            # Production build
pnpm start            # Production server
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint fix
pnpm type-check       # TypeScript check

# Husky hooks
pnpm prepare          # Husky kurulum
```

### Kod Kalitesi
- ESLint + Prettier
- TypeScript strict mode
- Husky pre-commit hooks
- Lint-staged

### Animasyon Performansı
- `transform` ve `opacity` kullanımı
- GPU-accelerated animations
- `requestAnimationFrame` optimizasyonu
- `prefers-reduced-motion` desteği

## 🚀 Deploy

### Vercel (Önerilen)

1. GitHub'a push
2. Vercel'e import
3. Ortam değişkenlerini ekle
4. Deploy

```bash
# Vercel CLI ile
vercel --prod
```

### Diğer Platformlar

```bash
# Build oluştur
pnpm build

# Static export (eğer next.config.js'de export açıksa)
# out/ klasörünü static hosting'e yükle
```

## 📊 Analytics & Monitoring

Projeye entegre edilebilir:
- Google Analytics 4
- Google Tag Manager
- Hotjar/LogRocket
- Sentry (error tracking)

## 🔧 Özelleştirme

### Renk Paleti
`tailwind.config.js` dosyasında renk değerlerini düzenleyin:

```js
colors: {
  primary: {
    DEFAULT: '#F5C10E', // Ana renk
    // Diğer tonlar...
  }
}
```

### Animasyon Süresi
`app/globals.css` dosyasında CSS özelliklerini güncelleyin:

```css
.animate-draw-line {
  animation: drawLine 2s ease-out forwards; /* Süre ayarı */
}
```

## 🐛 Bilinen Sorunlar

- Safari'de bazı CSS backdrop-filter özellikleri sınırlı
- IE11 desteği yok (modern browsers only)
- iOS Safari'de smooth scroll kısmen desteklenir

## 📝 TODO

- [ ] Blog MDX rendering sistemi
- [ ] Proje detay sayfalarında galeri sistemi
- [ ] Çok dilli (i18n) destek altyapısı
- [ ] Admin panel entegrasyonu
- [ ] PWA özellikleri

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'feat: add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- **Web**: [lny.com.tr](https://lny.com.tr)
- **Email**: info@lny.com.tr
- **LinkedIn**: [LnY Company](https://linkedin.com/company/lny)

---

**LnY** - Logaritmik Büyüme ve Yenilik © 2024
✅ Deployment başarılı - Thu Nov 13 17:33:53 +03 2025
✅ Deployment başarılı - Thu Nov 13 17:34:14 +03 2025

🚀 Test: Otomatik deployment - Thu Nov 13 17:59:51 +03 2025
