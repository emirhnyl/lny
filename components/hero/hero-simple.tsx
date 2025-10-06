'use client'

// import { LogoMark } from './logo-mark' // Artık kullanılmıyor
import { MagneticButton } from '../common/magnetic-button'
import { useEffect, useRef } from 'react'

export default function HeroSimple() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    
    // Clear any existing elements first
    const existingElements = container.querySelectorAll('.holo-grid, .grid-line-horizontal, .grid-line-vertical, .holo-text')
    existingElements.forEach(el => el.remove())

    // Pre-calculate random values to avoid re-renders
    const gridPositions = Array.from({ length: 8 }, () => ({
      width: 80 + Math.random() * 120,
      height: 50 + Math.random() * 80,
      left: Math.random() * 90,
      top: Math.random() * 90,
      delay: Math.random() * 2
    }))

    const textPositions = Array.from({ length: 12 }, () => ({
      left: Math.random() * 80,
      top: Math.random() * 80
    }))

    // Generate Holo Grid elements
    gridPositions.forEach((pos, i) => {
      const grid = document.createElement('div')
      grid.className = 'holo-grid'
      grid.style.cssText = `
        position: absolute;
        border: 1px solid rgba(245, 193, 14, 0.3);
        background: rgba(245, 193, 14, 0.05);
        animation: holoFlicker 2s ease-in-out infinite alternate;
        width: ${pos.width}px;
        height: ${pos.height}px;
        left: ${pos.left}%;
        top: ${pos.top}%;
        animation-delay: ${pos.delay}s;
      `
      container.appendChild(grid)
    })

    // Pre-calculate opacity values for grid lines
    const horizontalOpacities = Array.from({ length: 8 }, () => 0.3 + Math.random() * 0.4)
    const verticalOpacities = Array.from({ length: 12 }, () => 0.3 + Math.random() * 0.4)

    // Generate Static Grid Lines (horizontal)
    for (let i = 0; i < 8; i++) {
      const line = document.createElement('div')
      line.className = 'grid-line-horizontal'
      line.style.cssText = `
        position: absolute;
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, 
          transparent 0%,
          rgba(245, 193, 14, 0.4) 50%,
          transparent 100%
        );
        top: ${i * 12.5}%;
        opacity: ${horizontalOpacities[i]};
      `
      container.appendChild(line)
    }

    // Generate Static Grid Lines (vertical)
    for (let i = 0; i < 12; i++) {
      const line = document.createElement('div')
      line.className = 'grid-line-vertical'
      line.style.cssText = `
        position: absolute;
        height: 100%;
        width: 1px;
        background: linear-gradient(180deg, 
          transparent 0%,
          rgba(245, 193, 14, 0.4) 50%,
          transparent 100%
        );
        left: ${i * 8.33}%;
        opacity: ${verticalOpacities[i]};
      `
      container.appendChild(line)
    }

    // Generate Holographic text (reduced count)
    const texts = [
      '> TASARIM...', 
      '> ANALIZ...', 
      '> YAZILIM...', 
      '> PROTOTIP...', 
      '> OPTIMIZASYON...',
      '> UI/UX...',
      '> API...',
      '> DATABASE...'
    ]
    
    texts.forEach((text, i) => {
      const textEl = document.createElement('div')
      textEl.className = 'holo-text'
      textEl.textContent = text
      textEl.style.cssText = `
        position: absolute;
        color: rgba(245, 193, 14, 0.8);
        font-family: 'Courier New', monospace;
        font-size: 12px;
        font-weight: bold;
        animation: textScroll 6s linear infinite;
        left: ${textPositions[i].left}%;
        top: ${textPositions[i].top}%;
        animation-delay: ${i * 0.4}s;
        z-index: 1;
      `
      container.appendChild(textEl)
    })

    // Add immediate texts (reduced count)
    const immediateTexts = ['> SISTEM HAZIR...', '> BASLANIYOR...']
    immediateTexts.forEach((text, i) => {
      const immediateText = document.createElement('div')
      immediateText.className = 'holo-text'
      immediateText.textContent = text
      immediateText.style.cssText = `
        position: absolute;
        color: rgba(245, 193, 14, 0.9);
        font-family: 'Courier New', monospace;
        font-size: 12px;
        font-weight: bold;
        animation: textScroll 6s linear infinite;
        left: ${textPositions[10 + i].left}%;
        top: ${textPositions[10 + i].top}%;
        animation-delay: ${i * 0.3}s;
        z-index: 1;
      `
      container.appendChild(immediateText)
    })

    return () => {
      // Cleanup generated elements
      const elements = container.querySelectorAll('.holo-grid, .grid-line-horizontal, .grid-line-vertical, .holo-text')
      elements.forEach(el => el.remove())
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          rgba(0, 0, 0, 1) 0%,
          rgba(20, 20, 20, 1) 30%,
          rgba(40, 35, 10, 1) 50%,
          rgba(20, 20, 20, 1) 70%,
          rgba(0, 0, 0, 1) 100%
        )`
      }}
    >
      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes holoFlicker {
          0% { opacity: 0.8; filter: blur(0px); }
          100% { opacity: 0.3; filter: blur(1px); }
        }
        
        @keyframes textScroll {
          0% { transform: translateX(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
      `}</style>
      
      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center pointer-events-auto">
          <img 
            src="/logo.jpg" 
            alt="LnY ArGe Logo" 
            className="w-32 h-32 mx-auto mb-8 hover:scale-110 transition-transform duration-300 object-contain"
          />
          <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6 gradient-text hover:scale-105 transition-transform duration-300 cursor-default">
            Ln-ArGe
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 hover:text-primary/80 transition-colors duration-300">
            Logaritmik büyüme ve yenilikle işletmenizi geleceğe taşıyoruz
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <MagneticButton 
              href="/contact"
              className="bg-primary hover:bg-primary/90 text-dark px-8 py-4 text-lg font-semibold cursor-pointer"
            >
              Teklif Al
            </MagneticButton>
            
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
          <span className="text-sm mb-2 animate-pulse">Keşfetmek için kaydır</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent animate-pulse"></div>
          <div className="w-2 h-2 bg-primary rounded-full mt-1 animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}
