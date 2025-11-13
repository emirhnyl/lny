import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    const projects = await prisma.project.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    const total = await prisma.project.count()

    return NextResponse.json({ projects, total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("Session user:", session.user)

    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      console.error("User not found in database:", session.user.id)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const data = await request.json()
    console.log("Creating project with authorId:", user.id)

    const projectData: any = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      category: data.category,
      tags: data.tags,
      status: data.status,
      featured: data.featured || false,
      glbModelUrl: data.glbModelUrl || null,
      thumbnailUrl: data.thumbnailUrl || null,
      images: data.images || "",
      // New fields
      problem: data.problem || null,
      solution: data.solution || null,
      results: data.results || null,
      challenges: data.challenges || null,
      duration: data.duration || null,
      technologies: data.technologies || null,
      testimonialContent: data.testimonialContent || null,
      testimonialAuthor: data.testimonialAuthor || null,
      testimonialRole: data.testimonialRole || null,
      testimonialCompany: data.testimonialCompany || null,
      demoUrl: data.demoUrl || null,
      githubUrl: data.githubUrl || null,
      authorId: user.id,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null
    }

    console.log("Project data:", projectData)

    const project = await prisma.project.create({
      data: projectData
    })

    console.log("Project created successfully:", project.id)

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "CREATE",
        entity: "Project",
        entityId: project.id,
        description: `Created project: ${project.title}`,
        userId: user.id
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Project creation error:", error)
    return NextResponse.json({ 
      error: "Internal Server Error", 
      message: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 })
  }
}
