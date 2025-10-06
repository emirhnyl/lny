'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { Maximize2, Minimize2, RotateCcw, Play, Pause, Info } from 'lucide-react'

interface ProjectDetailViewerProps {
  glbUrl?: string
  title: string
  description: string
  className?: string
  autoPlay?: boolean
}

export default function ProjectDetailViewer({
  glbUrl,
  title,
  description,
  className = '',
  autoPlay = true
}: ProjectDetailViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)
  const rendererRef = useRef<any>(null)
  const cameraRef = useRef<any>(null)
  const controlsRef = useRef<any>(null)
  const mixerRef = useRef<any>(null)
  const animationIdRef = useRef<number | null>(null)
  const modelRef = useRef<any>(null)
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hasAnimations, setHasAnimations] = useState(false)
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(autoPlay)
  const [showInfo, setShowInfo] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)

  // Initialize Three.js scene
  useEffect(() => {
    console.log('ProjectDetailViewer mounted with glbUrl:', glbUrl)
    const container = mountRef.current
    if (!container) {
      console.log('Container not found!')
      return
    }

    console.log('Container found, initializing Three.js...')

    const initThreeJS = async () => {
      try {
        const THREE = await import('three')
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')

        // Scene setup
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x0a0a0a)
        sceneRef.current = scene

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
          45,
          container.clientWidth / container.clientHeight,
          0.1,
          1000
        )
        camera.position.set(8, 6, 8)
        cameraRef.current = camera

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        })
        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.2
        rendererRef.current = renderer

        // Controls setup
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.minDistance = 2
        controls.maxDistance = 20
        controls.enablePan = true
        controls.enableZoom = true
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.5
        controlsRef.current = controls

        // Prevent page scroll when interacting with 3D viewer
        const preventPageScroll = (e: WheelEvent) => {
          e.preventDefault()
          e.stopPropagation()
        }

        const handleMouseEnter = () => {
          // Disable page scroll when mouse enters 3D viewer
          container.addEventListener('wheel', preventPageScroll, { passive: false })
          container.style.cursor = 'grab'
        }

        const handleMouseLeave = () => {
          // Re-enable page scroll when mouse leaves 3D viewer
          container.removeEventListener('wheel', preventPageScroll)
          container.style.cursor = 'default'
        }

        // Add mouse enter/leave listeners
        container.addEventListener('mouseenter', handleMouseEnter)
        container.addEventListener('mouseleave', handleMouseLeave)

        // Interaction events
        const handleInteractionStart = () => {
          setIsInteracting(true)
          controls.autoRotate = false
          container.style.cursor = 'grabbing'
        }

        const handleInteractionEnd = () => {
          setIsInteracting(false)
          container.style.cursor = 'grab'
          setTimeout(() => {
            if (controlsRef.current && !isInteracting) {
              controlsRef.current.autoRotate = true
            }
          }, 3000)
        }

        controls.addEventListener('start', handleInteractionStart)
        controls.addEventListener('end', handleInteractionEnd)

        // Advanced lighting setup
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
        scene.add(ambientLight)

        // Key light
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.2)
        keyLight.position.set(10, 10, 5)
        keyLight.castShadow = true
        keyLight.shadow.mapSize.width = 4096
        keyLight.shadow.mapSize.height = 4096
        keyLight.shadow.camera.near = 0.1
        keyLight.shadow.camera.far = 50
        keyLight.shadow.camera.left = -20
        keyLight.shadow.camera.right = 20
        keyLight.shadow.camera.top = 20
        keyLight.shadow.camera.bottom = -20
        scene.add(keyLight)

        // Fill light
        const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.6)
        fillLight.position.set(-10, 5, -5)
        scene.add(fillLight)

        // Rim light with LnY color
        const rimLight = new THREE.PointLight(0xF5C10E, 0.8, 50)
        rimLight.position.set(0, 10, -10)
        scene.add(rimLight)

        // Environment reflection
        const sphereGeometry = new THREE.SphereGeometry(100, 32, 32)
        const sphereMaterial = new THREE.MeshBasicMaterial({
          color: 0x222222,
          side: THREE.BackSide,
          transparent: true,
          opacity: 0.3
        })
        const environmentSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        scene.add(environmentSphere)

        // Grid helper with subtle styling
        const gridHelper = new THREE.GridHelper(20, 20, 0xF5C10E, 0x444444)
        ;(gridHelper.material as any).opacity = 0.2
        ;(gridHelper.material as any).transparent = true
        scene.add(gridHelper)

        // Mount renderer
        container.appendChild(renderer.domElement)

        // Load 3D model if URL provided
        if (glbUrl) {
          console.log('Attempting to load GLB from:', glbUrl)
          const loader = new GLTFLoader()
          
          loader.load(
            glbUrl,
            (gltf) => {
              console.log('GLB loaded successfully:', gltf)
              const model = gltf.scene
              modelRef.current = model

              // Center and scale model
              const box = new THREE.Box3().setFromObject(model)
              const center = box.getCenter(new THREE.Vector3())
              const size = box.getSize(new THREE.Vector3())
              const maxDim = Math.max(size.x, size.y, size.z)
              const scale = 4 / maxDim

              console.log('Model dimensions:', { size, maxDim, scale })

              model.position.sub(center.multiplyScalar(scale))
              model.scale.setScalar(scale)

              // Enhanced material properties
              model.traverse((child: any) => {
                if (child.isMesh) {
                  child.castShadow = true
                  child.receiveShadow = true
                  
                  if (child.material) {
                    // Improve material properties
                    if (child.material.isMeshStandardMaterial) {
                      child.material.envMapIntensity = 0.8
                      child.material.roughness = Math.min(child.material.roughness + 0.1, 1)
                      child.material.metalness = Math.max(child.material.metalness - 0.1, 0)
                    }
                    child.material.needsUpdate = true
                  }
                }
              })

              scene.add(model)
              console.log('Model added to scene')

              // Setup animations
              if (gltf.animations && gltf.animations.length > 0) {
                mixerRef.current = new THREE.AnimationMixer(model)
                gltf.animations.forEach((clip) => {
                  const action = mixerRef.current.clipAction(clip)
                  if (autoPlay) action.play()
                })
                setHasAnimations(true)
                console.log('Animations setup completed')
              }

              setIsLoading(false)
            },
            (progress) => {
              const percentage = (progress.loaded / progress.total) * 100
              console.log(`Loading progress: ${percentage.toFixed(1)}%`)
            },
            (error) => {
              console.error('Model loading error:', error)
              console.error('GLB URL attempted:', glbUrl)
              const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
              setError(`3D model yüklenemedi: ${errorMessage}`)
              setIsLoading(false)
            }
          )
        } else {
          // If no model, show a placeholder geometry
          const geometry = new THREE.BoxGeometry(2, 2, 2)
          const material = new THREE.MeshStandardMaterial({ 
            color: 0xF5C10E,
            metalness: 0.7,
            roughness: 0.3
          })
          const cube = new THREE.Mesh(geometry, material)
          cube.castShadow = true
          cube.receiveShadow = true
          scene.add(cube)
          modelRef.current = cube
          setIsLoading(false)
        }

        // Animation loop
        const animate = () => {
          animationIdRef.current = requestAnimationFrame(animate)
          
          if (mixerRef.current) {
            mixerRef.current.update(0.016)
          }
          
          controls.update()
          renderer.render(scene, camera)
        }
        animate()

        // Handle resize
        const handleResize = () => {
          if (!mountRef.current) return
          const width = mountRef.current.clientWidth
          const height = mountRef.current.clientHeight
          
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }
        
        window.addEventListener('resize', handleResize)
        
        return () => {
          window.removeEventListener('resize', handleResize)
          controls.removeEventListener('start', handleInteractionStart)
          controls.removeEventListener('end', handleInteractionEnd)
          container.removeEventListener('mouseenter', handleMouseEnter)
          container.removeEventListener('mouseleave', handleMouseLeave)
          container.removeEventListener('wheel', preventPageScroll)
        }

      } catch (err) {
        console.error('Three.js initialization error:', err)
        setError('3D görüntüleyici başlatılamadı.')
        setIsLoading(false)
      }
    }

    initThreeJS()

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }
    }
  }, [glbUrl, autoPlay])

  // Toggle animation
  const toggleAnimation = useCallback(() => {
    if (mixerRef.current && hasAnimations) {
      if (isAnimationPlaying) {
        mixerRef.current.timeScale = 0
      } else {
        mixerRef.current.timeScale = 1
      }
      setIsAnimationPlaying(!isAnimationPlaying)
    }
  }, [hasAnimations, isAnimationPlaying])

  // Reset camera
  const resetCamera = useCallback(() => {
    if (controlsRef.current && cameraRef.current) {
      cameraRef.current.position.set(8, 6, 8)
      controlsRef.current.reset()
      if (controlsRef.current) {
        controlsRef.current.autoRotate = true
      }
    }
  }, [])

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen])

  return (
    <div className={`relative group ${className}`}>
      {/* 3D Viewer Container */}
      <div 
        ref={mountRef}
        className={`relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden transition-all duration-300 ${
          isFullscreen 
            ? 'fixed inset-4 z-50 rounded-2xl shadow-2xl' 
            : 'aspect-[16/10] shadow-lg hover:shadow-xl'
        }`}
        style={{
          minHeight: isFullscreen ? 'auto' : '400px',
          touchAction: 'none'
        }}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white font-medium">3D Model Yükleniyor...</p>
            <p className="text-gray-400 text-sm">Lütfen bekleyiniz</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Yükleme Hatası</h3>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Controls Panel */}
      {!isLoading && !error && (
        <div className={`absolute top-4 right-4 flex flex-col gap-2 z-20 ${
          isFullscreen ? 'top-8 right-8' : ''
        }`}>
          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-3 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
            title={isFullscreen ? 'Tam Ekrandan Çık' : 'Tam Ekran'}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          {/* Animation Toggle */}
          {hasAnimations && (
            <button
              onClick={toggleAnimation}
              className="p-3 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
              title={isAnimationPlaying ? 'Animasyonu Durdur' : 'Animasyonu Başlat'}
            >
              {isAnimationPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          )}

          {/* Reset Camera */}
          <button
            onClick={resetCamera}
            className="p-3 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
            title="Kamerayı Sıfırla"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Info Toggle */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-3 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
            title="Bilgi"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Info Panel */}
      {showInfo && !isLoading && !error && (
        <div className={`absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-4 text-white z-20 ${
          isFullscreen ? 'bottom-8 left-8 right-8' : ''
        }`}>
          <h3 className="font-semibold text-primary mb-2">{title}</h3>
          <p className="text-sm text-gray-300 mb-3">{description}</p>
          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            <span>• Döndürmek için sürükleyin</span>
            <span>• Yakınlaştırmak için scroll yapın</span>
            <span>• Kaydırmak için sağ tık + sürükle</span>
            {hasAnimations && <span>• Animasyon mevcuttur</span>}
          </div>
        </div>
      )}

      {/* Fullscreen Background */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleFullscreen}
        />
      )}
    </div>
  )
}
