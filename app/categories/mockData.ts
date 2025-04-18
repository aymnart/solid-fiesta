export type CategoryManyNested = {
  name: string
  slug: string
  fullPath: string
  tools: number
  subcategories: CategoryManyNested[]
}

export const mockCategories: CategoryManyNested[] = [
  {
    name: "Development",
    slug: "development",
    fullPath: "development",
    tools: 0,
    subcategories: [
      {
        name: "Web Development",
        slug: "web-development",
        fullPath: "development/web-development",
        tools: 0,
        subcategories: [
          {
            name: "Frontend",
            slug: "frontend",
            fullPath: "development/web-development/frontend",
            tools: 0,
            subcategories: [],
          },
          {
            name: "Backend",
            slug: "backend",
            fullPath: "development/web-development/backend",
            tools: 28,
            subcategories: [],
          },
          {
            name: "Full Stack",
            slug: "full-stack",
            fullPath: "development/web-development/full-stack",
            tools: 15,
            subcategories: [],
          },
        ],
      },
      {
        name: "Mobile Development",
        slug: "mobile-development",
        fullPath: "development/mobile-development",
        tools: 0,
        subcategories: [
          {
            name: "iOS",
            slug: "ios",
            fullPath: "development/mobile-development/ios",
            tools: 0,
            subcategories: [],
          },
          {
            name: "Android",
            slug: "android",
            fullPath: "development/mobile-development/android",
            tools: 21,
            subcategories: [],
          },
          {
            name: "Cross-Platform",
            slug: "cross-platform",
            fullPath: "development/mobile-development/cross-platform",
            tools: 14,
            subcategories: [],
          },
        ],
      },
    ],
  },
  {
    name: "Design",
    slug: "design",
    fullPath: "design",
    tools: 0,
    subcategories: [
      {
        name: "UI Design",
        slug: "ui-design",
        fullPath: "design/ui-design",
        tools: 0,
        subcategories: [
          {
            name: "Wireframing",
            slug: "wireframing",
            fullPath: "design/ui-design/wireframing",
            tools: 9,
            subcategories: [],
          },
          {
            name: "Prototyping",
            slug: "prototyping",
            fullPath: "design/ui-design/prototyping",
            tools: 12,
            subcategories: [],
          },
        ],
      },
      {
        name: "Graphic Design",
        slug: "graphic-design",
        fullPath: "design/graphic-design",
        tools: 0,
        subcategories: [
          {
            name: "Logo Design",
            slug: "logo-design",
            fullPath: "design/graphic-design/logo-design",
            tools: 8,
            subcategories: [],
          },
          {
            name: "Illustration",
            slug: "illustration",
            fullPath: "design/graphic-design/illustration",
            tools: 11,
            subcategories: [],
          },
        ],
      },
    ],
  },
  {
    name: "Marketing",
    slug: "marketing",
    fullPath: "marketing",
    tools: 0,
    subcategories: [
      {
        name: "Digital Marketing",
        slug: "digital-marketing",
        fullPath: "marketing/digital-marketing",
        tools: 0,
        subcategories: [
          {
            name: "SEO",
            slug: "seo",
            fullPath: "marketing/digital-marketing/seo",
            tools: 16,
            subcategories: [],
          },
          {
            name: "Social Media",
            slug: "social-media",
            fullPath: "marketing/digital-marketing/social-media",
            tools: 24,
            subcategories: [],
          },
          {
            name: "Email Marketing",
            slug: "email-marketing",
            fullPath: "marketing/digital-marketing/email-marketing",
            tools: 13,
            subcategories: [],
          },
        ],
      },
      {
        name: "Content Marketing",
        slug: "content-marketing",
        fullPath: "marketing/content-marketing",
        tools: 0,
        subcategories: [
          {
            name: "Blogging",
            slug: "blogging",
            fullPath: "marketing/content-marketing/blogging",
            tools: 7,
            subcategories: [],
          },
          {
            name: "Video Marketing",
            slug: "video-marketing",
            fullPath: "marketing/content-marketing/video-marketing",
            tools: 19,
            subcategories: [],
          },
        ],
      },
    ],
  },
  {
    name: "Analytics",
    slug: "analytics",
    fullPath: "analytics",
    tools: 0,
    subcategories: [
      {
        name: "Business Intelligence",
        slug: "business-intelligence",
        fullPath: "analytics/business-intelligence",
        tools: 0,
        subcategories: [
          {
            name: "Dashboards",
            slug: "dashboards",
            fullPath: "analytics/business-intelligence/dashboards",
            tools: 14,
            subcategories: [],
          },
          {
            name: "Reporting",
            slug: "reporting",
            fullPath: "analytics/business-intelligence/reporting",
            tools: 11,
            subcategories: [],
          },
        ],
      },
      {
        name: "Data Science",
        slug: "data-science",
        fullPath: "analytics/data-science",
        tools: 0,
        subcategories: [
          {
            name: "Machine Learning",
            slug: "machine-learning",
            fullPath: "analytics/data-science/machine-learning",
            tools: 22,
            subcategories: [],
          },
          {
            name: "Data Visualization",
            slug: "data-visualization",
            fullPath: "analytics/data-science/data-visualization",
            tools: 17,
            subcategories: [],
          },
        ],
      },
    ],
  },
  {
    name: "Productivity",
    slug: "productivity",
    fullPath: "productivity",
    tools: 0,
    subcategories: [
      {
        name: "Project Management",
        slug: "project-management",
        fullPath: "productivity/project-management",
        tools: 0,
        subcategories: [
          {
            name: "Task Management",
            slug: "task-management",
            fullPath: "productivity/project-management/task-management",
            tools: 25,
            subcategories: [],
          },
          {
            name: "Team Collaboration",
            slug: "team-collaboration",
            fullPath: "productivity/project-management/team-collaboration",
            tools: 18,
            subcategories: [],
          },
        ],
      },
      {
        name: "Note Taking",
        slug: "note-taking",
        fullPath: "productivity/note-taking",
        tools: 0,
        subcategories: [
          {
            name: "Personal Notes",
            slug: "personal-notes",
            fullPath: "productivity/note-taking/personal-notes",
            tools: 10,
            subcategories: [],
          },
          {
            name: "Team Documentation",
            slug: "team-documentation",
            fullPath: "productivity/note-taking/team-documentation",
            tools: 12,
            subcategories: [],
          },
        ],
      },
    ],
  },
  {
    name: "Security",
    slug: "security",
    fullPath: "security",
    tools: 0,
    subcategories: [
      {
        name: "Network Security",
        slug: "network-security",
        fullPath: "security/network-security",
        tools: 0,
        subcategories: [
          {
            name: "Firewalls",
            slug: "firewalls",
            fullPath: "security/network-security/firewalls",
            tools: 8,
            subcategories: [],
          },
          {
            name: "VPN",
            slug: "vpn",
            fullPath: "security/network-security/vpn",
            tools: 13,
            subcategories: [],
          },
        ],
      },
      {
        name: "Data Security",
        slug: "data-security",
        fullPath: "security/data-security",
        tools: 0,
        subcategories: [
          {
            name: "Encryption",
            slug: "encryption",
            fullPath: "security/data-security/encryption",
            tools: 15,
            subcategories: [],
          },
          {
            name: "Backup & Recovery",
            slug: "backup-recovery",
            fullPath: "security/data-security/backup-recovery",
            tools: 9,
            subcategories: [],
          },
        ],
      },
    ],
  },
]
