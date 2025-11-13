import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

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

    // Get old post for slug comparison
    const oldPost = await prisma.blogPost.findUnique({
      where: { id },
      select: { slug: true }
    })

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        publishedAt: data.status === "PUBLISHED" && !data.publishedAt ? new Date() : data.publishedAt
      }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "UPDATE",
        entity: "BlogPost",
        entityId: post.id,
        description: `Updated blog post: ${post.title}`,
        userId: session.user.id
      }
    })

    // Revalidate blog pages
    revalidatePath('/blog')
    revalidatePath(`/blog/${post.slug}`)
    
    // If slug changed, revalidate old slug too
    if (oldPost && oldPost.slug !== post.slug) {
      revalidatePath(`/blog/${oldPost.slug}`)
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
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

    const post = await prisma.blogPost.delete({
      where: { id }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "DELETE",
        entity: "BlogPost",
        entityId: post.id,
        description: `Deleted blog post: ${post.title}`,
        userId: session.user.id
      }
    })

    // Revalidate blog pages
    revalidatePath('/blog')
    revalidatePath(`/blog/${post.slug}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
