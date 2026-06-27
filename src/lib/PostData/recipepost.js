import {authHeaderPost } from "../GetUser/GetToken";


export async  function Postrecipes (Data) {
  console.log(Data)
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes` , {
          method : 'POST', 
        headers : {
          'content-type' : 'application/json' , 
            ...(await authHeaderPost())
          
        },
        body : JSON.stringify(Data)
        })
        const result = await res.json();
        return result ;
}