'use client'
import { DeleteRecipepage } from '@/app/Components/DeleteMyrecipe';
import { RecipeEditPage } from '@/app/Components/RecipeEdit';
import { Button, Table } from '@heroui/react'
import { redirect } from 'next/navigation';


import React from 'react'

import { MdOutlineRemoveRedEye } from 'react-icons/md';

function MYRecipespage ({Data}) { 
    
   
  return (
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
                Data.map( recipe => (
    
                     <Table.Row key={recipe._id} className='font-semibold '>
              <Table.Cell>{recipe.recipeName}</Table.Cell>
              <Table.Cell>{recipe.category}</Table.Cell>
              <Table.Cell>{recipe.status}</Table.Cell>
              <Table.Cell>{recipe.likesCount}</Table.Cell>
              <Table.Cell>{recipe.authorEmail}</Table.Cell>
               <Table.Cell>
                  <div className="flex items-center gap-1">
                    <RecipeEditPage></RecipeEditPage>
                    <DeleteRecipepage></DeleteRecipepage>
                    <Button onClick={()=> {redirect(`/Recipes/${recipe._id}`)}} isIconOnly size="sm" variant="tertiary">
                     <MdOutlineRemoveRedEye />
                    </Button>
                  </div>
                </Table.Cell>
            </Table.Row>                ))
                
            }
           

          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}

export default MYRecipespage 