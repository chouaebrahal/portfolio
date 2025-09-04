import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { appData } from "@/lib/data"

const dataFilePath = path.join(process.cwd(), "data", "data.json")

// GET personal information
export async function GET() {
  try {
    return NextResponse.json({ personalInfo: appData.personalInfo })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch personal info" }, { status: 500 })
  }
}

// PUT update personal information
export async function PUT(request: NextRequest) {
  try {
    const updatedPersonalInfo = await request.json()

    // Read current data
    const fileContents = fs.readFileSync(dataFilePath, "utf8")
    const data = JSON.parse(fileContents)

    // Update personal info
    data.personalInfo = { ...data.personalInfo, ...updatedPersonalInfo }

    // Write back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ personalInfo: data.personalInfo })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update personal info" }, { status: 500 })
  }
}
