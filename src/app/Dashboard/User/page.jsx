import { Getspecificrecipes, GetspecificrecipesByuserEmail } from '@/lib/GetApiData/recipe'
import { GetUserInserver } from '@/lib/GetUser/Getuserinfo'
import React from 'react'
import DashboardOverview from './Homepage'
import { Getspecificfavourites } from '@/lib/GetApiData/favourite'
import { GetspecificlikesBYrecipeemail } from '@/lib/GetApiData/likes'

async function HomepageUser() {
  const User = await GetUserInserver()
  const email = User?.email
  const id = User?.id
const Data = await GetspecificrecipesByuserEmail(email)
const likes = await GetspecificlikesBYrecipeemail(email)

const Result = await Getspecificfavourites(id)
    // console.log(Data[0].recipeid)
    
      const recipes = await Promise.all(
    Result.map(item =>
      
      Getspecificrecipes(item.recipeid)
    )
    
  );
  const Datas = []
      const recipesall = await Promise.all(
    recipes.map(item =>
      
       Datas.push(item[0])
    )
    
  );
    // console.log( likes)
 

  return (
    <div>
    <DashboardOverview Data={Data} Datas={Datas} likes={likes}></DashboardOverview>
    </div>
  )
}

export default HomepageUser