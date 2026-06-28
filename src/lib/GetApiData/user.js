import { authHeader } from "../GetUser/GetToken";


const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL

export const Getspecificuser = async (role) => {
  const res = await fetch(`${Baseurl}/api/user?role=${role}`, {
    headers : await authHeader()
  });
  const result = await res.json();
  return result;
};


export const Getspecificuserbystatus = async (isPremium) => {
  const res = await fetch(`${Baseurl}/api/user?isPremium=${isPremium}`, {
    headers : await authHeader()
  } );
  const result = await res.json();
  return result;
};