import { getBranches } from "@/app/actions"
import { BranchSelect } from "@/components/branch-select"
import { H1 } from "@/components/ui/typography"
import Image from "next/image"

export default async function Home() {
  const branches = await getBranches()
  console.log(branches)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <H1>Petrol Bunk Management System</H1>
      <BranchSelect branches={branches} />
    </main>
  )
}
