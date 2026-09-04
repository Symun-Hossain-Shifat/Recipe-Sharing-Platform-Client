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
    <div className="p-6 bg-black min-h-screen text-white">
      {Datas.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-lg mx-auto shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-2">
            No Reports Found 🛡️
          </h2>
          <p className="text-zinc-400 text-sm">
            All recipe reports have been resolved or dismissed. Great job keeping RecipeHub safe!
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="pb-6 border-b border-zinc-800">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Recipe Reports ({Datas.length})</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Review flagged content reported by community members and take moderation actions.
            </p>
          </div>

          <div className="space-y-6">
            {Datas.map((report) => (
              <Card key={report._id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl text-white space-y-4">

                {/* Report Reason */}
                <div>
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-base mb-1">
                    <span>⚠️ Report Reason</span>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                    "{report.reason}"
                  </p>
                </div>

                {/* Info Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-400 pt-2">
                  <div>
                    <span className="text-zinc-500 font-medium">Recipe ID: </span>
                    <span className="font-mono text-zinc-300">{report.recipeId}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-medium">Reporter: </span>
                    <span className="text-zinc-300">{report.reporterEmail}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-medium">Status: </span>
                    <span className="font-semibold text-amber-400">{report.status || 'Flagged'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-medium">Reported Date: </span>
                    <span className="font-mono text-zinc-300">{new Date(report.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-3 border-t border-zinc-800">
                  <Button
                    onClick={(e) => handlerecipe(e, report.recipeId)}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-md"
                  >
                    Remove Recipe
                  </Button>

                  <Button
                    onClick={(e) => handlereport(e, report._id)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-medium text-xs px-5 py-2.5 rounded-xl transition-colors"
                  >
                    Dismiss Report
                  </Button>
                </div>

              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Reportpage 