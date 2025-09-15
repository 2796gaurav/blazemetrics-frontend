import { ReactNode } from "react"
import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav"
import { RelatedContent } from "@/components/navigation/related-content"

interface PageLayoutProps {
  children: ReactNode
  showBreadcrumbs?: boolean
  showRelatedContent?: boolean
  relatedContentTitle?: string
  className?: string
}

export function PageLayout({ 
  children, 
  showBreadcrumbs = true, 
  showRelatedContent = true,
  relatedContentTitle,
  className = ""
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Main content area with top padding for fixed navbar */}
      <div className="pt-16">
        {showBreadcrumbs && <BreadcrumbNav />}
        
        <main className="flex-1">
          {children}
        </main>
        
        {showRelatedContent && (
          <RelatedContent 
            title={relatedContentTitle}
            className="border-t border-border/50 bg-muted/20"
          />
        )}
      </div>
    </div>
  )
}