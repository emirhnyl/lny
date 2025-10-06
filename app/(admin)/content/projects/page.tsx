import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus } from "lucide-react"
import ProjectsTable from "@/components/admin/tables/ProjectsTable"

export const metadata = {
  title: "Projeler - Admin Panel",
  description: "Proje yönetimi"
}

export default async function ProjectsPage({
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
      { description: { contains: search, mode: "insensitive" } },
    ]
  }
  
  if (category) where.category = category
  if (status) where.status = status

  // Fetch projects
  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    }),
    prisma.project.count({ where })
  ])

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Projeler
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Toplam {total} proje
          </p>
        </div>
        <Link
          href="/content/projects/new"
          className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-dark font-semibold rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Yeni Proje</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Ara..."
            defaultValue={search}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          />
          <select
            defaultValue={category || ""}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          >
            <option value="">Tüm Kategoriler</option>
            <option value="Mekanik Tasarım">Mekanik Tasarım</option>
            <option value="CFD Analiz">CFD Analiz</option>
            <option value="Yazılım">Yazılım</option>
          </select>
          <select
            defaultValue={status || ""}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
          >
            <option value="">Tüm Durumlar</option>
            <option value="COMPLETED">Tamamlandı</option>
            <option value="IN_PROGRESS">Devam Ediyor</option>
            <option value="PLANNED">Planlanmış</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Sıfırla
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <ProjectsTable projects={projects} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          {page > 1 && (
            <Link
              href={`?page=${page - 1}${search ? `&search=${search}` : ''}`}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Önceki
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <Link
              key={p}
              href={`?page=${p}${search ? `&search=${search}` : ''}`}
              className={`px-4 py-2 rounded-lg ${
                p === page
                  ? 'bg-primary text-dark font-semibold'
                  : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {p}
            </Link>
          ))}
          {page < totalPages && (
            <Link
              href={`?page=${page + 1}${search ? `&search=${search}` : ''}`}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Sonraki
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
