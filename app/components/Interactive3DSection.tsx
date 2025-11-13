'use client';

import dynamic from 'next/dynamic';

// LnY 3D Viewer'ı dynamic import ile yükle
const LnYThreeViewer = dynamic(() => import('@/app/components/LnYThreeViewer'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[60vh] bg-gradient-to-br from-dark-100 to-dark-200 rounded-2xl border border-gray-800 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 font-medium">3D Viewer Yükleniyor...</p>
      </div>
    </div>
  )
});

interface Interactive3DSectionProps {
  className?: string;
}

export default function Interactive3DSection({ className = "" }: Interactive3DSectionProps) {
  return (
    <div className={className}>
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
          İnteraktif 3D Görüntüleme Teknolojisi
        </h2>
        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Web tabanlı profesyonel 3D model inceleme platformumuz ile projelerinizi 
          interaktif olarak görüntüleyebilirsiniz
        </p>
      </div>
      
      <LnYThreeViewer 
        title="Gerçek Zamanlı 3D Model İncelemesi"
        description="Fare kontrolü ile döndürün, yakınlaştırın ve detayları inceleyin"
        className="mb-8"
      />
      
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="text-center p-6 bg-dark-50/50 rounded-xl border border-gray-700/50">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔄</span>
          </div>
          <h3 className="font-semibold text-white mb-2">360° Görüntüleme</h3>
          <p className="text-gray-400 text-sm">Her açıdan detaylı inceleme imkanı</p>
        </div>
        
        <div className="text-center p-6 bg-dark-50/50 rounded-xl border border-gray-700/50">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="font-semibold text-white mb-2">Yüksek Performans</h3>
          <p className="text-gray-400 text-sm">WebGL tabanlı hızlı render teknolojisi</p>
        </div>
        
        <div className="text-center p-6 bg-dark-50/50 rounded-xl border border-gray-700/50">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="font-semibold text-white mb-2">Detay Odaklı</h3>
          <p className="text-gray-400 text-sm">Zoom ile mikroskobik detay incelemesi</p>
        </div>
      </div>
    </div>
  );
}