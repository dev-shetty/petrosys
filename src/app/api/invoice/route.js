import { createInvoice } from "@/app/actions"
import { NextResponse } from "next/server"

export async function POST(req) {
  const body = await req.json()
  console.log(body)

  const invoice = await createInvoice(body)

  return NextResponse.json({ invoice })
}
