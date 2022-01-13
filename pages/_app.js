// import 'tailwindcss/tailwind.css'

import '../styles.css'
import { SessionProvider } from "next-auth/react"
import Layout from '../components/Layout'

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
  <SessionProvider session={session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SessionProvider>
  )
  
}

export default MyApp
