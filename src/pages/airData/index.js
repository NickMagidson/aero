import { useEffect, useState } from 'react';
import axios from 'axios';

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
          <h1 className="text-5xl text-center">{data.components.co}</h1>
          {/* <p>Location: {data.location}</p> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div className='h-full w-full bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100'></div>
    </div>
  );
}
