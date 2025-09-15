import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface NavigationItem {
  name: string
  href: string
  description?: string
  category: string
  keywords?: string[]
  children?: NavigationItem[]
}

interface BreadcrumbItem {
  name: string
  href: string
}

interface NavigationContextType {
  navigationItems: NavigationItem[]
  currentPath: string
  breadcrumbs: BreadcrumbItem[]
  relatedContent: NavigationItem[]
  searchContent: (query: string) => NavigationItem[]
  getPageInfo: (path: string) => NavigationItem | null
}

const navigationStructure: NavigationItem[] = [
  {
    name: "Home",
    href: "/",
    description: "BlazeMetrics - Lightning-fast LLM evaluation framework",
    category: "main",
    keywords: ["home", "overview", "introduction"]
  },
  {
    name: "Documentation",
    href: "/docs",
    description: "Complete documentation for BlazeMetrics",
    category: "docs",
    keywords: ["docs", "documentation", "guide"],
    children: [
      {
        name: "Getting Started",
        href: "/docs/getting-started",
        description: "Quick start guide for BlazeMetrics",
        category: "docs",
        keywords: ["installation", "setup", "quickstart", "tutorial"]
      },
      {
        name: "API Reference",
        href: "/docs/api",
        description: "Complete API documentation",
        category: "docs",
        keywords: ["api", "reference", "methods", "functions"]
      },
      {
        name: "Metrics Guide",
        href: "/docs/metrics",
        description: "Comprehensive guide to evaluation metrics",
        category: "docs",
        keywords: ["metrics", "bleu", "rouge", "similarity", "evaluation"]
      },
      {
        name: "Advanced Evaluators",
        href: "/docs/advanced-evaluators",
        description: "Advanced evaluation capabilities",
        category: "docs",
        keywords: ["evaluators", "advanced", "custom", "multimodal", "agent"]
      },
      {
        name: "Guardrails Guide",
        href: "/docs/guardrails",
        description: "Safety and compliance features",
        category: "docs",
        keywords: ["guardrails", "safety", "compliance", "pii", "content filtering"]
      },
      {
        name: "LLM Integration Guide",
        href: "/docs/llm-integration",
        description: "Integrate with LLM providers",
        category: "docs",
        keywords: ["llm", "openai", "anthropic", "huggingface", "integration"]
      },
      {
        name: "LLM Use Cases",
        href: "/docs/llm-use-cases",
        description: "LLM-specific evaluation scenarios",
        category: "docs",
        keywords: ["llm", "use cases", "examples", "scenarios"]
      },
      {
        name: "LLM Safety & Guardrails",
        href: "/docs/llm-safety",
        description: "LLM safety and guardrail implementations",
        category: "docs",
        keywords: ["llm", "safety", "guardrails", "compliance"]
      },
      {
        name: "Architecture Guide",
        href: "/docs/architecture",
        description: "System architecture and design",
        category: "docs",
        keywords: ["architecture", "design", "system", "rust", "performance"]
      },
      {
        name: "Analytics Guide",
        href: "/docs/analytics",
        description: "Analytics and monitoring features",
        category: "docs",
        keywords: ["analytics", "monitoring", "tracking", "metrics"]
      },
      {
        name: "Production Guide",
        href: "/docs/production",
        description: "Production deployment and best practices",
        category: "docs",
        keywords: ["production", "deployment", "scaling", "monitoring"]
      }
    ]
  },
  {
    name: "Use Cases",
    href: "/use-cases",
    description: "Real-world use cases and examples",
    category: "examples",
    keywords: ["use cases", "examples", "scenarios", "applications"]
  },
  {
    name: "Benchmarks",
    href: "/benchmarks",
    description: "Performance benchmarks and comparisons",
    category: "performance",
    keywords: ["benchmarks", "performance", "speed", "comparison", "rust"]
  },
  {
    name: "LLM Usage",
    href: "/llm-usage",
    description: "LLM-specific usage patterns and examples",
    category: "llm",
    keywords: ["llm", "usage", "patterns", "examples", "integration"]
  },
  {
    name: "Learning Paths",
    href: "/learning-paths",
    description: "Structured learning paths for different user types",
    category: "learning",
    keywords: ["learning", "paths", "tutorial", "beginner", "advanced"]
  },
  {
    name: "Blog",
    href: "/blog",
    description: "Latest news and insights",
    category: "content",
    keywords: ["blog", "news", "insights", "updates"]
  },
  {
    name: "About",
    href: "/about",
    description: "About BlazeMetrics and the team",
    category: "company",
    keywords: ["about", "team", "company", "mission"]
  }
]

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [currentPath, setCurrentPath] = useState(location.pathname)

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location.pathname])

  const flattenNavigationItems = (items: NavigationItem[]): NavigationItem[] => {
    const flattened: NavigationItem[] = []
    
    const flatten = (items: NavigationItem[]) => {
      items.forEach(item => {
        flattened.push(item)
        if (item.children) {
          flatten(item.children)
        }
      })
    }
    
    flatten(items)
    return flattened
  }

  const allItems = flattenNavigationItems(navigationStructure)

  const generateBreadcrumbs = (path: string): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = []
    
    // Always start with Home
    if (path !== '/') {
      breadcrumbs.push({ name: 'Home', href: '/' })
    }

    // Find the current item and build breadcrumb trail
    const currentItem = allItems.find(item => item.href === path)
    
    if (currentItem) {
      // For docs pages, add Documentation as parent
      if (path.startsWith('/docs') && path !== '/docs') {
        breadcrumbs.push({ name: 'Documentation', href: '/docs' })
      }
      
      // Add current page
      breadcrumbs.push({ name: currentItem.name, href: currentItem.href })
    }

    return breadcrumbs
  }

  const getRelatedContent = (path: string): NavigationItem[] => {
    const currentItem = allItems.find(item => item.href === path)
    if (!currentItem) return []

    // Find related items based on category and keywords
    const related = allItems.filter(item => {
      if (item.href === path) return false
      
      // Same category
      if (item.category === currentItem.category) return true
      
      // Shared keywords
      if (currentItem.keywords && item.keywords) {
        const sharedKeywords = currentItem.keywords.filter(keyword => 
          item.keywords?.includes(keyword)
        )
        if (sharedKeywords.length > 0) return true
      }
      
      return false
    })

    return related.slice(0, 6) // Limit to 6 related items
  }

  const searchContent = (query: string): NavigationItem[] => {
    if (!query.trim()) return []
    
    const searchTerm = query.toLowerCase()
    
    return allItems.filter(item => {
      // Search in name
      if (item.name.toLowerCase().includes(searchTerm)) return true
      
      // Search in description
      if (item.description?.toLowerCase().includes(searchTerm)) return true
      
      // Search in keywords
      if (item.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))) return true
      
      return false
    }).slice(0, 10) // Limit to 10 results
  }

  const getPageInfo = (path: string): NavigationItem | null => {
    return allItems.find(item => item.href === path) || null
  }

  const value: NavigationContextType = {
    navigationItems: navigationStructure,
    currentPath,
    breadcrumbs: generateBreadcrumbs(currentPath),
    relatedContent: getRelatedContent(currentPath),
    searchContent,
    getPageInfo
  }

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}