import { authHeader } from "../GetUser/GetToken"

const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL


export const Getallreport = async () => {
 const res = await fetch(`${Baseurl}/api/report` , {
   ...(await authHeader())
  })
 const result = await res.json()
 return result
}
