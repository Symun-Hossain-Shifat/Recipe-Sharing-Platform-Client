const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL


export const Getallreport = async () => {
 const res = await fetch(`${Baseurl}/api/report`)
 const result = await res.json()
 return result
}
