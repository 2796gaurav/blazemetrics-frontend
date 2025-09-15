import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Section {
  id: string
  title: string
  level: number
}

interface SectionIndicatorProps {
  className?: string
}

export function SectionIndicator({ className }: SectionIndicatorProps) {
  const [sections, setSections] = useState<Section[]>([])
  const [activeSection, setActiveSection] = useState<string>("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Find all headings on the page
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const sectionList: Section[] = []

    headings.forEach((heading) => {
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || ''
      if (id && heading.textContent) {
        // Set ID if not already set
        if (!heading.id) {
          heading.id = id
        }
        
        sectionList.push({
          id,
          title: heading.textContent,
          level: parseInt(heading.tagName.charAt(1))
        })
      }
    })

    setSections(sectionList)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Show indicator after scrolling down a bit
      setIsVisible(window.scrollY > 300)

      // Find the currently active section
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section.id)
        
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (sections.length === 0) {
    return null
  }

  return (
    <>
      {/* Table of Contents - Desktop */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
        className={`fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block ${className}`}
      >
        <Card className="p-4 w-64 max-h-96 overflow-y-auto bg-background/95 backdrop-blur-lg border-border/50">
          <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
            On this page
          </h4>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                  activeSection === section.id
                    ? 'text-accent bg-accent/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                style={{ paddingLeft: `${(section.level - 1) * 12 + 8}px` }}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </Card>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0.8 
        }}
        className="fixed bottom-8 right-8 z-40"
      >
        <Button
          onClick={scrollToTop}
          size="icon"
          className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Mobile Section Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        className="fixed bottom-4 left-4 right-4 z-40 xl:hidden"
      >
        <Card className="p-3 bg-background/95 backdrop-blur-lg border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1">Current section</p>
              <p className="text-sm font-medium truncate">
                {sections.find(s => s.id === activeSection)?.title || 'Introduction'}
              </p>
            </div>
            <Button
              onClick={scrollToTop}
              size="sm"
              variant="ghost"
              className="ml-2 flex-shrink-0"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </>
  )
}