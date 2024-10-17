"use client"
import React from 'react';
import dynamic from 'next/dynamic';

const Map: any = dynamic(
  () => import('@/app/components/Map/Map'),
  { 
    loading: () => <p className='text-white m-auto'>A Map is loading...</p>,
    ssr: false // Prevents server-side render
  }
)



export default function Home() {
  // Mapbox API Token
  const MAP_TOKEN = 'pk.eyJ1IjoicmVkbGlvbjk1IiwiYSI6ImNsbTd2cDVkMzAzdDUzam1zYnd5dXdwdTQifQ.DLJTzbg_x88gmEV6NNrHjg'

  // New York coordinates for reference
  const defaultLatitude = 40.7128;
  const defaultLongitude = -74.0060;

  // const [lat, setLat] = useState<number | undefined>(defaultLatitude);
  // const [lon, setLon] = useState<number | undefined>(defaultLongitude);



  return (

    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Map: absolute background layer */}

      <Map accessToken={MAP_TOKEN} lat={defaultLatitude} lon={defaultLongitude} /> 
  
      {/* Search Bar */}
      {/* Info Div */}
    </div>
  );
}
