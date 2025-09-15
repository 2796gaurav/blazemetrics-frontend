import { Link } from "react-router-dom"
import { ArrowRight, BookOpen, Zap, Code, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigation } from "@/contexts/navigation-context"

interface RelatedContentProps {
  className?: string
  title?: string
  maxItems?: number
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'docs':
      return <BookOpen className="h-4 w-4" />
    case 'performance':
      return <Zap className="h-4 w-4" />
    case 'examples':
      return <Code className="h-4 w-4" />
    case 'llm':
      return <Shield className="h-4 w-4" />
    default:
      return <ArrowRight className="h-4 w-4" />
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'docs':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'performance':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'examples':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'llm':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

export function RelatedContent({ 
  className, 
  title = "Related Content", 
  maxItems = 6 
}: RelatedContentProps) {
  const { relatedContent } = useNavigation()

  if (relatedContent.length === 0) {
    return null
  }

  const displayItems = relatedContent.slice(0, maxItems)

  return (
    <div className={`py-8 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground mt-2">
            Explore related documentation and resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item) => (
            <Link key={item.href} to={item.href} className="group">
              <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-accent/50 group-hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(item.category)}
                      <Badge 
                        variant="secondary" 
                        className={getCategoryColor(item.category)}
                      >
                        {item.category}
                      </Badge>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-black transition-colors">
                    {item.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2">
                    {item.description}
                  </CardDescription>
                  {item.keywords && item.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.keywords.slice(0, 3).map((keyword) => (
                        <Badge 
                          key={keyword} 
                          variant="outline" 
                          className="text-xs"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}