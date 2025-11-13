import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { FileText, Home, Mail, Briefcase, Info } from "lucide-react"

export const metadata = {
  title: "Sayfalar - Admin Panel",
  description: "Sayfa yönetimi"
}

const pages = [
  {
    id: "home",
    title: "Ana Sayfa",
    description: "Ana sayfa içeriği ve görsel ayarları",
    icon: Home,
    href: "/admin/content/pages/home"
  },
  {
    id: "about",
    title: "Hakkımızda",
    description: "Şirket bilgileri ve ekip üyeleri",
    icon: Info,
    href: "/admin/content/pages/about"
  },
  {
    id: "services",
    title: "Hizmetler",
    description: "Hizmet sayfası içeriği",
    icon: Briefcase,
    href: "/admin/content/pages/services"
  },
  {
    id: "contact",
    title: "İletişim",
    description: "İletişim bilgileri ve form ayarları",
    icon: Mail,
    href: "/admin/content/pages/contact"
  }
]

export default async function PagesPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Sayfalar
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Site sayfalarınızı düzenleyin
        </p>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={page.href}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md hover:border-primary/50 transition-all"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <page.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {page.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {page.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
