const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL


export const GetallFeatures = async () => {
 const res = await fetch(`${Baseurl}/api/featured`)
 const result = await res.json()
 return result
}