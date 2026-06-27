'use server'

import { authHeader } from "../GetUser/GetToken"



const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL

export const GetallPayments = async () => {
 const res = await fetch(`${Baseurl}/api/payments` , {
   ...(await authHeader())
  })
 const result = await res.json()
 return result
}
