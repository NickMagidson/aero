import Head from 'next/head'
import { Inter } from 'next/font/google'

import AirData from './airData'

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
        </div>
      </main>
    </>
  )
}
