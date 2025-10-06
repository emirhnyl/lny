import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AdminSidebar from "@/components/admin/layout/AdminSidebar"
import AdminHeader from "@/components/admin/layout/AdminHeader"
import { Toaster } from "sonner"

export const metadata = {
  title: "Admin Panel - LnY",
  description: "LnY Admin Yönetim Paneli",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <AdminSidebar user={session.user} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <AdminHeader user={session.user} />
        
        {/* Page Content */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-6 overflow-y-auto admin-scrollbar">
          {children}
        </main>
      </div>
      
      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />
    </div>
  )
}
