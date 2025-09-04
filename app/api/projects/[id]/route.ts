import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { Project } from "@/lib/data"

const dataFilePath = path.join(process.cwd(), "data", "data.json")

// GET single project
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const fileContents = fs.readFileSync(dataFilePath, "utf8")
    const data = JSON.parse(fileContents)

    const project = data.projects.find((p: Project) => p.id === Number.parseInt(params.id))

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ project })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

// PUT update project
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updatedProject = await request.json()

    // Read current data
    const fileContents = fs.readFileSync(dataFilePath, "utf8")
    const data = JSON.parse(fileContents)

    // Find and update project
    const projectIndex = data.projects.findIndex((p: Project) => p.id === Number.parseInt(params.id))

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Update project while preserving ID
    data.projects[projectIndex] = {
      ...updatedProject,
      id: Number.parseInt(params.id),
      slug: updatedProject.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
    }

    // Write back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ project: data.projects[projectIndex] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE project
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Read current data
    const fileContents = fs.readFileSync(dataFilePath, "utf8")
    const data = JSON.parse(fileContents)

    // Find project
    const projectIndex = data.projects.findIndex((p: Project) => p.id === Number.parseInt(params.id))

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Remove project
    const deletedProject = data.projects.splice(projectIndex, 1)[0]

    // Write back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ project: deletedProject })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
