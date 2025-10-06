import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import FormsTable from "@/components/admin/tables/FormsTable"

export const metadata = {
  title: "Formlar - Admin Panel",
  description: "Form başvuruları"
}

export default async function FormsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string; status?: string; search?: string }>
}) {
  const session = await getServerSession(authOptions)
  const params = await searchParams
  const page = parseInt(params.page || "1")
  const limit = 20
  const type = params.type
  const status = params.status
  const search = params.search

  // Build where clause
  const where: any = {}
  
  if (type) where.type = type
  if (status) where.status = status
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { message: { contains: search, mode: "insensitive" } },
    ]
  }

  // Fetch submissions
  const [submissions, total, stats] = await Promise.all([
    prisma.formSubmission.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" }
    }),
    prisma.formSubmission.count({ where }),
    prisma.formSubmission.groupBy({
      by: ["status"],
      _count: true
    })
  ])

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Form Başvuruları
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Toplam {total} başvuru
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.status}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {stat.status === "NEW" && "Yeni"}
              {stat.status === "IN_PROGRESS" && "İşleniyor"}
              {stat.status === "COMPLETED" && "Tamamlandı"}
              {stat.status === "SPAM" && "Spam"}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat._count}
            </div>
          </div>
        ))}
      </div>

      <FormsTable 
        submissions={submissions} 
        totalPages={totalPages}
        currentPage={page}
      />
    </div>
  )
}
