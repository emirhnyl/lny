'use client';

import { GroupProps } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';

interface ModelProps extends GroupProps {}

function FallbackModel() {
  return (
    <group>
      {/* Fallback 3D object when GLB is not available */}
      <Box args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Box>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        GLB modeli bulunamadı{'\n'}part.glb dosyasını{'\n'}/public/models/ klasörüne koyun
      </Text>
    </group>
  );
}

export default function Model(props: ModelProps) {
  const [modelLoaded, setModelLoaded] = useState(false);

  // For now, just show the fallback model
  // You can replace this with actual GLB loading logic later
  useEffect(() => {
    // Simulate model loading check
    const checkModel = async () => {
      try {
        const response = await fetch('/models/part.glb', { method: 'HEAD' });
        setModelLoaded(response.ok);
      } catch (error) {
        setModelLoaded(false);
      }
    };
    
    checkModel();
  }, []);

  return (
    <Suspense fallback={<FallbackModel />}>
      {/* For now, always show fallback. Replace with actual GLB loader when needed */}
      <FallbackModel />
    </Suspense>
  );
}