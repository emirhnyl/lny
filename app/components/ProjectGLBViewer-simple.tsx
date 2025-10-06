'use client'

import { useRef, useEffect, useState } from 'react'
import { Play, Pause, RotateCcw, Maximize2 } from 'lucide-react'

interface ProjectGLBViewerProps {
  projectId: string
  glbUrl?: string
  className?: string
  autoRotate?: boolean
  showControls?: boolean
}

export default function ProjectGLBViewer({ 
  projectId, 
  glbUrl, 
  className = '',
  autoRotate = true,
  showControls = true
}: ProjectGLBViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(autoRotate)

  // Project colors
  const getProjectColor = (id: string) => {
    const colors: { [key: string]: string } = {
      'otomotiv-parca-cfd': '#FF6B6B',      // Kırmızı
      'endustriyel-otomasyon': '#4ECDC4',   // Turkuaz  
      'interaktif-3d-model': '#FFE66D',     // Sarı
      'tubitak-1501': '#95E1D3',            // Yeşil
    }
    return colors[id] || '#F5C10E'
  }

  // Initialize Three.js scene
  useEffect(() => {
    let mounted = true
    let scene: any
    let camera: any
    let renderer: any
    let cube: any
    let animationId: number

    const initScene = async () => {
      if (!mountRef.current || !mounted) return

      try {
        console.log('Loading Three.js for project:', projectId)
        
        // Clear any existing content
        mountRef.current.innerHTML = ''
        
        const THREE = await import('three')
        console.log('Three.js loaded successfully')

        const container = mountRef.current
        const width = container.clientWidth || 300
        const height = container.clientHeight || 200

        // Scene
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0x1a1a1a)

        // Camera
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        camera.position.set(0, 0, 5)

        // Renderer
        renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha: false
        })
        renderer.setSize(width, height)
        renderer.setClearColor(0x1a1a1a, 1)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap

        // Create cube geometry
        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
        
        // Create material with project color
        const color = getProjectColor(projectId)
        const material = new THREE.MeshLambertMaterial({ 
          color: color,
          transparent: false
        })
        
        cube = new THREE.Mesh(geometry, material)
        cube.castShadow = true
        cube.receiveShadow = true
        scene.add(cube)
        console.log('Cube created with color:', color)

        // Add project-specific decorations
        if (projectId === 'otomotiv-parca-cfd') {
          // Add small cubes around for CFD effect
          for (let i = 0; i < 4; i++) {
            const smallGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
            const smallMaterial = new THREE.MeshLambertMaterial({ 
              color: 0xff8888,
              transparent: true,
              opacity: 0.7
            })
            const smallCube = new THREE.Mesh(smallGeometry, smallMaterial)
            
            const angle = (i / 4) * Math.PI * 2
            smallCube.position.set(
              Math.cos(angle) * 2.5,
              Math.sin(angle) * 0.3,
              Math.sin(angle) * 2.5
            )
            scene.add(smallCube)
          }
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.8)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(5, 5, 5)
        directionalLight.castShadow = true
        scene.add(directionalLight)

        // Add accent light
        const pointLight = new THREE.PointLight(0xF5C10E, 0.5, 50)
        pointLight.position.set(-3, 3, -3)
        scene.add(pointLight)

        // Mount to DOM
        container.appendChild(renderer.domElement)
        console.log('Renderer mounted to DOM')

        // Animation loop
        const animate = () => {
          if (!mounted) return
          
          animationId = requestAnimationFrame(animate)
          
          if (cube && isPlaying) {
            cube.rotation.x += 0.008
            cube.rotation.y += 0.012
          }
          
          if (renderer && scene && camera) {
            renderer.render(scene, camera)
          }
        }
        animate()

        setIsLoading(false)
        console.log('Three.js setup complete for project:', projectId)

      } catch (err) {
        console.error('Three.js initialization error:', err)
        setError('3D görselleştirme yüklenemedi: ' + (err as Error).message)
        setIsLoading(false)
        
        // Fallback: Show colored div
        if (mountRef.current && mounted) {
          mountRef.current.innerHTML = `
            <div style="
              width: 100%; 
              height: 100%; 
              background: linear-gradient(45deg, ${getProjectColor(projectId)}, ${getProjectColor(projectId)}80);
              display: flex; 
              align-items: center; 
              justify-content: center;
              border-radius: 8px;
              color: white;
              font-weight: bold;
              text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            ">
              <div style="text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎮</div>
                <div>3D Model</div>
                <div style="font-size: 0.8rem; opacity: 0.8;">${projectId}</div>
              </div>
            </div>
          `
        }
      }
    }

    // Add delay to ensure container is ready
    const timer = setTimeout(initScene, 100)

    return () => {
      mounted = false
      clearTimeout(timer)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (renderer && mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [projectId, isPlaying])

  const toggleRotation = () => {
    setIsPlaying(!isPlaying)
  }

  const expandViewer = () => {
    const url = `/viewer-new?project=${projectId}&demo=true`
    window.open(url, '_blank')
  }

  return (
    <div className={`relative ${className}`}>
      {/* 3D Canvas Container */}
      <div 
        ref={mountRef}
        className="w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black relative"
        style={{ 
          minHeight: '200px',
          background: `linear-gradient(45deg, ${getProjectColor(projectId)}20, ${getProjectColor(projectId)}10)`
        }}
      >
        {/* CSS Fallback if Three.js fails */}
        {!mountRef.current?.children.length && !isLoading && (
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(45deg, ${getProjectColor(projectId)}40, ${getProjectColor(projectId)}20)`,
            }}
          >
            <div className="text-center text-white">
              <div className="text-4xl mb-2">🎮</div>
              <div className="font-bold text-lg">3D Model</div>
              <div className="text-sm opacity-70">{projectId}</div>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm">3D Model Yükleniyor...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="text-center text-red-400">
            <div className="text-2xl mb-2">⚠️</div>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Controls */}
      {showControls && !isLoading && !error && (
        <div className="absolute bottom-2 right-2 flex gap-1">
          <button
            onClick={toggleRotation}
            className="p-1.5 bg-black/70 hover:bg-black/90 text-white rounded transition-colors"
            title={isPlaying ? "Durdur" : "Otomatik Döndür"}
          >
            {isPlaying ? (
              <Pause className="w-3 h-3" />
            ) : (
              <Play className="w-3 h-3" />
            )}
          </button>
          
          <button
            onClick={expandViewer}
            className="p-1.5 bg-primary/80 hover:bg-primary text-black rounded transition-colors"
            title="Tam Ekran Görüntüleyici"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 bg-black/80 text-white text-xs p-2 rounded max-w-xs z-30">
          <div>🎯 Proje: {projectId}</div>
          <div>🎨 Renk: {getProjectColor(projectId)}</div>
          <div>⚡ Durum: {isLoading ? 'Yükleniyor...' : error ? 'Hata' : 'Aktif'}</div>
          <div>🔄 Döner: {isPlaying ? 'Evet' : 'Hayır'}</div>
          <div>📦 Ref: {mountRef.current ? 'Bağlı' : 'Yok'}</div>
          <div>🖼️ DOM: {mountRef.current?.children.length || 0} canvas</div>
          <div>📏 Size: {mountRef.current?.clientWidth || 0}x{mountRef.current?.clientHeight || 0}</div>
        </div>
      )}
    </div>
  )
}