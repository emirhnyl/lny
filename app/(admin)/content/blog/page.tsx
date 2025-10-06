import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus } from "lucide-react"
import BlogTable from "@/components/admin/tables/BlogTable"

export const metadata = {
  title: "Blog - Admin Panel",
  description: "Blog yönetimi"
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; category?: string; status?: string }>
}) {
  const session = await getServerSession(authOptions)
  const params = await searchParams
  const page = parseInt(params.page || "1")
  const limit = 10
  const search = params.search || ""
  const category = params.category
  const status = params.status

  // Build where clause
  const where: any = {}
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ]
  }
  
  if (category) where.categoryId = category
  if (status) where.status = status

  // Fetch blog posts
  const [posts, total, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        },
        category: true
      }
    }),
    prisma.blogPost.count({ where }),
    prisma.blogCategory.findMany()
  ])

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Blog Yazıları
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Toplam {total} yazı
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/content/blog/categories"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
          >
            Kategoriler
          </Link>
          <Link
            href="/content/blog/new"
            className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-dark font-semibold rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Yeni Yazı</span>
          </Link>
        </div>
      </div>

      <BlogTable posts={posts} categories={categories} totalPages={totalPages} currentPage={page} />
    </div>
  )
}
