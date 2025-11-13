'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stage, Bounds, Html, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useState } from 'react';
import Model from './Model';

function ResetCameraButton() {
  const { camera, controls } = useThree();
  
  const handleReset = () => {
    // Reset camera position
    camera.position.set(2.5, 2, 2.5);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    
    // Reset controls if available
    if (controls && 'reset' in controls) {
      (controls as any).reset();
    }
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
    <Html center>
      <div className="flex flex-col items-center gap-3 p-6 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-700">Model yükleniyor...</p>
      </div>
    </Html>
  );
}

export default function Viewer() {
  const [autoRotate, setAutoRotate] = useState(false);

  return (
    <div className="relative w-full h-[70vh] bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
      <Toolbar autoRotate={autoRotate} setAutoRotate={setAutoRotate} />

      <Canvas
        dpr={[1, 2]}
        camera={{ 
          position: [2.5, 2, 2.5], 
          fov: 45,
          near: 0.1,
          far: 100
        }}
        shadows
        className="bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting Setup */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          
          {/* Environment */}
          <Environment preset="city" background={false} />
          
          {/* Model with bounds and staging */}
          <Bounds fit clip observe margin={1.2}>
            <Stage
              adjustCamera={false}
              intensity={1}
              environment={null}
              shadows={false}
            >
              <Model />
            </Stage>
          </Bounds>
          
          {/* Contact Shadows */}
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          minDistance={0.5}
          maxDistance={10}
          maxPolarAngle={Math.PI / 1.8}
          makeDefault
          autoRotate={autoRotate}
          autoRotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}