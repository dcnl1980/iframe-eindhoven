import { NextResponse } from 'next/server';

export interface Marker {
  id: string;
  name: string;
  category: string;
  position: [number, number]; // [latitude, longitude]
  description: string;
}

// Sample data for Eindhoven markers
const eindhoven_markers: Marker[] = [
  {
    id: '1',
    name: 'Eindhoven Central Station',
    category: 'transportation',
    position: [51.4431, 5.4797],
    description: 'Main railway station of Eindhoven',
  },
  {
    id: '2',
    name: 'Philips Museum',
    category: 'museum',
    position: [51.4417, 5.4722],
    description: 'Museum dedicated to the history of Philips',
  },
  {
    id: '3',
    name: 'Van Abbemuseum',
    category: 'museum',
    position: [51.4352, 5.4794],
    description: 'Museum for modern and contemporary art',
  },
  {
    id: '4',
    name: 'Strijp-S',
    category: 'cultural',
    position: [51.4485, 5.4586],
    description: 'Former Philips factory complex, now a cultural and creative center',
  },
  {
    id: '5',
    name: 'TU Eindhoven',
    category: 'education',
    position: [51.4478, 5.4908],
    description: 'Eindhoven University of Technology',
  },
  {
    id: '6',
    name: 'Evoluon',
    category: 'landmark',
    position: [51.4444, 5.4472],
    description: 'Conference center and former science museum with a distinctive flying saucer shape',
  },
  {
    id: '7',
    name: 'Witte Dame',
    category: 'cultural',
    position: [51.4393, 5.4757],
    description: 'Former Philips factory building, now housing Design Academy Eindhoven',
  },
  {
    id: '8',
    name: 'Genneper Parken',
    category: 'park',
    position: [51.4192, 5.4779],
    description: 'Large recreational area with sports facilities and nature',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Log the incoming request parameters for debugging
  console.log('API received params:', Object.fromEntries(searchParams.entries()));
  
  const category = searchParams.get('category');
  const search = searchParams.get('search')?.toLowerCase().trim();
  
  // Log the processed search parameters
  console.log('Processing search with:', { category, search });
  
  let filteredMarkers = eindhoven_markers;
  
  if (category && category !== 'all') {
    console.log(`Filtering by category: ${category}`);
    filteredMarkers = filteredMarkers.filter(marker => marker.category === category);
  }
  
  if (search && search.length > 0) {
    console.log(`Filtering by search term: ${search}`);
    filteredMarkers = filteredMarkers.filter(marker => 
      marker.name.toLowerCase().includes(search) || 
      marker.description.toLowerCase().includes(search) ||
      marker.category.toLowerCase().includes(search)
    );
  }
  
  console.log(`Returning ${filteredMarkers.length} markers`);
  return NextResponse.json(filteredMarkers);
} 