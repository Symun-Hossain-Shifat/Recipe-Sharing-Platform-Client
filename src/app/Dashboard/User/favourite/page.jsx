import { Getspecificfavourites } from '@/lib/GetApiData/favourite'
import { Getspecificrecipes } from '@/lib/GetApiData/recipe';
import { GetUserInserver } from '@/lib/GetUser/Getuserinfo'


import React from 'react'

import Favouritehomepage from './Subpage';

async function Homepage () {
    const user = await GetUserInserver()
    
    const id = user?.id ;
    const Data = await Getspecificfavourites(id)
    // console.log(Data[0].recipeid)
    
      const recipes = await Promise.all(
    Data.map(item =>
      
      Getspecificrecipes(item.recipeid)
    )
    
  );

  const Datas = recipes.flatMap(item => item);
    console.log( Datas)
  return (
<Favouritehomepage Datas={Datas}></Favouritehomepage>
  )
}

export default Homepage 