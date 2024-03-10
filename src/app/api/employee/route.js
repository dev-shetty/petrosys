import { NextResponse } from "next/server"
import { createNewEmployee } from "../../actions"

export async function POST(req) {
  const body = await req.json()

  try {
    const employee = await createNewEmployee(body)

    console.log({ employee })

    if (employee) {
      return NextResponse.json({ success: true, employee })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error })
  }
}
