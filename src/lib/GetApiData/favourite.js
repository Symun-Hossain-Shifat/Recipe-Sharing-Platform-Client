'use server'

import { authHeader } from "../GetUser/GetToken"





const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL

export const Getspecificfavourites = async (id) => {
 const res = await fetch(`${Baseurl}/api/favourite?id=${id}`, {
     headers : await authHeader()
   } )
 const result = await res.json()
 return result
}


export const GetspecificfavouritesBYrecipeid = async (recipeid) => {
 const res = await fetch(`${Baseurl}/api/favourite?recipeid=${recipeid}` , {
   headers : await authHeader() ,
   cache : "no-store"
 })
 const result = await res.json()
 
 return result
}