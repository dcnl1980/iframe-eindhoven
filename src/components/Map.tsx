'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Marker as MarkerType } from '@/app/api/markers/route';
import { useSearchParams } from 'next/navigation';

// Custom marker icon
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

export default function Map() {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  
  // Default view is centered on Eindhoven
  const defaultPosition: [number, number] = [51.4416, 5.4697];
  
  useEffect(() => {
    const fetchMarkers = async () => {
      setIsLoading(true);
      
      try {
        // Get the parameters
        const category = searchParams.get('category') || '';
        const what = searchParams.get('what') || '';
        const where = searchParams.get('where') || '';
        
        // Use what or where as the search parameter
        const searchValue = what || where || '';
        
        // Log parameters to help debug
        console.log('Fetching markers with:', { category, what, where, searchValue });
        
        // Build URL with search parameters
        const queryParams = new URLSearchParams();
        if (category && category !== 'all') queryParams.set('category', category);
        if (searchValue) queryParams.set('search', searchValue);
        
        const url = `/api/markers?${queryParams.toString()}`;
        console.log('Fetching from URL:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch markers: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received markers:', data.length);
        setMarkers(data);
      } catch (error) {
        console.error('Error fetching markers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMarkers();
  }, [searchParams]);
  
  return (
    <div className="h-[650px] w-full relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 border-4 border-t-black border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Loading map data...</p>
          </div>
        </div>
      )}
      
      <MapContainer
        center={defaultPosition}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.length === 0 && !isLoading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-md z-[1000]">
            <p>No locations found matching your search criteria.</p>
          </div>
        ) : null}
        
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={customIcon}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <h3 className="font-bold text-lg text-gray-900">{marker.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{marker.description}</p>
                <div className="mt-2 inline-block px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  {marker.category}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 