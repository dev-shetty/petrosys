import Link from "next/link"
import NewPetrolBunkForm from "../../../components/branch-template"
import { Button } from "../../../components/ui/button"
import { H1 } from "../../../components/ui/typography"

export default async function NewBranchPage({ params }) {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-8 py-12">
      <Button className="absolute left-4 top-4 w-fit" asChild>
        <Link href="/">Back</Link>
      </Button>
      <H1 className="border-b pb-2">Create a new Petrol Bunk Branch</H1>
      <NewPetrolBunkForm />
    </main>
  )
}
