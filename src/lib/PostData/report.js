import { authHeader } from "../GetUser/GetToken";



export async  function PostReport (Data) {
  console.log(Data)
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/report` , {
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