import React from 'react';
import SatellitePNG from "../public/Satellite.png";
import CometPNG from "../public/Comet.png"
import Image from 'next/image'

const ToggleBar: React.FC = () => {
  return (
    <div className='glassmorphism flex flex-row p-2 h-20 m-2 w-auto'>
      <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
        <Image src={SatellitePNG} alt="Satellite Icon" className="h-8 w-10 m-auto"/>
      </button>
      <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
        <Image src={CometPNG} alt="Satellite Icon" className="h-8 w-10 m-auto"/>
      </button>
    </div>
  );
};

export default ToggleBar;
