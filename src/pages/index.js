import Head from 'next/head'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'

import AirData from './airData'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const Map = dynamic(
    () => import('../components/Map'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false // Prevents server-side render
    }
  )

  return (
    <>
      <Head>
        <title>Aero | Air Pollution Tracker</title>
      </Head>
      <main className={`min-h-screen flex flex-row items-center justify-between p-16 overscroll-none ${inter.className}`}>
        <AirData />
        <Map />
      </main>
    </>
  )
}
