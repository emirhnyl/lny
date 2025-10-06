# 📁 GLB Models Directory

Bu klasörde proje 3D modelleriniz bulunur.

## 📋 Mevcut Dosyalar

- ✅ `155mm_he_shell_m51a5.glb` - Şu anda kullanımda (otomotiv-parca-cfd)
- ✅ `test-cube.glb` - Test dosyası
- ✅ `otomotiv-parca.glb` - Eski otomotiv parçası

## 🆕 Yeni GLB Dosyası Ekleme

1. `.glb` dosyanızı bu klasöre koyun
2. `app/data/projects.ts` dosyasında ilgili projenin `glbUrl` değerini güncelleyin:
   ```typescript
   glbUrl: '/models/projects/DOSYA_ADINIZ.glb'
   ```

## 📏 Dosya Boyut Önerileri

- **Küçük**: < 2MB (web için ideal)
- **Orta**: 2-10MB (kabul edilebilir)
- **Büyük**: > 10MB (optimize edilmeli)

## 🔄 Güncelleme Süreci

Dosya ekledikten sonra:
1. Git commit
2. Git push
3. VPS'te git pull
4. PM2 restart