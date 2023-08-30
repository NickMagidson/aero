import React from "react";

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
      <h2
        id='aqi'
        className={`flex justify-center text-5xl text-center p-5 font-semibold ${inter.className} ${
          data.aqi === 1
            ? 'bg-gradient-to-r from-green-600 to-green-300 bg-clip-text text-transparent'
            : data.aqi === 2
            ? 'bg-gradient-to-r from-sky-600 to-cyan-200 bg-clip-text text-transparent'
            : data.aqi === 3
            ? 'bg-gradient-to-r from-orange-600 to-orange-200 bg-clip-text text-transparent'
            : data.aqi === 4
            ? 'bg-gradient-to-r from-red-500 via-red-600 to-yellow-500 text-transparent bg-clip-text'
            : data.aqi === 5
            ? 'bg-gradient-to-r from-red-600 to-red-200 bg-clip-text text-transparent'
            : ''
        }`}
      >
        {data.aqi === 1 && 'Good'}
        {data.aqi === 2 && 'Fair'}
        {data.aqi === 3 && 'Moderate'}
        {data.aqi === 4 && 'Poor'}
        {data.aqi === 5 && 'Very poor'}
        {!data.aqi && 'Unable to determine air quality'}
      </h2>

    </div>
    </>
  )
}

export default GaugeDisplay;