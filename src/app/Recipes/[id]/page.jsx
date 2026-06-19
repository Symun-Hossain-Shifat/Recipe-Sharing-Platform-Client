import React from 'react'
import Detailspage from './DescriptionPage'
import { Getspecificrecipes } from "@/lib/GetApiData/recipe";

async function Home ({params}) {
  const {id} =  await params 
  // console.log(id)
const Data = await Getspecificrecipes(id)
const recipe = Data[0] 
  return (
    <div>
      <Detailspage recipe={recipe}></Detailspage>
    </div>
  )
}

export default Home 