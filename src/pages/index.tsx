import React from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import AirData from '../components/AirData/index'

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
        <title>Aero | Air Pollution Dashboard</title>
        <link rel='icon' href='/airLogo.png' sizes='any' />
      </Head>
      <main className={`min-h-screen flex flex-col items-center justify-between p-16 overscroll-none ${inter.className}`}>
        <div id='data-container'  className="flex flex-col justify-center z-10 h-auto w-72 mt-auto mb-auto md:w-auto lg:justify-start 2xl:mr-auto max-w-2xl 2xl:max-w-[288px] 2xl:min-w-[288px] ">
          <AirData />          
        </div>
      </main>
    </>
  )
}

export default Home
