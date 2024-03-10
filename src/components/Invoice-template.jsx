"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FUEL_TYPES, PAYMENT_METHODS } from "../lib/constants"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export default function InvoiceTemplate({ branchId, invoiceId }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const invoiceSchema = z.object({
    customer_phone: z.string().length(10),
    method: z.enum(PAYMENT_METHODS.map((method) => method.toLowerCase())),
    fuel_type: z.enum(FUEL_TYPES.map((type) => type.name.toLowerCase())),
    fuel_price: z.number(),
  })

  const form = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customer_phone: "",
      method: "cash",
      fuel_price: FUEL_TYPES[0].price,
      fuel_type: "petrol",
    },
  })

  async function submitInvoice(data) {
    setLoading(true)
    const invoiceData = {
      id: invoiceId,
      branch_id: branchId,
      customer_phone: data.customer_phone,
      quantity: Number(fuelQuantity),
      fuel_type: data.fuel_type,
      fuel_price: data.fuel_price,
      total: totalAmount,
      method: data.method,
    }

    try {
      const response = await fetch("/api/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      })
      const invoice = await response.json()
      console.log(invoice)
      router.refresh()
      router.push(`/branch/${branchId}`)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fuelType = form.watch("fuel_type")
  const fuelPrice = FUEL_TYPES.find(
    (type) => type.name.toLowerCase() === fuelType
  )?.price
  const totalAmount = form.watch("total")
  const fuelQuantity =
    (totalAmount / fuelPrice).toFixed(2) === "NaN"
      ? 0
      : (totalAmount / fuelPrice).toFixed(2)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitInvoice)}
        className="w-3/4 flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="customer_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone no." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fuel_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fuel Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-96">
                  <SelectValue placeholder="Select Fuel Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FUEL_TYPES.map((type) => (
                      <SelectItem
                        key={type.name}
                        value={type.name.toLowerCase()}
                      >
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fuel_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fuel Price (&#8377;)</FormLabel>
              <FormControl readonly>
                <Input
                  placeholder="Fuel Price"
                  {...field}
                  defaultValue={fuelPrice}
                  readOnly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Amount (&#8377;)</FormLabel>
              <FormControl>
                <Input placeholder="Rs. 500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fuel Quantity (L)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Fuel Quantity"
                  {...field}
                  defaultValue={fuelQuantity}
                  readOnly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-96">
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {PAYMENT_METHODS.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {loading ? "Processing..." : "Process Billing"}
        </Button>
      </form>
    </Form>
  )
}
