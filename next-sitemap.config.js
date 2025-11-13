/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://lny.com.tr',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*'],
  generateIndexSitemap: false,
  
  // Add project pages dynamically
  additionalPaths: async (config) => {
    const projects = [
      'cfd-analizi-projesi',
      'otomasyon-sistemi',
      '3d-model-viewer',
      'tubitak-projesi'
    ]
    
    return projects.map(slug => ({
      loc: `/projects/${slug}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }))
  },
  
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/uploads/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/uploads/'],
      }
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lny.com.tr'}/sitemap.xml`,
    ],
  },
  
  transform: async (config, path) => {
    // Set custom priority and changefreq for different pages
    const customPriority = {
      '/': 1.0,
      '/about': 0.8,
      '/services': 0.9,
      '/projects': 0.8,
      '/viewer': 0.7,
      '/blog': 0.7,
      '/contact': 0.6,
    }

    const customChangefreq = {
      '/': 'weekly',
      '/about': 'monthly',
      '/services': 'monthly',
      '/projects': 'weekly',
      '/viewer': 'monthly',
      '/blog': 'daily',
      '/contact': 'monthly',
    }

    // Special handling for project pages
    if (path.startsWith('/projects/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
        alternateRefs: [
          {
            href: `${config.siteUrl}${path}`,
            hreflang: 'tr',
          }
        ],
      }
    }

    return {
      loc: path,
      changefreq: customChangefreq[path] || 'weekly',
      priority: customPriority[path] || 0.5,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: [
        {
          href: `${config.siteUrl}${path}`,
          hreflang: 'tr',
        }
      ],
    }
  },
}
