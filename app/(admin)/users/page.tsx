import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Plus } from "lucide-react"
import UsersTable from "@/components/admin/tables/UsersTable"

export const metadata = {
  title: "Kullanıcılar - Admin Panel",
  description: "Kullanıcı yönetimi"
}

export default async function UsersPage() {
  const session = await getServerSession(authOptions)
  
  // Check if user has permission
  if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard")
  }

  // Fetch users
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          projects: true,
          blogPosts: true
        }
      }
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Kullanıcılar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Admin paneli kullanıcılarını yönetin
          </p>
        </div>
        <Link
          href="/users/new"
          className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-dark font-semibold rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Yeni Kullanıcı</span>
        </Link>
      </div>

      <UsersTable users={users} currentUser={session.user} />
    </div>
  )
}
