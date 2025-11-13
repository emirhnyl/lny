'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Text } from '@react-three/drei';
import { Suspense, useState } from 'react';

function TestCube() {
  return (
    <group>
      {/* Ana test küpü */}
      <Box args={[2, 2, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Box>
      
      {/* Küçük referans küpler */}
      <Box args={[0.5, 0.5, 0.5]} position={[3, 0, 0]}>
        <meshStandardMaterial color="blue" />
      </Box>
      
      <Box args={[0.5, 0.5, 0.5]} position={[-3, 0, 0]}>
        <meshStandardMaterial color="green" />
      </Box>
      
      <Box args={[0.5, 0.5, 0.5]} position={[0, 3, 0]}>
        <meshStandardMaterial color="red" />
      </Box>
      
      {/* Zemin referansı */}
      <Box args={[10, 0.1, 10]} position={[0, -2, 0]}>
        <meshStandardMaterial color="lightgray" />
      </Box>
      
      {/* Test yazısı */}
      <Text
        position={[0, -3, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Test Küpü - Hareket Kontrolleri Aktif
      </Text>
    </group>
  );
}

function ResetCameraButton() {
  const handleReset = () => {
    // Bu fonksiyon Canvas içindeki kamerayı resetlemek için
    window.dispatchEvent(new CustomEvent('resetCamera'));
  };

  return (
    <button
      onClick={handleReset}
      className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
    >
      Reset View
    </button>
  );
}

interface ToolbarProps {
  autoRotate: boolean;
  setAutoRotate: (value: boolean) => void;
}

function Toolbar({ autoRotate, setAutoRotate }: ToolbarProps) {
  return (
    <div className="absolute top-3 left-3 z-10 flex gap-2 p-2 bg-white/85 backdrop-blur-md rounded-xl border border-gray-200 shadow-lg">
      <button
        onClick={() => setAutoRotate(!autoRotate)}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
          autoRotate
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-white border border-gray-300 hover:bg-gray-50'
        }`}
      >
        {autoRotate ? 'Döndürmeyi Durdur' : 'Otomatik Döndür'}
      </button>
      <ResetCameraButton />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 p-6 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-700">3D Scene yükleniyor...</p>
      </div>
    </div>
  );
}

export default function SimpleThreeViewer() {
  const [autoRotate, setAutoRotate] = useState(false);

  return (
    <div className="relative w-full h-[70vh] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
      <Toolbar autoRotate={autoRotate} setAutoRotate={setAutoRotate} />

      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ 
            position: [5, 5, 5], 
            fov: 45,
            near: 0.1,
            far: 100
          }}
          shadows
          style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)' }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          
          {/* Test Scene */}
          <TestCube />
          
          {/* Controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={20}
            maxPolarAngle={Math.PI / 1.8}
            autoRotate={autoRotate}
            autoRotateSpeed={1.0}
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}