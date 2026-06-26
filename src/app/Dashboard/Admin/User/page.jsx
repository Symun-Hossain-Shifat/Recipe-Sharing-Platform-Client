

import { Getspecificuser } from '@/lib/GetApiData/user'
import SubUserpage from './Subuserpage'
import { GetUserInserver } from '@/lib/GetUser/Getuserinfo'


 async function Homepage () {
 const role = "User" 
 const result = await Getspecificuser(role)
 console.log(result) 
const user = await GetUserInserver()
  return (
   <SubUserpage result={result} user={user}></SubUserpage>
  )
}

export default Homepage 