import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Zap, Shield, BarChart3, Github, ExternalLink } from "lucide-react"
import { PerformanceChart } from "@/components/ui/performance-chart"
import { InteractiveDemo } from "./interactive-demo"
import { toast } from "@/components/ui/use-toast"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  
  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const textY = useTransform(scrollY, [0, 500], [0, -50])
  const heroContentY = useTransform(scrollY, [0, 500], [0, -100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const features = [
    {
      icon: Zap,
      text: "10-100x Faster",
      description: "Rust-powered core with SIMD optimizations"
    },
    {
      icon: Shield,
      text: "Enterprise Security",
      description: "Built-in PII detection and guardrails"
    },
    {
      icon: BarChart3,
      text: "Real-time Analytics", 
      description: "Streaming metrics and monitoring"
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 -z-10"
      >
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}
        />
        
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -right-32 w-96 h-96 bg-blaze-gradient rounded-full blur-3xl opacity-30"
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`
          }}
        />
        
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 -left-32 w-80 h-80 bg-gradient-to-r from-brand-slate/30 to-brand-light/30 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px)`
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div 
            style={{ y: heroContentY }}
            className="text-center lg:text-left space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge 
                variant="secondary" 
                className="mb-4 px-4 py-2 text-sm bg-blaze-gradient-soft border-accent/20"
              >
                🚀 New: Real-time LLM monitoring dashboard
              </Badge>
            </motion.div>

            <motion.div
              style={{ y: textY }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                <span className="block">100x Faster</span>
                <span className="gradient-text block">LLM Evaluation</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl">
                Rust-powered evaluation suite processing 1M+ evaluations per second. 
                Complete LLM quality, safety, and performance monitoring in one unified API.
              </p>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.text}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-2"
                  >
                    <Icon className="h-5 w-5 text-accent" />
                    <div>
                      <div className="text-sm font-medium">{feature.text}</div>
                      <div className="text-xs text-muted-foreground">{feature.description}</div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg" 
                className="group bg-blaze-gradient hover:shadow-blaze-glow transition-all duration-300"
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
              <Button
                size="lg"
                variant="ghost"
                className="group"
                asChild
              >
                <a
                  href="https://github.com/2796gaurav/blazemetrics"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Open Source
                  <ExternalLink className="ml-2 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50"
            >
              {[
                { value: "100x", label: "Faster" },
                { value: "1M+", label: "Evals/sec" },
                { value: "99.9%", label: "Uptime" }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <div className="relative z-10">
              <InteractiveDemo />
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -inset-4 bg-blaze-gradient rounded-2xl blur-xl opacity-20 -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}