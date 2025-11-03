import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationProvider } from "@/contexts/navigation-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/navigation/navbar";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import Benchmarks from "./pages/Benchmarks";
import LLMUsage from "./pages/LLMUsage";
import Blog from "./pages/Blog";
import About from "./pages/About";
import UseCases from "./pages/UseCases";
import NotFound from "./pages/NotFound";
// Documentation Pages
import GettingStarted from "./pages/docs/GettingStarted";
import APIReference from "./pages/docs/APIReference";
import MetricsGuide from "./pages/docs/MetricsGuide";
import GuardrailsGuide from "./pages/docs/GuardrailsGuide";
import ArchitectureGuide from "./pages/docs/ArchitectureGuide";
import AdvancedEvaluators from "./pages/docs/AdvancedEvaluators";
import AnalyticsGuide from "./pages/docs/AnalyticsGuide";
import ProductionGuide from "./pages/docs/ProductionGuide";
import LLMIntegrationGuide from "./pages/docs/LLMIntegrationGuide";
import LLMUseCases from "./pages/docs/LLMUseCases";
import LLMSafetyGuardrails from "./pages/docs/LLMSafetyGuardrails";
import LearningPaths from "./pages/LearningPaths";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="blazemetrics-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.VITE_APP_BASE_PATH || (import.meta.env.VERCEL === "1" ? "/" : "/blazemetrics")}>
          <NavigationProvider>
            <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/docs/getting-started" element={<GettingStarted />} />
        <Route path="/docs/architecture" element={<ArchitectureGuide />} />
        <Route path="/docs/api" element={<APIReference />} />
        <Route path="/docs/metrics" element={<MetricsGuide />} />
        <Route path="/docs/guardrails" element={<GuardrailsGuide />} />
        <Route path="/docs/advanced-evaluators" element={<AdvancedEvaluators />} />
        <Route path="/docs/analytics" element={<AnalyticsGuide />} />
        <Route path="/docs/production" element={<ProductionGuide />} />
        <Route path="/docs/llm-integration" element={<LLMIntegrationGuide />} />
        <Route path="/docs/llm-use-cases" element={<LLMUseCases />} />
        <Route path="/docs/llm-safety" element={<LLMSafetyGuardrails />} />
        <Route path="/learning-paths" element={<LearningPaths />} />
        <Route path="/benchmarks" element={<Benchmarks />} />
        <Route path="/use-cases" element={<UseCases />} />
        <Route path="/llm-usage" element={<LLMUsage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
          </NavigationProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
