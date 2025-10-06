import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import MediaLibrary from "@/components/admin/media/MediaLibrary"

export const metadata = {
  title: "Medya - Admin Panel",
  description: "Medya yönetimi"
}

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; folder?: string; search?: string }>
}) {
  const session = await getServerSession(authOptions)
  const params = await searchParams
  const page = parseInt(params.page || "1")
  const limit = 24
  const folder = params.folder
  const search = params.search

  // Build where clause
  const where: any = {}
  
  if (folder) where.folder = folder
  if (search) {
    where.OR = [
      { originalName: { contains: search, mode: "insensitive" } },
      { filename: { contains: search, mode: "insensitive" } },
    ]
  }

  // Fetch media files
  const [files, total] = await Promise.all([
    prisma.media.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { uploadedAt: "desc" }
    }),
    prisma.media.count({ where })
  ])

  // Get unique folders
  const folders = await prisma.media.findMany({
    where: { folder: { not: null } },
    select: { folder: true },
    distinct: ["folder"]
  })

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Medya Kütüphanesi
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Toplam {total} dosya
        </p>
      </div>

      <MediaLibrary 
        files={files} 
        folders={folders.map(f => f.folder).filter(Boolean) as string[]}
        totalPages={totalPages}
        currentPage={page}
      />
    </div>
  )
}
