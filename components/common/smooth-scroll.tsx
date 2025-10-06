'use client'

import { useEffect } from 'react'

interface SmoothScrollProps {
  children: React.ReactNode
  targetSection?: string
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  
  useEffect(() => {
    // Elementleri test et
    const testElements = () => {
      const heroSection = document.querySelector('[data-hero-section]')
      const servicesSection = document.querySelector('[data-section="services"]')
      
      console.log('🔍 Element Test:')
      console.log('Hero section found:', !!heroSection)
      console.log('Services section found:', !!servicesSection)
      
      if (heroSection) {
        console.log('Hero element:', heroSection)
      }
      if (servicesSection) {
        console.log('Services element:', servicesSection)
      }
    }

    // 1 saniye sonra test et (DOM yüklensin)
    setTimeout(testElements, 1000)

    // Basit wheel event test
    const handleWheel = (e: WheelEvent) => {
      console.log('🖱️ WHEEL EVENT DETECTED:', {
        deltaY: e.deltaY,
        scrollY: window.scrollY
      })
      
      // Basit koşul: yukarıda ve aşağı scroll
      if (window.scrollY < 200 && e.deltaY > 0) {
        console.log('✅ Conditions met - attempting scroll!')
        
        const servicesSection = document.querySelector('[data-section="services"]')
        if (servicesSection) {
          console.log('📍 Scrolling to services...')
          // En basit scroll
          servicesSection.scrollIntoView({ behavior: 'smooth' })
        } else {
          console.log('❌ Services section not found!')
        }
      }
    }

    // Basit scroll event test
    const handleScroll = () => {
      console.log('📜 SCROLL EVENT:', window.scrollY)
    }

    window.addEventListener('wheel', handleWheel)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="scroll-snap-container">
      {children}
    </div>
  )
}
