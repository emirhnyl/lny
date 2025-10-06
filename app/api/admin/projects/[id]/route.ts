import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()

    const updateData: any = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      category: data.category,
      tags: data.tags,
      status: data.status,
      featured: data.featured,
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
      publishedAt: data.status === "PUBLISHED" && !data.publishedAt ? new Date() : data.publishedAt
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "UPDATE",
        entity: "Project",
        entityId: project.id,
        description: `Updated project: ${project.title}`,
        userId: session.user.id
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Project update error:", error)
    return NextResponse.json({ 
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const project = await prisma.project.delete({
      where: { id }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "DELETE",
        entity: "Project",
        entityId: project.id,
        description: `Deleted project: ${project.title}`,
        userId: session.user.id
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
