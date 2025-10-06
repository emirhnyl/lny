# 🎯 GLB Dosya Kullanım Rehberi

## 📁 Dosya Yapısı

```
public/
└── models/
    └── projects/
        ├── 155mm_he_shell_m51a5.glb    # Mevcut tasarımınız
        ├── test-cube.glb               # Test dosyası
        ├── yeni-tasarim1.glb          # Yeni ekleyeceğiniz dosyalar
        ├── yeni-tasarim2.glb
        └── ...
```

## 🚀 Yeni GLB Dosyası Ekleme Adımları

### 1. Dosyayı Doğru Klasöre Koyun
```
c:\Users\lnarg\Desktop\lny-main\public\models\projects\DOSYA_ADINIZ.glb
```

### 2. Projects.ts Dosyasını Güncelleyin
`app/data/projects.ts` dosyasında ilgili projenin `glbUrl` özelliğini değiştirin:

```typescript
glbUrl: '/models/projects/DOSYA_ADINIZ.glb'
```

## 📋 Mevcut Projeler ve GLB Dosyaları

| Proje ID | GLB Dosyası | Durum |
|----------|-------------|-------|
| `otomotiv-parca-cfd` | `155mm_he_shell_m51a5.glb` | ✅ Güncel |
| `endustriyel-otomasyon` | `otomasyon-sistemi.glb` | ❌ Eksik |
| `interaktif-3d-model` | `3d-viewer-demo.glb` | ❌ Eksik |
| `tubitak-1501` | `tubitak-malzeme.glb` | ❌ Eksik |

## 🔧 Yeni Proje Ekleme Template

```typescript
{
  id: 'yeni-proje-id',
  title: 'Proje Başlığı',
  description: 'Detaylı açıklama...',
  shortDescription: 'Kısa açıklama...',
  category: 'Mekanik Tasarım', // veya 'Yazılım', 'AR-GE'
  tags: ['Tag1', 'Tag2'],
  duration: '3 ay',
  completedAt: '2024-10-05',
  status: 'completed',
  technologies: ['SolidWorks', 'ANSYS'],
  glbUrl: '/models/projects/YENI_DOSYA.glb', // GLB dosyanızın yolu
  // ... diğer detaylar
}
```

## ⚠️ Önemli Notlar

- GLB dosyaları web için optimize edilmiş olmalı (tercihen <10MB)
- Dosya isimleri tire (-) ve küçük harf kullanmalı
- Türkçe karakter kullanmayın
- Texture'lar GLB içinde embedded olmalı

## 🎨 GLB Optimizasyon İpuçları

1. **Polygon sayısını azaltın** (web için 10K-50K triangle ideal)
2. **Texture boyutlarını küçültün** (512x512 veya 1024x1024)
3. **Draco compression** kullanın
4. **Gereksiz materyalleri temizleyin**

## 🔄 Hızlı Güncelleme Süreci

1. GLB dosyasını `public/models/projects/` klasörüne koyun
2. `projects.ts` dosyasında `glbUrl` değiştirin
3. Git commit + push yapın
4. VPS'te `git pull` + `pm2 restart lny`