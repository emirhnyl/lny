import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import SettingsForm from "@/components/admin/forms/SettingsForm"

export const metadata = {
  title: "Ayarlar - Admin Panel",
  description: "Site ayarları"
}

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  
  // Check if user has permission
  if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard")
  }

  // Fetch settings
  const settings = await prisma.settings.findMany({
    orderBy: { category: "asc" }
  })

  // Organize settings by category
  const settingsByCategory = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = []
    }
    acc[setting.category].push(setting)
    return acc
  }, {} as Record<string, typeof settings>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Site Ayarları
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Sitenizin genel ayarlarını yönetin
        </p>
      </div>

      {/* Settings Categories */}
      <div className="space-y-6">
        {Object.entries(settingsByCategory).map(([category, categorySettings]) => (
          <div 
            key={category}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
              {category === "general" && "Genel Ayarlar"}
              {category === "seo" && "SEO Ayarları"}
              {category === "contact" && "İletişim Bilgileri"}
              {category === "social" && "Sosyal Medya"}
              {category === "email" && "E-posta Ayarları"}
              {category || "Diğer"}
            </h2>
            <SettingsForm settings={categorySettings} category={category} />
          </div>
        ))}

        {/* Create initial settings if none exist */}
        {Object.keys(settingsByCategory).length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-gray-600 dark:text-gray-400">
              Henüz ayar bulunmuyor. İlk ayarlarınızı oluşturun.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
