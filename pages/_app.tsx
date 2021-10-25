import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  return(
  //@ts-ignore
  <SessionProvider options={{staleTime: 0, refetchInterval: 0}} session={pageProps.session} >
    <Component {...pageProps} />
  </SessionProvider>
  )
}
export default MyApp
