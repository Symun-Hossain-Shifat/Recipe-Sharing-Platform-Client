'use server'

const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL


export const GetspecificlikesBYrecipeid = async (recipeid) => {
 const res = await fetch(`${Baseurl}/api/likescount?recipeid=${recipeid}` ,{
    cache : "no-store"
 })
 const result = await res.json()

 return result
}

export const GetspecificlikesBYrecipeemail = async (authorEmail) => {
 const res = await fetch(`${Baseurl}/api/likescount?authorEmail=${authorEmail}` ,{
    cache : "no-store"
 })
 const result = await res.json()

 return result
}
