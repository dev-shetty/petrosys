"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LENGTH_OF_ID } from "../lib/constants"
import { generate_nanoId } from "../lib/utils"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

export default function NewPetrolBunkForm({ onSubmit }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const formSchema = z.object({
    name: z.string().min(3).max(50),
    address: z.string().min(5).max(100),
    owner_name: z.string().min(3).max(50),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      owner_name: "",
    },
  })

  async function handleSubmit(data) {
    setLoading(true)
    console.log(data)

    const id = generate_nanoId(LENGTH_OF_ID, "BRC")

    const branchData = {
      id: id,
      name: data.name,
      owner: data.owner_name,
      address: data.address,
    }

    try {
      const response = await fetch("/api/branch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(branchData),
      })
      const branch = await response.json()
      console.log(branch)
      router.refresh()
      router.push(`/branch/${id}`)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-3/4 flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter branch name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter branch address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner&apos;s Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter owner's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{loading ? "Submitting..." : "Submit"}</Button>
      </form>
    </Form>
  )
}
