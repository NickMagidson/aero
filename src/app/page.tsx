"use client"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay'
import Draggable from 'react-draggable';
import ToggleBar from './components/ToggleBar';

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
  // isISSDisplayed
  // isMereoriteDisplayed


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
    <>
      <div className="font-[family-name:var(--font-geist-sans)] w-full h-full flex flex-row">
        <Map accessToken={MAPBOX_API_KEY} lat={lat} lon={lon} /> 
        <div className='flex flex-col items-center w-full m-2 ' >
          <SearchBar setLat={handleSearchLat} setLon={handleSearchLon}  />
          <WeatherDisplay title={''} count={0} />
        </div>
        <div className='flex flex-col w-full items-end'>
          <ToggleBar />
        {/* <GeneralInfo /> */}
        </div>
      {/* <LatLonDisplay lat={lat} lon={lon} /> */}
    </div>
    </>
  );
}
