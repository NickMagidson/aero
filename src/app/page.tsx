"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import SearchBar from './components/SearchBar';
import Draggable from 'react-draggable';

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


  // Draggable Data Component
  // 1. Make body heigh 100vh
  // 2. Position the parent container, overall height will go out of body bounds
  // 3. The drag div itself will assume a fixed height (for needed data/information)
  // 4. Should function at bare bones. Polish as needed
  // 5. Next: inner scrolling, style handle, start design


  return (

    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className='flex w-auto m-2 sm:w-2/4 md:w-1/2s lg:w-1/4' >
        <SearchBar setLat={handleSearchLat} setLon={handleSearchLon}  />
      </div>
      <Map accessToken={MAPBOX_API_KEY} lat={lat} lon={lon} /> 





      {/* Parent container for data component */}
      <div className='absolute overflow-visible bottom-0 border-2 border-red-700 w-full h-80 z-10'>

        <Draggable 
          axis="y" 
          bounds="parent"
          handle=".dragbar"
          >
          <div className="glassmorphism w-11/12 h-auto mx-auto">
            <strong className="cursor"><div className='dragbar w-1/2 p-4 border-2 mx-auto border-red-700 text-center cursor'>Drag here</div></strong>
              <p>This is some placeholder test.</p>
          </div>
        </Draggable>

      </div>

      {/* <Draggable
        axis="y"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[25, 25]}
        scale={1}
        >
        <div>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable> */}
  
      {/* Search Bar */}
      {/* Info Div */}
    </div>
  );
}
