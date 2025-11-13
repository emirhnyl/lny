"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface SettingsFormProps {
  settings: any[]
  category: string
}

export default function SettingsForm({ settings, category }: SettingsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(
    settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {} as Record<string, string>)
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          settings: Object.entries(formData).map(([key, value]) => ({ key, value }))
        })
      })

      if (!res.ok) throw new Error()

      toast.success("Ayarlar kaydedildi")
      router.refresh()
    } catch {
      toast.error("Bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const getFieldLabel = (key: string) => {
    const labels: Record<string, string> = {
      site_name: "Site Adı",
      site_description: "Site Açıklaması",
      site_url: "Site URL",
      contact_email: "İletişim E-posta",
      contact_phone: "Telefon",
      contact_address: "Adres",
      facebook_url: "Facebook",
      twitter_url: "Twitter",
      linkedin_url: "LinkedIn",
      instagram_url: "Instagram",
      meta_title: "Meta Başlık",
      meta_description: "Meta Açıklama",
      meta_keywords: "Meta Anahtar Kelimeler",
      smtp_host: "SMTP Host",
      smtp_port: "SMTP Port",
      smtp_user: "SMTP Kullanıcı",
      smtp_password: "SMTP Şifre",
    }
    return labels[key] || key
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {settings.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          Bu kategoride ayar bulunmuyor.
        </p>
      ) : (
        settings.map((setting) => (
          <div key={setting.key}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {getFieldLabel(setting.key)}
            </label>
            {setting.key.includes("description") || setting.key.includes("address") ? (
              <textarea
                value={formData[setting.key] || ""}
                onChange={(e) => setFormData({ ...formData, [setting.key]: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <input
                type={setting.key.includes("password") ? "password" : "text"}
                value={formData[setting.key] || ""}
                onChange={(e) => setFormData({ ...formData, [setting.key]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            )}
          </div>
        ))
      )}

      {settings.length > 0 && (
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-2 bg-primary hover:bg-primary/90 text-dark font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? "Kaydediliyor..." : "Kaydet"}</span>
          </button>
        </div>
      )}
    </form>
  )
}
