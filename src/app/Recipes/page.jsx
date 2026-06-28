import { Getallrecipes } from "@/lib/GetApiData/recipe";

import { GetUserInserver } from "@/lib/GetUser/Getuserinfo";


import RecipeHomepage from "./Homepage";


async function RecipesPage() { 
  const user = await GetUserInserver()
  const Datas = await Getallrecipes()
  // console.log(Datas)
  return (
     <RecipeHomepage Datas={Datas} user={user}></RecipeHomepage>
  );
}

export default RecipesPage;