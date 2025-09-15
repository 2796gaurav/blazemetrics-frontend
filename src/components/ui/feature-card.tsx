import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { styleUtils } from "@/lib/design-system"

interface FeatureCardProps {
  title: string
  description: string
  icon?: ReactNode
  category?: string
  badge?: string
  href?: string
  external?: boolean
  action?: {
    label: string
    onClick?: () => void
  }
  features?: string[]
  variant?: 'default' | 'elevated' | 'interactive' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8"
}

const variantClasses = {
  default: "",
  elevated: "shadow-lg hover:shadow-xl transition-shadow",
  interactive: "hover:shadow-md hover:border-accent/50 hover:scale-[1.02] transition-all cursor-pointer",
  gradient: "bg-gradient-to-br from-card to-muted/20"
}

export function FeatureCard({
  title,
  description,
  icon,
  category,
  badge,
  href,
  external = false,
  action,
  features,
  variant = 'default',
  size = 'md',
  className = ""
}: FeatureCardProps) {
  const cardClasses = `h-full ${variantClasses[variant]} ${className}`
  
  const CardWrapper = ({ children }: { children: ReactNode }) => {
    if (href) {
      if (external) {
        return (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block"
          >
            {children}
          </a>
        )
      } else {
        return (
          <Link to={href} className="group block">
            {children}
          </Link>
        )
      }
    }
    return <div className="group">{children}</div>
  }

  return (
    <CardWrapper>
      <Card className={cardClasses}>
        <CardHeader className={sizeClasses[size]}>
          {/* Category and Badge */}
          {(category || badge) && (
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {category && (
                  <Badge 
                    variant="secondary" 
                    className={styleUtils.getCategoryBadgeClass(category)}
                  >
                    {category}
                  </Badge>
                )}
                {badge && (
                  <Badge variant="outline" className="text-xs">
                    {badge}
                  </Badge>
                )}
              </div>
              
              {href && (
                <div className="text-muted-foreground group-hover:text-black transition-colors">
                  {external ? (
                    <ExternalLink className="h-4 w-4" />
                  ) : (
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Icon and Title */}
          <div className="flex items-start gap-3">
            {icon && (
              <div className="flex-shrink-0 p-2 bg-accent/10 rounded-lg text-accent">
                {icon}
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg group-hover:text-black transition-colors">
                {title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className={`${sizeClasses[size]} pt-0`}>
          <CardDescription className="text-sm leading-relaxed mb-4">
            {description}
          </CardDescription>

          {/* Features list */}
          {features && features.length > 0 && (
            <ul className="space-y-2 mb-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Action button */}
          {action && (
            <Button
              variant="outline"
              size="sm"
              onClick={action.onClick}
              className="w-full group-hover:border-accent group-hover:text-black transition-colors"
            >
              {action.label}
              <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </CardContent>
      </Card>
    </CardWrapper>
  )
}