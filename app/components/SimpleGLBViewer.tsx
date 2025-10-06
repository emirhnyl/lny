'use client'

import { useEffect, useRef, useState } from 'react'

interface SimpleGLBViewerProps {
  glbUrl: string
  className?: string
}

export default function SimpleGLBViewer({ glbUrl, className = '' }: SimpleGLBViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let scene: any, camera: any, renderer: any, model: any

    const init = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Dynamic imports
        const THREE = await import('three')
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')

        const container = mountRef.current
        if (!container) return

        // Scene
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0x222222)

        // Camera
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
        camera.position.set(0, 0, 5)

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        container.appendChild(renderer.domElement)

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.autoRotate = true
        controls.autoRotateSpeed = 2

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambientLight)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(10, 10, 5)
        scene.add(directionalLight)

        // Load GLB
        const loader = new GLTFLoader()
        loader.load(
          glbUrl,
          (gltf) => {
            model = gltf.scene
            
            // Scale and center model
            const box = new THREE.Box3().setFromObject(model)
            const size = box.getSize(new THREE.Vector3()).length()
            const center = box.getCenter(new THREE.Vector3())
            
            model.scale.setScalar(2 / size)
            model.position.x = -center.x * (2 / size)
            model.position.y = -center.y * (2 / size)
            model.position.z = -center.z * (2 / size)
            
            scene.add(model)
            setIsLoading(false)
            console.log('GLB loaded successfully:', glbUrl)
          },
          (progress) => {
            console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%')
          },
          (error) => {
            console.error('GLB loading error:', error)
            setError('Model yüklenemedi')
            setIsLoading(false)
          }
        )

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate)
          controls.update()
          renderer.render(scene, camera)
        }
        animate()

        // Handle resize
        const handleResize = () => {
          if (!container) return
          camera.aspect = container.clientWidth / container.clientHeight
          camera.updateProjectionMatrix()
          renderer.setSize(container.clientWidth, container.clientHeight)
        }
        window.addEventListener('resize', handleResize)

        return () => {
          window.removeEventListener('resize', handleResize)
          if (container && renderer.domElement) {
            container.removeChild(renderer.domElement)
          }
          renderer.dispose()
        }

      } catch (err) {
        console.error('Three.js initialization error:', err)
        setError('3D viewer başlatılamadı')
        setIsLoading(false)
      }
    }

    init()
  }, [glbUrl])

  return (
    <div className={`relative ${className}`}>
      <div ref={mountRef} className="w-full h-full" />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="text-white">Yükleniyor...</div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/50">
          <div className="text-white">{error}</div>
        </div>
      )}
      
      {/* Debug info */}
      <div className="absolute top-2 left-2 text-xs text-white bg-black/50 p-2 rounded">
        GLB: {glbUrl.split('/').pop()}
      </div>
    </div>
  )
}