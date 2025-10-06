'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = 'default',
  size = 'md',
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Apply magnetic effect
    const element = buttonRef.current as HTMLElement
    element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current || disabled) return
    
    setIsHovered(false)
    const element = buttonRef.current as HTMLElement
    element.style.transform = 'translate(0px, 0px)'
  }

  const baseClasses = cn(
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
      'px-4 py-2 text-sm rounded-md': size === 'sm',
      'px-6 py-3 text-base rounded-lg': size === 'md',
      'px-8 py-4 text-lg rounded-xl': size === 'lg',
      'bg-primary text-dark hover:bg-primary/90': variant === 'default',
      'border-2 border-primary text-primary bg-transparent hover:bg-primary/10': variant === 'outline',
      'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-200': variant === 'ghost',
    },
    className
  )

  const Component = href ? 'a' : 'button'

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Component
        ref={buttonRef as any}
        href={href}
        onClick={onClick}
        disabled={disabled}
        className={baseClasses}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        data-interactive
      >
        <span className="relative z-10">
          {children}
        </span>
        
        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-inherit bg-primary/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </Component>
    </motion.div>
  )
}
