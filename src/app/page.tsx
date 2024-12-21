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
  const defaultLatitude = 35.6764;
  const defaultLongitude = 139.6500;

  const [lat, setLat] = useState<number | string>(defaultLatitude);
  const [lon, setLon] = useState<number | string>(defaultLongitude);


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



  return (

    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* <div className='flex w-auto m-2 sm:w-2/4 md:w-1/2s lg:w-1/4' >
        <SearchBar setLat={handleSearchLat} setLon={handleSearchLon}  />
      </div> */}
      <Map 
        accessToken={MAPBOX_API_KEY} 
        lat={lat} 
        lon={lon} 
      /> 

    </div>
  );
}
