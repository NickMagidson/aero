import React from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import AirData from './airData/index'


const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  loading: any,
  ssr: boolean,
  Head: any
}


const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Head>
        <title>Aero | Air Pollution Tracker</title>
        <link rel='icon' href='/icons8-air-96.png' sizes='any' />
      </Head>
      <main className={`min-h-screen flex flex-col items-center justify-between p-16 overscroll-none ${inter.className}`}>
        <div id='data-container'  className=" flex flex-col justify-center z-10 h-auto w-72 mt-auto mb-auto md:w-auto 2xl:justify-start 2xl:mr-auto max-w-xs ">
          <AirData />          
        </div>
      </main>
    </>
  )
}

export default Home
