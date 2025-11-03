import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Book, 
  Search, 
  Zap, 
  Shield, 
  Code, 
  BarChart3,
  ArrowRight,
  ExternalLink,
  Clock
} from "lucide-react"

const docCategories = [
  {
    title: "Getting Started",
    description: "Quick setup and first evaluation",
    icon: Zap,
    color: "text-accent",
    // estimatedTime: "5 min",
    docs: [
      { title: "Installation & Setup", href: "/docs/getting-started" },
      { title: "Architecture & Philosophy", href: "/docs/architecture" },
      { title: "Quick Start Guide", href: "/docs/getting-started" },
      { title: "Configuration", href: "/docs/getting-started" }
    ]
  },
  {
    title: "Core Metrics",
    description: "Text evaluation and scoring",
    icon: BarChart3,
    color: "text-brand-slate",
    // estimatedTime: "15 min",
    docs: [
      { title: "All Metrics Guide", href: "/docs/metrics" },
      { title: "BLEU & ROUGE", href: "/docs/metrics" },
      { title: "METEOR & CHRF", href: "/docs/metrics" },
      { title: "Embedding Metrics", href: "/docs/metrics" }
    ]
  },
  {
    title: "Safety & Guardrails",
    description: "PII detection and content filtering",
    icon: Shield,
    color: "text-performance-excellent",
    // estimatedTime: "10 min",
    docs: [
      { title: "Guardrails Guide", href: "/docs/guardrails" },
      { title: "PII Detection", href: "/docs/guardrails" },
      { title: "Content Filtering", href: "/docs/guardrails" },
      { title: "Safety Scoring", href: "/docs/guardrails" }
    ]
  },
  {
    title: "LLM Integration",
    description: "Connect with any LLM provider",
    icon: Code,
    color: "text-brand-crimson",
    // estimatedTime: "20 min",
    docs: [
      { title: "LLM Usage Guide", href: "/llm-usage" },
      { title: "OpenAI Integration", href: "/llm-usage" },
      { title: "Anthropic Claude", href: "/llm-usage" },
      { title: "HuggingFace Models", href: "/llm-usage" }
    ]
  },
  {
    title: "Advanced Evaluators",
    description: "Agent, multimodal, and code evaluation",
    icon: BarChart3,
    color: "text-accent",
    // estimatedTime: "25 min",
    docs: [
      { title: "Agent Evaluation", href: "/docs/advanced-evaluators" },
      { title: "Multimodal Evaluation", href: "/docs/advanced-evaluators" },
      { title: "Code Generation", href: "/docs/advanced-evaluators" },
      { title: "Factuality & Safety", href: "/docs/advanced-evaluators" }
    ]
  },
  {
    title: "Analytics & Production",
    description: "Monitoring, alerting, and deployment",
    icon: Shield,
    color: "text-performance-good",
    // estimatedTime: "30 min",
    docs: [
      { title: "Analytics Guide", href: "/docs/analytics" },
      { title: "Production Guide", href: "/docs/production" },
      { title: "Monitoring & Alerts", href: "/docs/analytics" },
      { title: "Export & Integration", href: "/docs/analytics" }
    ]
  }
]

const recentUpdates = [
  {
    title: "Real-time Monitoring Dashboard",
    description: "New web dashboard for live metrics visualization",
    date: "2 days ago",
    type: "Feature"
  },
  {
    title: "Enhanced PII Detection",
    description: "Improved accuracy for detecting sensitive information",
    date: "1 week ago", 
    type: "Enhancement"
  },
  {
    title: "Anthropic Claude 3 Support",
    description: "Native integration with Claude 3 Opus and Sonnet",
    date: "2 weeks ago",
    type: "Integration"
  }
]

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <Helmet>
        <title>Documentation | BlazeMetrics</title>
        <meta name="description" content="Complete documentation for BlazeMetrics - LLM evaluation framework. Learn how to integrate BlazeMetrics into your AI evaluation workflow with comprehensive guides and API references." />
        <meta property="og:title" content="BlazeMetrics Documentation" />
        <meta property="og:description" content="Complete documentation for BlazeMetrics - LLM evaluation framework." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://blazemetrics.vercel.app/docs" />
      </Helmet>
      <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <Book className="h-12 w-12 text-accent mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="gradient-text">Documentation</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Everything you need to integrate BlazeMetrics into your AI evaluation workflow.
              From quick setup to advanced enterprise deployments.
            </p>

            {/* <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div> */}
          </motion.div>

          {/* Quick Links */}
          {/* <div className="grid md:grid-cols-3 gap-4 mb-12">
            {[
              { title: "Quick Start", href: "/docs/getting-started", icon: Zap },
              { title: "API Reference", href: "/docs/api", icon: Code },
              { title: "Advanced Evaluators", href: "/docs/advanced-evaluators", icon: BarChart3 }
            ].map((link, index) => {
              const Icon = link.icon
              return (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-4 hover:shadow-blaze transition-all duration-300 cursor-pointer group border-accent/10 hover:border-accent/30 bg-gradient-to-br from-card to-card/50">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                      <span className="font-medium group-hover:text-accent transition-colors">
                        {link.title}
                      </span>
                      <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div> */}
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-8">Documentation Categories</h2>
              
              <div className="py-16">
                {docCategories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="p-6 hover:shadow-blaze transition-all duration-300 border-l-4 border-l-accent/30 hover:border-l-accent bg-gradient-to-r from-card to-card/80">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Icon className={`h-6 w-6 ${category.color}`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-semibold">{category.title}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">

                              </div>
                            </div>
                            
                            <p className="text-muted-foreground mb-4">
                              {category.description}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-2">
                              {category.docs.map((doc) => (
                                <Button
                                  key={doc.title}
                                  variant="ghost"
                                  className="justify-start h-auto p-2 text-left group"
                                  asChild
                                >
                                  <Link to={doc.href}>
                                    <span className="group-hover:text-accent transition-colors">
                                      {doc.title}
                                    </span>
                                    <ArrowRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                  </Link>
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Sidebar */}
  
          </div>
        </div>
      </section>
    </div>
    </>
  )
}