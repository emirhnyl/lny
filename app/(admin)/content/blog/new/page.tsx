import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import BlogEditor from "@/components/admin/editors/BlogEditor"

export const metadata = {
  title: "Yeni Blog Yazısı - Admin Panel",
  description: "Yeni blog yazısı oluştur"
}

export default async function NewBlogPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect("/admin/login")
  }

  // Fetch categories for the editor
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Yeni Blog Yazısı
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Yeni bir blog yazısı oluşturun
        </p>
      </div>

      <BlogEditor categories={categories} />
    </div>
  )
}
