import { NextResponse } from "next/server"
import { createInvoice } from "../../actions"

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
