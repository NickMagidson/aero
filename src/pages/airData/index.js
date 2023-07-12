import { useEffect, useState } from 'react';
import axios from 'axios';

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function AirData() {
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
          components: data.list && data.list[0].components,
          aqi: data.list && data.list[0].main.aqi
          // co, no, no2, o3, so2, pm2_5, pm10, nh3
        });
      } catch (error) {
        console.error('Error fetching air pollution data:', error);
        setData(null);
      }

      // if (data.aqi === 1) { console.log('Good') } 
      //   else if (data.aqi === 2) { console.log('Fair') }  
      //   else if (data.aqi === 3) { console.log('Moderate') }
      //   else if (data.aqi === 4) { console.log('Poor') }
      //   else if (data.aqi === 5) { console.log('Very poor') }

    };

    fetchData();
  }, []);

  return (
    <div className="p-5 h-full w-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100">
      {data ? (
        <>
          <h1 className={`text-5xl text-center ${inter.className}`}>{data.components.co}</h1>
          {/* <p>Location: {data.location}</p> */}
          <div className={`text-lg text-center p-5 flex flex-col ${inter.className}`}> 
            <h3 className='text-left text-xl'>no: <span className="text-base">{data.components.no}</span></h3>
            <h3 className='text-left text-xl'>no2: <span className="text-base">{data.components.no2}</span></h3>
            <h3 className='text-left text-xl'>o3: <span className="text-base">{data.components.o3}</span></h3>
            <h3 className='text-left text-xl'>so2: <span className="text-base">{data.components.so2}</span></h3>
            <h3 className='text-left text-xl'>pm2_5: <span className="text-base">{data.components.pm2_5}</span></h3>
            <h3 className='text-left text-xl'>pm10: <span className="text-base">{data.components.pm10}</span></h3>
            <h3 className='text-left text-xl'>nh3: <span className="text-base">{data.components.nh3}</span></h3>
            <h3 className='text-left text-xl'>aqi: <span className="text-base">{data.aqi}</span></h3>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div className='h-full w-full bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100'></div>
    </div>
  );
}
