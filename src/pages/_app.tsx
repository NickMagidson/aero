import Layout from '@/components/Layout'
import '@/styles/globals.css'

interface AppProps {
  Component: any,
  pageProps: any
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App