'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LogoMarkProps {
  className?: string
  animated?: boolean
}

export function LogoMark({ className, animated = true }: LogoMarkProps) {
  const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: 'easeInOut' },
        opacity: { duration: 0.3 },
      },
    },
  }

  const lightningVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.5,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    glow: {
      filter: [
        'drop-shadow(0 0 8px #F5C10E)',
        'drop-shadow(0 0 16px #F5C10E)',
        'drop-shadow(0 0 8px #F5C10E)',
      ],
      transition: {
        filter: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
      },
    },
  }

  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={cn('stroke-primary fill-none', className)}
      initial={animated ? 'hidden' : 'visible'}
      animate={animated ? ['visible', 'glow'] : 'visible'}
    >
      {/* ln(y) curve */}
      <motion.path
        d="M20 80 Q40 40 60 30 Q80 25 100 28"
        strokeWidth="3"
        strokeLinecap="round"
        variants={animated ? drawVariants : undefined}
        style={{
          strokeDasharray: animated ? undefined : 'none',
        }}
      />
      
      {/* y-axis label */}
      <motion.text
        x="15"
        y="25"
        className="fill-primary font-heading font-semibold text-sm"
        variants={animated ? drawVariants : undefined}
      >
        y
      </motion.text>
      
      {/* x-axis with ln label */}
      <motion.line
        x1="20"
        y1="80"
        x2="100"
        y2="80"
        strokeWidth="2"
        variants={animated ? drawVariants : undefined}
      />
      
      <motion.text
        x="85"
        y="95"
        className="fill-primary font-heading font-semibold text-xs"
        variants={animated ? drawVariants : undefined}
      >
        ln(x)
      </motion.text>
      
      {/* Lightning bolt */}
      <motion.g
        variants={animated ? lightningVariants : undefined}
        className="lightning-glow"
      >
        <motion.path
          d="M75 15 L70 35 L80 35 L75 55 L85 35 L78 35 Z"
          fill="#F5C10E"
          className="animate-lightning"
          animate={animated ? lightningVariants.glow : undefined}
        />
      </motion.g>
      
      {/* Growth points */}
      {[30, 45, 60, 75, 90].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={70 - i * 8}
          r="2"
          fill="#F5C10E"
          initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          animate={
            animated
              ? {
                  scale: 1,
                  opacity: 1,
                  transition: { delay: 2 + i * 0.2 },
                }
              : { scale: 1, opacity: 1 }
          }
          className="animate-pulse-glow"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </motion.svg>
  )
}
