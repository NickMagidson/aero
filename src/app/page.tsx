"use client"
import React, { useState, useEffect } from 'react';
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
  const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  // New York coordinates for reference
  const defaultLatitude = 40.7128;
  const defaultLongitude = -74.0060;

  const [lat, setLat] = useState<number | undefined>(defaultLatitude);
  const [lon, setLon] = useState<number | undefined>(defaultLongitude);


  const [data, setData] = useState<{
    location: string;
    components: Record<string, number>;
    aqi: number;
  } | null>(null);

  const fetchAirPollutionData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
      )
      const data = await response.json();
      // setData(data)
      console.log("Weather api =======> " + JSON.stringify(data))

    } catch (error) {
      console.error('Error fetching data:', error);
      setData(null);
    }
  };

  useEffect(() => {
    fetchAirPollutionData();
  });


  const handleSearchLat = (newLat: number | any) => {
    setLat(newLat);
  };

  const handleSearchLon = (newLon: number | any) => {
    setLon(newLon);
  };


  // Draggable Data Component
  // 1. Make body heigh 100vh - done
  // 2. Position the parent container, overall height will go out of body bounds - done
  // 3. The drag div itself will assume a fixed height (for needed data/information). Update: can be auto
  // 4. Should function at bare bones. Polish as needed
  // 5. Next: inner scrolling, style handle, start design


  return (

    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className='flex w-auto m-2 sm:w-2/4 md:w-1/2s lg:w-1/4' >
        <SearchBar setLat={handleSearchLat} setLon={handleSearchLon}  />
      </div>
      <Map accessToken={MAPBOX_API_KEY} lat={lat} lon={lon} /> 





      {/* Parent container for data component */}
      {/* <div className='parent absolute overflow-visible -bottom-56 border-2 border-red-700 w-full z-10'>
        <Draggable
          axis="y" 
          bounds="parent"
          defaultPosition={{x: 0, y: 300}}
          // handle=".dragbar"
          >
          <div className="glassmorphism flex flex-col justify-center gap-8 p-4 w-full h-auto rounded-tl-2xl rounded-tr-2xl">
            <div className="cursor">
              <div className='dragbar mx-auto w-12 border-2 rounded-full border-gray-600 text-center cursor'></div>   
            </div>
            <div className='weather-main w-64 h-24 mx-auto 
              rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-xl
              shadow-[0px_7px_15px_3px_#00000024]'>
            </div>
            <div className='w-80 mx-auto flex-col
              rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-xl
              border-[rgba(255,255,255,0.18)] rounded-[10px] bg-[rgba(230,230,230,0.15)] 
              shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[10.5px]'>
          
                <div className="w-10 h-10 bg-gray-300"></div>
                <div className="w-10 h-10 bg-gray-300"></div>
                <div className="w-10 h-10 bg-gray-300"></div>
                <div className="w-10 h-10 bg-gray-300"></div>
            </div>
          </div>
        </Draggable>
      </div> */}

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
