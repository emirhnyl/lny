'use client';

import { useEffect, useRef, useState } from 'react';

interface LnYThreeViewerProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function LnYThreeViewer({ 
  title = "3D Model Görüntüleyici", 
  description = "İnteraktif 3D model incelemesi",
  className = ""
}: LnYThreeViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMouseInside, setIsMouseInside] = useState(false);

  // Scroll control functions
  const disablePageScroll = () => {
    document.body.style.overflow = 'hidden';
    // Daha güçlü scroll engelleme
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
  };

  const enablePageScroll = () => {
    document.body.style.overflow = 'auto';
    // Event listener'ları temizle
    document.removeEventListener('wheel', preventScroll);
    document.removeEventListener('touchmove', preventScroll);
  };

  // Scroll ve wheel event'lerini engelleme
  const preventScroll = (e: Event) => {
    if (isMouseInside) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  // Mouse enter/leave handlers for 3D area
  const handleMouseEnter = () => {
    setIsMouseInside(true);
    disablePageScroll();
  };

  const handleMouseLeave = () => {
    setIsMouseInside(false);
    enablePageScroll();
  };

  // Wheel event handler specifically for the 3D container
  const handleWheel = (e: React.WheelEvent) => {
    // 3D alanında wheel event'i sayfaya geçmesin
    e.stopPropagation();
  };

  useEffect(() => {
    let scene: any, camera: any, renderer: any, cube: any, controls: any;
    let animationId: number;

    const initThree = async () => {
      try {
        const THREE = await import('three');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');

        if (!mountRef.current) return;

        // Scene setup with LnY theme colors
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x111111); // dark theme

        // Camera
        camera = new THREE.PerspectiveCamera(
          45,
          mountRef.current.clientWidth / mountRef.current.clientHeight,
          0.1,
          100
        );
        camera.position.set(5, 5, 5);

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        mountRef.current.appendChild(renderer.domElement);

        // Lighting setup for premium look
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);

        // Primary light with LnY yellow
        const primaryLight = new THREE.DirectionalLight(0xF5C10E, 1.2);
        primaryLight.position.set(10, 10, 5);
        primaryLight.castShadow = true;
        primaryLight.shadow.mapSize.width = 2048;
        primaryLight.shadow.mapSize.height = 2048;
        scene.add(primaryLight);

        // Accent light
        const accentLight = new THREE.DirectionalLight(0x4B5563, 0.8);
        accentLight.position.set(-5, 5, -5);
        scene.add(accentLight);

        // Main display object (premium metallic cube)
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({ 
          color: 0x2a2a2a,
          metalness: 0.8,
          roughness: 0.2,
          envMapIntensity: 1.5
        });
        cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;
        scene.add(cube);

        // LnY branded accent cubes
        const accentGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        
        // Yellow accent cubes (LnY primary color)
        const yellowMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xF5C10E,
          metalness: 0.3,
          roughness: 0.1,
          emissive: 0xF5C10E,
          emissiveIntensity: 0.1
        });
        
        const positions = [
          [3, 0, 0], [-3, 0, 0], [0, 3, 0], [0, -3, 0],
          [0, 0, 3], [0, 0, -3]
        ];
        
        positions.forEach(([x, y, z]) => {
          const accentCube = new THREE.Mesh(accentGeometry, yellowMaterial);
          accentCube.position.set(x, y, z);
          accentCube.castShadow = true;
          scene.add(accentCube);
        });

        // Premium grid floor
        const gridSize = 20;
        const gridDivisions = 20;
        const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0xF5C10E, 0x374151);
        gridHelper.position.y = -3;
        scene.add(gridHelper);

        // Controls with smooth movement
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.03;
        controls.minDistance = 3;
        controls.maxDistance = 25;
        controls.maxPolarAngle = Math.PI / 1.8;
        controls.autoRotate = autoRotate; // Kullanıcı kontrolü
        controls.autoRotateSpeed = 0.5; // Daha yavaş otomatik rotasyon

        // Animation loop
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          
          // Ana küpün otomatik animasyonunu kaldırdık - sadece manuel kontrol
          // Sadece OrbitControls'ün smooth damping'i için animate gerekli
          
          controls.update();
          renderer.render(scene, camera);
        };

        animate();
        setIsLoaded(true);

        // Handle window resize
        const handleResize = () => {
          if (mountRef.current && camera && renderer) {
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
          }
        };
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };

      } catch (err) {
        console.error('Three.js initialization error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    initThree();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (renderer && mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
      // Cleanup: Always re-enable scroll when component unmounts
      enablePageScroll();
      // Event listener temizleme
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [autoRotate]);

  // Cleanup effect for page scroll
  useEffect(() => {
    return () => {
      // Always re-enable scroll when component unmounts
      enablePageScroll();
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  const handleResetCamera = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  if (error) {
    return (
      <div className="w-full h-[60vh] bg-gradient-to-br from-dark-100 to-dark-200 rounded-2xl border border-gray-800 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-gray-200 font-semibold mb-2">3D Görüntüleme Hatası</h3>
          <p className="text-gray-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>

      {/* 3D Viewer Container */}
      <div 
        ref={containerRef}
        className={`relative w-full h-[60vh] bg-gradient-to-br from-dark-100 to-dark-200 rounded-2xl overflow-hidden border ${
          isMouseInside ? 'border-primary/50 shadow-lg shadow-primary/20' : 'border-gray-800'
        } shadow-2xl transition-all duration-300`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
        style={{ 
          // CSS ile de wheel event'lerini engelle
          overscrollBehavior: 'none',
          touchAction: 'none'
        }}
      >
        
        {/* LnY Branded Toolbar */}
        <div className="absolute top-4 left-4 z-10 flex gap-3 p-3 bg-dark-50/80 backdrop-blur-lg rounded-xl border border-gray-700/50">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              autoRotate
                ? 'bg-primary text-dark shadow-lg shadow-primary/25 hover:shadow-primary/40'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
            }`}
          >
            {autoRotate ? '⏸️ Dur' : '🔄 Kamera Döndür'}
          </button>
          
          <button
            onClick={handleResetCamera}
            className="px-4 py-2 bg-gray-800 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm font-medium"
          >
            🔄 Sıfırla
          </button>
        </div>

        {/* Mouse status indicator */}
        {isMouseInside && (
          <div className="absolute top-4 right-4 z-10 px-3 py-2 bg-primary/20 backdrop-blur-lg rounded-lg border border-primary/30">
            <span className="text-primary text-sm font-medium">🔒 Sayfa Scroll Engelli</span>
          </div>
        )}

        {/* LnY Brand Watermark */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3 py-2 bg-dark-50/60 backdrop-blur-lg rounded-lg border border-gray-700/30">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <span className="text-dark font-bold text-xs">⚡</span>
          </div>
          <span className="text-primary font-bold text-sm">LnY</span>
        </div>

        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-100">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-600 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-primary/30 rounded-full animate-pulse"></div>
              </div>
              <p className="text-gray-400 font-medium">3D Model Yükleniyor...</p>
            </div>
          </div>
        )}

        {/* Three.js Mount Point */}
        <div ref={mountRef} className="w-full h-full" />
        
        {/* Subtle border glow effect */}
        <div className="absolute inset-0 rounded-2xl border border-primary/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Control Instructions */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">🖱️</span>
          <span>Döndür: Sol tık + sürükle</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <span className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">🔍</span>
          <span>Zoom: Mouse tekerleği</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <span className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">✋</span>
          <span>Pan: Sağ tık + sürükle</span>
        </div>
      </div>

      {/* Scroll prevention notice */}
      <div className="mt-2 flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-4 h-4 bg-primary/20 rounded flex items-center justify-center">⚡</span>
          <span>Model sabit - sadece manuel kamera kontrolü. 3D alanında sayfa scroll engelli.</span>
        </div>
      </div>
    </div>
  );
}