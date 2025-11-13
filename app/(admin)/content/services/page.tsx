import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus } from "lucide-react"
import ServicesTable from "@/components/admin/tables/ServicesTable"

export const metadata = {
  title: "Hizmetler - Admin Panel",
  description: "Hizmet yönetimi"
}

export default async function ServicesPage() {
  const session = await getServerSession(authOptions)

  // Fetch services
  const services = await prisma.service.findMany({
    orderBy: { orderIndex: "asc" }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Hizmetler
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Site hizmetlerini yönetin
          </p>
        </div>
        <Link
          href="/content/services/new"
          className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-dark font-semibold rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Yeni Hizmet</span>
        </Link>
      </div>

      <ServicesTable services={services} />
    </div>
  )
}
