'use client';

export default function TestViewer() {
  return (
    <div className="relative w-full h-[70vh] bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-lg flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">3D Viewer Test</h2>
        <p className="text-gray-600 mb-6">Three.js bileşenleri yükleniyor...</p>
        <div className="w-16 h-16 bg-pink-500 rounded-lg mx-auto animate-pulse"></div>
        <p className="text-sm text-gray-500 mt-4">
          Bu alan Three.js Canvas olacak
        </p>
      </div>
    </div>
  );
}