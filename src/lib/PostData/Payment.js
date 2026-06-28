import { authHeader } from "../GetUser/GetToken";


export async  function PostPayment (Data) {
  // console.log(Data)
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments` , {
          method : 'POST', 
        headers : { 
          ...await authHeader() ,
          'content-type' : 'application/json' , 
          
          
        },
        body : JSON.stringify(Data)
        })
        const result = await res.json();
        return result ;
}



export async  function PostRecipePayment (Data) {
  // console.log(Data)
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipepayments` , {
          method : 'POST', 
        headers : { 
          ...await authHeader() ,
          'content-type' : 'application/json' , 
           
          
        },
        body : JSON.stringify(Data)
        })
        const result = await res.json();
        return result ;
}