import CountUp from 'react-countup';

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

interface AirDataGridProps {
  data: any;
  end: any | undefined;
  value: number;
}

const AirDataGrid: React.FC<AirDataGridProps> = ({ data  }) => {
  return (
    <div id='data-grid' className={`text-lg text-center p-5 flex flex-col ${inter.className} grid grid-cols-3 grid-rows-3 gap-3 rounded-2xl bg-black bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 `}> 
    {Object.entries(data.components).map(([key, value]) => (
      <div key={key} className='flex flex-col justify-center items-start w-100 border-0 rounded-md p-1 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-20 border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
        <h3 className='text-left font-medium text-sm text-white' key={key}>
          <CountUp end={value} duration={6} decimals={2} decimal="." />
          <br/> 
          <span className="text-sm font-light text-gray-200">{key}:</span>
        </h3>
      </div>
    ))}
      <div  className='flex flex-col justify-center items-start w-100 border-0 rounded-md p-1 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-20 border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
        <h3 className='text-left font-medium text-sm text-white'>
          <CountUp end={data.aqi} duration={6} />
          <br/> 
          <span className="text-sm font-light text-gray-200">aqi:</span>
        </h3>
      </div>
  </div>
  )
}

export default AirDataGrid;