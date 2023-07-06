import { useEffect, useState } from 'react';
import axios from 'axios';

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function AirPollution() {
  const [data, setData] = useState(null);

  const API_KEY = '67224de3b5da9b6e57e30c7be68cd834';
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
          components: data.list && data.list[0].components
          // co, no, no2, o3, so2, pm2_5, pm10, nh3
        });
      } catch (error) {
        console.error('Error fetching air pollution data:', error);
        setData(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <>
          <h1 className={`text-5xl text-center ${inter.className}`}>{data.components.co}</h1>
          {/* <p>Location: {data.location}</p> */}
          {/* <div className="h-full w-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100"> 
            <h3>no: <span>{data.components.no}</span></h3>
            <h3>no2: <span>{data.components.no2}</span></h3>
            <h3>o3: <span>{data.components.o3}</span></h3>
            <h3>so2: <span>{data.components.so2}</span></h3>
            <h3>pm2_5: <span>{data.components.pm2_5}</span></h3>
            <h3>pm10: <span>{data.components.pm10}</span></h3>
            <h3>nh3: <span>{data.components.nh3}</span></h3>
          </div> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div className='h-full w-full bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100'></div>
    </div>
  );
}
