import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GaugeComponent from 'react-gauge-component';
import CountUp from 'react-countup';
import SearchBar from '@/components/SearchBar';
import dynamic from 'next/dynamic';

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// Dynamic import for Map component
const Map: any = dynamic(
  () => import('../../components/Map'),
  { 
    loading: () => <p>A Map is loading</p>,
    ssr: false // Prevents server-side render
  }
)

const AirData: React.FC =  () => {

  const [data, setData] = useState<{
    location: string;
    components: Record<string, number>;
    aqi: number;
  } | null>(null);

  // New York coordinates for reference
  const defaultLatitude = 40.7128;
  const defaultLongitude = -74.0060;

  const [lat, setLat] = useState<number | undefined>(defaultLatitude);
  const [lon, setLon] = useState<number | undefined>(defaultLongitude);

  const aqiValues = [0, 100, 70, 50, 30, 10];
  const gaugeValue = aqiValues[data?.aqi || 0];

  const API_KEY = '67224de3b5da9b6e57e30c7be68cd834';


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const { data } = response;
        setData({
          location: data.coord && `${data.coord.lat}, ${data.coord.lon}`,
          components: data.list && data.list[0].components,
          aqi: data.list && data.list[0].main.aqi
          // co, no, no2, o3, so2, pm2_5, pm10, nh3
        });
      } catch (error) {
        console.error('Error fetching air pollution data:', error);
        setData(null);
      }
    };
    fetchData();
  }, [lat, lon]);

  
  return (
    <>
    <SearchBar setLat={setLat} setLon={setLon}  />
    <div 
      id='air-data-container' 
      className="z-10 p-5 h-auto w-100
         bg-slate-950 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100">
      {data ? (
      <>
      <div id='gauge-container' className="h-100 flex flex-col justify-center bg-slate-200s border rounded-2xl bg-black bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border-gray-100">
        <GaugeComponent
          type="semicircle"
          arc={{
          colorArray: ['#FF2121', '#00FF15'],
          padding: 0.02,
          subArcs:
            [
              { limit: 20, showMark: false },
              { limit: 40 },
              { limit: 60 },
              { limit: 80 },
              { limit: 100, showMark: false }
            ]
          }}
          labels={{
            markLabel: {
              hideMinMax: true,
              type: "outer"
            }
          }}
          pointer={{type: "arrow", animationDelay: 0, color:"white" }}
          value={gaugeValue}
          
        />
        <h1 id='aqi' className={`flex justify-center text-5xl text-center p-5 font-semibold text-white ${inter.className}`}>
          {data.aqi === 1 && 'Good'}
          {data.aqi === 2 && 'Fair'}
          {data.aqi === 3 && 'Moderate'}
          {data.aqi === 4 && 'Poor'}
          {data.aqi === 5 && 'Very poor'}
          {!data.aqi && 'Unable to determine air quality'}
        </h1>
      </div>


        <hr className="my-8 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
        {/* <p className='text-center'>Location: <br /> {data.location}</p> */}
       
        <div id='data-grid' className={`text-lg text-center p-5 flex flex-col ${inter.className} grid grid-cols-3 grid-rows-3 gap-3 rounded-2xl bg-black bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 `}> 
          {Object.entries(data.components).map(([key, value]) => (
            <div key={key} className='flex flex-col justify-center items-start w-100 border-0 rounded-md p-1 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-20 border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
              <h3 className='text-left font-medium text-sm text-white' key={key}>
                <CountUp end={value} duration={6} decimals={2} decimal="." />
                {/* {value} */}
                <br/> 
                <span className="text-sm font-light text-gray-200">{key}:</span>
              </h3>
            </div>
          ))}
            <div  className='flex flex-col justify-center items-start w-100 border-0 rounded-md p-1 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-20 border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
              <h3 className='text-left font-medium text-sm text-white'>
                <CountUp end={data.aqi} duration={6} />
                <br/> 
                <span className="text-sm font-light text-gray-200">aqi:</span>
              </h3>
            </div>
        </div>
      </>
    ) : (
      // Use React load spinner from previous project
      <p>Loading...</p>
    )}
    
  </div>
    <Map center={[lat, lon]} />
  </>
  );
}

export default AirData