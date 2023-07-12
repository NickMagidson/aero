import { useEffect, useState } from 'react';
import axios from 'axios';

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function AirData() {
  const [data, setData] = useState(null);

  const API_KEY = '67224de3b5da9b6e57e30c7be68cd834';
  // Tokyo coordinates for reference
  const LATITUDE = 35.6762;
  const LONGITUDE = 139.6503;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}`
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
  }, []);

  
  if (data && data.aqi === 1) {
    console.log('Good');
  } else if (data && data.aqi === 2) {
    console.log('Fair');
  } else if (data && data.aqi === 3) {
    console.log('Moderate');
  } else if (data && data.aqi === 4) {
    console.log('Poor');
  } else if (data && data.aqi === 5) {
    console.log('Very poor');
  } else {
    console.log('Unable to determine air quality');
  }

  return (
    <div className="p-5 h-full w-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100">
    {data ? (
      <>
        <h1 className={`text-5xl text-center mt-3 ${inter.className}`}>
          {data.aqi === 1 && 'Good'}
          {data.aqi === 2 && 'Fair'}
          {data.aqi === 3 && 'Moderate'}
          {data.aqi === 4 && 'Poor'}
          {data.aqi === 5 && 'Very poor'}
          {!data.aqi && 'Unable to determine air quality'}
        </h1>
        <hr class="my-8 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
        {/* <p>Location: {data.location}</p> */}
        <div className={`text-lg text-center p-5 flex flex-col ${inter.className}`}> 
          {Object.entries(data.components).map(([key, value]) => (
            <h3 className='text-left text-xl' key={key}>{key}: <span className="text-base">{value}</span></h3>
          ))}
          <h3 className='text-left text-xl'>aqi: <span className="text-base">{data.aqi}</span></h3>
        </div>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
}
