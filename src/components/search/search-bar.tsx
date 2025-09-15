import { useState, useRef, useEffect } from "react"
import { Search, X, BookOpen, Zap, Code, Shield, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useDebounce } from "use-debounce"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigation } from "@/contexts/navigation-context"
import { useNavigate } from "react-router-dom"

interface SearchBarProps {
  className?: string
  placeholder?: string
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

export function SearchBar({ 
  className, 
  placeholder = "Search docs, examples, and guides..." 
}: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [debouncedQuery] = useDebounce(query, 300)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  
  const { searchContent } = useNavigation()
  const results = searchContent(debouncedQuery)

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [debouncedQuery])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleClear = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleResultClick = (url: string) => {
    setIsOpen(false)
    setQuery("")
    navigate(url)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 h-10 bg-background/50 backdrop-blur-sm border-border/50"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full z-50"
          >
            <Card className="p-2 max-h-80 overflow-y-auto bg-background/95 backdrop-blur-lg border-border/50">
              {results.length > 0 ? (
                results.map((result, index) => (
                  <motion.div
                    key={result.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleResultClick(result.href)}
                    className="flex flex-col p-3 hover:bg-muted/50 rounded-lg cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(result.category)}
                        <h4 className="text-sm font-medium group-hover:text-black transition-colors">
                          {result.name}
                        </h4>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getCategoryColor(result.category)}`}
                      >
                        {result.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {result.description}
                    </p>
                    {result.keywords && result.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {result.keywords.slice(0, 3).map((keyword) => (
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
                  </motion.div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No results found for "{debouncedQuery}"</p>
                  <p className="text-xs mt-1">Try different keywords or browse our documentation</p>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}