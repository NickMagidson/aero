import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GaugeDisplay from '@/components/GaugeDisplay';
import AirDataGrid from '@/components/AirDataGrid';
import SearchBar from '@/components/SearchBar';
import dynamic from 'next/dynamic';
import { Circles } from 'react-loader-spinner'

import { Inter } from 'next/font/google'
import CoordinatesDisplay from '@/components/CoorodinatesDisplay';
const inter = Inter({ subsets: ['latin'] })

// Dynamic import for Map component
const Map: any = dynamic(
  () => import('../../components/Map'),
  { 
    loading: () => <p className='text-white'>A Map is loading...</p>,
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
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
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
        <main id='air-data-container' className="z-10 p-5 h-auto w-100 max-w-2xl bg-slate-950 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"> 
            {data ? (
            <>
              <GaugeDisplay gaugeValue={gaugeValue} dataAqi={data.aqi} data={data} aqi={undefined} />
              <hr className="mb-2 mt-8 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
              <CoordinatesDisplay lat={lat} lon={lon} />
              <AirDataGrid  data={data} end={data} value={0}/>
            </>
          ) : (
            // Use React load spinner from previous project
            <Circles
              height="80"
              width="80"
              color="#3b7fd9"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
        </main>
      <Map center={[lat, lon]} />
    </>
  );
}

export default AirData;