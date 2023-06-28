import Head from 'next/head'
import { Inter } from 'next/font/google'
import AirPollution from './airData/index'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Aero | Air Pollution Tracker</title>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between p-16 ${inter.className}`}>
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <AirPollution />
        </div>
      </main>
    </>
  )
}
