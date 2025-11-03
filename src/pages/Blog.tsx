import { useState } from "react"
import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  BookOpen, 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  Clock,
  TrendingUp,
  Zap,
  Shield,
  BarChart3
} from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  featured: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Production-Ready LLM Evaluation Pipelines",
    excerpt: "Learn how to design scalable evaluation systems that handle millions of requests per day with BlazeMetrics.",
    content: "Full article content...",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "12 min",
    category: "Engineering",
    tags: ["Production", "Scalability", "LLM"],
    featured: true
  },
  {
    id: "2", 
    title: "The Science Behind BLEU: When and Why It Works",
    excerpt: "Deep dive into BLEU score mechanics, limitations, and when to use alternative metrics for different domains.",
    content: "Full article content...",
    author: "Dr. Michael Rodriguez",
    date: "2024-01-12",
    readTime: "8 min",
    category: "Research",
    tags: ["BLEU", "Metrics", "NLP"],
    featured: true
  },
  {
    id: "3",
    title: "Real-time PII Detection: Protecting User Data at Scale",
    excerpt: "How BlazeMetrics' Rust-powered PII detection identifies sensitive information 100x faster than traditional methods.",
    content: "Full article content...",
    author: "Alex Kim",
    date: "2024-01-10",
    readTime: "6 min", 
    category: "Security",
    tags: ["PII", "Security", "Privacy"],
    featured: false
  },
  {
    id: "4",
    title: "Benchmarking Claude 3 vs GPT-4: A Comprehensive Analysis",
    excerpt: "Side-by-side comparison of Claude 3 and GPT-4 across 15 different evaluation metrics and use cases.",
    content: "Full article content...",
    author: "Emma Thompson",
    date: "2024-01-08",
    readTime: "15 min",
    category: "Analysis",
    tags: ["Claude", "GPT-4", "Benchmarks"],
    featured: true
  },
  {
    id: "5",
    title: "Multi-modal Evaluation: Text, Images, and Beyond",
    excerpt: "Extending evaluation frameworks to handle text-to-image, image-to-text, and complex multi-modal workflows.",
    content: "Full article content...",
    author: "Dr. Lisa Park",
    date: "2024-01-05",
    readTime: "10 min",
    category: "Research",
    tags: ["Multi-modal", "Vision", "AI"],
    featured: false
  },
  {
    id: "6",
    title: "From Prototype to Production: A BlazeMetrics Success Story",
    excerpt: "How TechCorp reduced their evaluation latency by 95% and improved model quality scores across the board.",
    content: "Full article content...",
    author: "James Wilson",
    date: "2024-01-03",
    readTime: "7 min",
    category: "Case Study",
    tags: ["Success Story", "Performance", "Enterprise"],
    featured: false
  }
]

const categories = ["All", "Engineering", "Research", "Security", "Analysis", "Case Study"]

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Engineering": return Zap
      case "Security": return Shield
      case "Analysis": return BarChart3
      case "Research": return BookOpen
      default: return TrendingUp
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Engineering": return "bg-accent/10 text-accent"
      case "Security": return "bg-green-500/10 text-green-500"
      case "Analysis": return "bg-blue-500/10 text-blue-500"
      case "Research": return "bg-purple-500/10 text-purple-500"
      case "Case Study": return "bg-yellow-500/10 text-yellow-500"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <>
      <Helmet>
        <title>Blog | BlazeMetrics</title>
        <meta name="description" content="Insights, tutorials, and deep dives into LLM evaluation, performance optimization, and the latest in AI measurement science." />
        <meta property="og:title" content="BlazeMetrics Blog" />
        <meta property="og:description" content="Insights and tutorials about LLM evaluation and AI measurement." />
        <link rel="canonical" href="https://blazemetrics.vercel.app/blog" />
      </Helmet>
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-12 w-12 text-accent mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold">
                BlazeMetrics <span className="gradient-text">Blog</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Insights, tutorials, and deep dives into LLM evaluation, performance optimization, 
              and the latest in AI measurement science.
            </p>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}


      {/* Regular Posts */}


      {/* Newsletter Signup */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="p-8 bg-blaze-gradient-soft text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-4">
                Stay Updated with BlazeMetrics
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get the latest articles, tutorials, and insights delivered to your inbox. 
                No spam, unsubscribe anytime.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="your@email.com"
                  className="flex-1"
                />
                <Button className="bg-blaze-gradient">
                  Subscribe
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Join 2,500+ developers already subscribed
              </p>
            </motion.div>
          </Card>
        </div>
      </section>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-md px-4 text-center">
            <div className="text-muted-foreground mb-4">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold">No articles found</h3>
              <p className="text-sm mt-2">
                Try adjusting your search terms or selecting a different category.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
            >
              Clear filters
            </Button>
          </div>
        </section>
      )}
    </div>
    </>
  )
}