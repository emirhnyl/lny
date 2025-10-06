'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface ScrollSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
}

export function ScrollSection({ 
  children, 
  className = '', 
  delay = 0,
  threshold = 0.1 
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier
      }
    }
  }

  return (
    <motion.div
      ref={sectionRef}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true, 
        threshold,
        margin: "-100px 0px -100px 0px"
      }}
      variants={sectionVariants}
    >
      {children}
    </motion.div>
  )
}
