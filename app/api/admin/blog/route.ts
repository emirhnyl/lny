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

    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        },
        category: true
      }
    })

    return NextResponse.json(posts)
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

    const data = await request.json()

    const post = await prisma.blogPost.create({
      data: {
        ...data,
        authorId: session.user.id,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null
      }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "CREATE",
        entity: "BlogPost",
        entityId: post.id,
        description: `Created blog post: ${post.title}`,
        userId: session.user.id
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
