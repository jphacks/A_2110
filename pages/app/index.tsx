import { useState, useEffect, VFC, FC } from 'react'
import { useSession } from 'next-auth/react'
import { NextPage } from 'next'
import Header from '../../components/header'
const AppHome = () : JSX.Element => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const [ content , setContent ] = useState()
  return(
    <div>
      <Header />
      nanika
      <iframe src="/api/utils/jwt"/>
    </div>
  )
}

export default AppHome;