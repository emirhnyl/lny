import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import ProjectEditor from "@/components/admin/editors/ProjectEditor-simple"

export const metadata = {
  title: "Yeni Proje - Admin Panel",
  description: "Yeni proje oluştur"
}

export default async function NewProjectPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Yeni Proje Oluştur
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Portfolyonuza yeni bir proje ekleyin
        </p>
      </div>

      <ProjectEditor />
    </div>
  )
}
