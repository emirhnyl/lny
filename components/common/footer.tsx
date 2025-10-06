'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Şirket': [
      { name: 'Hakkımızda', href: '/about' },
      { name: 'Hizmetler', href: '/services' },
      { name: 'Projeler', href: '/projects' },
      { name: 'Blog', href: '/blog' },
    ],
    'Hizmetler': [
      { name: 'AR-GE Danışmanlığı', href: '/services#arge' },
      { name: 'Mekanik Tasarım', href: '/services#mekanik' },
      { name: 'Yazılım Otomasyon', href: '/services#yazilim' },
      { name: 'CFD Analiz', href: '/services#cfd' },
    ],
    'Destek': [
      { name: 'İletişim', href: '/contact' },
      { name: 'SSS', href: '/faq' },
      { name: 'Gizlilik Politikası', href: '/privacy' },
      { name: 'Kullanım Koşulları', href: '/terms' },
    ],
  }

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Email', href: 'mailto:info@lnarge.com', icon: Mail },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-dark-100 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center space-x-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="/logo.jpg" 
                alt="LnY ArGe Logo" 
                className="w-10 h-10 rounded-lg object-contain"
              />
              <span className="font-heading font-bold text-2xl gradient-text">Ln-ArGe</span>
            </motion.div>

            <motion.p
              className="text-gray-600 dark:text-gray-400 mb-6 max-w-md"
              
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              AR-GE danışmanlığı, mekanik tasarım, analiz ve yazılım-otomasyon çözümleriyle işletmelerin inovasyon ve büyümesine güç katıyoruz. 
              
              
            </motion.p>

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Teknokent, Kırıkkale, Türkiye</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+90 530 307 35 39</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@lnarge.com" className="text-sm hover:text-primary transition-colors">info@lnarge.com</a>
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + categoryIndex * 0.1 }}
            >
              <h3 className="font-heading font-semibold text-lg mb-6 text-gray-900 dark:text-gray-100">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              className="text-gray-600 dark:text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © {currentYear} Ln-ArGe. Tüm hakları saklıdır.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-dark-200 hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
