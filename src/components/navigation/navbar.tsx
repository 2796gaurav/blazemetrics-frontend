import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchBar } from "@/components/search/search-bar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Github, ExternalLink } from "lucide-react"

const navigation = [
  // Home entry removed to avoid duplication with the logo/product name
  { name: "Documentation", href: "/docs" },
  { name: "Use Cases", href: "/use-cases" },
  { name: "Benchmarks", href: "/benchmarks" },
  { name: "LLM Usage", href: "/llm-usage" },
  { name: "Learning Paths", href: "/learning-paths" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const NavLink = ({ item }: { item: typeof navigation[0] }) => {
    const isActive = location.pathname === item.href
    
    return (
      <Link
        to={item.href}
        className={`relative px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "text-accent"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {item.name}
        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute inset-x-0 -bottom-px h-px bg-accent"
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 30,
            }}
          />
        )}
      </Link>
    )
  }

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src="/blazemetrics/images/logo.png"
              alt="BlazeMetrics logo"
              className="w-8 h-8 object-contain drop-shadow group-hover:scale-105 group-hover:drop-shadow-lg transition-all duration-300"
            />
            <span className="text-xl font-bold gradient-text">
              BlazeMetrics
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 ml-8">
            {navigation.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block w-64">
              <SearchBar />
            </div>
            
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/2796gaurav/blazemetrics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Github className="h-5 w-5 group-hover:text-black transition-colors" />
                </a>
              </Button>

              {/* <Button variant="default" className="hidden sm:inline-flex group">
                Get Started
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button> */}

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <div className="flex flex-col space-y-6 pt-6">
                      <SearchBar />
                      
                      <nav className="flex flex-col space-y-2">
                        {navigation.map((item) => {
                          const isActive = location.pathname === item.href
                          return (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                isActive
                                  ? "bg-accent text-accent-foreground"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                              }`}
                            >
                              {item.name}
                            </Link>
                          )
                        })}
                      </nav>
                      
                      <Button className="w-full">
                        Get Started
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}