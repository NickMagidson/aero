import Head from 'next/head'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'

import AirData from './airData'
import SearchBar from '@/components/SearchBar'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  loading: any,
  ssr: boolean,
}

type Head = any;



const Home: React.FC<HomeProps> = () => {

  const Map: any = dynamic(
    () => import('../components/Map'),
    { 
      loading: () => <p>A Map is loading</p>,
      ssr: false // Prevents server-side render
    }
  )

  return (
    <>
      <Head>
        <title>Aero | Air Pollution Tracker</title>
      </Head>
      <main className={`min-h-screen flex flex-col items-center justify-between p-16 overscroll-none ${inter.className}`}>
        <div id='data-container'  className=" flex flex-col justify-center z-10 h-auto w-72 mt-auto mb-auto md:w-auto 2xl:justify-start 2xl:mr-auto max-w-xs ">
          <SearchBar />
          <AirData />          
        </div>
        <Map />
      </main>
    </>
  )
}

export default Home
