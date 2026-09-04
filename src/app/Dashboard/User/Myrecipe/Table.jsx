'use client'
import { DeleteRecipepage } from '@/app/Components/DeleteMyrecipe';
import { RecipeEditPage } from '@/app/Components/RecipeEdit';
import { Button, Table } from '@heroui/react'
import Link from 'next/link';
import { redirect } from 'next/navigation';


import React from 'react'

import { MdOutlineRemoveRedEye } from 'react-icons/md';

function MYRecipespage ({Data , User}) { 
  return (
    <section className="p-6 bg-black text-white min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-6xl mx-auto pb-6 border-b border-zinc-800">
        <img
          src={User?.image || "/default-avatar.png"}
          alt="User Image" 
          className="object-cover rounded-2xl w-16 h-16 border-2 border-zinc-800 shrink-0"
        />
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Manage My Recipes</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Welcome back, <span className="text-white font-medium">{User?.name}</span>! Overview and manage all recipes you've created.
          </p>
        </div>
      </div>

      {Data.length === 0 ? (
        <div className="text-center my-12 py-16 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-lg mx-auto shadow-2xl">
          <p className="text-2xl font-bold text-white mb-2">No Recipes Found 🍲</p>
          <p className="text-zinc-400 text-sm mb-6">You haven't created any recipes yet. Start sharing with the community!</p>
          <Link href="/Dashboard/User/addrecipe"> 
            <Button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl shadow-lg transition-colors">
              Add Your First Recipe
            </Button>
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden">
          <Table className="w-full text-left text-sm text-zinc-300">
            <Table.ScrollContainer>
              <Table.Content aria-label="My recipes list" className="min-w-[650px]">
                <Table.Header className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                  <Table.Column isRowHeader className="py-3 px-4 text-white">Recipe Name</Table.Column>
                  <Table.Column className="py-3 px-4">Category</Table.Column>
                  <Table.Column className="py-3 px-4">Status</Table.Column>
                  <Table.Column className="py-3 px-4">Likes</Table.Column>
                  <Table.Column className="py-3 px-4">Email</Table.Column>
                  <Table.Column className="py-3 px-4">Actions</Table.Column>
                </Table.Header>
                <Table.Body>
                  {Data.map((recipe) => (
                    <Table.Row key={recipe._id} className="border-b border-zinc-800/60 hover:bg-zinc-800/40 transition-colors font-medium">
                      <Table.Cell className="py-4 px-4 font-semibold text-white">{recipe.recipeName}</Table.Cell>
                      <Table.Cell className="py-4 px-4">
                        <span className="bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 px-2.5 py-1 rounded-lg text-xs">
                          {recipe.category}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="py-4 px-4">
                        <span className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-2.5 py-1 rounded-lg text-xs">
                          {recipe.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="py-4 px-4 font-mono text-emerald-400">{recipe.likesCount || 0}</Table.Cell>
                      <Table.Cell className="py-4 px-4 text-zinc-400 text-xs">{recipe.authorEmail}</Table.Cell>
                      <Table.Cell className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <RecipeEditPage recipe={recipe} User={User} />
                          <DeleteRecipepage recipe={recipe} />
                          <Button onClick={() => redirect(`/Recipes/${recipe._id}`)} isIconOnly size="sm" variant="tertiary" className="text-zinc-300 hover:text-white hover:bg-zinc-800">
                            <MdOutlineRemoveRedEye size={18} />
                          </Button>
                        </div>
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

export default MYRecipespage 