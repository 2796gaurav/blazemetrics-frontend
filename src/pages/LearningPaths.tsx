import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Target, 
  Settings, 
  Cpu, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle,
  BookOpen,
  Zap,
  Wrench
} from "lucide-react"

export default function LearningPaths() {
  const learningPaths = [
    {
      id: "beginner",
      title: "Beginner Path",
      subtitle: "5-Minute Quick Start",
      description: "Perfect for newcomers to BlazeMetrics. Get up and running with your first evaluation in just 5 minutes.",
      duration: "5 minutes",
      difficulty: "Beginner",
      icon: Target,
      color: "bg-performance-excellent/10 text-performance-excellent border-performance-excellent/20",
      href: "/docs/getting-started",
      features: [
        "Installation and setup",
        "Your first evaluation",
        "Understanding results",
        "Simple use case example",
        "Progress tracking"
      ],
      audience: "New users, developers trying BlazeMetrics for the first time"
    },
    {
      id: "intermediate",
      title: "Intermediate Guide",
      subtitle: "Production-Ready Skills",
      description: "Master advanced configurations, best practices, and framework integrations for production use.",
      duration: "30 minutes",
      difficulty: "Intermediate",
      icon: Settings,
      color: "bg-accent/10 text-accent border-accent/20",
      href: "/docs/intermediate-guide",
      features: [
        "Production best practices",
        "Configuration optimization",
        "Troubleshooting guide",
        "Framework integrations",
        "Performance tuning"
      ],
      audience: "Developers implementing BlazeMetrics in production environments"
    },
    {
      id: "advanced",
      title: "Advanced Technical",
      subtitle: "Architecture & Customization",
      description: "Deep-dive into system architecture, custom metrics, performance optimization, and enterprise deployment.",
      duration: "60 minutes",
      difficulty: "Advanced",
      icon: Cpu,
      color: "bg-brand-crimson/10 text-brand-crimson border-brand-crimson/20",
      href: "/docs/advanced-technical",
      features: [
        "Architecture deep-dive",
        "Custom metrics & plugins",
        "Performance optimization",
        "Production deployment",
        "Monitoring & scaling"
      ],
      audience: "Senior developers, DevOps engineers, system architects"
    }
  ]

  const specializedPaths = [
    {
      title: "LLM Developer Path",
      description: "Specialized guidance for LLM evaluation, safety, and monitoring",
      href: "/llm-usage",
      icon: Zap,
      color: "text-brand-slate"
    },
    {
      title: "Use Cases Explorer",
      description: "Domain-specific examples and real-world applications",
      href: "/use-cases",
      icon: BookOpen,
      color: "text-performance-average"
    },
    {
      title: "API Reference",
      description: "Complete technical reference and method documentation",
      href: "/docs/api-reference",
      icon: Wrench,
      color: "text-brand-navy"
    }
  ]

  return (
    <>
      <Helmet>
        <title>Learning Paths | BlazeMetrics</title>
        <meta name="description" content="Structured learning paths for BlazeMetrics. Whether you're a beginner or advanced user, find the right path to master LLM evaluation." />
        <meta property="og:title" content="BlazeMetrics Learning Paths" />
        <meta property="og:description" content="Structured learning paths for BlazeMetrics LLM evaluation framework." />
        <link rel="canonical" href="https://blazemetrics-frontend.vercel.app/learning-paths" />
      </Helmet>
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-accent/10 to-transparent rounded-full -translate-y-40 translate-x-40"></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-6 relative z-10">
              <Target className="h-8 w-8 text-accent mr-3" />
              <h1 className="text-3xl lg:text-4xl font-bold">
                Learning Paths
              </h1>
            </div>
            <p className="text-lg text-muted-foreground relative z-10">
              Choose your learning journey based on your experience level and goals. 
              Each path is designed to get you productive quickly while building deep understanding.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Learning Paths */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8">Choose Your Learning Path</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => {
              const IconComponent = path.icon
              
              return (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="h-full p-6 hover:shadow-blaze-lg transition-all duration-300 group border-l-4 border-l-transparent hover:border-l-accent">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${path.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-black transition-colors">
                          {path.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{path.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{path.description}</p>

                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{path.duration}</span>
                      </div>
                      <Badge variant="secondary">{path.difficulty}</Badge>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">What you'll learn:</h4>
                      <ul className="space-y-1">
                        {path.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-accent mt-0.5 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        Best for:
                      </h4>
                      <p className="text-sm text-muted-foreground">{path.audience}</p>
                    </div>

                    <Button asChild className="w-full group-hover:bg-accent group-hover:text-white transition-colors">
                      <Link to={path.href}>
                        Start Learning
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Specialized Paths */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8">Specialized Learning Paths</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {specializedPaths.map((path, index) => {
              const IconComponent = path.icon
              
              return (
                <Card key={index} className="p-6 hover:shadow-blaze transition-all duration-300 group">
                  <div className="flex items-center mb-3">
                    <IconComponent className={`h-6 w-6 mr-3 ${path.color}`} />
                    <h3 className="text-lg font-semibold group-hover:text-black transition-colors">
                      {path.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{path.description}</p>
                  <Button variant="ghost" asChild className="p-0 group-hover:text-black">
                    <Link to={path.href}>
                      Explore →
                    </Link>
                  </Button>
                </Card>
              )
            })}
          </div>
        </motion.section>

        {/* Learning Tips */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="p-6 bg-gradient-to-r from-accent/5 to-performance-excellent/5 border-accent/20">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Target className="h-5 w-5 text-accent mr-2" />
              Learning Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">For Best Results:</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Start with the beginner path even if you're experienced</li>
                  <li>• Try the code examples in your own environment</li>
                  <li>• Join our community for questions and discussions</li>
                  <li>• Check out real-world use cases for inspiration</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Browse our comprehensive examples library</li>
                  <li>• Check the troubleshooting guides</li>
                  <li>• Visit our GitHub for community support</li>
                  <li>• Read the API reference for detailed documentation</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
    </>
  )
}