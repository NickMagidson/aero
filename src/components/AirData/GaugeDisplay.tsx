import React, { useEffect, useState } from "react";

// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);

import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

interface GaugeProps {
  gaugeValue: number;
  dataAqi: number | undefined;
  data: any;
  aqi: any | undefined;
}

// const chartData = {
//   datasets: [
//     {
//       label: "AQI",
//       data: [60, 60, 60, 60, 60],
//       labels: ['Very Poor', 'Poor', 'Moderate', 'Fair', 'Good'],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//       circumference: 180,
//       rotation: 270,
//       hoverOffset: 4
//     },
//   ]
// };


const GaugeDisplay: React.FC<GaugeProps> = ({ gaugeValue, data, dataAqi }) => {


  const [aqiText, setAqiText] = useState<string>("");
  useEffect(() => {
    if (data.aqi === 1) {
      setAqiText("Good");
    } else if (data.aqi === 2) {
      setAqiText("Fair");
    } else if (data.aqi === 3) {
      setAqiText("Moderate");
    } else if (data.aqi === 4) {
      setAqiText("Poor");
    } else if (data.aqi === 5) {
      setAqiText("Very poor");
    } else {
      setAqiText("Unable to determine air quality");
    }
  }, [data.aqi]);


  // const textCenter = {
  //   id: 'textCenter',
  //   beforeDatasetsDraw(chart: { getDatasetMeta?: any; ctx?: any; data?: any; }, args: any, pluginOptions: any) {
  //     const { ctx, data } = chart
  
  //     ctx.save();
  //     ctx.font = 'bolder 20px sans-serif';
  //     ctx.fillStyle = 'red';
  //     ctx.textAlign = 'center';
  //     ctx.textBaseline = 'middle';
  //     ctx.fillText(`${aqiText}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
  //   }
  // }

  return (
    <>
    <div id='gauge-container' className="h-100 flex flex-col justify-center bg-slate-200s border rounded-2xl bg-black bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border-gray-100">
      {/* <div className="flex justify-center h-56">
        <Doughnut 
          data={chartData}   
          options={{
            responsive: true,
            maintainAspectRatio: true,
            }}
          // plugins={[textCenter]}
            />
        </div> */}

    <GaugeComponent
      type="semicircle"
      arc={{
      colorArray: ['#941100', '#DC2727', '#F0803D', '#60C4E6', '#00d170'],
      padding: 0.02,
      width: 0.2,
      subArcs:
        [
          { limit: 20, tooltip: { text: 'AQI: 201-300' } },
          { limit: 40, tooltip: { text: 'AQI: 151-200' } },
          { limit: 60, tooltip: { text: 'AQI:101-150' } },
          { limit: 80, tooltip: { text: 'AQI: 51-100' } },
          { limit: 100, tooltip: { text: 'AQI: 0-50' } },
        ],
      }}
      labels={{
        valueLabel: {
          matchColorWithArc: false,
          hide: true
        },
        tickLabels: {
          hideMinMax: true,
          type: "outer",
        }
      }}
      pointer={{type: "needle", animationDelay: 0, color:"white" }}
      value={gaugeValue}
    />

      <h2
        id='aqi'
        className={`flex justify-center text-4xl p-5 text-center w-auto font-semibold ${inter.className} ${
          data.aqi === 1
            ? 'bg-gradient-to-r from-green-600 to-green-300 bg-clip-text text-transparent'
            : data.aqi === 2
            ? 'bg-gradient-to-r from-sky-600 to-cyan-200 bg-clip-text text-transparent'
            : data.aqi === 3
            ? 'bg-gradient-to-r from-orange-600 to-orange-200 bg-clip-text text-transparent'
            : data.aqi === 4
            ? 'bg-gradient-to-r from-red-400 via-red-500 to-yellow-500 text-transparent bg-clip-text'
            : data.aqi === 5
            ? 'bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent'
            : ''
        }`}
      >
      {aqiText}
      </h2>

    </div>
    </>
  )
}

export default GaugeDisplay;