'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
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
  const sceneRef = useRef<any>(null)
  const rendererRef = useRef<any>(null)
  const cameraRef = useRef<any>(null)
  const controlsRef = useRef<any>(null)
  const mixerRef = useRef<any>(null)
  const modelRef = useRef<any>(null)
  const animationIdRef = useRef<number | null>(null)
  
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(autoRotate)
  const [error, setError] = useState<string | null>(null)
  const [hasModel, setHasModel] = useState(false)

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current
    if (!container) {
      console.log('Container not ready')
      return
    }

    console.log('Initializing Three.js scene for project:', projectId)

    const initThreeJS = async () => {
      try {
        const THREE = await import('three')
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')
        console.log('Three.js modules loaded')

        // Scene setup
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x1a1a1a)
        sceneRef.current = scene
        console.log('Scene created')

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
          45,
          container.clientWidth / container.clientHeight,
          0.1,
          100
        )
        camera.position.set(3, 3, 3)
        cameraRef.current = camera
        console.log('Camera created')

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
        renderer.outputColorSpace = THREE.SRGBColorSpace
        rendererRef.current = renderer
        console.log('Renderer created')

        // Controls setup
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.enableZoom = true
        controls.enablePan = false
        controls.maxDistance = 10
        controls.minDistance = 1
        controlsRef.current = controls
        console.log('Controls created')

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0x404040, 0.8)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
        directionalLight.position.set(5, 5, 5)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.width = 1024
        directionalLight.shadow.mapSize.height = 1024
        scene.add(directionalLight)

        // LnY accent light
        const accentLight = new THREE.PointLight(0xF5C10E, 0.6, 20)
        accentLight.position.set(-3, 3, -3)
        scene.add(accentLight)
        console.log('Lighting setup complete')

        // Mount renderer
        container.appendChild(renderer.domElement)
        console.log('Renderer mounted to DOM')

        // Animation loop
        const animate = () => {
          animationIdRef.current = requestAnimationFrame(animate)
          
          // Auto rotation
          if (isPlaying && modelRef.current) {
            modelRef.current.rotation.y += 0.01
          }
          
          if (mixerRef.current) {
            mixerRef.current.update(0.016)
          }
          
          controls.update()
          renderer.render(scene, camera)
        }
        animate()
        console.log('Animation loop started')

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
        
        return () => {
          window.removeEventListener('resize', handleResize)
        }
      } catch (error) {
        console.error('Three.js initialization error:', error)
        setError('3D görüntüleyici başlatılamadı')
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
  }, [isPlaying])

  // Create test cube for projects
  const createTestCube = useCallback(async (projectId: string) => {
    console.log('Creating test cube for project:', projectId)
    if (!sceneRef.current) {
      console.log('Scene not ready')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const THREE = await import('three')
      console.log('Three.js loaded')

      // Clear previous model
      if (modelRef.current) {
        sceneRef.current.remove(modelRef.current)
        modelRef.current = null
        console.log('Previous model cleared')
      }

      // Define colors for different projects
      const projectColors: { [key: string]: number } = {
        'otomotiv-parca-cfd': 0xFF6B6B,      // Kırmızı - Otomotiv
        'endustriyel-otomasyon': 0x4ECDC4,   // Turkuaz - Otomasyon
        'interaktif-3d-model': 0xFFE66D,     // Sarı - 3D Model
        'tubitak-1501': 0x95E1D3,            // Yeşil - AR-GE
      }

      // Get color for project or use default
      const color = projectColors[projectId] || 0xF5C10E // LnY primary color
      console.log('Using color for project:', projectId, ':', color.toString(16))

      // Create cube geometry
      const geometry = new THREE.BoxGeometry(2, 2, 2)
      
      // Create material with project-specific color
      const material = new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.3,
        roughness: 0.4,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
      })

      // Create mesh
      const cube = new THREE.Mesh(geometry, material)
      cube.castShadow = true
      cube.receiveShadow = true

      // Add some rotation for visual interest
      cube.rotation.x = Math.PI / 6
      cube.rotation.y = Math.PI / 4

      // Create group to hold the cube and any additional elements
      const group = new THREE.Group()
      group.add(cube)
      console.log('Basic cube created')

      // Add some decorative elements based on project type
      if (projectId === 'otomotiv-parca-cfd') {
        console.log('Adding CFD particles')
        // Add smaller cubes around main cube for CFD visualization
        for (let i = 0; i < 8; i++) {
          const smallCube = new THREE.Mesh(
            new THREE.BoxGeometry(0.3, 0.3, 0.3),
            new THREE.MeshPhysicalMaterial({ color: 0xFF8E8E, opacity: 0.7, transparent: true })
          )
          const angle = (i / 8) * Math.PI * 2
          smallCube.position.set(
            Math.cos(angle) * 3,
            Math.sin(angle * 2) * 0.5,
            Math.sin(angle) * 3
          )
          smallCube.castShadow = true
          group.add(smallCube)
        }
      } else if (projectId === 'endustriyel-otomasyon') {
        console.log('Adding automation rings')
        // Add rotating rings for automation theme
        const ringGeometry = new THREE.TorusGeometry(2.5, 0.1, 8, 100)
        const ringMaterial = new THREE.MeshPhysicalMaterial({ 
          color: 0x7FDBDA, 
          metalness: 0.8,
          roughness: 0.2 
        })
        const ring1 = new THREE.Mesh(ringGeometry, ringMaterial)
        const ring2 = new THREE.Mesh(ringGeometry, ringMaterial)
        
        ring1.rotation.x = Math.PI / 2
        ring2.rotation.z = Math.PI / 2
        
        ring1.castShadow = true
        ring2.castShadow = true
        
        group.add(ring1, ring2)
      } else if (projectId === 'interaktif-3d-model') {
        console.log('Adding wireframe overlay')
        // Add wireframe overlay for 3D model theme
        const wireframeGeometry = new THREE.BoxGeometry(2.2, 2.2, 2.2)
        const wireframeMaterial = new THREE.MeshBasicMaterial({ 
          color: 0xFFD93D, 
          wireframe: true,
          opacity: 0.6,
          transparent: true
        })
        const wireframeCube = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
        group.add(wireframeCube)
      } else if (projectId === 'tubitak-1501') {
        console.log('Adding glow effect')
        // Add glowing effect for research theme
        const glowGeometry = new THREE.BoxGeometry(2.5, 2.5, 2.5)
        const glowMaterial = new THREE.MeshBasicMaterial({ 
          color: 0xB8F2E6, 
          opacity: 0.3,
          transparent: true
        })
        const glowCube = new THREE.Mesh(glowGeometry, glowMaterial)
        group.add(glowCube)
      }

      sceneRef.current.add(group)
      modelRef.current = group
      console.log('Test cube added to scene')

      setHasModel(true)
      setIsLoading(false)
      console.log('Test cube creation completed')
    } catch (err) {
      console.error('Test cube creation error:', err)
      setError('Test küpü oluşturulamadı')
      setIsLoading(false)
    }
  }, [])

  // Load GLB model
  const loadGLBModel = useCallback(async (url: string) => {
    if (!sceneRef.current) return

    setIsLoading(true)
    setError(null)

    try {
      const THREE = await import('three')
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')

      // Clear previous model
      if (modelRef.current) {
        sceneRef.current.remove(modelRef.current)
        modelRef.current = null
      }

      const loader = new GLTFLoader()

      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene
          modelRef.current = model

          // Center and scale model
          const box = new THREE.Box3().setFromObject(model)
          const center = box.getCenter(new THREE.Vector3())
          const size = box.getSize(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z)
          const scale = 2 / maxDim

          model.position.sub(center.multiplyScalar(scale))
          model.scale.setScalar(scale)

          // Enable shadows
          model.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
              
              // Enhance materials
              if (child.material) {
                child.material.needsUpdate = true
              }
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
          }

          setHasModel(true)
          setIsLoading(false)
        },
        (progress) => {
          // Loading progress
          console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%')
        },
        (error) => {
          console.error('GLB loading error:', error)
          setError('3D model yüklenemedi')
          setIsLoading(false)
          // Fallback to test cube if GLB fails
          createTestCube(projectId)
        }
      )
    } catch (err) {
      console.error('GLB loader error:', err)
      setError('3D model yükleyici hatası')
      setIsLoading(false)
      // Fallback to test cube if GLB fails
      createTestCube(projectId)
    }
  }, [projectId, createTestCube])

  // Load model when URL changes or create test cube
  useEffect(() => {
    console.log('Model loading effect triggered:', { glbUrl, projectId, hasScene: !!sceneRef.current })
    
    // Add delay to ensure scene is ready
    const timer = setTimeout(() => {
      if (glbUrl && sceneRef.current) {
        console.log('Loading GLB model:', glbUrl)
        loadGLBModel(glbUrl)
      } else if (sceneRef.current) {
        console.log('Creating test cube for project:', projectId)
        createTestCube(projectId)
      } else {
        console.log('Scene not ready yet, waiting...')
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [glbUrl, projectId, loadGLBModel, createTestCube])

  // Toggle auto rotation
  const toggleRotation = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  // Reset camera
  const resetCamera = useCallback(() => {
    if (controlsRef.current && cameraRef.current) {
      cameraRef.current.position.set(3, 3, 3)
      controlsRef.current.reset()
    }
  }, [])

  // Expand to fullscreen viewer
  const expandViewer = useCallback(() => {
    // Open dedicated viewer page with this project's info
    const viewerUrl = glbUrl 
      ? `/viewer-new?model=${encodeURIComponent(glbUrl)}&project=${projectId}`
      : `/viewer-new?project=${projectId}&demo=true`
    window.open(viewerUrl, '_blank')
  }, [glbUrl, projectId])

  return (
    <div className={`relative ${className}`}>
      {/* 3D Canvas */}
      <div 
        ref={mountRef}
        className="w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black"
        style={{
          minHeight: '200px',
          touchAction: 'none',
          userSelect: 'none',
        }}
      />

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

      {/* No Model State */}
      {!glbUrl && !isLoading && !hasModel && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-3xl mb-2">⚠️</div>
            <p className="text-sm">Test Küpü Yükleniyor...</p>
            <p className="text-xs mt-1">Proje: {projectId}</p>
          </div>
        </div>
      )}

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 bg-black/80 text-white text-xs p-2 rounded">
          <div>Project: {projectId}</div>
          <div>GLB URL: {glbUrl || 'none'}</div>
          <div>Has Model: {hasModel ? 'yes' : 'no'}</div>
          <div>Loading: {isLoading ? 'yes' : 'no'}</div>
          <div>Error: {error || 'none'}</div>
        </div>
      )}

      {/* Controls */}
      {showControls && (hasModel || !glbUrl) && (
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
            onClick={resetCamera}
            className="p-1.5 bg-black/70 hover:bg-black/90 text-white rounded transition-colors"
            title="Kamerayı Sıfırla"
          >
            <RotateCcw className="w-3 h-3" />
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
    </div>
  )
}