const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL


export const Getalluser = async () => {
 const res = await fetch(`${Baseurl}/api/user`)
 const result = await res.json()
 return result
}
