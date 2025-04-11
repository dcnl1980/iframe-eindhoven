'use client';

import dynamic from 'next/dynamic';
import FilterPanel from '@/components/FilterPanel';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

export default function MapPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MapPageContent />
    </Suspense>
  );
}

function MapPageContent() {
  const searchParams = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const embedMode = searchParams.get('embed');
  
  // Set isLoaded after mount to handle client-side rendering
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // If embed=filter, only render the filter panel
  if (embedMode === 'filter') {
    return (
      <div className="p-4">
        <FilterPanel />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Eindhoven Kaart Verkenner</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <FilterPanel />
        </div>
        
        <div className="md:col-span-8">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            {isLoaded && <MapWithNoSSR />}
          </div>
        </div>
      </div>
    </div>
  );
} 