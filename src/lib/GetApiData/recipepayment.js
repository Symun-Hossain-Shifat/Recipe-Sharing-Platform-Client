import { authHeader } from "../GetUser/GetToken";


const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL

export const Getrecipespayment = async () => {
  const res = await fetch(`${Baseurl}/api/recipepayments` , {
       headers : await authHeader()
     } );
  const result = await res.json();
  return result;
};


export const GetspecificrecipespaymentByuserEmail = async (email) => {
  const res = await fetch(`${Baseurl}/api/recipepayments?email=${email}` , {
       headers : await authHeader()
     } );
  const result = await res.json();
  return result;
};