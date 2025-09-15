import { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, BookOpen } from "lucide-react"
import { styleUtils } from "@/lib/design-system"

interface PageHeaderProps {
  title: string
  description?: string
  category?: string
  badge?: string
  badgeVariant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'info'
  actions?: ReactNode
  showGithubLink?: boolean
  githubUrl?: string
  showDocsLink?: boolean
  docsUrl?: string
  className?: string
}

export function PageHeader({
  title,
  description,
  category,
  badge,
  badgeVariant = 'default',
  actions,
  showGithubLink = false,
  githubUrl = "https://github.com/2796gaurav/blazemetrics",
  showDocsLink = false,
  docsUrl = "/docs",
  className = ""
}: PageHeaderProps) {
  return (
    <div className={`py-12 border-b border-border/50 bg-gradient-to-b from-background to-muted/20 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1 min-w-0">
            {/* Category and Badge */}
            <div className="flex items-center gap-3 mb-4">
              {category && (
                <Badge 
                  variant="secondary" 
                  className={styleUtils.getCategoryBadgeClass(category)}
                >
                  {category}
                </Badge>
              )}
              {badge && (
                <Badge variant={badgeVariant}>
                  {badge}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl">
                {description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {showDocsLink && (
              <Button variant="outline" asChild>
                <a href={docsUrl}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Documentation
                </a>
              </Button>
            )}
            
            {showGithubLink && (
              <Button variant="outline" asChild>
                <a 
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            )}
            
            {actions}
          </div>
        </div>
      </div>
    </div>
  )
}