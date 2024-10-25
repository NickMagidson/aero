"use client"
import React from 'react';
import dynamic from 'next/dynamic';
// import SearchBar from './components/SearchBar';

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

  // const [lat, setLat] = useState<number | undefined>(defaultLatitude);
  // const [lon, setLon] = useState<number | undefined>(defaultLongitude);



  return (

    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <div className='flex w-auto mt-5 mb-1 sm:mb-5 sm:mt-0 '>
        <SearchBar setLat={handleSearchLat} setLon={handleSearchLon}  />
      </div> */}
      <Map accessToken={MAPBOX_API_KEY} lat={defaultLatitude} lon={defaultLongitude} /> 
  
      {/* Search Bar */}
      {/* Info Div */}
    </div>
  );
}
