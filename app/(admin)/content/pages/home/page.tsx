import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import PageEditor from "@/components/admin/editors/PageEditor"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "Ana Sayfa - Admin Panel",
  description: "Ana sayfa düzenleme"
}

export default async function HomePageEditor() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/admin/login")
  }

  // Get home page settings
  const settings = await prisma.settings.findMany({
    where: { category: "home" }
  })

  const settingsObj = settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value
    return acc
  }, {} as Record<string, string>)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Ana Sayfa Düzenle
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Ana sayfa içeriği ve görsellerini yönetin
        </p>
      </div>

      <PageEditor pageType="home" initialData={settingsObj} />
    </div>
  )
}
