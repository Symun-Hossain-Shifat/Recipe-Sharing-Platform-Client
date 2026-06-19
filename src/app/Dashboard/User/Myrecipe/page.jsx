import { GetspecificrecipesByuserEmail } from '@/lib/GetApiData/recipe'
import { GetUserInserver } from '@/lib/GetUser/Getuserinfo'
import { Button, Table } from '@heroui/react'


import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

async function MYRecipespage () { 
    const User = await GetUserInserver()
    const email =  User?.email || null 
    const Data = await GetspecificrecipesByuserEmail(email) 
    // console.log(Data)
  return (
     <Table className='w-11/12 mx-auto m-5 p-5 text-center'>
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
                    <Button isIconOnly size="sm" variant="tertiary">
                    <FaEdit size={30} />  
                    </Button>
                    <Button isIconOnly size="sm" variant="tertiary">
                        <AiOutlineDelete />
                    </Button>
                    <Button isIconOnly size="sm" variant="tertiary">
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