'use client';

import { useEffect, useRef, useState } from 'react';

// Native Three.js without R3F for compatibility
export default function NativeThreeViewer() {
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
        // Dynamic imports to avoid SSR issues
        const THREE = await import('three');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');

        if (!mountRef.current) return;

        // Scene setup
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f9ff);

        // Camera
        camera = new THREE.PerspectiveCamera(
          45,
          mountRef.current.clientWidth / mountRef.current.clientHeight,
          0.1,
          100
        );
        camera.position.set(5, 5, 5);

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Test Cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
        cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        scene.add(cube);

        // Reference cubes
        const refGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        
        const blueCube = new THREE.Mesh(refGeometry, new THREE.MeshStandardMaterial({ color: 0x0000ff }));
        blueCube.position.set(3, 0, 0);
        scene.add(blueCube);

        const greenCube = new THREE.Mesh(refGeometry, new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
        greenCube.position.set(-3, 0, 0);
        scene.add(greenCube);

        const redCube = new THREE.Mesh(refGeometry, new THREE.MeshStandardMaterial({ color: 0xff0000 }));
        redCube.position.set(0, 3, 0);
        scene.add(redCube);

        // Ground
        const groundGeometry = new THREE.BoxGeometry(10, 0.1, 10);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.position.y = -2;
        ground.receiveShadow = true;
        scene.add(ground);

        // Controls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 2;
        controls.maxDistance = 20;
        controls.maxPolarAngle = Math.PI / 1.8;
        controls.autoRotate = autoRotate; // Kullanıcı kontrolü
        controls.autoRotateSpeed = 0.5; // Daha yavaş otomatik rotasyon

        // Animation loop
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          
          // Ana küpün otomatik döndürme animasyonu kaldırıldı
          // Sadece kullanıcı kontrolü ile hareket edecek
          // if (autoRotate) {
          //   cube.rotation.y += 0.01;
          // }
          
          controls.update();
          renderer.render(scene, camera);
        };

        animate();
        setIsLoaded(true);

      } catch (err) {
        console.error('Three.js initialization error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    initThree();

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (renderer && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
      // Always re-enable scroll when component unmounts
      enablePageScroll();
      // Event listener temizleme
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [autoRotate]);

  const handleResetCamera = () => {
    // Reset camera position
    if (typeof window !== 'undefined') {
      window.location.reload(); // Simple reset for now
    }
  };

  // Cleanup effect for page scroll
  useEffect(() => {
    return () => {
      enablePageScroll();
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-[70vh] bg-red-50 rounded-2xl border border-red-200 flex items-center justify-center">
        <div className="text-center p-6">
          <h3 className="text-red-800 font-semibold mb-2">3D Render Hatası</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-[70vh] bg-gray-50 rounded-2xl overflow-hidden border ${
      isMouseInside ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-gray-200'
    } shadow-lg transition-all duration-300`}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onWheel={handleWheel}
    style={{ 
      // CSS ile de wheel event'lerini engelle
      overscrollBehavior: 'none',
      touchAction: 'none'
    }}
    >
      {/* Toolbar */}
      <div className="absolute top-3 left-3 z-10 flex gap-2 p-2 bg-white/85 backdrop-blur-md rounded-xl border border-gray-200 shadow-lg">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
            autoRotate
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {autoRotate ? '⏸️ Dur' : '🔄 Kamera Döndür'}
        </button>
        <button
          onClick={handleResetCamera}
          className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
        >
          Reset View
        </button>
      </div>

      {/* Mouse status indicator */}
      {isMouseInside && (
        <div className="absolute top-3 right-3 z-10 px-3 py-2 bg-blue-100 rounded-lg border border-blue-300">
          <span className="text-blue-700 text-sm font-medium">🔒 Sayfa Scroll Engelli</span>
        </div>
      )}

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-gray-600">Native Three.js yükleniyor...</p>
          </div>
        </div>
      )}

      {/* Three.js mount point */}
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}