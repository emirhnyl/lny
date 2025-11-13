"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Save, Upload } from "lucide-react"

interface BlogEditorProps {
  post?: any
  categories: any[]
}

export default function BlogEditor({ post, categories }: BlogEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    content: post?.content || "",
    categoryId: post?.categoryId || categories[0]?.id || "",
    tags: post?.tags || "",
    status: post?.status || "DRAFT",
    featured: post?.featured || false,
    coverImage: post?.coverImage || "",
    authorName: post?.authorName || "",
    authorBio: post?.authorBio || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = post 
        ? `/api/admin/blog/${post.id}`
        : "/api/admin/blog"
      
      const method = post ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          publishedAt: formData.status === "PUBLISHED" ? new Date() : null,
        })
      })

      if (!res.ok) throw new Error("Bir hata oluştu")

      toast.success(post ? "Yazı güncellendi" : "Yazı oluşturuldu")
      router.push("/content/blog")
      router.refresh()
    } catch (error) {
      toast.error("Bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = () => {
    const turkishMap: { [key: string]: string } = {
      'ç': 'c', 'ğ': 'g', 'ı': 'i', 'İ': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
      'Ç': 'c', 'Ğ': 'g', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
    }
    
    const slug = formData.title
      .split('')
      .map((char: string) => turkishMap[char] || char)
      .join('')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    setFormData({ ...formData, slug })
  }

  // Handle cover image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error("Sadece resim dosyaları yüklenebilir")
      return
    }

    setUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append("files", file)
      uploadFormData.append("folder", "blog")

      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: uploadFormData
      })

      if (!res.ok) throw new Error("Upload failed")

      const data = await res.json()
      const uploadedUrl = data.files[0].url

      setFormData(prev => ({ ...prev, coverImage: uploadedUrl }))
      toast.success("Kapak görseli yüklendi! Sunucu yenileniyor...")
      
      setTimeout(() => {
        toast.success("Görsel kullanıma hazır!")
      }, 3000)
    } catch (error) {
      toast.error("Dosya yükleme başarısız")
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {/* Title & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Yazı Başlığı *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              placeholder="Yazı başlığını girin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL Slug *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                placeholder="yazi-url-slug"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Oluştur
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            İçerik *
          </label>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            {/* Toolbar Info */}
            <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 px-3 py-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                💡 HTML etiketleri desteklenir: &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;a&gt;, &lt;img&gt;
              </div>
            </div>
            {/* Textarea */}
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={15}
              className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white resize-none font-mono text-sm"
              placeholder="Blog içeriği... HTML formatında yazabilirsiniz.

Örnek:
<h2>Alt Başlık</h2>
<p>Paragraf metni burada...</p>
<ul>
  <li>Liste öğesi 1</li>
  <li>Liste öğesi 2</li>
</ul>"
            />
          </div>
        </div>

        {/* Category & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kategori *
            </label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Etiketler (virgülle ayırın)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="teknoloji, yazılım, tasarım"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Author Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Yazar Adı
              <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
                (Ör: Ahmet Yılmaz, LN-ArGe Ekibi)
              </span>
            </label>
            <input
              type="text"
              value={formData.authorName}
              onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
              placeholder="Yazar adınızı girin"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Yazar Açıklaması
              <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
                (Ör: Makine Mühendisi, Yazılım Geliştirici)
              </span>
            </label>
            <input
              type="text"
              value={formData.authorBio}
              onChange={(e) => setFormData({ ...formData, authorBio: e.target.value })}
              placeholder="Kısa açıklama"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Cover Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kapak Görseli
            <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
              (Önerilen: 1920x1080px veya 16:9 oran)
            </span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="cover-image-upload"
              />
              <label
                htmlFor="cover-image-upload"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary dark:hover:border-primary cursor-pointer transition-colors bg-gray-50 dark:bg-gray-700/50"
              >
                <Upload className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {uploading ? "Yükleniyor..." : "Görsel Yükle"}
                </span>
              </label>
            </div>
            <input
              type="text"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="veya manuel URL"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            />
          </div>
          {formData.coverImage && (
            <div className="mt-3 relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={formData.coverImage}
                alt="Cover preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Status & Featured */}
        <div className="flex items-center space-x-6 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Durum
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            >
              <option value="DRAFT">Taslak</option>
              <option value="PUBLISHED">Yayında</option>
              <option value="ARCHIVED">Arşivlendi</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Öne Çıkarılmış Yazı
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {loading ? "Kaydediliyor..." : post ? "Güncelle" : "Oluştur"}
        </button>
      </div>
    </form>
  )
}
