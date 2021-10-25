import { useState, useEffect, VFC, FC } from 'react'
import { useSession } from 'next-auth/react'
import { NextPage } from 'next'
import Header from '../../components/header'
const AppHome = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const [ content , setContent ] = useState()
  return(
    <div>
      <Header />
      nanika
    </div>
  )
}

export default AppHome;