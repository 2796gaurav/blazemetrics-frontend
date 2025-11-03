import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { HeroSection } from "@/components/home/hero-section"
import { ValueProposition } from "@/components/home/value-proposition"
import { ContentCarousel } from "@/components/home/content-carousel"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { 
  Code, 
  Zap, 
  Shield, 
  BarChart3, 
  Globe, 
  Users,
  ArrowRight,
  CheckCircle
} from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Blazing Fast Performance",
    description: "Rust-powered BlazeMetrics core delivers 4.85s benchmark (vs NLTK 5.40s, SacreBLEU 5.51s, Huggingface 18.19s, TorchMetrics 63.59s) on 10,000 text pairs—faster than all leading Python libraries.",
    benefits: ["1M+ evaluations per second", "True wall-clock benchmark: 4.85s (BlazeMetrics) vs 5.40s (NLTK)", "Lowest memory use in class"]
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Built-in PII detection, guardrails, and safety checks ensure your data stays protected in production environments.",
    benefits: ["Real-time PII redaction", "Content filtering", "Compliance reporting"]
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Monitor model performance, detect drift, and get actionable insights with streaming analytics and alerting.",
    benefits: ["Live dashboards", "Anomaly detection", "Custom alerts"]
  },
  {
    icon: Code,
    title: "Universal Integration",
    description: "Works with any LLM provider - OpenAI, Anthropic, HuggingFace, or your custom models. Zero vendor lock-in.",
    benefits: ["Provider agnostic", "Simple API", "Extensive examples"]
  },
  {
    icon: Globe,
    title: "Multi-modal Support",
    description: "Evaluate text, code, images, and multi-modal outputs with comprehensive metrics and custom scorers.",
    benefits: ["Text & code evaluation", "Image quality metrics", "Custom scorers"]
  },
  {
    icon: Users,
    title: "Production Ready",
    description: "Battle-tested at scale with enterprise-grade reliability, monitoring, and export capabilities.",
    benefits: ["99.9% uptime", "Prometheus/Grafana", "Auto-scaling"]
  }
]

export default function Home() {
  return (
    <>
      <Helmet>
        <title>BlazeMetrics - Lightning Fast LLM Evaluation</title>
        <meta name="description" content="Ultra-high-performance evaluation suite for LLMs, GenAI, and multimodal models. Built with Rust for enterprise scale - 10-100x faster than alternatives." />
        <meta property="og:title" content="BlazeMetrics - Lightning Fast LLM Evaluation" />
        <meta property="og:description" content="Ultra-high-performance evaluation suite for LLMs, GenAI, and multimodal models. Built with Rust for enterprise scale - 10-100x faster than alternatives." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@gaurav_dev" />
        <meta name="twitter:image" content="/images/logo.png" />
        <link rel="canonical" href="https://blazemetrics-frontend.vercel.app/" />
      </Helmet>
      <div className="min-h-screen">
        <HeroSection />
        
        {/* Value Proposition Section */}
        <ValueProposition />
        
        {/* Content Carousel Section */}
        <ContentCarousel />
        
        {/* Features Section */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4">
                Why BlazeMetrics?
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Built for <span className="gradient-text">Production Scale</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From R&D to enterprise deployment, BlazeMetrics provides the speed, 
                security, and reliability you need for modern AI evaluation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 h-full group hover:shadow-blaze hover:border-accent/50 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blaze-gradient-soft rounded-lg flex items-center justify-center mr-4 group-hover:bg-blaze-gradient transition-all duration-300">
                          <Icon className="h-6 w-6 text-accent group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {feature.description}
                      </p>

                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Code Example Section */}
        <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-4">
                Simple to Use
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Get started in <span className="gradient-text">seconds</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                BlazeMetrics provides a simple, intuitive API that gets you evaluating 
                your models in minutes, not hours.
              </p>
              
              <div className="space-y-4">
                {[
                  "Install with pip or conda",
                  "Import and configure client",
                  "Run evaluations at scale",
                  "Monitor with real-time analytics"
                ].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className="w-8 h-8 bg-blaze-gradient rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <Link to="/docs">
                <Button className="mt-8 group" size="lg">
                  View Documentation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="p-6 bg-brand-navy text-brand-light">
                <pre className="text-sm overflow-x-auto">
                  <code>{`from blazemetrics import BlazeMetricsClient

# Initialize client
client = BlazeMetricsClient()

# Evaluate your model outputs
candidates = ["The model output..."]
references = [["Expected output..."]]

metrics = client.compute_metrics(candidates, references)
aggregated = client.aggregate_metrics(metrics)

print(f"BLEU: {aggregated['bleu']:.3f}")
print(f"ROUGE-L: {aggregated['rougeL_f1']:.3f}")

# Real-time safety check
safety = client.check_safety([
    "User generated content..."
])

print(f"Safe: {safety[0]['safe']}")
pii_detected = safety[0]['redacted'] != safety[0]['original']
print(f"PII detected: {pii_detected}")`}</code>
                </pre>
              </Card>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg"
              >
                4.85s ⚡ (BlazeMetrics official)
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-performance-excellent text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
              >
                ✓ Safe
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blaze-gradient-soft">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to <span className="gradient-text">accelerate</span> your AI evaluation?
            </h2>
            {/* <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers and enterprises using BlazeMetrics 
              to build better, safer AI applications.
            </p> */}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blaze-gradient hover:shadow-blaze-glow">
                pip install blazemetrics
              </Button>
            </div>

            {/* <p className="text-sm text-muted-foreground mt-6">
              Free tier available • No credit card required • Deploy anywhere
            </p> */}
          </motion.div>
        </div>
      </section>
    </div>
    </>
  )
}