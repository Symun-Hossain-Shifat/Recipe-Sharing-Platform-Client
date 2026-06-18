const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL


export const Getallrecipes = async () => {
 const res = await fetch(`${Baseurl}/api/recipes`)
 const result = res.json()
 return result
}