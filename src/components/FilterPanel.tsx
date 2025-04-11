'use client';

import { useState, FormEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'museum', label: 'Museums' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'landmark', label: 'Landmarks' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'education', label: 'Education' },
  { value: 'park', label: 'Parks' },
];

export default function FilterPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [what, setWhat] = useState(searchParams.get('what') || '');
  const [where, setWhere] = useState(searchParams.get('where') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const totalLocations = 20;
  
  const createQueryString = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([name, value]) => {
      if (value) {
        newParams.set(name, value);
      } else {
        newParams.delete(name);
      }
    });
    
    return newParams.toString();
  };

  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault();
    
    // Always use URL parameters for navigation
    const searchQuery = createQueryString({ what, where, category });
    router.push(`${pathname}?${searchQuery}`);
  };
  
  const handleReset = () => {
    setWhat('');
    setWhere('');
    setCategory('all');
    router.push(pathname);
  };
  
  return (
    <Card className="w-full rounded-3xl p-8 shadow-sm">
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Find Locations</h1>
          <p className="text-gray-500 text-lg">Search for locations by type and place</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="what" className="text-2xl font-medium mb-3 block">
              What
            </label>
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <Input
                id="what"
                className="pl-12 py-6 text-lg rounded-full border-gray-200"
                placeholder="Restaurant, park, cafe..."
                value={what}
                onChange={(e) => setWhat(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Select 
              value={category} 
              onValueChange={(value) => {
                setCategory(value);
              }}
            >
              <SelectTrigger id="category" className="py-5 text-base rounded-full border-gray-200">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value} className="text-base">
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="where" className="text-2xl font-medium mb-3 block">
              Where
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <Input
                id="where"
                className="pl-12 py-6 text-lg rounded-full border-gray-200"
                placeholder="Address, neighborhood, city..."
                value={where}
                onChange={(e) => setWhere(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button
              type="submit"
              className="py-6 rounded-full bg-black hover:bg-gray-800 text-white text-lg font-medium"
            >
              Search
            </Button>
            <Button
              type="button"
              variant="outline"
              className="py-6 rounded-full text-lg font-medium border-gray-200"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
          
          <p className="text-lg text-gray-500 pt-4">
            Showing {totalLocations} of {totalLocations} locations
          </p>
        </div>
      </form>
    </Card>
  );
} 