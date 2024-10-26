"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import SearchBar from './components/SearchBar';

const Map: any = dynamic(
  () => import('@/app/components/Map/Map'),
  { 
    loading: () => <p className='text-white m-auto'>A Map is loading...</p>,
    ssr: false // Prevents server-side render
  }
)



export default function Home() {
  // Mapbox API Token
  const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY

  // New York coordinates for reference
  const defaultLatitude = 40.7128;
  const defaultLongitude = -74.0060;

  const [lat, setLat] = useState<number | undefined>(defaultLatitude);
  const [lon, setLon] = useState<number | undefined>(defaultLongitude);


  const handleSearchLat = (newLat: number | any) => {
    setLat(newLat);
  };

  const handleSearchLon = (newLon: number | any) => {
    setLon(newLon);
  };



  return (

    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className='flex w-auto m-2'>
        <SearchBar setLat={handleSearchLat} setLon={handleSearchLon}  />
      </div>
      <Map accessToken={MAPBOX_API_KEY} lat={lat} lon={lon} /> 
  
      {/* Search Bar */}
      {/* Info Div */}
    </div>
  );
}
