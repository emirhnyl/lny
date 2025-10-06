import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import PageEditor from "@/components/admin/editors/PageEditor"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "Hakkımızda - Admin Panel",
  description: "Hakkımızda sayfası düzenleme"
}

export default async function AboutPageEditor() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/admin/login")
  }

  const settings = await prisma.settings.findMany({
    where: { category: "about" }
  })

  const settingsObj = settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value
    return acc
  }, {} as Record<string, string>)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Hakkımızda Sayfası Düzenle
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Şirket bilgilerini ve ekip üyelerini yönetin
        </p>
      </div>

      <PageEditor pageType="about" initialData={settingsObj} />
    </div>
  )
}
