import { Getallrecipes } from '@/lib/GetApiData/recipe';
import { Getallreport } from '@/lib/GetApiData/report';
import { Getspecificuser, Getspecificuserbystatus } from '@/lib/GetApiData/user'
import React from 'react'
import DashboardOverview from './Homepage';

async function Adminpage() { 
   const role = "User" 
   const Users = await Getspecificuser(role) 
    const Recipe = await Getallrecipes(); 
    const Report = await Getallreport() 
    const isPremium = "Premium" 
    const PremiumMember = await Getspecificuserbystatus(isPremium) 
    // console.log( Users , Recipe , Report , PremiumMember )

  return (
    <DashboardOverview Users={Users} Recipe={Recipe} Report={Report} PremiumMember={PremiumMember}></DashboardOverview>
  )
}

export default Adminpage