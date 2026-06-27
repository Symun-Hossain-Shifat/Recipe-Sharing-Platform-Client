import { authHeader } from "../GetUser/GetToken";

export const Deletefavourite = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/favourite/${id}`,
    {
      method: "DELETE", 
      ...(await authHeader())
    }
  );

  return await res.json();
};