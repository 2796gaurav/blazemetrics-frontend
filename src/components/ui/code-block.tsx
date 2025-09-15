import { useState } from "react"
import { Check, Copy, Play, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  description?: string
  filename?: string
  showCopy?: boolean
  showRun?: boolean
  onRun?: () => void
  runnable?: boolean
  output?: string
  tabs?: Array<{
    label: string
    code: string
    language?: string
  }>
  className?: string
}

export function CodeBlock({
  code,
  language = "typescript",
  title,
  description,
  filename,
  showCopy = true,
  showRun = false,
  onRun,
  runnable = false,
  output,
  tabs,
  className = ""
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const CodeContent = ({ codeContent, lang = language }: { codeContent: string, lang?: string }) => (
    <div className="relative">
      <pre className="overflow-x-auto p-4 text-sm bg-muted/50 rounded-lg border">
        <code className={`language-${lang}`}>
          {codeContent}
        </code>
      </pre>
      
      {/* Action buttons */}
      <div className="absolute top-2 right-2 flex items-center gap-2">
        {showRun && (runnable || onRun) && (
          <Button
            size="sm"
            variant="secondary"
            onClick={onRun}
            className="h-8 px-2"
          >
            <Play className="h-3 w-3 mr-1" />
            Run
          </Button>
        )}
        
        {showCopy && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleCopy(codeContent)}
            className="h-8 px-2"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <Card className={`overflow-hidden ${className}`}>
      {/* Header */}
      {(title || description || filename) && (
        <div className="px-4 py-3 border-b border-border bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              {title && (
                <h4 className="text-sm font-semibold text-foreground">
                  {title}
                </h4>
              )}
              {description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {filename && (
                <Badge variant="outline" className="text-xs">
                  {filename}
                </Badge>
              )}
              {language && (
                <Badge variant="secondary" className="text-xs">
                  {language}
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Code content */}
      {tabs ? (
        <Tabs defaultValue={tabs[0]?.label} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-muted/20">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.label} className="text-xs">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {tabs.map((tab) => (
            <TabsContent key={tab.label} value={tab.label} className="mt-0">
              <CodeContent codeContent={tab.code} lang={tab.language} />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <CodeContent codeContent={code} />
      )}

      {/* Output */}
      {output && (
        <div className="border-t border-border">
          <div className="px-4 py-2 bg-muted/10">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                Output
              </Badge>
            </div>
            <pre className="text-xs text-muted-foreground overflow-x-auto">
              {output}
            </pre>
          </div>
        </div>
      )}
    </Card>
  )
}