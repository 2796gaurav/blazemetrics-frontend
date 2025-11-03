import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | BlazeMetrics</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-background pt-16">
        <div className="text-center max-w-2xl px-4">
          <h1 className="mb-4 text-6xl font-bold gradient-text">404</h1>
          <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/docs">
                View Documentation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
