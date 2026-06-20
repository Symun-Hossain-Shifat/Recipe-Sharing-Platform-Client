import { Getallreport } from '@/lib/GetApiData/report'
import React from 'react'
import Reportpage from './Reportpage'

async function Homepage () {
     const Datas = await Getallreport() 
    console.log(Datas)
  return (
    <div>
        <Reportpage Datas={Datas}></Reportpage>
    </div>
  )
}

export default Homepage 