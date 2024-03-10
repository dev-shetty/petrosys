import Link from "next/link"
import { BranchSelect } from "../components/branch-select"
import { H1 } from "../components/ui/typography"
import { getBranches } from "./actions"

export default async function Home() {
  const branches = await getBranches()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <H1>Petrol Bunk Management System</H1>
      <BranchSelect branches={branches} />
      <Link href="/branch/new" className="underline underline-offset-2">
        Create a new branch
      </Link>
    </main>
  )
}
