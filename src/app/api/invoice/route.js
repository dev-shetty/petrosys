import { createInvoice } from "@/app/actions"
import { NextResponse } from "next/server"

export async function POST(req) {
  const body = await req.json()
  console.log(body)

  try {
    const invoice = await createInvoice(body)

    if (invoice) {
      return NextResponse.json({ success: true, invoice })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error })
  }
}
