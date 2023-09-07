import CountUp from 'react-countup';
import { Tooltip } from "react-tooltip";
import Image from "next/image";
import TooltipIcon from '../../../public/icons8-info-16.png'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

interface AirDataGridProps {
  data: any;
  end: any | undefined;
  value: number;
}

const pollutantGases = [
  {
    ab: 'co',
    name: 'Carbon monoxide',
    desc: 'A highly poisonous, colourless, odourless and tasteless gas. It is very flammable and mixes well with air, easily forming explosive mixtures.'
  },
  {
    ab: 'no',
    name: 'Nitrogen monoxide',
    desc: 'Aka Nitric oxide. A colorless gas with the formula NO. It is one of the principal oxides of nitrogen. Nitric oxide is a free radical: it has an unpaired electron, which is sometimes denoted by a dot in its chemical formula (•N=O or •NO).'
  },
  {
    ab: 'no2',
    name: 'Nitrogen dioxide',
    desc: 'A gaseous air pollutant composed of nitrogen and oxygen and is one of a group of related gases called nitrogen oxides, or NOx. NO2 forms when fossil fuels such as coal, oil, gas or diesel are burned at high temperatures.'
  },
  {
    ab: 'o3',
    name: 'Ozone',
    desc: "Ozone is a colorless gas that can be good or bad, depending on where it is. Ozone in the stratosphere is good because it shields the earth from the sun's ultraviolet rays. Ozone at ground level, where we breathe, is bad because it can harm human health."
  },
  {
    ab: 'so2',
    name: 'Sulphur dioxide',
    desc: 'Sulfur dioxide (SO2) is a gaseous air pollutant composed of sulfur and oxygen. SO2 forms when sulfur-containing fuel such as coal, oil, or diesel is burned. Sulfur dioxide also converts in the atmosphere to sulfates, a major part of fine particle pollution in the eastern U.S.'
  },
  {
    ab: 'pm10',
    name: 'Particulate matter 10',
    desc: 'Airborne particulate matter (PM) is not a single pollutant, but rather is a mixture of many chemical species. It is a complex mixture of solids and aerosols composed of small droplets of liquid, dry solid fragments, and solid cores with liquid coatings. Those with a diameter of 10 microns or less (PM10) are inhalable into the lungs and can induce adverse health effects.'
  },
  {
    ab: 'pm2_5',
    name: 'Particulate matter 2.5',
    desc: 'Airborne particulate matter (PM) is not a single pollutant, but rather is a mixture of many chemical species. It is a complex mixture of solids and aerosols composed of small droplets of liquid, dry solid fragments, and solid cores with liquid coatings. Fine particulate matter is defined as particles that are 2.5 microns or less in diameter (PM2.5).'
  },
  {
    ab: 'nh3',
    name: 'Ammonia',
    desc: 'Ammonia is an inorganic compound of nitrogen and hydrogen with the formula NH₃. A stable binary hydride, and the simplest pnictogen hydride, ammonia is a colourless gas with a distinct pungent smell.'
  },
  {
    ab: 'aqi',
    name: 'Air Quality Index',
    desc: 'Think of the AQI as a yardstick that runs from 0 to 500. The higher the AQI value, the greater the level of air pollution and the greater the health concern. For example, an AQI value of 50 or below represents good air quality, while an AQI value over 300 represents hazardous air quality.'
  }
];



const AirDataGrid: React.FC<AirDataGridProps> = ({ data }) => {
  return (
    <div id='data-grid' className={`text-lg text-center p-4 flex flex-col ${inter.className} grid grid-cols-3 grid-rows-3 gap-3 rounded-2xl bg-black bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 `}>
      {Object.entries(data.components).map(([key, value]) => (
        <div key={key} className='flex flex-col justify-center w-full xl:h-14 border-0 rounded-md p-1 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-20 border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
          <div className='flex flex-row justify-between w-full'>
            <p className=" text-xs font-light text-gray-200 flex flex-row justify-between">{key}:</p>
            <Image data-tooltip-id={key} src={TooltipIcon} alt='info icon' width={16} />
          </div>
          <h3 className='text-center font-medium text-sm text-white w-full lg:mt-auto' key={key}>
            <CountUp end={value as number} duration={6} decimals={2} decimal="." />
          </h3>

          {/* POLLUTANT TOOLTIPS */}
          {pollutantGases.map((pollutant) => (
            <Tooltip key={pollutant.ab} id={pollutant.ab}>
              <div className='w-64'>
                <strong>{pollutant.name}</strong>
                <p className=' text-sm'>{pollutant.desc}</p>
              </div>
            </Tooltip>
          ))}
        </div>
      ))}

      <div className='flex flex-col justify-center items-start min-w-100 w-100 border-0 rounded-md p-1 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-20 border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
        <div className='flex flex-row justify-between w-full'>
          <p className="text-xs font-light text-gray-200 flex flex-row justify-between">aqi:</p>
          <Image data-tooltip-id='aqi' src={TooltipIcon} alt='info icon' width={16} />
        </div>
        <h3 className='text-center font-medium text-sm text-white w-full lg:mt-auto'>
          <CountUp end={data.aqi} duration={6} />
        </h3>
      </div>

    </div>
  );
};


export default AirDataGrid;