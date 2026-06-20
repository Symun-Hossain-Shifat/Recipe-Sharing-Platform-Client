'use server'



const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL

export const Getspecificfavourites = async (id) => {
 const res = await fetch(`${Baseurl}/api/favourite?id=${id}`)
 const result = await res.json()
 return result
}


export const GetspecificfavouritesBYrecipeid = async (recipeid) => {
 const res = await fetch(`${Baseurl}/api/favourite?recipeid=${recipeid}` , {
   cache : "no-store"
 })
 const result = await res.json()
 
 return result
}