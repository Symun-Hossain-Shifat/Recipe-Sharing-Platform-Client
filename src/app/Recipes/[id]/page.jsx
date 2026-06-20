import React from 'react'
import Detailspage from './DescriptionPage'
import { Getspecificrecipes } from "@/lib/GetApiData/recipe";
import { GetspecificfavouritesBYrecipeid } from '@/lib/GetApiData/favourite';
import { GetspecificlikesBYrecipeid } from '@/lib/GetApiData/likes';


async function Home ({params}) {
  const {id} =  await params 
  // console.log(id)
const Data = await Getspecificrecipes(id)
const recipe = Data[0] 
const result1 = await GetspecificfavouritesBYrecipeid(id)
const result2 = await GetspecificlikesBYrecipeid(id)
console.log(result1 , result2)

  return (
    <div>
      <Detailspage recipe={recipe} result1={result1} result2={result2} id={id}></Detailspage>
    </div>
  )
}

export default Home 