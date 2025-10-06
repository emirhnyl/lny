'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { Upload, FileX, AlertCircle, CheckCircle, RotateCcw } from 'lucide-react'

interface GLBViewerProps {
  className?: string
  initialGLBUrl?: string
  showUpload?: boolean
  fullscreen?: boolean
}

export default function GLBViewer({ 
  className = '', 
  initialGLBUrl,
  showUpload = true,
  fullscreen = false 
}: GLBViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)
  const rendererRef = useRef<any>(null)
  const cameraRef = useRef<any>(null)
  const controlsRef = useRef<any>(null)
  const mixerRef = useRef<any>(null)
  const animationIdRef = useRef<number | null>(null)
  
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadedModel, setLoadedModel] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hasAnimations, setHasAnimations] = useState(false)
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const initThreeJS = async (): Promise<(() => void) | void> => {
      const THREE = await import('three')
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')

      // Scene setup (orijinal kod geri yüklendi)
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x111111)
      sceneRef.current = scene

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      )
      camera.position.set(5, 5, 5)
      cameraRef.current = camera

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(container.clientWidth, container.clientHeight)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      rendererRef.current = renderer

      // Controls setup
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controlsRef.current = controls

      // Add scroll prevention events
      const canvas = renderer.domElement

      const preventScroll = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
      }

      const handlePointerDown = () => {
        setIsInteracting(true)
        document.body.style.overflow = 'hidden'
        document.body.classList.add('viewer-active')
        canvas.addEventListener('wheel', preventScroll, { passive: false })
        canvas.addEventListener('touchmove', preventScroll, { passive: false })
      }

      const handlePointerUp = () => {
        setIsInteracting(false)
        document.body.style.overflow = 'auto'
        document.body.classList.remove('viewer-active')
        canvas.removeEventListener('wheel', preventScroll)
        canvas.removeEventListener('touchmove', preventScroll)
      }

      // Add event listeners for interaction detection
      canvas.addEventListener('pointerdown', handlePointerDown)
      canvas.addEventListener('pointerup', handlePointerUp)
      canvas.addEventListener('pointerleave', handlePointerUp)

      // Prevent default scroll behavior on canvas
      canvas.addEventListener('wheel', preventScroll, { passive: false })
      canvas.addEventListener('touchmove', preventScroll, { passive: false })

      // Lighting setup
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(10, 10, 5)
      directionalLight.castShadow = true
      directionalLight.shadow.mapSize.width = 2048
      directionalLight.shadow.mapSize.height = 2048
      scene.add(directionalLight)

      // Add accent light with LnY color
      const accentLight = new THREE.PointLight(0xF5C10E, 0.5, 100)
      accentLight.position.set(-10, 10, -10)
      scene.add(accentLight)

      // Grid helper
      const gridHelper = new THREE.GridHelper(20, 20, 0xF5C10E, 0x444444)
      gridHelper.material.opacity = 0.3
      gridHelper.material.transparent = true
      scene.add(gridHelper)

      // Mount renderer
      container.appendChild(renderer.domElement)

      // Animation loop
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate)
        
        if (mixerRef.current) {
          mixerRef.current.update(0.016) // 60fps
        }
        
        controls.update()
        renderer.render(scene, camera)
      }
      animate()

      // Handle resize
      const handleResize = () => {
        const currentContainer = mountRef.current
        if (!currentContainer) return
        const width = currentContainer.clientWidth
        const height = currentContainer.clientHeight
        
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }
      
      window.addEventListener('resize', handleResize)
      
      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize)
        const canvas = renderer.domElement
        if (canvas) {
          canvas.removeEventListener('pointerdown', handlePointerDown)
          canvas.removeEventListener('pointerup', handlePointerUp)
          canvas.removeEventListener('pointerleave', handlePointerUp)
          canvas.removeEventListener('wheel', preventScroll)
          canvas.removeEventListener('touchmove', preventScroll)
        }
        // Reset body overflow when component unmounts
        document.body.style.overflow = 'auto'
        document.body.classList.remove('viewer-active')
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
      // Reset body overflow when component unmounts
      document.body.style.overflow = 'auto'
      document.body.classList.remove('viewer-active')
    }
  }, [])

  // Load initial GLB if provided
  useEffect(() => {
    if (initialGLBUrl && sceneRef.current) {
      loadGLBFromUrl(initialGLBUrl)
    }
  }, [initialGLBUrl])

  // Load GLB model from URL
  const loadGLBFromUrl = useCallback(async (url: string) => {
    if (!sceneRef.current) return

    setIsLoading(true)
    setError(null)
  // initThreeJS burada yeniden çağrılmıyor (sahne zaten kurulmuş olmalı)
    try {
      const THREE = await import('three')
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')

      // Clear previous model
      const objectsToRemove = sceneRef.current.children.filter((child: any) => 
        child.userData.isModel
      )
      objectsToRemove.forEach((obj: any) => sceneRef.current.remove(obj))

      const loader = new GLTFLoader()

      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene
          model.userData.isModel = true

          // Center and scale model
          const box = new THREE.Box3().setFromObject(model)
          const center = box.getCenter(new THREE.Vector3())
          const size = box.getSize(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z)
          const scale = 3 / maxDim

          model.position.sub(center.multiplyScalar(scale))
          model.scale.setScalar(scale)

          // Enable shadows
          model.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
              
              if (child.material) {
                child.material.needsUpdate = true
                if (child.material.map) {
                  child.material.map.needsUpdate = true
                }
              }
            }
          })

          sceneRef.current.add(model)

          // Setup animations if available
          if (gltf.animations && gltf.animations.length > 0) {
            if (mixerRef.current) {
              mixerRef.current.stopAllAction()
            }
            mixerRef.current = new THREE.AnimationMixer(model)
            gltf.animations.forEach((clip) => {
              const action = mixerRef.current.clipAction(clip)
              action.play()
            })
            setHasAnimations(true)
            setIsAnimationPlaying(true)
          } else {
            setHasAnimations(false)
            setIsAnimationPlaying(false)
          }

          setLoadedModel(url)
          setIsLoading(false)
        },
        (progress) => {
          console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%')
        },
        (error) => {
          console.error('GLB loading error:', error)
          setError('3D model yüklenemedi. Dosya formatını kontrol edin.')
          setIsLoading(false)
        }
      )
    } catch (err) {
      console.error('GLB loader error:', err)
      setError('3D model yükleyici hatası')
      setIsLoading(false)
    }
  }, [])

  // Load GLB model
  const loadGLBModel = useCallback(async (file: File) => {
    if (!sceneRef.current) return

    setIsLoading(true)
    setError(null)

    try {
      const THREE = await import('three')
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')

      // Clear previous model
      const previousModel = sceneRef.current.getObjectByName('loadedModel')
      if (previousModel) {
        sceneRef.current.remove(previousModel)
      }

      // Stop previous animations
      if (mixerRef.current) {
        mixerRef.current.stopAllAction()
        mixerRef.current = null
      }

      const loader = new GLTFLoader()
      const url = URL.createObjectURL(file)

      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene
          model.name = 'loadedModel'

          // Center and scale model
          const box = new THREE.Box3().setFromObject(model)
          const center = box.getCenter(new THREE.Vector3())
          const size = box.getSize(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z)
          const scale = 3 / maxDim

          model.position.sub(center.multiplyScalar(scale))
          model.scale.setScalar(scale)

          // Enable shadows
          model.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
            }
          })

          sceneRef.current.add(model)

          // Setup animations if available
          if (gltf.animations && gltf.animations.length > 0) {
            mixerRef.current = new THREE.AnimationMixer(model)
            gltf.animations.forEach((clip) => {
              const action = mixerRef.current.clipAction(clip)
              action.play()
            })
            setHasAnimations(true)
            setIsAnimationPlaying(true)
          } else {
            setHasAnimations(false)
            setIsAnimationPlaying(false)
          }

          setLoadedModel(file.name)
          setIsLoading(false)
          URL.revokeObjectURL(url)
        },
        undefined,
        (error) => {
          console.error('GLB loading error:', error)
          setError('Model yüklenirken hata oluştu. Dosyanın geçerli bir GLB dosyası olduğundan emin olun.')
          setIsLoading(false)
          URL.revokeObjectURL(url)
        }
      )
    } catch (err) {
      console.error('GLB loader error:', err)
      setError('Model yükleyici başlatılamadı.')
      setIsLoading(false)
    }
  }, [])

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const glbFile = files.find(file => 
      file.name.toLowerCase().endsWith('.glb') || 
      file.name.toLowerCase().endsWith('.gltf')
    )

    if (glbFile) {
      loadGLBModel(glbFile)
    } else {
      setError('Lütfen geçerli bir GLB veya GLTF dosyası seçin.')
    }
  }, [loadGLBModel])

  // Handle file input
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      loadGLBModel(file)
    }
  }, [loadGLBModel])

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
      cameraRef.current.position.set(5, 5, 5)
      controlsRef.current.reset()
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* 3D Canvas */}
      <div 
        ref={mountRef}
        className={`w-full h-full rounded-lg overflow-hidden bg-black viewer-canvas cursor-grab ${
          isInteracting ? 'cursor-grabbing' : ''
        }`}
        style={{
          touchAction: 'none', // Prevent touch gestures
          userSelect: 'none',   // Prevent text selection
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setIsDragging(false)
        }}
        onDrop={handleDrop}
        onMouseEnter={() => {
          // Prevent scroll when mouse enters canvas area
          document.body.style.overflow = 'hidden'
          document.body.classList.add('viewer-active')
        }}
        onMouseLeave={() => {
          // Re-enable scroll when mouse leaves canvas area
          if (!isInteracting) {
            document.body.style.overflow = 'auto'
            document.body.classList.remove('viewer-active')
          }
        }}
        onWheel={(e) => {
          // Prevent page scroll on wheel events
          e.preventDefault()
          e.stopPropagation()
        }}
        onTouchMove={(e) => {
          // Prevent touch scroll
          e.preventDefault()
          e.stopPropagation()
        }}
      />

      {/* Drag & Drop Overlay */}
      {isDragging && showUpload && (
        <div className="absolute inset-0 bg-primary/20 border-2 border-dashed border-primary rounded-lg flex items-center justify-center z-10">
          <div className="text-center text-white">
            <Upload className="w-12 h-12 mx-auto mb-4" />
            <p className="text-lg font-semibold">GLB Dosyasını Buraya Bırakın</p>
          </div>
        </div>
      )}

      {/* Controls Panel */}
      {!fullscreen && (
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md rounded-lg p-4 text-white min-w-[200px]">
          <h3 className="font-semibold mb-3 text-primary">GLB Model Viewer</h3>
          
          {/* File Input */}
          {showUpload && (
            <div className="mb-4">
              <label className="block text-sm mb-2">Model Yükle:</label>
              <input
                type="file"
                accept=".glb,.gltf"
                onChange={handleFileInput}
                className="w-full text-xs file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:bg-primary file:text-black file:cursor-pointer"
              />
            </div>
          )}

          {/* Status */}
          {isLoading && (
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Yükleniyor...</span>
            </div>
          )}

          {loadedModel && (
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">{loadedModel}</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs">{error}</span>
            </div>
          )}

          {/* Controls */}
          <div className="space-y-2">
          {hasAnimations && (
            <button
              onClick={toggleAnimation}
              className="w-full py-1 px-3 bg-primary text-black rounded text-sm hover:bg-primary/80 transition-colors"
            >
              {isAnimationPlaying ? 'Animasyonu Durdur' : 'Animasyonu Başlat'}
            </button>
          )}
          
          <button
            onClick={resetCamera}
            className="w-full py-1 px-3 bg-gray-600 text-white rounded text-sm hover:bg-gray-500 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3 h-3" />
            Kamerayı Sıfırla
          </button>

          {/* Instructions */}
          <div className="mt-4 text-xs text-gray-400">
            <p>• GLB/GLTF dosyası sürükleyip bırakın</p>
            <p>• Fare ile kamera kontrol edin</p>
            <p>• Scroll ile yakınlaştırın</p>
          </div>
        </div>
        </div>
      )}
    </div>
  )
}