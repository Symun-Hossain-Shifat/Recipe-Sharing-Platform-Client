import React from 'react'
import MYRecipespage from './Table'
import { GetUserInserver } from '@/lib/GetUser/Getuserinfo'
import { GetspecificrecipesByuserEmail } from '@/lib/GetApiData/recipe'

async function Homepage () {
   const User = await GetUserInserver()
      const email =  User?.email || null 
      const Data = await GetspecificrecipesByuserEmail(email) 
      // console.log(Data)
  return (
    <div>
      <MYRecipespage Data={Data} User={User}></MYRecipespage>
    </div>
  )
}

export default Homepage 