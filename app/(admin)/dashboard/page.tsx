import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import StatsCard from "@/components/admin/widgets/StatsCard"

export const metadata = {
  title: "Dashboard - Admin Panel",
  description: "LnY Admin Dashboard"
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  // Fetch stats
  const [projectsCount, blogPostsCount, submissionsCount] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.formSubmission.count({ where: { status: "NEW" } })
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Hoş Geldiniz, {session?.user?.name || 'Admin'}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          İşte sitenizin güncel durumu
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Toplam Projeler"
          value={projectsCount}
          iconName="FolderOpen"
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Blog Yazıları"
          value={blogPostsCount}
          iconName="FileText"
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Bekleyen Başvurular"
          value={submissionsCount}
          iconName="Mail"
          color="yellow"
        />
        <StatsCard
          title="Aylık Ziyaretçi"
          value="12.5K"
          iconName="TrendingUp"
          trend={{ value: 23, isPositive: true }}
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Son Aktiviteler
          </h2>
          <div className="space-y-4">
            <ActivityItem
              action="Yeni proje eklendi"
              user="Admin"
              time="5 dakika önce"
            />
            <ActivityItem
              action="Blog yazısı yayınlandı"
              user="Editor"
              time="2 saat önce"
            />
            <ActivityItem
              action="Yeni form başvurusu"
              user="Sistem"
              time="3 saat önce"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Hızlı Aksiyonlar
          </h2>
          <div className="space-y-3">
            <QuickActionButton href="/content/projects/new" label="Yeni Proje" />
            <QuickActionButton href="/content/blog/new" label="Blog Yazısı" />
            <QuickActionButton href="/media" label="Medya Yükle" />
            <QuickActionButton href="/forms" label="Başvuruları Gör" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ActivityItem({ action, user, time }: { action: string; user: string; time: string }) {
  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
      <div className="flex-1">
        <p className="text-sm text-gray-900 dark:text-white">{action}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {user} • {time}
        </p>
      </div>
    </div>
  )
}

function QuickActionButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="block w-full py-2 px-4 text-center bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-lg transition-colors"
    >
      {label}
    </a>
  )
}
