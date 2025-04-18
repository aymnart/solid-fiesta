import { faker } from "@faker-js/faker"
import { db } from "@/lib/db"

// Configuration: adjust these numbers to control the amount of data generated
const CONFIG = {
  // Number of top-level categories
  topLevelCategories: 5,
  // Number of sub-categories per parent category (level 2)
  subCategoriesPerParent: 4,
  // Number of leaf categories per sub-category (level 3)
  leafCategoriesPerSub: 5,
  // Number of tools per leaf category
  toolsPerLeafCategory: 8,
}

// Utility function to create a slug from a name
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-")
}

// Categories by area
const categoryAreas = [
  {
    name: "Content & Publishing",
    subcategories: [
      "Publishing",
      "Content Management Systems (CMS)",
      "Blogging & Personal Sites",
      "Community Platforms",
      "Documentation & Knowledge Base",
      "Learning Management Systems (LMS)",
      "Digital Asset Management (DAM)",
    ],
    leafCategories: {
      Publishing: ["Changelog Generators", "Translation Management"],
      "Content Management Systems (CMS)": ["Headless CMS", "Traditional & Flat-File CMS"],
      "Blogging & Personal Sites": ["Blogging Platforms"],
      "Community Platforms": ["Forum Software", "Q&A Platforms"],
      "Documentation & Knowledge Base": [
        "Technical Writing Platforms",
        "Wiki Software",
        "API Documentation Generators",
        "Internal Knowledge Bases",
      ],
      "Learning Management Systems (LMS)": ["Course Creation Platforms"],
      "Digital Asset Management (DAM)": ["Photo & Video Management"],
    },
  },
  {
    name: "Community & Social",
    subcategories: [
      "Social Networking",
      "Community Building Platforms",
      "Collaboration & Feedback",
      "Open Source Support",
    ],
    leafCategories: {
      "Social Networking": ["Decentralized Social Networks"],
      "Community Building Platforms": ["Team Chat Platforms", "Community Analytics & Management"],
      "Collaboration & Feedback": ["Community Feedback Platforms"],
      "Open Source Support": ["Open Source Monetization"],
    },
  },
  {
    name: "Specialized Industries",
    subcategories: [
      "Cryptocurrency & Blockchain",
      "Automotive",
      "Finance & Fintech",
      "Gaming",
      "Internet of Things (IoT)",
      "Logistics & Supply Chain",
      "Design & Prototyping",
    ],
    leafCategories: {
      "Cryptocurrency & Blockchain": ["Trading Bots", "Blockchain Development", "Web3 Platforms"],
      Automotive: ["Driver Assistance Systems"],
      "Finance & Fintech": ["Financial Data", "Fintech Infrastructure"],
      Gaming: ["Game Development Platforms"],
      "Internet of Things (IoT)": ["IoT Databases"],
      "Logistics & Supply Chain": ["Logistics Platforms"],
      "Design & Prototyping": ["UI/UX Design"],
    },
  },
  {
    name: "Security & Privacy",
    subcategories: [
      "Identity & Access Management (IAM)",
      "Secrets Management",
      "Threat Detection & Response",
      "Network Security",
      "Data Security & Privacy",
      "Application Security",
      "Fraud Prevention",
    ],
    leafCategories: {
      "Identity & Access Management (IAM)": [
        "Authentication & SSO",
        "Authorization & Permissions",
        "Password Management",
      ],
      "Secrets Management": ["Secrets Platforms"],
      "Threat Detection & Response": [
        "Vulnerability Scanning",
        "Threat Intelligence",
        "Security Automation (SIEM/SOAR)",
        "Error Tracking",
      ],
      "Network Security": ["VPN & Secure Tunnels", "SSH Access Management"],
      "Data Security & Privacy": [
        "Encrypted Storage",
        "Data Anonymization & Synthesis",
        "PII Detection & Protection",
        "Encrypted Communication",
      ],
      "Application Security": ["CAPTCHA & Bot Protection", "Content Moderation", "Feature Flags"],
      "Fraud Prevention": ["Financial Fraud Detection"],
    },
  },
  {
    name: "Business Software",
    subcategories: [
      "CRM & Sales",
      "ERP & Operations",
      "Finance & Accounting",
      "Human Resources (HR)",
      "Marketing & Customer Engagement",
      "Customer Support & Success",
      "E-commerce Platforms",
      "Project & Work Management",
      "Collaboration & Communication",
      "Scheduling & Event Management",
      "Document Management & e-Signatures",
      "Forms & Surveys",
      "Compliance & Risk Management",
    ],
    leafCategories: {
      "CRM & Sales": ["CRM Systems", "Sales Automation", "Investor Relations Platforms"],
      "ERP & Operations": ["ERP Systems", "Logistics Management", "Asset & Inventory Management"],
      "Finance & Accounting": [
        "Accounting Software",
        "Invoicing & Payments",
        "Expense Management",
        "Subscription & Billing Management",
        "Payment Infrastructure",
        "Financial Planning & Analysis (FP&A)",
        "Cap Table Management",
        "Freelancer Tools",
      ],
      "Human Resources (HR)": ["HR Management Systems (HRMS)", "Contractor Management"],
      "Marketing & Customer Engagement": [
        "Marketing Automation",
        "Email Marketing & Newsletters",
        "Customer Communication Platform (CCP)",
        "Link Management & Shorteners",
        "Social Media Management",
      ],
      "Customer Support & Success": [
        "Live Chat & Messaging",
        "Feedback & Feature Request Management",
        "Product Tour & User Onboarding",
        "Helpdesk Software",
      ],
      "E-commerce Platforms": [
        "Headless Commerce",
        "Full-Stack E-commerce",
        "Frontend E-commerce Solutions",
      ],
      "Project & Work Management": [
        "Project Management Suites",
        "Agile Project Management",
        "Task Management",
      ],
      "Collaboration & Communication": [
        "Team Chat & Messaging",
        "Video Conferencing & Virtual Office",
        "Collaborative Workspaces",
      ],
      "Scheduling & Event Management": ["Appointment Scheduling", "Event Ticketing & Management"],
      "Document Management & e-Signatures": [
        "Document Management Systems",
        "E-Signature Platforms",
        "Secure Document Sharing",
      ],
      "Forms & Surveys": ["Form Builders", "Survey Tools", "Form Backend Services"],
      "Compliance & Risk Management": [
        "Compliance Automation",
        "Financial Risk Management",
        "Data Warehouse Security",
      ],
    },
  },

  {
    name: "Developer Tools",
    subcategories: [
      "Website Builders",
      "IDEs & Code Editors",
      "Frameworks & Platforms",
      "API Development & Testing",
      "Testing & Quality Assurance",
      "Version Control & Collaboration",
      "Code Analysis & Transformation",
      "Build & Deployment",
      "Integration Platforms",
    ],
    leafCategories: {
      "Website Builders": [],
      "IDEs & Code Editors": ["General Purpose Editors", "AI-Powered Editors"],
      "Frameworks & Platforms": [
        "Web Frameworks",
        "Low-Code/No-Code",
        "Backend-as-a-Service (BaaS)",
        "Frontend Development",
        "Mobile Development",
      ],
      "API Development & Testing": ["API Clients", "API Infrastructure"],
      "Testing & Quality Assurance": ["Visual Testing", "Automated Testing"],
      "Version Control & Collaboration": [
        "Git Platforms",
        "Git Clients",
        "Development Environments",
      ],
      "Code Analysis & Transformation": ["Static Analysis", "Code Transformation"],
      "Build & Deployment": ["PaaS & Deployment Tools", "CI/CD Platforms"],
      "Integration Platforms": ["API Integration"],
    },
  },
  {
    name: "AI & Machine Learning",
    subcategories: [
      "AI Development Platforms",
      "Machine Learning Infrastructure",
      "AI Interaction & Interfaces",
      "AI Security & Privacy",
    ],
    leafCategories: {
      "AI Development Platforms": [
        "LLM Application Frameworks",
        "AI Agent Platforms",
        "AI Coding Assistants",
      ],
      "Machine Learning Infrastructure": ["Data Platforms for AI", "GPU & Compute Platforms"],
      "AI Interaction & Interfaces": [
        "AI Chat Interfaces",
        "AI Search Tools",
        "Browser Automation for AI",
        "AI Personal Assistants",
      ],
      "AI Security & Privacy": ["AI API Key Protection"],
    },
  },
  {
    name: "Data & Analytics",
    subcategories: [
      "Web & Product Analytics",
      "Business Intelligence & Reporting",
      "Data Engineering & Integration",
      "Data Warehousing & Processing",
      "Data Extraction & Web Scraping",
    ],
    leafCategories: {
      "Web & Product Analytics": ["Web Analytics", "Product Analytics"],
      "Business Intelligence & Reporting": ["BI Platforms", "Data Visualization"],
      "Data Engineering & Integration": [
        "Semantic Layer Platforms",
        "ETL & Data Integration",
        "Change Data Capture (CDC)",
        "Data Observability",
      ],
      "Data Warehousing & Processing": ["Cloud Data Warehouses", "Stream Processing"],
      "Data Extraction & Web Scraping": [
        "Web Crawlers",
        "Scraping Platforms & SDKs",
        "Document Data Extraction",
      ],
    },
  },
  {
    name: "Productivity & Utilities",
    subcategories: [
      "Personal Finance Management",
      "Note Taking & Knowledge Management",
      "Password & Secret Management",
      "Screen Capture & Recording",
      "File Management & Sync",
      "Email & Communication",
      "Browsers & Extensions",
      "Automation",
      "Time & Task Management",
      "Design & Visualization",
      "Bookmark & Content Management",
      "Remote Desktop & Access",
    ],
    leafCategories: {
      "Personal Finance Management": ["Budgeting Apps", "Investment Tracking"],
      "Note Taking & Knowledge Management": [
        "Note-Taking",
        "Personal Knowledge Management",
        "Secure & Encrypted Notes",
        "Collaborative Notes & Wikis",
      ],
      "Password & Secret Management": ["Password Managers"],
      "Screen Capture & Recording": ["Screen Recording", "Screenshot Utilities"],
      "File Management & Sync": ["Cloud File Sync & Share", "Local File Managers"],
      "Email & Communication": [
        "Email Clients",
        "Secure Email Providers",
        "Email Forwarding & Aliasing",
        "Email Platforms",
        "Push Notification",
      ],
      "Browsers & Extensions": ["Web Browsers", "Browser Extensions"],
      Automation: ["Workflow Automation", "Browser Automation"],
      "Time & Task Management": [
        "Workspace Organizers",
        "Time Tracking",
        "Task Management Apps",
        "Launchers & Quick Access",
      ],
      "Design & Visualization": ["Code Snippet Stylers", "Online Design", "Whiteboarding"],
      "Bookmark & Content Management": [
        "Bookmark Managers",
        "Read-it-Later & Knowledge Hubs",
        "Personal Tracking Apps",
      ],
      "Remote Desktop & Access": ["Remote Desktop Software"],
    },
  },
  {
    name: "Infrastructure & Operations",
    subcategories: [
      "Storage Solutions",
      "Search Servers",
      "Cloud Infrastructure Management",
      "Server & VM Management",
      "Monitoring & Observability",
      "Databases",
      "Networking & Connectivity",
      "Orchestration & Scheduling",
      "Messaging & Event Streaming",
      "Backup & Recovery",
    ],
    leafCategories: {
      "Storage Solutions": ["Cloud Storage", "Storage", "File Management"],
      "Search Servers": [],
      "Cloud Infrastructure Management": [
        "Infrastructure as Code (IaC)",
        "Cloud Cost & Optimization",
      ],
      "Server & VM Management": ["Control Panels", "Virtualization Management"],
      "Monitoring & Observability": [
        "Uptime Monitoring",
        "Performance Monitoring (APM)",
        "Infrastructure Monitoring",
        "Log Management",
        "Status Pages",
      ],
      Databases: [
        "Relational Databases (SQL)",
        "NoSQL & Document Databases",
        "Vector Databases",
        "Graph Databases",
        "Time Series Databases",
        "In-Memory Databases",
        "Distributed Storage",
        "Database Tools & GUIs",
        "Database Proxies",
      ],
      "Networking & Connectivity": ["VPN & Secure Access", "WebSockets Servers"],
      "Orchestration & Scheduling": [
        "Workflow Orchestration",
        "Job Scheduling",
        "Container Orchestration",
        "Distributed Compute",
      ],
      "Messaging & Event Streaming": [
        "Message Queues",
        "Webhook Platforms",
        "Event Streaming Platforms",
      ],
      "Backup & Recovery": ["Server Backup"],
    },
  },
]

// Tool description templates for variety
const toolDescriptionTemplates = [
  "A powerful {category} tool for {action}",
  "The ultimate solution for {action} in the {category} space",
  "Professional {category} platform designed for {action}",
  "Streamline your {category} workflow with this tool for {action}",
  "Industry-leading {category} software for {action}",
  "Simplify {action} with this intuitive {category} tool",
  "Advanced {category} toolkit specializing in {action}",
  "All-in-one {category} solution to help you {action}",
  "Lightweight yet powerful {category} utility for {action}",
  "Enterprise-grade {category} platform focused on {action}",
]

// Action verbs for tool descriptions
const actionVerbs = {
  Development: [
    "building applications",
    "writing code",
    "debugging",
    "testing",
    "deploying",
    "version control",
    "optimizing performance",
    "automating tasks",
  ],
  Design: [
    "creating visual content",
    "prototyping",
    "editing images",
    "designing interfaces",
    "creating illustrations",
    "typography management",
    "color selection",
    "asset creation",
  ],
  Productivity: [
    "managing tasks",
    "organizing notes",
    "tracking time",
    "communication",
    "file management",
    "project coordination",
    "scheduling",
    "automating workflows",
  ],
  Marketing: [
    "managing campaigns",
    "analyzing data",
    "content planning",
    "social media management",
    "SEO optimization",
    "email marketing",
    "lead generation",
    "customer engagement",
  ],
  Business: [
    "financial management",
    "HR processes",
    "legal documentation",
    "customer support",
    "sales tracking",
    "operations management",
    "inventory control",
    "reporting",
  ],
}

// Generate a random tool description
function generateToolDescription(category: string, leafCategory: string): string {
  const template = faker.helpers.arrayElement(toolDescriptionTemplates)
  const topCategory =
    categoryAreas.find(area =>
      Object.values(area.leafCategories).some(leafs => leafs.includes(leafCategory)),
    )?.name || category

  const actions = actionVerbs[topCategory as keyof typeof actionVerbs] || [
    "improving workflows",
    "enhancing productivity",
    "streamlining processes",
  ]

  const action = faker.helpers.arrayElement(actions)

  return template.replace("{category}", leafCategory).replace("{action}", action)
}

// Generate fake image URL
function generateImageUrl(name: string): string {
  const slug = createSlug(name)
  return `${slug}-${faker.string.alphanumeric(8)}.png`
}

// Generate a website URL for a tool
function generateWebsiteUrl(name: string): string {
  const slug = createSlug(name)
  const tlds = [".com", ".io", ".app", ".dev", ".co", ".tech", ".tools"] as const
  const tld = faker.helpers.arrayElement(tlds)
  return `https://www.${slug}${tld}`
}

async function main() {
  console.log("Starting database seeding...")

  // Clear existing data
  console.log("Clearing existing data...")
  await db.tool.deleteMany()
  await db.category.deleteMany()

  console.log("Creating top-level categories...")

  // Instead of generating random data, use our predefined category structure
  const topLevelCategoryIds: Record<string, string> = {}
  const subCategoryIds: Record<string, string> = {}
  const leafCategoryIds: Record<string, Record<string, string>> = {}

  // Create top-level categories (Level 1)
  for (const area of categoryAreas) {
    const topCategory = await db.category.create({
      data: {
        name: area.name,
        slug: createSlug(area.name),
        fullPath: createSlug(area.name),
        label: `${area.name} Tools`,
        description: `Tools for ${area.name.toLowerCase()} tasks and workflows`,
      },
    })

    topLevelCategoryIds[area.name] = topCategory.id
    leafCategoryIds[area.name] = {}

    console.error(`Created top-level category: ${area.name}`)

    // Create sub-categories (Level 2)
    for (const subCategoryName of area.subcategories) {
      const subCategorySlug = createSlug(subCategoryName)
      const fullPath = `${createSlug(area.name)}/${subCategorySlug}`

      const subCategory = await db.category.create({
        data: {
          name: subCategoryName,
          slug: subCategorySlug,
          fullPath: fullPath,
          label: `${subCategoryName} Tools`,
          description: `Tools for ${subCategoryName.toLowerCase()} in ${area.name.toLowerCase()}`,
          parentId: topCategory.id,
        },
      })

      subCategoryIds[subCategoryName] = subCategory.id

      console.warn(`Created sub-category: ${area.name} > ${subCategoryName}`)

      // Create leaf categories (Level 3)
      const leafCategories =
        area.leafCategories[subCategoryName as keyof typeof area.leafCategories]
      if (leafCategories) {
        for (const leafCategoryName of leafCategories) {
          const leafCategorySlug = createSlug(leafCategoryName)
          const leafFullPath = `${fullPath}/${leafCategorySlug}`

          const leafCategory = await db.category.create({
            data: {
              name: leafCategoryName,
              slug: leafCategorySlug,
              fullPath: leafFullPath,
              label: `${leafCategoryName} Tools`,
              description: `Specialized tools for ${leafCategoryName.toLowerCase()} tasks`,
              parentId: subCategory.id,
            },
          })

          if (!leafCategoryIds[area.name]) {
            leafCategoryIds[area.name] = {}
          }
          leafCategoryIds[area.name][leafCategoryName] = leafCategory.id

          console.log(
            `Created leaf category: ${area.name} > ${subCategoryName} > ${leafCategoryName}`,
          )

          // Create tools for each leaf category
          const toolsToCreate = Math.min(
            CONFIG.toolsPerLeafCategory,
            faker.number.int({ min: 5, max: 12 }),
          )

          for (let t = 0; t < toolsToCreate; t++) {
            let toolName: string
            if (t < 2) {
              // For the first two tools, use the leaf category name in the tool name for relevance
              toolName = `${leafCategoryName} ${faker.company.name().split(" ")[0]} ${faker.lorem.word()}`
            } else {
              toolName = `${faker.company.name().split(" ")[0]} ${faker.lorem.word()}`
            }

            await db.tool.create({
              data: {
                name: toolName,
                description: generateToolDescription(subCategoryName, leafCategoryName),
                url: generateWebsiteUrl(toolName),
                image: generateImageUrl(toolName),
                categories: {
                  connect: [{ id: leafCategory.id }],
                },
              },
            })
          }

          console.log(`Created ${toolsToCreate} tools for: ${leafCategoryName}  `)
        }
      }
    }
  }

  const categoryCount = await db.category.count()
  const toolCount = await db.tool.count()

  console.warn("Database seeding completed!")
  console.warn(`Created ${categoryCount} categories across 3 levels`)
  console.warn(`Created ${toolCount} tools assigned to leaf categories`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
