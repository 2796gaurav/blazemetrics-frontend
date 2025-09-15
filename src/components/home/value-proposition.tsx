import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Code, 
  Globe, 
  Users,
  CheckCircle,
  X,
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const competitorComparison = [
  {
    feature: "Evaluation Speed",
    blazemetrics: "1M+ evals/sec",
    competitor1: "10K evals/sec",
    competitor2: "5K evals/sec",
    competitor3: "1K evals/sec",
    advantage: "100x faster"
  },
  {
    feature: "Built-in Safety",
    blazemetrics: true,
    competitor1: false,
    competitor2: "Limited",
    competitor3: false,
    advantage: "Complete PII & safety"
  },
  {
    feature: "LLM Provider Support",
    blazemetrics: "Universal",
    competitor1: "OpenAI only",
    competitor2: "Limited",
    competitor3: "Custom only",
    advantage: "Zero vendor lock-in"
  },
  {
    feature: "Real-time Analytics",
    blazemetrics: true,
    competitor1: false,
    competitor2: false,
    competitor3: "Basic",
    advantage: "Live monitoring"
  },
  {
    feature: "Multimodal Support",
    blazemetrics: true,
    competitor1: false,
    competitor2: "Text only",
    competitor3: false,
    advantage: "Text, code, images"
  },
  {
    feature: "Enterprise Features",
    blazemetrics: "Complete",
    competitor1: "Basic",
    competitor2: "Limited",
    competitor3: "None",
    advantage: "Production ready"
  }
]

const performanceMetrics = [
  {
    metric: "Processing Speed",
    value: "1,000,000+",
    unit: "evaluations/sec",
    improvement: "100x faster",
    icon: Zap,
    color: "text-performance-excellent"
  },
  {
    metric: "Memory Efficiency",
    value: "90%",
    unit: "less memory",
    improvement: "vs Python libs",
    icon: BarChart3,
    color: "text-performance-good"
  },
  {
    metric: "Setup Time",
    value: "< 2",
    unit: "minutes",
    improvement: "to first eval",
    icon: Clock,
    color: "text-performance-excellent"
  },
  {
    metric: "Cost Savings",
    value: "80%",
    unit: "reduction",
    improvement: "in compute costs",
    icon: DollarSign,
    color: "text-performance-excellent"
  }
]

const socialProof = [
  {
    company: "TechCorp AI",
    metric: "10x faster evaluations",
    quote: "BlazeMetrics reduced our evaluation pipeline from hours to minutes.",
    industry: "Enterprise AI"
  },
  {
    company: "HealthAI Labs",
    metric: "99.9% compliance rate",
    quote: "Built-in PII detection saved us months of compliance work.",
    industry: "Healthcare"
  },
  {
    company: "FinanceBot Inc",
    metric: "$50K saved monthly",
    quote: "Rust performance means 80% lower compute costs for our evaluations.",
    industry: "Financial Services"
  }
]

export function ValueProposition() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Why Choose BlazeMetrics?
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            The <span className="gradient-text">Complete</span> LLM Evaluation Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't settle for slow, incomplete evaluation tools. BlazeMetrics delivers 
            enterprise-grade performance, safety, and insights in one unified platform.
          </p>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={metric.metric} className="p-6 text-center group hover:shadow-blaze hover:border-accent/50 transition-all duration-300">
                <div className="w-12 h-12 bg-blaze-gradient-soft rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blaze-gradient transition-all duration-300">
                  <Icon className={`h-6 w-6 ${metric.color} group-hover:text-white transition-colors duration-300`} />
                </div>
                <div className="text-3xl font-bold gradient-text mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {metric.unit}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {metric.improvement}
                </Badge>
              </Card>
            )
          })}
        </motion.div>

        {/* Competitive Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              How BlazeMetrics <span className="gradient-text">Compares</span>
            </h3>
            <p className="text-muted-foreground">
              See why leading AI teams choose BlazeMetrics over alternatives
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Feature</th>
                    <th className="text-center p-4 font-medium">
                      <div className="flex items-center justify-center">
                        <Badge className="bg-blaze-gradient">BlazeMetrics</Badge>
                      </div>
                    </th>
                    <th className="text-center p-4 font-medium text-muted-foreground">Competitor A</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">Competitor B</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">Competitor C</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorComparison.map((row, index) => (
                    <tr key={row.feature} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          {typeof row.blazemetrics === 'boolean' ? (
                            row.blazemetrics ? (
                              <CheckCircle className="h-5 w-5 text-performance-excellent" />
                            ) : (
                              <X className="h-5 w-5 text-performance-poor" />
                            )
                          ) : (
                            <span className="text-performance-excellent font-medium">
                              {row.blazemetrics}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center text-muted-foreground">
                        {typeof row.competitor1 === 'boolean' ? (
                          row.competitor1 ? (
                            <CheckCircle className="h-5 w-5 text-performance-good mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-performance-poor mx-auto" />
                          )
                        ) : (
                          row.competitor1
                        )}
                      </td>
                      <td className="p-4 text-center text-muted-foreground">
                        {typeof row.competitor2 === 'boolean' ? (
                          row.competitor2 ? (
                            <CheckCircle className="h-5 w-5 text-performance-good mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-performance-poor mx-auto" />
                          )
                        ) : (
                          row.competitor2
                        )}
                      </td>
                      <td className="p-4 text-center text-muted-foreground">
                        {typeof row.competitor3 === 'boolean' ? (
                          row.competitor3 ? (
                            <CheckCircle className="h-5 w-5 text-performance-good mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-performance-poor mx-auto" />
                          )
                        ) : (
                          row.competitor3
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Social Proof */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Trusted by <span className="gradient-text">AI Leaders</span>
            </h3>
            <p className="text-muted-foreground">
              See the real impact BlazeMetrics delivers for teams like yours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {socialProof.map((proof, index) => (
              <motion.div
                key={proof.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full group hover:shadow-blaze hover:border-accent/50 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-5 w-5 text-performance-excellent mr-2" />
                    <Badge variant="secondary" className="text-xs">
                      {proof.industry}
                    </Badge>
                  </div>
                  
                  <div className="text-2xl font-bold gradient-text mb-2">
                    {proof.metric}
                  </div>
                  
                  <blockquote className="text-muted-foreground mb-4 italic">
                    "{proof.quote}"
                  </blockquote>
                  
                  <div className="text-sm font-medium">
                    — {proof.company}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-8 bg-blaze-gradient-soft border-accent/20">
            <h3 className="text-2xl font-bold mb-4">
              Ready to <span className="gradient-text">10x</span> your evaluation speed?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the AI teams already saving time and money with BlazeMetrics. 
              Start your free trial today and see the difference Rust-powered performance makes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blaze-gradient hover:shadow-blaze-glow group"
                onClick={() => {
                  navigator.clipboard.writeText("pip install blazemetrics");
                  toast({
                    title: "Copied to clipboard!",
                    description: "pip install blazemetrics",
                  });
                }}
              >
                pip install blazemetrics
                
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Open Source • 5-minute setup
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}