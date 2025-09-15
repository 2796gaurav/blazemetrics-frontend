// Design System Configuration
// Standardizes colors, typography, spacing, and component variants across the application

export const designSystem = {
  // Color palette with semantic meanings
  colors: {
    // Brand colors
    brand: {
      primary: "hsl(var(--accent))",
      secondary: "hsl(var(--muted))",
      accent: "hsl(var(--accent))",
    },
    
    // Semantic colors
    semantic: {
      success: "hsl(142, 76%, 36%)",
      warning: "hsl(38, 92%, 50%)",
      error: "hsl(0, 84%, 60%)",
      info: "hsl(217, 91%, 60%)",
    },
    
    // Category colors for consistent content categorization
    category: {
      docs: {
        light: "hsl(217, 91%, 95%)",
        DEFAULT: "hsl(217, 91%, 60%)",
        dark: "hsl(217, 91%, 20%)",
      },
      performance: {
        light: "hsl(142, 76%, 95%)",
        DEFAULT: "hsl(142, 76%, 36%)",
        dark: "hsl(142, 76%, 20%)",
      },
      examples: {
        light: "hsl(262, 83%, 95%)",
        DEFAULT: "hsl(262, 83%, 58%)",
        dark: "hsl(262, 83%, 20%)",
      },
      llm: {
        light: "hsl(25, 95%, 95%)",
        DEFAULT: "hsl(25, 95%, 53%)",
        dark: "hsl(25, 95%, 20%)",
      },
      learning: {
        light: "hsl(291, 64%, 95%)",
        DEFAULT: "hsl(291, 64%, 42%)",
        dark: "hsl(291, 64%, 20%)",
      },
    },
  },
  
  // Typography scale
  typography: {
    // Font families
    fonts: {
      sans: "var(--font-sans)",
      mono: "var(--font-mono)",
    },
    
    // Font sizes with line heights
    sizes: {
      xs: { fontSize: "0.75rem", lineHeight: "1rem" },
      sm: { fontSize: "0.875rem", lineHeight: "1.25rem" },
      base: { fontSize: "1rem", lineHeight: "1.5rem" },
      lg: { fontSize: "1.125rem", lineHeight: "1.75rem" },
      xl: { fontSize: "1.25rem", lineHeight: "1.75rem" },
      "2xl": { fontSize: "1.5rem", lineHeight: "2rem" },
      "3xl": { fontSize: "1.875rem", lineHeight: "2.25rem" },
      "4xl": { fontSize: "2.25rem", lineHeight: "2.5rem" },
      "5xl": { fontSize: "3rem", lineHeight: "1" },
    },
    
    // Font weights
    weights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },
  
  // Spacing scale
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
    "4xl": "6rem",
    "5xl": "8rem",
  },
  
  // Border radius scale
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    full: "9999px",
  },
  
  // Shadow scale
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  
  // Animation durations
  animation: {
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
    slower: "500ms",
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const

// Component variants for consistent styling
export const componentVariants = {
  // Button variants
  button: {
    sizes: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10",
    },
    variants: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
  },
  
  // Card variants
  card: {
    variants: {
      default: "bg-card text-card-foreground border border-border",
      elevated: "bg-card text-card-foreground border border-border shadow-lg",
      interactive: "bg-card text-card-foreground border border-border hover:shadow-md transition-shadow cursor-pointer",
      gradient: "bg-gradient-to-br from-card to-muted text-card-foreground border border-border",
    },
  },
  
  // Badge variants
  badge: {
    variants: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "border border-input bg-background",
      success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    },
  },
} as const

// Utility functions for consistent styling
export const styleUtils = {
  // Get category color classes
  getCategoryColor: (category: string, variant: 'light' | 'DEFAULT' | 'dark' = 'DEFAULT') => {
    const categoryColors = designSystem.colors.category as any
    return categoryColors[category]?.[variant] || categoryColors.docs[variant]
  },
  
  // Get category badge classes
  getCategoryBadgeClass: (category: string) => {
    switch (category) {
      case 'docs':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'performance':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'examples':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'llm':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'learning':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  },
  
  // Generate responsive classes
  responsive: (classes: Record<string, string>) => {
    return Object.entries(classes)
      .map(([breakpoint, className]) => 
        breakpoint === 'base' ? className : `${breakpoint}:${className}`
      )
      .join(' ')
  },
  
  // Combine classes with proper precedence
  cn: (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ')
  },
}

// Standard terminology and API references
export const terminology = {
  // Consistent naming for features
  features: {
    evaluation: "Evaluation",
    metrics: "Metrics",
    guardrails: "Guardrails",
    benchmarks: "Benchmarks",
    integration: "Integration",
    monitoring: "Monitoring",
    analytics: "Analytics",
  },
  
  // API method naming conventions
  api: {
    client: "BlazeMetricsClient",
    methods: {
      evaluate: "evaluate()",
      configure: "configure()",
      monitor: "monitor()",
      export: "export()",
    },
  },
  
  // Consistent descriptions
  descriptions: {
    speed: "Lightning-fast evaluation powered by Rust",
    comprehensive: "Comprehensive evaluation metrics and tools",
    enterprise: "Enterprise-ready with guardrails and compliance",
    integration: "Seamless integration with popular LLM providers",
  },
} as const