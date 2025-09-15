import { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { styleUtils } from "@/lib/design-system"

interface ContentSectionProps {
  children: ReactNode
  title?: string
  description?: string
  category?: string
  badge?: string
  variant?: 'default' | 'elevated' | 'muted' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

const sizeClasses = {
  sm: "max-w-2xl",
  md: "max-w-4xl", 
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none"
}

const variantClasses = {
  default: "",
  elevated: "bg-card border border-border shadow-lg",
  muted: "bg-muted/50",
  gradient: "bg-gradient-to-br from-background to-muted/20"
}

export function ContentSection({
  children,
  title,
  description,
  category,
  badge,
  variant = 'default',
  size = 'xl',
  className = ""
}: ContentSectionProps) {
  const hasHeader = title || description || category || badge
  
  return (
    <section className={`py-12 ${variantClasses[variant]} ${className}`}>
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]}`}>
        {hasHeader && (
          <div className="mb-8 text-center">
            {/* Category and Badge */}
            {(category || badge) && (
              <div className="flex items-center justify-center gap-3 mb-4">
                {category && (
                  <Badge 
                    variant="secondary" 
                    className={styleUtils.getCategoryBadgeClass(category)}
                  >
                    {category}
                  </Badge>
                )}
                {badge && (
                  <Badge variant="outline">
                    {badge}
                  </Badge>
                )}
              </div>
            )}

            {/* Title */}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
            )}

            {/* Description */}
            {description && (
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  )
}