'use server'

import { headers } from "next/headers";
import { auth } from "../auth";



export const  GetUserToken = async() => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const Token = session?.session?.token;  
  console.log(Token)
  return Token
}



export const authHeader = async () => {
  const token = await GetUserToken();
 if(token){
 return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
 }else if (!token){
  return {}
 }
  
}; 


export const authHeaderPost = async () => {
  const token = await GetUserToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};