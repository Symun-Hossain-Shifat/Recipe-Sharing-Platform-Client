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
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 pb-6 border-b border-zinc-800 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Transactions Management
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Monitor all premium subscription payments, recipe purchases, and revenue metrics.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-5 min-w-[200px] shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">
                  Total Transactions
                </p>
                <h2 className="text-3xl font-extrabold text-emerald-400 mt-1">
                  {Datas.length}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
                <MdPayments size={26} />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-5 min-w-[220px] shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">
                  Total Revenue
                </p>
                <h2 className="text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
                  ${(totalRevenue / 100).toFixed(2)}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-800/50 flex items-center justify-center text-amber-400">
                <HiCurrencyBangladeshi size={26} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {Datas.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-16 text-center max-w-lg mx-auto shadow-2xl">
          <MdPayments size={64} className="mx-auto text-zinc-600 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Transactions Found</h2>
          <p className="text-zinc-400 text-sm">Payment records will appear here once users purchase plans or recipes.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden">
          <Table className="w-full text-left text-sm text-zinc-300">
            <Table.ScrollContainer>
              <Table.Content aria-label="Transactions list" className="min-w-[650px]">
                <Table.Header className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                  <Table.Column isRowHeader className="py-3 px-4 text-white">User / Buyer Name</Table.Column>
                  <Table.Column className="py-3 px-4">Amount</Table.Column>
                  <Table.Column className="py-3 px-4">Date</Table.Column>
                  <Table.Column className="py-3 px-4">Payment Status</Table.Column>
                  <Table.Column className="py-3 px-4">Transaction ID</Table.Column>
                </Table.Header>
                <Table.Body>
                  {Datas.map((recipe) => (
                    <Table.Row key={recipe._id} className="border-b border-zinc-800/60 hover:bg-zinc-800/40 transition-colors font-medium">
                      <Table.Cell className="py-4 px-4 font-semibold text-white">{recipe.AuthorName || 'User'}</Table.Cell>
                      <Table.Cell className="py-4 px-4 font-mono text-emerald-400 font-bold">
                        ${recipe.amount ? (recipe.amount / 100).toFixed(2) : '0.00'}
                      </Table.Cell>
                      <Table.Cell className="py-4 px-4 text-zinc-400 text-xs font-mono">
                        {recipe.updatedAt ? new Date(recipe.updatedAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }) : "N/A"}
                      </Table.Cell>
                      <Table.Cell className="py-4 px-4">
                        <span className="bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                          {recipe.paymentStatus || 'Paid'}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="py-4 px-4 text-zinc-500 font-mono text-xs">{recipe.transactionId}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      )}
    </div>
  );
}

export default Homepage;