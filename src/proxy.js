
import { NextResponse } from 'next/server'
import { GetUserInserver } from './lib/GetUser/Getuserinfo'
 

export async function proxy(request) {

const session = await GetUserInserver()
  if(session){
    return NextResponse.next()
  }else{
   return NextResponse.redirect(new URL('/signin', request.url))
  }
 
  
}

 
export const config = {
  matcher: [

    "/plans"
  ],
}