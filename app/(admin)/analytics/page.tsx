import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import StatsCard from "@/components/admin/widgets/StatsCard"

export const metadata = {
  title: "Analitik - Admin Panel",
  description: "Site analizleri"
}

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)

  // Get date 30 days ago
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  // Fetch analytics data
  const [
    totalProjects,
    totalBlogPosts,
    totalSubmissions,
    recentSubmissions,
    projectsByCategory,
    submissionsByDay
  ] = await Promise.all([
    prisma.project.count({ where: { status: "PUBLISHED" } }),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.formSubmission.count(),
    prisma.formSubmission.count({
      where: { createdAt: { gte: thirtyDaysAgo } }
    }),
    prisma.project.groupBy({
      by: ["category"],
      _count: true,
      where: { status: "PUBLISHED" }
    }),
    prisma.formSubmission.groupBy({
      by: ["createdAt"],
      _count: true,
      where: { createdAt: { gte: thirtyDaysAgo } }
    })
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analitik
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Site performans verileri ve istatistikler
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Yayınlanan Projeler"
          value={totalProjects}
          iconName="FolderOpen"
          color="blue"
        />
        <StatsCard
          title="Blog Yazıları"
          value={totalBlogPosts}
          iconName="FileText"
          color="green"
        />
        <StatsCard
          title="Toplam Başvuru"
          value={totalSubmissions}
          iconName="Mail"
          color="purple"
        />
        <StatsCard
          title="Son 30 Gün"
          value={recentSubmissions}
          iconName="TrendingUp"
          trend={{ value: 15, isPositive: true }}
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Categories */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Proje Kategorileri
          </h2>
          <div className="space-y-3">
            {projectsByCategory.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {cat.category}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {cat._count}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ 
                      width: `${(cat._count / totalProjects) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Form Başvuruları (Son 30 Gün)
          </h2>
          <div className="space-y-2">
            <div className="text-center py-8">
              <div className="text-4xl font-bold text-primary mb-2">
                {recentSubmissions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Yeni başvuru
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Son Aktiviteler
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Aktivite logları yakında eklenecek...
        </div>
      </div>
    </div>
  )
}
