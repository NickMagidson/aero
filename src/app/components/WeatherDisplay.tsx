import React from 'react';
import { mockCurrentWeatherData } from "./mockData"

interface WeatherProps {
  title: string;
  count: number;
}

const WeatherDisplay: React.FC<WeatherProps> = () => {
  return (
    // <div style={{ width: "503px" }}>
      <div className='glassmorphism w-auto h-8 m-2'>
        <h1>{mockCurrentWeatherData.main.temp}</h1>
      </div>
    // </div>

  );
};

export default WeatherDisplay;