
import { Getallrecipes } from '@/lib/GetApiData/recipe'
import { GetUserInserver } from '@/lib/GetUser/Getuserinfo';
import Recipesmanagepage from './recipetable';


async function Homepage () {
    const Datas = await Getallrecipes();
    console.log(Datas) 
    const User = await GetUserInserver()
  return (
     <Recipesmanagepage User={User} Datas={Datas}></Recipesmanagepage>
       
  )
}

export default Homepage 