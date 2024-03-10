import Link from "next/link"
import EmployeeForm from "../../../../../components/employee-template"
import { Button } from "../../../../../components/ui/button"
import { H1 } from "../../../../../components/ui/typography"
import { getBranchById } from "../../../../actions"

export default async function NewBranchPage({ params }) {
  const { branchId } = params
  const branch = await getBranchById(branchId)

  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-8 py-12">
      <Button className="absolute left-4 top-4 w-fit" asChild>
        <Link href={`/branch/${branchId}`}>Back</Link>
      </Button>
      <H1 className="border-b pb-2">New Employee for {branch.name}</H1>
      <EmployeeForm branchId={branchId} />
    </main>
  )
}
