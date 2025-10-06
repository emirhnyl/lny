'use client'

import { useState } from 'react'
import { ScrollSection } from '@/components/common/scroll-section'
import { MagneticButton } from '@/components/common/magnetic-button'
import { Upload, FileText, Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import HolographicBackground from '@/components/backgrounds/holographic-background'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
  file: File | null
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    file: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const submitFormData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          submitFormData.append(key, value)
        }
      })

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: submitFormData,
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
          file: null
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <HolographicBackground intensity="medium">
      <div className="pt-20">
        {/* Hero Section */}
        <ScrollSection className="py-20 bg-gradient-to-br from-transparent via-black/20 to-black/40">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-white">
                İletişim
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Daha fazla bilgi almak için iletişime geçin.
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* Contact Info */}
        <ScrollSection className="py-20 bg-gradient-to-br from-transparent via-black/10 to-black/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 bg-black/40 border border-yellow-500/20 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4 text-white">Telefon</h3>
                <p className="text-gray-300">+90 530 307 35 39</p>
              </div>
              
              <div className="text-center p-8 bg-black/40 border border-yellow-500/20 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4 text-white">E-posta</h3>
                <p className="text-gray-300">ln.arge@outlook.com</p>
              </div>
              
              <div className="text-center p-8 bg-black/40 border border-yellow-500/20 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4 text-white">Adres</h3>
                <p className="text-gray-600 dark:text-gray-400">Teknopark, Kırıkkale, Türkiye</p>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Contact Form */}
        <ScrollSection className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-dark-50 rounded-3xl shadow-2xl p-8 md:p-12">
                <div className="text-center mb-12">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                    Proje Talebi Gönderin
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir
                  </p>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 dark:text-green-200">
                      Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağız.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-800 dark:text-red-200">
                      Bir hata oluştu. Lütfen daha sonra tekrar deneyin.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100"
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100"
                        placeholder="+90 xxx xx xx xx"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Şirket
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100"
                        placeholder="Şirket adınız"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      İlgilendiğiniz Hizmet
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100"
                    >
                      <option value="">Hizmet seçiniz</option>
                      <option value="arge">Tasarım</option>
                      <option value="mekanik">Analiz</option>
                      <option value="yazilim">Yazılım</option>
                      <option value="tumu">Tüm Hizmetler</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Proje Detayları *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100"
                      placeholder="Projeniz hakkında detayları paylaşın..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Dosya Yükleme
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="file"
                        accept=".pdf,.step,.stp,.dwg"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary transition-colors"
                      >
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            PDF, STEP, DWG dosyalarınızı yükleyebilirsiniz
                          </p>
                          {formData.file && (
                            <div className="mt-2 flex items-center justify-center space-x-2">
                              <FileText className="w-4 h-4 text-primary" />
                              <span className="text-sm text-primary">{formData.file.name}</span>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-dark-200 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2">
                      <span className="text-primary">ℹ️</span>
                      <span>
                        Bu form reCAPTCHA v3 ile korunmaktadır. Google'ın{' '}
                        <a href="https://policies.google.com/privacy" className="text-primary hover:underline">
                          Gizlilik Politikası
                        </a>{' '}
                        ve{' '}
                        <a href="https://policies.google.com/terms" className="text-primary hover:underline">
                          Hizmet Şartları
                        </a>{' '}
                        geçerlidir.
                      </span>
                    </p>
                  </div>

                  <div className="text-center">
                    <MagneticButton
                      disabled={isSubmitting}
                      className={`px-12 py-4 text-lg font-semibold ${
                        isSubmitting
                          ? 'opacity-50 cursor-not-allowed'
                          : 'bg-primary hover:bg-primary/90 text-dark'
                      }`}
                    >
                      {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                    </MagneticButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ScrollSection>
      </div>
    </HolographicBackground>
  )
}
