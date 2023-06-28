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
          aqi: data.list && data.list[0]?.main?.aqi
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
      <h1>Air Pollution Data</h1>
      {data ? (
        <>
          <p>Location: {data.location}</p>
          <p>Air Quality Index (AQI): {data.aqi}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
