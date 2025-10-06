"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Palette, 
  Search, 
  Mail, 
  Users, 
  Settings,
  BarChart3,
  FolderOpen,
  MessageSquare,
  ChevronDown
} from "lucide-react"
import { useState } from "react"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR", "AUTHOR", "VIEWER"]
  },
  {
    title: "İçerik",
    icon: FileText,
    items: [
      { title: "Projeler", href: "/content/projects" },
      { title: "Blog", href: "/content/blog" },
      { title: "Sayfalar", href: "/content/pages" },
      { title: "Hizmetler", href: "/content/services" },
    ],
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR", "AUTHOR"]
  },
  {
    title: "Medya",
    icon: Image,
    href: "/media",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR", "AUTHOR"]
  },
  {
    title: "Formlar",
    icon: Mail,
    href: "/forms",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR"]
  },
  {
    title: "Analitik",
    icon: BarChart3,
    href: "/analytics",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"]
  },
  {
    title: "Kullanıcılar",
    icon: Users,
    href: "/users",
    roles: ["SUPER_ADMIN", "ADMIN"]
  },
  {
    title: "Ayarlar",
    icon: Settings,
    href: "/settings",
    roles: ["SUPER_ADMIN", "ADMIN"]
  },
]

export default function AdminSidebar({ user }: { user: any }) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["İçerik"])
  
  const canAccess = (roles?: string[]) => {
    if (!roles) return true
    return roles.includes(user.role)
  }

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col sticky top-0 h-screen">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">LnY</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Admin</span>
        </Link>
      </div>
      
      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto admin-scrollbar">
        {menuItems.map((item) => {
          if (!canAccess(item.roles)) return null
          
          if (item.items) {
            const isExpanded = expandedItems.includes(item.title)
            return (
              <div key={item.title} className="space-y-1">
                <button
                  onClick={() => toggleExpand(item.title)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </div>
                  <ChevronDown 
                    className={cn(
                      "w-4 h-4 transition-transform",
                      isExpanded && "transform rotate-180"
                    )} 
                  />
                </button>
                {isExpanded && (
                  <div className="ml-8 space-y-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-lg transition-colors",
                          pathname === subItem.href
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        )}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          }
          
          return (
            <Link
              key={item.href}
              href={item.href || "#"}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">
              {user.name?.charAt(0) || user.email?.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user.name || 'Admin'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
