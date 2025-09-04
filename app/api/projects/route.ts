import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { appData, type Project } from "@/lib/data"

const dataFilePath = path.join(process.cwd(), "data", "data.json")

// GET all projects
export async function GET() {
  try {
    return NextResponse.json({ projects: appData.projects })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

// POST new project
export async function POST(request: NextRequest) {
  try {
    const newProject = await request.json()

    // Read current data
    const fileContents = fs.readFileSync(dataFilePath, "utf8")
    const data = JSON.parse(fileContents)

    // Generate new ID
    const maxId = Math.max(...data.projects.map((p: Project) => p.id), 0)
    const projectWithId = {
      ...newProject,
      id: maxId + 1,
      slug: newProject.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
    }

    // Add new project
    data.projects.push(projectWithId)

    // Write back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ project: projectWithId })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
