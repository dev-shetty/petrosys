"use client"

import * as React from "react"

import Link from "next/link"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export function BranchSelect({ branches }) {
  const [branchId, setBranchId] = React.useState(null)
  console.log(branchId)
  return (
    <div className="flex flex-col gap-6">
      <Select onValueChange={(val) => setBranchId(val)}>
        <SelectTrigger className="w-96">
          <SelectValue
            placeholder="Select Branch"
            defaultValue={branches[0].name}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup defaultValue={branches[0].id}>
            {branches.map((branch) => (
              <SelectItem key={branch.id} value={branch.id}>
                {branch.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button className="w-fit mx-auto" asChild>
        <Link href={`/branch/${branchId}`}>Open Dashboard</Link>
      </Button>
    </div>
  )
}
