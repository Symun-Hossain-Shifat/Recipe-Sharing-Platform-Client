import { GetspecificrecipesByuserEmail } from '@/lib/GetApiData/recipe'
import { GetUserInserver } from '@/lib/GetUser/Getuserinfo'
import { Table } from '@heroui/react'
import React from 'react'

async function MYRecipespage () { 
    const User = await GetUserInserver()
    const email =  User?.email || null 
    const Data = await GetspecificrecipesByuserEmail(email) 
    console.log(Data)
  return (
     <Table className='w-11/12 mx-auto m-5 p-5'>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>Name</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Email</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Kate Moore</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>kate@acme.com</Table.Cell>
            </Table.Row>

          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}

export default MYRecipespage 