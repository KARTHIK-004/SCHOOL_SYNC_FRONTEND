import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import { Button } from "@/components/ui/button";
import { SupportAndTraining } from "@/components/HowItWorks/SupportAndTraining";
import { TechnologyStack } from "@/components/HowItWorks/TechnologyStack";
import { Implementation } from "@/components/HowItWorks/Implementation";
import { FAQ } from "@/components/HowItWorks/FAQ";
import { Features } from "@/components/HowItWorks/Features";

export default function HowItWorks() {
  return (
    <>
      <Navbar />
      <Features />
      <TechnologyStack />
      <Implementation />
      <SupportAndTraining />
      <FAQ />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center bg-primary text-primary-foreground p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to transform your school's management?
          </h2>
          <Button size="lg" variant="secondary">
            Get Started
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
