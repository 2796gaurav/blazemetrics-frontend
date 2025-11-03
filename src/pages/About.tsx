import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Mail, MapPin, ExternalLink } from "lucide-react"

export default function About() {
  return (
    <>
      <Helmet>
        <title>About BlazeMetrics | Fast LLM Evaluation Framework</title>
        <meta name="description" content="Learn about BlazeMetrics - the fastest LLM evaluation framework built with Rust. Enterprise-ready evaluation suite for AI and GenAI models." />
        <meta property="og:title" content="About BlazeMetrics" />
        <meta property="og:description" content="Learn about BlazeMetrics - the fastest LLM evaluation framework." />
        <link rel="canonical" href="https://blazemetrics-frontend.vercel.app/about" />
      </Helmet>
    <div className="min-h-screen pt-16">
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              About <span className="gradient-text">BlazeMetrics</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're building the fastest, most reliable evaluation infrastructure for the AI-first world.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-8 bg-blaze-gradient-soft">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Questions about BlazeMetrics? Want to discuss enterprise deployment?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blaze-gradient">
                <Mail className="h-4 w-4 mr-2" />
                Contact Sales
              </Button>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Join Community
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
    </>
  )
}