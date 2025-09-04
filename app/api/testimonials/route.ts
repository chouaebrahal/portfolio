import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { appData, type Testimonial } from "@/lib/data"

const dataFilePath = path.join(process.cwd(), "data", "data.json")

// GET all testimonials
export async function GET() {
  try {
    return NextResponse.json({ testimonials: appData.testimonials })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

// POST new testimonial
export async function POST(request: NextRequest) {
  try {
    const newTestimonial = await request.json()

    // Read current data
    const fileContents = fs.readFileSync(dataFilePath, "utf8")
    const data = JSON.parse(fileContents)

    // Generate new ID
    const maxId = Math.max(...data.testimonials.map((t: Testimonial) => t.id), 0)
    const testimonialWithId = {
      ...newTestimonial,
      id: maxId + 1,
    }

    // Add new testimonial
    data.testimonials.push(testimonialWithId)

    // Write back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ testimonial: testimonialWithId })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
