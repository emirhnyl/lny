import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import BlogEditor from "@/components/admin/editors/BlogEditor"

export const metadata = {
  title: "Blog Düzenle - Admin Panel",
  description: "Blog yazısını düzenle"
}

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  const { id } = await params
  
  if (!session?.user) {
    redirect("/admin/login")
  }

  const [post, categories] = await Promise.all([
    prisma.blogPost.findUnique({
      where: { id },
      include: {
        category: true,
        author: {
          select: { name: true, email: true }
        }
      }
    }),
    prisma.blogCategory.findMany({
      orderBy: { name: 'asc' }
    })
  ])

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Blog Düzenle
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {post.title}
        </p>
      </div>

      <BlogEditor post={post} categories={categories} />
    </div>
  )
}
