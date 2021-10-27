import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns';

function MyApp({ Component, pageProps }: AppProps) {
  return(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <SessionProvider session={pageProps.session} >
      <Component {...pageProps} />
    </SessionProvider>
  </LocalizationProvider>
  )
}
export default MyApp
