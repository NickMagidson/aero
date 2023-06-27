import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className={`flex min-h-screen flex-col items-center justify-between p-16 ${inter.className}`}>
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <h1>TEST</h1>
        </div>
      </main>
    </>
  )
}
