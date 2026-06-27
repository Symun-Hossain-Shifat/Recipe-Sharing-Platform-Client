import { authHeader, authHeaderPost } from "../GetUser/GetToken";

export const EditUserInfo = async (data, email) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${email}`,
    {
      method: "PATCH", 
      cache : "no-store" ,
      headers: {
        "content-type": "application/json", 
         ...(await authHeaderPost())
      },
      body: JSON.stringify(data),
    }
  );

  return await res.json();
}; 
