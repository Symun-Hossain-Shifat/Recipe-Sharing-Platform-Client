'use client'

import { DeleteRecipepage } from '@/app/Components/DeleteMyrecipe';
import { RecipeEditPage } from '@/app/Components/RecipeEdit';
import { EditRecipeInfo } from '@/lib/EditData/editRecipe';
import { Postfeatures } from '@/lib/PostData/featured';

import { Button, Table } from '@heroui/react';

import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { GrCheckboxSelected } from 'react-icons/gr';
import { MdOutlineFeaturedVideo, MdOutlineRemoveRedEye } from 'react-icons/md';

function Recipesmanagepage ({  User , Datas }) { 
 const [featuredIds, setFeaturedIds] = useState([]);
 



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
     <section >
           <div className="flex flex-col md:flex-row md:items-center  gap-4 w-11/12 mx-auto text-left">
                 
                    <div>
                       <img
                  src={User?.image || "/default-avatar.png"}
                  alt="User Image" 
                  
                  className='object-cover rounded-full w-20 
                  h-20 '
                 
                />
    
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold">Manage My Recipes</h1>
                    <p className="text-default-500">
                      Welcome back {User?.name} ! Here's a quick summary of your activity.
                    </p>
    
                    </div>
                    
                
          
                  
                </div>
            <Table className='w-11/12 mx-auto m-5 p-5 text-left'>
          <Table.ScrollContainer>
            <Table.Content aria-label="Team members" className="min-w-[600px]">
              <Table.Header className= 'text-center '>
                <Table.Column isRowHeader> Recipe Name</Table.Column>
                <Table.Column>Category</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column>Likes</Table.Column>
                <Table.Column>Email</Table.Column>
                <Table.Column>Action</Table.Column>
              </Table.Header>
              <Table.Body>
                {
                    Datas.map( recipe => (
        
                         <Table.Row key={recipe._id} className='font-semibold '>
                  <Table.Cell>{recipe.recipeName}</Table.Cell>
                  <Table.Cell>{recipe.category}</Table.Cell>
                  <Table.Cell>{recipe.status}</Table.Cell>
                  <Table.Cell>{recipe.likesCount}</Table.Cell>
                  <Table.Cell>{recipe.authorEmail}</Table.Cell>
                   <Table.Cell>
                      <div className="flex items-center gap-1">
                        <RecipeEditPage recipe={recipe} User={User}></RecipeEditPage>
                        <DeleteRecipepage recipe={recipe} ></DeleteRecipepage>
                       {
                        recipe.isFeatured === true ? (<Button
                           
                            isIconOnly
                            size="sm"
                            variant="tertiary"
                          >
                            <GrCheckboxSelected />
                          </Button>) : (
                          <Button
                            onClick={() => PostFeatured(recipe)}
                            isIconOnly
                            size="sm"
                            variant="tertiary"
                          >
                            <MdOutlineFeaturedVideo />
                          </Button>
                        )
                      }
                      </div>
                    </Table.Cell>
                </Table.Row>                ))
                    
                }
               
    
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
    
        </section>
       
  )
}

export default Recipesmanagepage 