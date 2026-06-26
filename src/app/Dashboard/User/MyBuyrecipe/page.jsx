import { GetspecificrecipespaymentByuserEmail } from '@/lib/GetApiData/recipepayment'
import { GetUserInserver } from '@/lib/GetUser/Getuserinfo'
import { Button, Table } from '@heroui/react'
import Link from 'next/link'
import React from 'react'
import { MdPayments } from 'react-icons/md'

async function BuyingRecipePage () { 
    const User = await GetUserInserver()
    const email = User?.email
    const result = await GetspecificrecipespaymentByuserEmail(email);
    console.log(result)
  return (
     <section >
              <div  className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-11/12 mx-auto text-left">
                  <div>
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
          
                  {/* Stats */}
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-base-100 rounded-3xl shadow-xl border border-primary/20 p-5 min-w-[220px] hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-base-content/60">
                            Total Transactions
                          </p>
                          <h2 className="text-3xl font-bold text-primary mt-1">
                            {result.length}
                          </h2>
                        </div>
          
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <MdPayments size={30} className="text-primary" />
                        </div>
                      </div>
                    </div>
          
                   
                  </div>
                </div>
                {
                  result.length === 0 ? (
                    <div className='text-center my-10 '>
                      <p className='text-3xl font-bold '>No Recipe Found ! Please Add Recipe </p>
                      <Button variant='danger' className= 'p-4 my-4'>
                        <Link href={'/Recipes'}> 
                         Buy Recipe
                        </Link>
                       
                      </Button>
                    </div>
                  ) : (
                    <Table className='w-11/12 mx-auto m-5 p-5 text-left'>
          <Table.ScrollContainer>
            <Table.Content aria-label="Team members" className="min-w-[600px]">
              <Table.Header className= 'text-center '>
                <Table.Column isRowHeader> Recipe Name</Table.Column>
                <Table.Column>Category</Table.Column>
                <Table.Column>AuthorName </Table.Column>
                <Table.Column>Amount</Table.Column>
                <Table.Column>TransactionId</Table.Column>
                <Table.Column>paymentStatus</Table.Column>
              </Table.Header>
              <Table.Body>
               
                      { result.map( recipe => (
        
                         <Table.Row key={recipe._id} className='font-semibold '>
                  <Table.Cell>{recipe.recipeName}</Table.Cell>
                  <Table.Cell>{recipe.category}</Table.Cell>
                  <Table.Cell>{recipe.AuthorName}</Table.Cell>
                  <Table.Cell>{recipe.amount}</Table.Cell>
                  <Table.Cell>{recipe.transactionId}</Table.Cell>
                   <Table.Cell>
                      {recipe.paymentStatus}
                    </Table.Cell>
                </Table.Row>                ))
                  
                }
                   
                    
                
               
    
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
                  )
                }
            
    
        </section>
       
  )
}

export default BuyingRecipePage 