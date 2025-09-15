import IntermediateGuide from "@/components/learning/intermediate-guide"

export default function IntermediateGuidePage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-accent/10 to-transparent rounded-full -translate-y-40 translate-x-40"></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative z-10">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Intermediate User Guide
            </h1>
            <p className="text-lg text-muted-foreground">
              Master advanced BlazeMetrics features, configurations, and integrations for production use.
            </p>
          </div>
        </div>
      </section>

      <IntermediateGuide />
    </div>
  )
}