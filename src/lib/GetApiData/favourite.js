const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL

export const Getspecificfavourites = async (id) => {
 const res = await fetch(`${Baseurl}/api/favourite?id=${id}`)
 const result = await res.json()
 return result
}