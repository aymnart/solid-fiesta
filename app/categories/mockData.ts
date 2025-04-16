export type CategoryManyNested = {
  name: string
  slug: string
  fullPath: string
  subcategories: {
    name: string
    slug: string
    fullPath: string
    subsubcategories: {
      name: string
      slug: string
      fullPath: string
      _count: {
        tools: number
      }
    }[]
  }[]
}

export const mockCategories: CategoryManyNested[] = [
  {
    name: "Development",
    slug: "development",
    fullPath: "development",
    subcategories: [
      {
        name: "Web Development",
        slug: "web-development",
        fullPath: "development/web-development",
        subsubcategories: [
          {
            name: "Frontend",
            slug: "frontend",
            fullPath: "development/web-development/frontend",
            _count: { tools: 32 },
          },
          {
            name: "Backend",
            slug: "backend",
            fullPath: "development/web-development/backend",
            _count: { tools: 28 },
          },
          {
            name: "Full Stack",
            slug: "full-stack",
            fullPath: "development/web-development/full-stack",
            _count: { tools: 15 },
          },
        ],
      },
      {
        name: "Mobile Development",
        slug: "mobile-development",
        fullPath: "development/mobile-development",
        subsubcategories: [
          {
            name: "iOS",
            slug: "ios",
            fullPath: "development/mobile-development/ios",
            _count: { tools: 18 },
          },
          {
            name: "Android",
            slug: "android",
            fullPath: "development/mobile-development/android",
            _count: { tools: 21 },
          },
          {
            name: "Cross-Platform",
            slug: "cross-platform",
            fullPath: "development/mobile-development/cross-platform",
            _count: { tools: 14 },
          },
        ],
      },
    ],
  },
  {
    name: "Design",
    slug: "design",
    fullPath: "design",
    subcategories: [
      {
        name: "UI Design",
        slug: "ui-design",
        fullPath: "design/ui-design",
        subsubcategories: [
          {
            name: "Wireframing",
            slug: "wireframing",
            fullPath: "design/ui-design/wireframing",
            _count: { tools: 9 },
          },
          {
            name: "Prototyping",
            slug: "prototyping",
            fullPath: "design/ui-design/prototyping",
            _count: { tools: 12 },
          },
        ],
      },
      {
        name: "Graphic Design",
        slug: "graphic-design",
        fullPath: "design/graphic-design",
        subsubcategories: [
          {
            name: "Logo Design",
            slug: "logo-design",
            fullPath: "design/graphic-design/logo-design",
            _count: { tools: 8 },
          },
          {
            name: "Illustration",
            slug: "illustration",
            fullPath: "design/graphic-design/illustration",
            _count: { tools: 11 },
          },
        ],
      },
    ],
  },
  {
    name: "Marketing",
    slug: "marketing",
    fullPath: "marketing",
    subcategories: [
      {
        name: "Digital Marketing",
        slug: "digital-marketing",
        fullPath: "marketing/digital-marketing",
        subsubcategories: [
          {
            name: "SEO",
            slug: "seo",
            fullPath: "marketing/digital-marketing/seo",
            _count: { tools: 16 },
          },
          {
            name: "Social Media",
            slug: "social-media",
            fullPath: "marketing/digital-marketing/social-media",
            _count: { tools: 24 },
          },
          {
            name: "Email Marketing",
            slug: "email-marketing",
            fullPath: "marketing/digital-marketing/email-marketing",
            _count: { tools: 13 },
          },
        ],
      },
      {
        name: "Content Marketing",
        slug: "content-marketing",
        fullPath: "marketing/content-marketing",
        subsubcategories: [
          {
            name: "Blogging",
            slug: "blogging",
            fullPath: "marketing/content-marketing/blogging",
            _count: { tools: 7 },
          },
          {
            name: "Video Marketing",
            slug: "video-marketing",
            fullPath: "marketing/content-marketing/video-marketing",
            _count: { tools: 19 },
          },
        ],
      },
    ],
  },
  {
    name: "Analytics",
    slug: "analytics",
    fullPath: "analytics",
    subcategories: [
      {
        name: "Business Intelligence",
        slug: "business-intelligence",
        fullPath: "analytics/business-intelligence",
        subsubcategories: [
          {
            name: "Dashboards",
            slug: "dashboards",
            fullPath: "analytics/business-intelligence/dashboards",
            _count: { tools: 14 },
          },
          {
            name: "Reporting",
            slug: "reporting",
            fullPath: "analytics/business-intelligence/reporting",
            _count: { tools: 11 },
          },
        ],
      },
      {
        name: "Data Science",
        slug: "data-science",
        fullPath: "analytics/data-science",
        subsubcategories: [
          {
            name: "Machine Learning",
            slug: "machine-learning",
            fullPath: "analytics/data-science/machine-learning",
            _count: { tools: 22 },
          },
          {
            name: "Data Visualization",
            slug: "data-visualization",
            fullPath: "analytics/data-science/data-visualization",
            _count: { tools: 17 },
          },
        ],
      },
    ],
  },
  {
    name: "Productivity",
    slug: "productivity",
    fullPath: "productivity",
    subcategories: [
      {
        name: "Project Management",
        slug: "project-management",
        fullPath: "productivity/project-management",
        subsubcategories: [
          {
            name: "Task Management",
            slug: "task-management",
            fullPath: "productivity/project-management/task-management",
            _count: { tools: 25 },
          },
          {
            name: "Team Collaboration",
            slug: "team-collaboration",
            fullPath: "productivity/project-management/team-collaboration",
            _count: { tools: 18 },
          },
        ],
      },
      {
        name: "Note Taking",
        slug: "note-taking",
        fullPath: "productivity/note-taking",
        subsubcategories: [
          {
            name: "Personal Notes",
            slug: "personal-notes",
            fullPath: "productivity/note-taking/personal-notes",
            _count: { tools: 10 },
          },
          {
            name: "Team Documentation",
            slug: "team-documentation",
            fullPath: "productivity/note-taking/team-documentation",
            _count: { tools: 12 },
          },
        ],
      },
    ],
  },
  {
    name: "Security",
    slug: "security",
    fullPath: "security",
    subcategories: [
      {
        name: "Network Security",
        slug: "network-security",
        fullPath: "security/network-security",
        subsubcategories: [
          {
            name: "Firewalls",
            slug: "firewalls",
            fullPath: "security/network-security/firewalls",
            _count: { tools: 8 },
          },
          {
            name: "VPN",
            slug: "vpn",
            fullPath: "security/network-security/vpn",
            _count: { tools: 13 },
          },
        ],
      },
      {
        name: "Data Security",
        slug: "data-security",
        fullPath: "security/data-security",
        subsubcategories: [
          {
            name: "Encryption",
            slug: "encryption",
            fullPath: "security/data-security/encryption",
            _count: { tools: 15 },
          },
          {
            name: "Backup & Recovery",
            slug: "backup-recovery",
            fullPath: "security/data-security/backup-recovery",
            _count: { tools: 9 },
          },
        ],
      },
    ],
  },
]
