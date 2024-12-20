import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SmallTitle from "@/components/ui/small-title";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary text-foreground">
      <main className="mx-auto px-4 pt-14 text-center">
        {/* Welcome Banner */}
        <SmallTitle logo="✨" title="Welcome to School Sync" />
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Your Complete School Management Solution
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            From admissions to academics, simplify every aspect of school
            administration with our comprehensive and user-friendly platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 ">
            <Button size="lg" className=" text-lg rounded-full h-12">
              Get Started
              <span className="ml-2">→</span>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-12">
              See All features
              <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
