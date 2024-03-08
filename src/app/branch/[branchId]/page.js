import {
  getBranchById,
  getEmployeesByBranch,
  getInvoicesByBranch,
  getSalesByBranch,
} from "@/app/actions"
import { Button } from "@/components/ui/button"
import { H1, H2 } from "@/components/ui/typography"
import { LENGTH_OF_ID } from "@/lib/constants"
import { generate_nanoId } from "@/lib/utils"
import Link from "next/link"

export default async function BranchPage({ params }) {
  const { branchId } = params

  const branch = await getBranchById(branchId)
  const employees = await getEmployeesByBranch(branchId)
  const invoices = await getInvoicesByBranch(branchId)
  const sales = await getSalesByBranch(branchId)

  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-8 py-12">
      <div className="flex flex-col gap-2 w-full border-b pb-2">
        <H1>{branch.name} Dashboard</H1>
        <div className="flex justify-between text-xl">
          <div className="flex gap-2">
            <p>{branch.owner} | </p>
            <p>{branch.address}</p>
          </div>
          <Button asChild>
            <Link
              href={`/branch/${branchId}/${generate_nanoId(
                LENGTH_OF_ID,
                "INV"
              )}`}
            >
              Create a new Invoice
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <H2>Employees</H2>
        <div className="grid grid-cols-3">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="flex flex-col border p-2 rounded-md"
            >
              <div className="flex justify-between">
                <p>{employee.name}</p>
                <p>Phone: {employee.phone}</p>
              </div>
              <p>Salary: &#8377;{employee.salary}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <H2>Sales</H2>
        <div className="grid grid-cols-4">
          {sales.map((sale) => (
            <div key={sale.id} className="flex flex-col border p-2 rounded-md">
              <div>
                <p className="font-bold">Sale: {sale.id}</p>
                <p>Date: {new Date(sale.date).toDateString()}</p>
              </div>
              <p className="border-t pt-2 mt-2">
                Total Sales:{" "}
                <span className="font-bold">&#8377;{sale.total_sales}</span>
              </p>
              <p className="border-t pt-2 mt-2">
                Total Stock Sold:{" "}
                <span className="font-bold">{sale.total_stock}L</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <H2>Invoices</H2>
        <div className="grid grid-cols-2">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex flex-col border p-2 rounded-md"
            >
              <p className="font-bold text-center">Invoice: {invoice.id}</p>
              <p>Date: {new Date(invoice.date).toDateString()}</p>
              <div className="flex gap-16">
                <p>Fuel: {invoice.fuel_type}</p>
                <p>Quantity: {invoice.quantity}L</p>
              </div>
              <p className="border-t pt-2 mt-2">
                Total: <span className="font-bold">&#8377;{invoice.total}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
