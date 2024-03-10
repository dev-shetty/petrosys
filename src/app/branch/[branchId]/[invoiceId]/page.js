import InvoiceTemplate from "../../../../components/Invoice-template"
import { H1 } from "../../../../components/ui/typography"
import { getBranchById } from "../../../actions"

export default async function InvoicePage({ params }) {
  const { branchId, invoiceId } = params
  const branch = await getBranchById(branchId)

  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-8 py-12">
      <H1 className="border-b pb-2">
        Invoice {invoiceId} for {branch.name}
      </H1>
      <InvoiceTemplate branchId={branchId} invoiceId={invoiceId} />
    </main>
  )
}
