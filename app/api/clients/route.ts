import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { appData } from "@/lib/data"

const dataFilePath = path.join(process.cwd(), "data", "data.json")

// GET all clients
export async function GET() {
  try {
    return NextResponse.json({ clients: appData.clients })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 })
  }
}

// POST new client
export async function POST(request: NextRequest) {
  try {
    const newClient = await request.json()

    // Read current data
    const fileContents = fs.readFileSync(dataFilePath, "utf8")
    const data = JSON.parse(fileContents)

    // Add new client
    data.clients.push(newClient)

    // Write back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ client: newClient })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 })
  }
}
