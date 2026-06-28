import { authHeader } from "../GetUser/GetToken";


export const Deletereport = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/report/${id}`,
    {
      method: "DELETE", 
       headers : await authHeader() 
      
    }
  );

  return await res.json();
};