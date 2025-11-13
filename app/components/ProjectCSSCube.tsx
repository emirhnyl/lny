'use client'

import { useState } from 'react'
import { Play, Pause, Maximize2 } from 'lucide-react'

interface ProjectCSSCubeProps {
  projectId: string
  className?: string
}

const getProjectColor = (projectId: string): string => {
  const colors: Record<string, string> = {
    'otomotiv-parca-cfd': '#FF6B6B',
    'endustriyel-otomasyon': '#4ECDC4', 
    'interaktif-3d-model': '#FFE66D',
    'tubitak-1501': '#95E1D3'
  }
  return colors[projectId] || '#6366f1'
}

export default function ProjectCSSCube({ projectId, className = '' }: ProjectCSSCubeProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const color = getProjectColor(projectId)

  const toggleRotation = () => {
    setIsPlaying(!isPlaying)
  }

  const expandViewer = () => {
    alert(`Proje: ${projectId}\nDaha büyük görünüm için backend ayarlama gerekiyor.`)
  }

  return (
    <div className={`relative ${className}`}>
      {/* CSS 3D Cube Container */}
      <div className="w-full h-full rounded-lg overflow-hidden relative perspective-1000" style={{ minHeight: '200px' }}>
        
        {/* 3D Cube */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className={`cube-container ${isPlaying ? 'animate-spin-slow' : ''}`}
            style={{
              width: '120px',
              height: '120px',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(-15deg) rotateY(15deg)'
            }}
          >
            {/* Cube faces */}
            <div 
              className="cube-face cube-front"
              style={{
                position: 'absolute',
                width: '120px',
                height: '120px',
                background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                border: `2px solid ${color}`,
                transform: 'translateZ(60px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              FRONT
            </div>
            
            <div 
              className="cube-face cube-back"
              style={{
                position: 'absolute',
                width: '120px',
                height: '120px',
                background: `linear-gradient(135deg, ${color}cc, ${color}aa)`,
                border: `2px solid ${color}`,
                transform: 'translateZ(-60px) rotateY(180deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              BACK
            </div>
            
            <div 
              className="cube-face cube-right"
              style={{
                position: 'absolute',
                width: '120px',
                height: '120px',
                background: `linear-gradient(135deg, ${color}bb, ${color}88)`,
                border: `2px solid ${color}`,
                transform: 'rotateY(90deg) translateZ(60px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              RIGHT
            </div>
            
            <div 
              className="cube-face cube-left"
              style={{
                position: 'absolute',
                width: '120px',
                height: '120px',
                background: `linear-gradient(135deg, ${color}aa, ${color}77)`,
                border: `2px solid ${color}`,
                transform: 'rotateY(-90deg) translateZ(60px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              LEFT
            </div>
            
            <div 
              className="cube-face cube-top"
              style={{
                position: 'absolute',
                width: '120px',
                height: '120px',
                background: `linear-gradient(135deg, ${color}ee, ${color}bb)`,
                border: `2px solid ${color}`,
                transform: 'rotateX(90deg) translateZ(60px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              TOP
            </div>
            
            <div 
              className="cube-face cube-bottom"
              style={{
                position: 'absolute',
                width: '120px',
                height: '120px',
                background: `linear-gradient(135deg, ${color}99, ${color}66)`,
                border: `2px solid ${color}`,
                transform: 'rotateX(-90deg) translateZ(60px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              BOTTOM
            </div>
          </div>
        </div>

        {/* Background */}
        <div 
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(circle at center, ${color}15 0%, transparent 70%)`
          }}
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-2 right-2 flex gap-1">
        <button
          onClick={toggleRotation}
          className="p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-md transition-colors"
          title={isPlaying ? 'Durdur' : 'Oynat'}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
        
        <button
          onClick={expandViewer}
          className="p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-md transition-colors"
          title="Büyüt"
        >
          <Maximize2 className="w-3 h-3" />
        </button>
      </div>



      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .animate-spin-slow {
          animation: rotate3d 8s linear infinite;
        }
        
        @keyframes rotate3d {
          0% { transform: rotateX(-15deg) rotateY(15deg); }
          25% { transform: rotateX(-15deg) rotateY(105deg); }
          50% { transform: rotateX(-15deg) rotateY(195deg); }
          75% { transform: rotateX(-15deg) rotateY(285deg); }
          100% { transform: rotateX(-15deg) rotateY(375deg); }
        }
      `}</style>
    </div>
  )
}