'use client'

import { DeleteRecipepage } from '@/app/Components/DeleteMyrecipe';
import { RecipeEditPage } from '@/app/Components/RecipeEdit';
import { EditRecipeInfo } from '@/lib/EditData/editRecipe';
import { Postfeatures } from '@/lib/PostData/featured';

import { Button, Table } from '@heroui/react';
import { useRouter } from 'next/navigation';




import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { GrCheckboxSelected } from 'react-icons/gr';
import { MdOutlineFeaturedVideo, MdOutlineRemoveRedEye } from 'react-icons/md';

function Recipesmanagepage ({  User , Datas }) { 
 const [featuredIds, setFeaturedIds] = useState([]);
 const router = useRouter()



 const PostFeatured = async (recipe) => {
  try {
   
    if (featuredIds.includes(recipe._id)) {
      toast("Recipe is already featured.");
      return;
    }

    const featuredResult = await Postfeatures(recipe);

    if (!featuredResult) {
      toast.error("Failed to add recipe to featured.");
      return;
    }

   
    const updatedRecipe = {
      ...recipe,
      isFeatured: true,
    };

    const updateResult = await EditRecipeInfo(
      updatedRecipe,
      recipe._id
    );

    if (updateResult) {
      setFeaturedIds((prev) => [...prev, recipe._id]);
      router.refresh()
      toast.success("Recipe added to Featured successfully.");
    } else {
      toast.error("Recipe added, but update failed.");
    }

    console.log(featuredResult, updateResult);
  } catch (error) {
    console.error("PostFeatured Error:", error);
    toast.error("Something went wrong.");
  }
};


  return (
    <section className="p-6 bg-black text-white min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-6xl mx-auto pb-6 border-b border-zinc-800">
        <img
          src={User?.image || "/default-avatar.png"}
          alt="User Image" 
          className="object-cover rounded-2xl w-16 h-16 border-2 border-zinc-800 shrink-0"
        />
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Manage All Recipes</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Welcome back, <span className="text-white font-medium">{User?.name}</span>! Review, feature, edit, or remove platform recipes.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden">
        <Table className="w-full text-left text-sm text-zinc-300">
          <Table.ScrollContainer>
            <Table.Content aria-label="Manage recipes list" className="min-w-[650px]">
              <Table.Header className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                <Table.Column isRowHeader className="py-3 px-4 text-white">Recipe Name</Table.Column>
                <Table.Column className="py-3 px-4">Category</Table.Column>
                <Table.Column className="py-3 px-4">Status</Table.Column>
                <Table.Column className="py-3 px-4">Likes</Table.Column>
                <Table.Column className="py-3 px-4">Author Email</Table.Column>
                <Table.Column className="py-3 px-4">Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {Datas.map((recipe) => (
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
                        {recipe.isFeatured === true ? (
                          <Button
                            isIconOnly
                            size="sm"
                            variant="tertiary"
                            className="text-amber-400 bg-amber-950/70 border border-amber-800/60 hover:bg-amber-900"
                            title="Featured Dish"
                          >
                            <GrCheckboxSelected size={16} />
                          </Button>
                        ) : (
                          <Button
                            onClick={() => PostFeatured(recipe)}
                            isIconOnly
                            size="sm"
                            variant="tertiary"
                            className="text-zinc-400 hover:text-amber-400 hover:bg-zinc-800"
                            title="Feature this Recipe"
                          >
                            <MdOutlineFeaturedVideo size={16} />
                          </Button>
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </section>
  );
}

export default Recipesmanagepage 