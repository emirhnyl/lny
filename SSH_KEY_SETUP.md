# 🔑 SSH Key ile Deployment (Şifresiz Giriş)

## Neden SSH Key?
- ✅ Daha güvenli
- ✅ Şifre gerekmez
- ✅ GitHub Actions otomatik bağlanır

## 🚀 Kurulum (5 Dakika)

### ADIM 1: Local Bilgisayarınızda SSH Key Oluşturun

```bash
# SSH key oluştur (Mac/Linux)
ssh-keygen -t ed25519 -C "github-actions-lny"

# Varsayılan konumu kabul edin: ~/.ssh/id_ed25519
# Passphrase isterse boş bırakın (sadece ENTER)
```

### ADIM 2: Public Key'i Hostinger'a Ekleyin

```bash
# Public key'i kopyalayın
cat ~/.ssh/id_ed25519.pub
```

**Hostinger Terminalinizde:**

```bash
# Authorized keys dosyasını açın
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys

# Public key'i yapıştırın (CTRL+V)
# Kaydet: CTRL+X, Y, ENTER

# İzinleri ayarlayın
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### ADIM 3: Private Key'i GitHub Secrets'a Ekleyin

```bash
# Private key'i kopyalayın
cat ~/.ssh/id_ed25519

# Tamamını kopyalayın (-----BEGIN... ile -----END... dahil)
```

**GitHub'da:**
- Repository > Settings > Secrets > New secret
- Name: `SSH_PRIVATE_KEY`
- Value: (Kopyaladığınız private key'in tamamı)

### ADIM 4: GitHub Actions Workflow'u Güncelleyin

`.github/workflows/deploy.yml` dosyasında şifre yerine SSH key kullanacak şekilde güncelleyin.

---

## ⚡ DAHA KOLAY YOL: Mevcut Şifreyi Kullan

Eğer SSH key kurmak istemiyorsanız:

1. Hostinger Panel > VPS > Access Details
2. Root password'u kopyalayın
3. GitHub Secrets > SSH_PASSWORD'a ekleyin

İşte bu kadar! 🎉
