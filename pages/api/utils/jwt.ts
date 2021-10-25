import { getToken } from 'next-auth/jwt'

const secret = process.env.SECRET

const jwt = async (req: any, res: { send: (arg0: string) => void }) => {
  const token = await getToken({ req, secret })
  res.send(JSON.stringify(token, null, 2))
}

export default jwt;