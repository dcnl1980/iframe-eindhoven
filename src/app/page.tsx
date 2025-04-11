'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import FilterPanel from '@/components/FilterPanel';
import { Suspense } from 'react';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[650px]">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 border-4 border-t-black border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
        <p className="mt-2 text-gray-600">Loading map data...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-12 bg-gray-50">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Eindhoven Map Explorer
        </h1>
        <p className="text-xl text-gray-500 mb-8 text-center">
          Interactive map with locations in Eindhoven
        </p>
        
        <Card className="w-full rounded-3xl overflow-hidden shadow-md border-gray-100">
          <CardHeader className="bg-white pb-0">
            <CardTitle className="text-2xl">Eindhoven Map Explorer</CardTitle>
            <p className="text-gray-500">
              Interactive map with search functionality and location details
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
              <div className="md:col-span-4">
                <FilterPanel />
              </div>
              
              <div className="md:col-span-8">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                  <MapWithNoSSR />
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-white border-t border-gray-100 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Using OpenStreetMap and Next.js 14 with ShadCN UI
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-full px-4">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl rounded-2xl">
                  <div className="space-y-4 p-2">
                    <h2 className="text-xl font-bold">Implementation Details</h2>
                    <p className="text-gray-600">
                      This application demonstrates a Next.js 14 map explorer.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>OpenStreetMap integration using React-Leaflet</li>
                      <li>Interactive markers for locations in Eindhoven</li>
                      <li>API calls to fetch marker data from the backend</li>
                      <li>Filtering capabilities by category and search term</li>
                      <li>Responsive UI built with Shadcn UI components</li>
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
