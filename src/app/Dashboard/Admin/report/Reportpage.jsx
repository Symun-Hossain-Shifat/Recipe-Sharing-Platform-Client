'use client'
import { DeleteRecipe } from '@/lib/DeleteData/Recipe'
import { Deletereport } from '@/lib/DeleteData/report'

import { Button, Card } from '@heroui/react'
import { redirect } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

function Reportpage ({Datas}) {
    const handlerecipe = async (e , id) => {
        e.preventDefault()
        const result = await DeleteRecipe(id)
        if(result){
            toast.success('Recipe Deleted Successfully')
            redirect('/Dashboard/Admin')
        }
    }


    const handlereport = async (e , id) => {
        e.preventDefault()
        const result = await Deletereport(id)
        if(result){
            toast.success('Report Deleted Successfully')
            redirect('/Dashboard/Admin')
        }
    }
   
  return (
    <div >
        {
            Datas.length === 0 ? (
                <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-700">
              No Report Found 😢
            </h2>
            <p className="text-gray-500 mt-2">
              Try searching with another keyword.
            </p>
          </div>
            ): (
                <div>
                    {
                              
        Datas.map( report => (
             <Card key={report._id} className="p-5 m-5 rounded-2xl shadow-md space-y-3">

      {/* Report Info */}
      <div>
        <h2 className="text-lg font-bold text-red-500">
          Report Reason
        </h2>

        <p className="text-sm text-gray-600 mt-1">
          {report.reason}
        </p>
      </div>

      {/* Info Section */}
      <div className="text-sm text-gray-500 space-y-1">
        <p><b>Recipe ID:</b> {report.recipeId}</p>
        <p><b>Reporter:</b> {report.reporterEmail}</p>
        <p><b>Status:</b> {report.status}</p>
        <p><b>Date:</b> {new Date(report.createdAt).toLocaleString()}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          onClick={(e) => handlerecipe(e, report.recipeId)}
          className="bg-red-500 text-white"
        >
          Remove Recipe
        </Button>

        <Button
        onClick={(e) => handlereport(e, report._id)}
          variant="secondary"
        >
          Dismiss Report
        </Button>
      </div>

    </Card>
        ))
                    }
                </div>
       
        
            )
        }
       
       
    </div>
  )
}

export default Reportpage 