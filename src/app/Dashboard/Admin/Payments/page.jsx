import { GetallPayments } from "@/lib/GetApiData/Payment";
import React from "react";

import { MdPayments } from "react-icons/md";
import { HiCurrencyBangladeshi } from "react-icons/hi";
import { Table } from "@heroui/react";
import { Getrecipespayment } from "@/lib/GetApiData/recipepayment";

async function Homepage() { 
  const result = (await GetallPayments()) || []; 
  const result2 = (await Getrecipespayment()) || [] ;
  const Datas = [...result , ...result2]

  const totalRevenue = Datas.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold  from-primary to-secondary bg-clip-text ">
            Transactions Management
          </h1>
          <p className="text-base-content/60 mt-2">
            Monitor all premium subscription payments and revenue.
          </p>
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
                  {Datas.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MdPayments size={30} className="text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-3xl shadow-xl border border-success/20 p-5 min-w-[220px] hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/60">
                  Total Revenue
                </p>
                <h2 className="text-3xl font-bold text-success mt-1">
                  ৳ {totalRevenue.toLocaleString("en-BD")}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center">
                <HiCurrencyBangladeshi
                  size={30}
                  className="text-success"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {Datas.length === 0 ? (
        <div className="bg-base-100 rounded-3xl shadow-xl border border-dashed border-primary/30 p-16 text-center">
          <MdPayments
            size={80}
            className="mx-auto text-primary opacity-30"
          />

          <h2 className="text-2xl font-bold mt-5">
            No Transactions Found
          </h2>

          <p className="text-base-content/60 mt-2">
            Payment history will appear here once users subscribe.
          </p>
        </div>
      ) : (
        <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">
          <div className="overflow-x-auto">
            <Table className='w-11/12 mx-auto m-5 p-5 text-left'>
                      <Table.ScrollContainer>
                        <Table.Content aria-label="Team members" className="min-w-[600px]">
                          <Table.Header className= 'text-center '>
                            <Table.Column isRowHeader>User Name </Table.Column>
                            <Table.Column>Amount</Table.Column>
                            <Table.Column>Date</Table.Column>
                            <Table.Column>Payment Status</Table.Column>
                            <Table.Column>Transaction ID</Table.Column>
                            </Table.Header>
                          <Table.Body>
                            {
                                Datas.map( recipe => (
                    
                              <Table.Row key={recipe._id} className='font-semibold '>
                              <Table.Cell>{recipe.AuthorName}</Table.Cell>
                              <Table.Cell>{recipe.amount}</Table.Cell>
                              <Table.Cell>
                                 {recipe.updatedAt ? (
                                  <span className="font-medium">
                                    {new Date(
                                      recipe.updatedAt
                                    ).toLocaleDateString("en-GB", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </span>
                                ) : (
                                  "N/A"
                                )}
                              </Table.Cell>
                              <Table.Cell>{recipe.paymentStatus}</Table.Cell>
                              <Table.Cell>{recipe.transactionId}</Table.Cell>
                              
                            </Table.Row>                ))
                                
                            }
                           
                
                          </Table.Body>
                        </Table.Content>
                      </Table.ScrollContainer>
                    </Table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;