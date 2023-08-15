import React from "react";
import GaugeComponent from "react-gauge-component";

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

interface GaugeProps {
  gaugeValue: number;
  dataAqi: number | undefined;
  data: any;
  aqi: any | undefined;
}

const GaugeDisplay: React.FC<GaugeProps> = ({ gaugeValue, data, dataAqi }) => {
  return (
    <>
    <div id='gauge-container' className="h-100 flex flex-col justify-center bg-slate-200s border rounded-2xl bg-black bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border-gray-100">
    {/* <GaugeComponent
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
    /> */}
      <h1 id='aqi' className={`flex justify-center text-5xl text-center p-5 font-semibold text-white ${inter.className}`}>
      {data.aqi === 1 && 'Good'}
      {data.aqi === 2 && 'Fair'}
      {data.aqi === 3 && 'Moderate'}
      {data.aqi === 4 && 'Poor'}
      {data.aqi === 5 && 'Very poor'}
      {!data.aqi && 'Unable to determine air quality'}
      </h1>
    </div>
    </>
  )
}

export default GaugeDisplay;