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
