# 🚀 Admin Paneli - Implementation Guide

## 📦 Gerekli Paketler

```bash
# Core Dependencies
npm install next@latest react@latest react-dom@latest
npm install typescript @types/react @types/node

# UI Components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select @radix-ui/react-tabs
npm install @radix-ui/react-toast @radix-ui/react-tooltip
npm install @radix-ui/react-avatar @radix-ui/react-checkbox
npm install @radix-ui/react-label @radix-ui/react-switch

# shadcn/ui (via CLI)
npx shadcn-ui@latest init

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# Data Fetching & State
npm install @tanstack/react-query @tanstack/react-table
npm install zustand

# Database & ORM
npm install prisma @prisma/client
npm install -D prisma

# Authentication
npm install next-auth @auth/prisma-adapter bcryptjs
npm install -D @types/bcryptjs

# File Upload & Storage
npm install aws-sdk @aws-sdk/client-s3
npm install sharp # Image optimization
npm install react-dropzone

# Rich Text Editor
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link
npm install @tiptap/extension-image @tiptap/extension-color

# Charts & Analytics
npm install recharts date-fns

# Utilities
npm install clsx tailwind-merge
npm install sonner # Toast notifications
npm install react-day-picker # Date picker
npm install lucide-react # Icons

# Email
npm install resend

# Development
npm install -D eslint prettier
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

---

## 🏗️ Proje Kurulumu

### 1. Prisma Initialization

```bash
npx prisma init
```

**prisma/schema.prisma** dosyasını `ADMIN_PANEL_ARCHITECTURE.md` içindeki şema ile güncelleyin.

```bash
# Migration oluştur
npx prisma migrate dev --name init

# Prisma Client generate
npx prisma generate

# Prisma Studio aç (Database GUI)
npx prisma studio
```

### 2. Environment Variables

**.env.local** oluşturun:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lny_db"
# veya MongoDB için:
# DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/lny_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"

# AWS S3 (veya Cloudinary)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="eu-central-1"
AWS_S3_BUCKET="lny-media"

# Resend Email
RESEND_API_KEY="re_xxxxxxxxxxxxx"
RESEND_FROM_EMAIL="noreply@lny.com.tr"

# Redis (Optional - for caching)
REDIS_URL="redis://localhost:6379"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Folder Structure Setup

```bash
# Admin klasörlerini oluştur
mkdir -p app/\(admin\)/{dashboard,content,media,design,seo,forms,users,settings,analytics}
mkdir -p app/api/admin/{auth,projects,blog,media,settings,users,analytics,forms}
mkdir -p components/admin/{layout,ui,forms,widgets}
mkdir -p lib/admin
```

---

## 🔐 Authentication Setup

### `lib/admin/auth.ts`

```typescript
import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error("Invalid credentials")
        }

        if (!user.isActive) {
          throw new Error("Account is disabled")
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() }
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    }
  }
}
```

### `lib/admin/permissions.ts`

```typescript
export enum Permission {
  // Projects
  PROJECT_CREATE = "project:create",
  PROJECT_READ = "project:read",
  PROJECT_UPDATE = "project:update",
  PROJECT_DELETE = "project:delete",
  PROJECT_PUBLISH = "project:publish",
  
  // Blog
  BLOG_CREATE = "blog:create",
  BLOG_READ = "blog:read",
  BLOG_UPDATE = "blog:update",
  BLOG_DELETE = "blog:delete",
  BLOG_PUBLISH = "blog:publish",
  
  // Media
  MEDIA_UPLOAD = "media:upload",
  MEDIA_READ = "media:read",
  MEDIA_UPDATE = "media:update",
  MEDIA_DELETE = "media:delete",
  
  // Users
  USER_CREATE = "user:create",
  USER_READ = "user:read",
  USER_UPDATE = "user:update",
  USER_DELETE = "user:delete",
  
  // Settings
  SETTINGS_READ = "settings:read",
  SETTINGS_UPDATE = "settings:update",
  
  // Analytics
  ANALYTICS_VIEW = "analytics:view",
  
  // Forms
  FORM_READ = "form:read",
  FORM_UPDATE = "form:update",
  FORM_DELETE = "form:delete",
}

export const rolePermissions: Record<string, Permission[]> = {
  SUPER_ADMIN: Object.values(Permission),
  
  ADMIN: [
    Permission.PROJECT_CREATE,
    Permission.PROJECT_READ,
    Permission.PROJECT_UPDATE,
    Permission.PROJECT_DELETE,
    Permission.PROJECT_PUBLISH,
    Permission.BLOG_CREATE,
    Permission.BLOG_READ,
    Permission.BLOG_UPDATE,
    Permission.BLOG_DELETE,
    Permission.BLOG_PUBLISH,
    Permission.MEDIA_UPLOAD,
    Permission.MEDIA_READ,
    Permission.MEDIA_UPDATE,
    Permission.MEDIA_DELETE,
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.SETTINGS_READ,
    Permission.ANALYTICS_VIEW,
    Permission.FORM_READ,
    Permission.FORM_UPDATE,
  ],
  
  EDITOR: [
    Permission.PROJECT_CREATE,
    Permission.PROJECT_READ,
    Permission.PROJECT_UPDATE,
    Permission.PROJECT_DELETE,
    Permission.PROJECT_PUBLISH,
    Permission.BLOG_CREATE,
    Permission.BLOG_READ,
    Permission.BLOG_UPDATE,
    Permission.BLOG_DELETE,
    Permission.BLOG_PUBLISH,
    Permission.MEDIA_UPLOAD,
    Permission.MEDIA_READ,
    Permission.MEDIA_UPDATE,
    Permission.FORM_READ,
  ],
  
  AUTHOR: [
    Permission.PROJECT_CREATE,
    Permission.PROJECT_READ,
    Permission.PROJECT_UPDATE,
    Permission.BLOG_CREATE,
    Permission.BLOG_READ,
    Permission.BLOG_UPDATE,
    Permission.MEDIA_UPLOAD,
    Permission.MEDIA_READ,
  ],
  
  VIEWER: [
    Permission.PROJECT_READ,
    Permission.BLOG_READ,
    Permission.MEDIA_READ,
    Permission.ANALYTICS_VIEW,
    Permission.FORM_READ,
  ],
}

export function hasPermission(userRole: string, permission: Permission): boolean {
  const permissions = rolePermissions[userRole] || []
  return permissions.includes(permission)
}

export function hasAnyPermission(userRole: string, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(userRole, permission))
}

export function hasAllPermissions(userRole: string, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(userRole, permission))
}
```

### Permission Hook

```typescript
// hooks/use-permission.ts
import { useSession } from "next-auth/react"
import { Permission, hasPermission } from "@/lib/admin/permissions"

export function usePermission(permission: Permission) {
  const { data: session } = useSession()
  const userRole = session?.user?.role || "VIEWER"
  
  return hasPermission(userRole, permission)
}

export function useHasAnyPermission(permissions: Permission[]) {
  const { data: session } = useSession()
  const userRole = session?.user?.role || "VIEWER"
  
  return permissions.some(p => hasPermission(userRole, p))
}
```

---

## 🎨 Admin Layout

### `app/(admin)/layout.tsx`

```typescript
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/admin/auth"
import AdminSidebar from "@/components/admin/layout/AdminSidebar"
import AdminHeader from "@/components/admin/layout/AdminHeader"

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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <AdminSidebar user={session.user} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader user={session.user} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### `components/admin/layout/AdminSidebar.tsx`

```typescript
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
  MessageSquare
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR", "AUTHOR", "VIEWER"]
  },
  {
    title: "İçerik",
    icon: FileText,
    items: [
      { title: "Projeler", href: "/admin/content/projects" },
      { title: "Blog", href: "/admin/content/blog" },
      { title: "Sayfalar", href: "/admin/content/pages" },
      { title: "Hizmetler", href: "/admin/content/services" },
    ],
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR", "AUTHOR"]
  },
  {
    title: "Medya",
    icon: Image,
    href: "/admin/media",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR", "AUTHOR"]
  },
  {
    title: "Tasarım",
    icon: Palette,
    href: "/admin/design",
    roles: ["SUPER_ADMIN", "ADMIN"]
  },
  {
    title: "SEO",
    icon: Search,
    href: "/admin/seo",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR"]
  },
  {
    title: "Formlar",
    icon: Mail,
    href: "/admin/forms",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR"]
  },
  {
    title: "Kullanıcılar",
    icon: Users,
    href: "/admin/users",
    roles: ["SUPER_ADMIN", "ADMIN"]
  },
  {
    title: "Analitik",
    icon: BarChart3,
    href: "/admin/analytics",
    roles: ["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"]
  },
  {
    title: "Ayarlar",
    icon: Settings,
    href: "/admin/settings",
    roles: ["SUPER_ADMIN", "ADMIN"]
  },
]

export default function AdminSidebar({ user }: { user: any }) {
  const pathname = usePathname()
  
  const canAccess = (roles?: string[]) => {
    if (!roles) return true
    return roles.includes(user.role)
  }

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">LnY</span>
          <span className="text-sm text-gray-500">Admin</span>
        </Link>
      </div>
      
      {/* Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          if (!canAccess(item.roles)) return null
          
          if (item.items) {
            return (
              <div key={item.title} className="space-y-1">
                <div className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </div>
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
    </aside>
  )
}
```

---

## 📊 Dashboard Page

### `app/(admin)/dashboard/page.tsx`

```typescript
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/admin/auth"
import { prisma } from "@/lib/prisma"
import StatsCard from "@/components/admin/widgets/StatsCard"
import ActivityFeed from "@/components/admin/widgets/ActivityFeed"
import QuickActions from "@/components/admin/widgets/QuickActions"
import { FileText, FolderOpen, Mail, TrendingUp } from "lucide-react"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  // Fetch stats
  const [projectsCount, blogPostsCount, submissionsCount] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.formSubmission.count({ where: { status: "NEW" } })
  ])
  
  // Fetch recent activities
  const recentActivities = await prisma.activityLog.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, avatar: true } } }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Hoş Geldiniz, {session?.user?.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          İşte sitenizin güncel durumu
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Toplam Projeler"
          value={projectsCount}
          icon={FolderOpen}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Blog Yazıları"
          value={blogPostsCount}
          icon={FileText}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Bekleyen Başvurular"
          value={submissionsCount}
          icon={Mail}
          color="yellow"
        />
        <StatsCard
          title="Aylık Ziyaretçi"
          value="12.5K"
          icon={TrendingUp}
          trend={{ value: 23, isPositive: true }}
          color="purple"
        />
      </div>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <ActivityFeed activities={recentActivities} />
        </div>
        
        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
```

---

## 🎯 API Route Örneği

### `app/api/admin/projects/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/admin/auth"
import { prisma } from "@/lib/prisma"
import { Permission, hasPermission } from "@/lib/admin/permissions"
import { z } from "zod"

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
  shortDescription: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  status: z.enum(["COMPLETED", "IN_PROGRESS", "PLANNED"]),
  technologies: z.array(z.string()),
  // ... other fields
})

// GET /api/admin/projects
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  if (!hasPermission(session.user.role, Permission.PROJECT_READ)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")
  const search = searchParams.get("search") || ""
  const category = searchParams.get("category")
  const status = searchParams.get("status")
  
  const where = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }),
    ...(category && { category }),
    ...(status && { status }),
  }
  
  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { id: true, name: true, avatar: true }
        }
      }
    }),
    prisma.project.count({ where })
  ])
  
  return NextResponse.json({
    data: projects,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  })
}

// POST /api/admin/projects
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  if (!hasPermission(session.user.role, Permission.PROJECT_CREATE)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  
  try {
    const body = await request.json()
    const validated = projectSchema.parse(body)
    
    const project = await prisma.project.create({
      data: {
        ...validated,
        authorId: session.user.id
      }
    })
    
    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: "created",
        entity: "project",
        entityId: project.id,
      }
    })
    
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
```

---

## 📝 Form Component Örneği

### `components/admin/forms/ProjectForm.tsx`

```typescript
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const projectSchema = z.object({
  title: z.string().min(1, "Başlık gerekli"),
  slug: z.string().min(1, "Slug gerekli"),
  description: z.string().min(10, "En az 10 karakter"),
  shortDescription: z.string().min(10),
  category: z.string(),
  tags: z.array(z.string()),
  status: z.enum(["COMPLETED", "IN_PROGRESS", "PLANNED"]),
})

type ProjectFormData = z.infer<typeof projectSchema>

export default function ProjectForm({ 
  project, 
  onSuccess 
}: { 
  project?: any
  onSuccess?: () => void 
}) {
  const queryClient = useQueryClient()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project || {}
  })
  
  const mutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const url = project 
        ? `/api/admin/projects/${project.id}` 
        : "/api/admin/projects"
      
      const response = await fetch(url, {
        method: project ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      
      if (!response.ok) throw new Error("Failed to save project")
      return response.json()
    },
    onSuccess: () => {
      toast.success(project ? "Proje güncellendi" : "Proje oluşturuldu")
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      onSuccess?.()
    },
    onError: () => {
      toast.error("Bir hata oluştu")
    }
  })
  
  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
      {/* Title */}
      <div>
        <Label htmlFor="title">Proje Başlığı</Label>
        <Input
          id="title"
          {...register("title")}
          error={errors.title?.message}
        />
      </div>
      
      {/* Slug */}
      <div>
        <Label htmlFor="slug">URL Slug</Label>
        <Input
          id="slug"
          {...register("slug")}
          error={errors.slug?.message}
        />
      </div>
      
      {/* Description */}
      <div>
        <Label htmlFor="description">Açıklama</Label>
        <Textarea
          id="description"
          {...register("description")}
          rows={5}
          error={errors.description?.message}
        />
      </div>
      
      {/* Category */}
      <div>
        <Label htmlFor="category">Kategori</Label>
        <Select {...register("category")}>
          <option value="Mekanik Tasarım">Mekanik Tasarım</option>
          <option value="CFD Analiz">CFD Analiz</option>
          <option value="Yazılım">Yazılım</option>
        </Select>
      </div>
      
      {/* Status */}
      <div>
        <Label htmlFor="status">Durum</Label>
        <Select {...register("status")}>
          <option value="COMPLETED">Tamamlandı</option>
          <option value="IN_PROGRESS">Devam Ediyor</option>
          <option value="PLANNED">Planlanmış</option>
        </Select>
      </div>
      
      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline">
          İptal
        </Button>
        <Button type="submit" loading={mutation.isPending}>
          {project ? "Güncelle" : "Oluştur"}
        </Button>
      </div>
    </form>
  )
}
```

---

## 🎨 shadcn/ui Components

Gerekli shadcn/ui bileşenlerini yükleyin:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add label
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add table
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add checkbox
```

---

## 📚 Additional Resources

### Useful Libraries

**Rich Text Editor Options:**
- Tiptap (recommended) - https://tiptap.dev
- Lexical - https://lexical.dev
- Plate - https://platejs.org

**File Upload:**
- react-dropzone - https://react-dropzone.js.org
- Uploadthing - https://uploadthing.com

**Data Tables:**
- TanStack Table - https://tanstack.com/table
- AG Grid - https://www.ag-grid.com

**Charts:**
- Recharts - https://recharts.org
- Chart.js - https://www.chartjs.org
- Tremor - https://www.tremor.so

---

## 🚀 Next Steps

1. **Database Setup**: PostgreSQL veya MongoDB kurulumu
2. **Prisma Migration**: Schema'yı database'e uygula
3. **Authentication**: NextAuth setup ve test
4. **Admin Layout**: Sidebar, header, breadcrumb
5. **Dashboard**: Stats widgets ve activity feed
6. **CRUD Operations**: Project, blog management
7. **Media Library**: File upload ve yönetim
8. **Forms**: Form builder ve submissions
9. **Settings**: Site ayarları interface
10. **Testing**: Unit ve integration tests

---

**Implementation Status**: 📋 Ready to Start
**Estimated Timeline**: 6-8 weeks
**Tech Stack**: Next.js 15 + Prisma + NextAuth + shadcn/ui
