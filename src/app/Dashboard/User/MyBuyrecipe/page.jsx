import { GetspecificrecipespaymentByuserEmail } from '@/lib/GetApiData/recipepayment'
import { GetUserInserver } from '@/lib/GetUser/Getuserinfo'
import { Button, Table } from '@heroui/react'
import Link from 'next/link'
import React from 'react'
import { MdPayments } from 'react-icons/md'

async function BuyingRecipePage () { 
    const User = await GetUserInserver()
    const email = User?.email
    const result = (await GetspecificrecipespaymentByuserEmail(email)) || [];
  return (
    <section className="p-6 bg-black text-white min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-800 max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <img
            src={User?.image || "/default-avatar.png"}
            alt="User Image" 
            className="object-cover rounded-2xl w-16 h-16 border-2 border-zinc-800 shrink-0"
          />
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Purchased Recipes</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Welcome back, <span className="text-white font-medium">{User?.name}</span>! Access all premium recipes you have unlocked.
            </p>
          </div>
        </div>

        {/* Stats Card */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 min-w-[200px] shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">
                  Total Transactions
                </p>
                <h2 className="text-3xl font-extrabold text-emerald-400 mt-1">
                  {result.length}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
                <MdPayments size={26} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {result.length === 0 ? (
        <div className="text-center my-12 py-16 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-lg mx-auto shadow-2xl">
          <p className="text-2xl font-bold text-white mb-2">No Purchased Recipes 🛒</p>
          <p className="text-zinc-400 text-sm mb-6">You haven't unlocked any premium recipes yet. Explore our top dishes!</p>
          <Link href="/Recipes"> 
            <Button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl shadow-lg transition-colors">
              Browse Recipes
            </Button>
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden">
          <Table className="w-full text-left text-sm text-zinc-300">
            <Table.ScrollContainer>
              <Table.Content aria-label="Purchased recipes list" className="min-w-[650px]">
                <Table.Header className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                  <Table.Column isRowHeader className="py-3 px-4 text-white">Recipe Name</Table.Column>
                  <Table.Column className="py-3 px-4">Category</Table.Column>
                  <Table.Column className="py-3 px-4">Author</Table.Column>
                  <Table.Column className="py-3 px-4">Amount</Table.Column>
                  <Table.Column className="py-3 px-4">Transaction ID</Table.Column>
                  <Table.Column className="py-3 px-4">Status</Table.Column>
                </Table.Header>
                <Table.Body>
                  {result.map((recipe) => (
                    <Table.Row key={recipe._id} className="border-b border-zinc-800/60 hover:bg-zinc-800/40 transition-colors font-medium">
                      <Table.Cell className="py-4 px-4 font-semibold text-white">{recipe.recipeName}</Table.Cell>
                      <Table.Cell className="py-4 px-4">
                        <span className="bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 px-2.5 py-1 rounded-lg text-xs">
                          {recipe.category || 'Recipe'}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="py-4 px-4 text-zinc-300">{recipe.AuthorName}</Table.Cell>
                      <Table.Cell className="py-4 px-4 font-mono text-emerald-400 font-bold">
                        ${recipe.amount ? (recipe.amount / 100).toFixed(2) : '0.00'}
                      </Table.Cell>
                      <Table.Cell className="py-4 px-4 text-zinc-500 font-mono text-xs">{recipe.transactionId}</Table.Cell>
                      <Table.Cell className="py-4 px-4">
                        <span className="bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                          {recipe.paymentStatus || 'Paid'}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      )}
    </section>
  );
}

export default BuyingRecipePage 