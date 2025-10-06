import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProjectEditor from "@/components/admin/editors/ProjectEditor-simple"

export const metadata = {
  title: "Projeyi Düzenle - Admin Panel",
  description: "Proje düzenleme"
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/admin/login")
  }

  // Next.js 15'te params artık Promise
  const { id } = await params

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      author: {
        select: { id: true, name: true, email: true }
      }
    }
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Projeyi Düzenle
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {project.title}
        </p>
      </div>

      <ProjectEditor project={project} />
    </div>
  )
}
