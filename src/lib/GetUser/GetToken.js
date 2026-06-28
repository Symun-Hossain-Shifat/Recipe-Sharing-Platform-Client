'use server'

import { headers } from "next/headers"
import { auth } from "../auth"
import { GetUserInserver } from "./Getuserinfo"

 

export const GetJwtToken = async () => {
 const {token} = await auth.api.getToken({
  headers : await headers()
 }) 
//  console.log(token)
 return token
} 
 
export const authHeader = async () => {
  const user = await GetUserInserver();
  const userId = user?.id
  const token = await GetJwtToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
        User: userId,
      }
    : {};
};