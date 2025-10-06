'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '@/components/common/magnetic-button'

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  href: string
  features?: string[]
}

export function ServiceCard({ title, description, icon, href, features }: ServiceCardProps) {
  return (
    <motion.div
      className="group relative p-8 bg-white dark:bg-dark-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon */}
      <motion.div
        className="text-6xl mb-6"
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-heading font-bold text-2xl mb-4 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          {description}
        </p>
        
        {features && features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                {feature}
              </motion.li>
            ))}
          </ul>
        )}
        
        {/* CTA */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <MagneticButton
            href={href}
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80 p-0 h-auto font-semibold"
          >
            Detayları Gör
          </MagneticButton>
          
          <motion.div
            className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors"
            whileHover={{ x: 5 }}
          >
            <ArrowRight className="w-4 h-4 text-primary" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
    </motion.div>
  )
}
