'use client'

import { useEffect, useRef } from 'react'

interface HolographicBackgroundProps {
  children?: React.ReactNode
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}

export default function HolographicBackground({ 
  children, 
  intensity = 'low',
  className = '' 
}: HolographicBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    
    // Clear any existing elements first
    const existingElements = container.querySelectorAll('.holo-grid-bg, .grid-line-horizontal-bg, .grid-line-vertical-bg, .holo-text-bg')
    existingElements.forEach(el => el.remove())

    // Adjust element count based on intensity
    const gridCount = intensity === 'high' ? 12 : intensity === 'medium' ? 6 : 3
    const textCount = intensity === 'high' ? 8 : intensity === 'medium' ? 4 : 2
    const horizontalLines = intensity === 'high' ? 8 : intensity === 'medium' ? 5 : 3
    const verticalLines = intensity === 'high' ? 12 : intensity === 'medium' ? 8 : 4

    // Pre-calculate random values
    const gridPositions = Array.from({ length: gridCount }, () => ({
      width: 60 + Math.random() * 100,
      height: 40 + Math.random() * 60,
      left: Math.random() * 95,
      top: Math.random() * 95,
      delay: Math.random() * 3
    }))

    const textPositions = Array.from({ length: textCount }, () => ({
      left: Math.random() * 85,
      top: Math.random() * 85
    }))

    // Pre-calculate opacity values for grid lines
    const horizontalOpacities = Array.from({ length: horizontalLines }, () => 0.1 + Math.random() * 0.2)
    const verticalOpacities = Array.from({ length: verticalLines }, () => 0.1 + Math.random() * 0.2)

    // Generate Holo Grid elements
    gridPositions.forEach((pos, i) => {
      const grid = document.createElement('div')
      grid.className = 'holo-grid-bg'
      grid.style.cssText = `
        position: absolute;
        border: 1px solid rgba(245, 193, 14, 0.15);
        background: rgba(245, 193, 14, 0.02);
        animation: holoFlicker 3s ease-in-out infinite alternate;
        width: ${pos.width}px;
        height: ${pos.height}px;
        left: ${pos.left}%;
        top: ${pos.top}%;
        animation-delay: ${pos.delay}s;
        pointer-events: none;
      `
      container.appendChild(grid)
    })

    // Generate Static Grid Lines (horizontal)
    for (let i = 0; i < horizontalLines; i++) {
      const line = document.createElement('div')
      line.className = 'grid-line-horizontal-bg'
      line.style.cssText = `
        position: absolute;
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, 
          transparent 0%,
          rgba(245, 193, 14, 0.2) 50%,
          transparent 100%
        );
        top: ${i * (100 / horizontalLines)}%;
        opacity: ${horizontalOpacities[i]};
        pointer-events: none;
      `
      container.appendChild(line)
    }

    // Generate Static Grid Lines (vertical)
    for (let i = 0; i < verticalLines; i++) {
      const line = document.createElement('div')
      line.className = 'grid-line-vertical-bg'
      line.style.cssText = `
        position: absolute;
        height: 100%;
        width: 1px;
        background: linear-gradient(180deg, 
          transparent 0%,
          rgba(245, 193, 14, 0.2) 50%,
          transparent 100%
        );
        left: ${i * (100 / verticalLines)}%;
        opacity: ${verticalOpacities[i]};
        pointer-events: none;
      `
      container.appendChild(line)
    }

    // Generate subtle background text (only for medium/high intensity)
    if (intensity !== 'low') {
      const texts = ['> PROCESSING...', '> OPTIMIZING...', '> ANALYZING...']
      texts.slice(0, textCount).forEach((text, i) => {
        const textEl = document.createElement('div')
        textEl.className = 'holo-text-bg'
        textEl.textContent = text
        textEl.style.cssText = `
          position: absolute;
          color: rgba(245, 193, 14, 0.1);
          font-family: 'Courier New', monospace;
          font-size: 10px;
          font-weight: bold;
          animation: textScrollSlow 12s linear infinite;
          left: ${textPositions[i].left}%;
          top: ${textPositions[i].top}%;
          animation-delay: ${i * 4}s;
          pointer-events: none;
        `
        container.appendChild(textEl)
      })
    }

    return () => {
      // Cleanup generated elements
      const elements = container.querySelectorAll('.holo-grid-bg, .grid-line-horizontal-bg, .grid-line-vertical-bg, .holo-text-bg')
      elements.forEach(el => el.remove())
    }
  }, [intensity])

  return (
    <div className={`relative ${className}`}>
      {/* Background & generated layer (clipped) */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, 
            rgba(0, 0, 0, 1) 0%,
            rgba(15, 15, 15, 1) 30%,
            rgba(25, 22, 8, 1) 50%,
            rgba(15, 15, 15, 1) 70%,
            rgba(0, 0, 0, 1) 100%
          )`
        }}
        aria-hidden="true"
      />
      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes holoFlicker {
          0% { opacity: 0.6; filter: blur(0px); }
          100% { opacity: 0.2; filter: blur(1px); }
        }
        
        @keyframes textScrollSlow {
          0% { transform: translateX(-120%); opacity: 0; }
          10% { opacity: 0.4; }
          85% { opacity: 0.4; }
          100% { transform: translateX(120%); opacity: 0; }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
