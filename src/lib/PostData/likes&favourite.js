'use server'

import { revalidatePath } from "next/cache";
import { authHeader } from "../GetUser/GetToken";





export async  function Postlikescount (Data , id) {
  console.log(Data)
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/likescount` , {
          method : 'POST', 
        headers : {
          ...await authHeader() ,
          'content-type' : 'application/json' , 
             
          
        },
        body : JSON.stringify(Data)
        })
        const result = await res.json();
        if(result){
                  revalidatePath(`/Recipes/${id}`)
                }
        return result ;
}  