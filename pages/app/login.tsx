import type { NextPage } from "next";
import { getCsrfToken, useSession, signOut } from "next-auth/react";
import {signIn} from 'next-auth/react'
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { getProviders } from "next-auth/react";
import { Button } from "@mui/material";
import Header from "../../components/header";


const Login : NextPage=({ providers}:any) =>{
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  return (
    <>
      <Header />
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <Button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();
  return {
    props: { providers, csrfToken},
  }
}

export default Login;
