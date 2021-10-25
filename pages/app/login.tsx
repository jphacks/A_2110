import type { NextPage } from "next";
import {signIn} from 'next-auth/react'

const Login: NextPage = () => {
    return (
        <div>
            <a
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
        </div>
    )
}

export default Login;
