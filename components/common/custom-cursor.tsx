'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { throttle } from '@/lib/utils'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Sadece client-side'da çalış
    setIsMounted(true)
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // İlk mouse pozisyonunu al (ışınlanma önleme)
    const getInitialPosition = () => {
      const rect = document.body.getBoundingClientRect()
      return {
        x: rect.width / 2,  // Ekran ortası
        y: rect.height / 2
      }
    }

    setMousePosition(getInitialPosition())

    const handleMouseMove = throttle((e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) {
        setIsVisible(true)
      }
    }, 16) // 60fps

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    // Sayfa dışına çıkınca cursor'u gizle
    const handleDocumentLeave = () => {
      setIsVisible(false)
    }

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-interactive]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleDocumentLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleDocumentLeave)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isVisible])

  // Don't render on mobile devices or server-side
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    if (isMobile) setIsVisible(false)
  }, [])

  // Server-side rendering guard
  if (!isMounted) return null
  
  // Mobile guard
  if (!isVisible) return null

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
        transform: `scale(${isHovering ? 1.5 : 1})`,
        transition: 'transform 0.2s ease-out',
        opacity: isVisible ? (isHovering ? 0.8 : 0.6) : 0,
      }}
    >
      <div className="w-4 h-4 bg-primary rounded-full" />
    </div>
  )
}
