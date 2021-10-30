import { useState, useEffect, VFC, FC } from 'react'
import { useSession } from 'next-auth/react'
import { NextPage } from 'next'
import Header from '../../components/header'
import router from 'next/dist/client/router'
const AppHome = () : JSX.Element => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const [ content , setContent ] = useState()
  useEffect(() => {
  }, []);
  return(
    <div>
      <Header />

      nanika
    </div>
  )
}

export default AppHome;