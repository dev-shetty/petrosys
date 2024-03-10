import { NextResponse } from "next/server"
import { createNewBranch } from "../../actions"

export async function POST(req) {
  const body = await req.json()

  try {
    const branch = await createNewBranch(body)

    console.log({ branch })

    if (branch) {
      return NextResponse.json({ success: true, branch })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error })
  }
}
