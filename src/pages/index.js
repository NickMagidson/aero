import Head from 'next/head'
import { Inter } from 'next/font/google'

import AirData from './airData'
import GaugeComponent from 'react-gauge-component'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Aero | Air Pollution Tracker</title>
      </Head>
      <main className={`min-h-screen flex flex-col items-center justify-between p-16 overscroll-none ${inter.className}`}>
        <div className="absolute z-5 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex p-9">
          <AirData />
          {/* Gauge chart is here for placeholder and experimentation
              Will most likely be implimenting in AirData */}
          {/* <GaugeComponent id='gauge-component' /> */}
        </div>
      </main>
    </>
  )
}
