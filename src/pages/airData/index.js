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
          co: data.list && data.list[0].components.co
          
          // another thing:
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
          <h1 className="text-4xl text-center">{data.co}</h1>
          {/* <p>Location: {data.location}</p> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
