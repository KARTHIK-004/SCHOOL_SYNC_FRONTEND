import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "../ui/section-header";

const implementationSteps = [
  {
    title: "Initial Consultation",
    description: "We discuss your school's specific needs and goals.",
  },
  {
    title: "System Customization",
    description: "We tailor the system to match your school's requirements.",
  },
  {
    title: "Data Migration",
    description: "We securely transfer your existing data to the new system.",
  },
  {
    title: "Staff Training",
    description: "We provide comprehensive training for all system users.",
  },
  {
    title: "Go Live and Support",
    description: "We ensure a smooth launch and provide ongoing support.",
  },
];

export function Implementation() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          <SectionHeader
            logo="🚀"
            title="Deployment Process"
            heading="Seamless Implementation"
            description="Our structured approach ensures a smooth transition to our school management system, minimizing disruption and maximizing adoption."
          />
        </h1>
        <ol className="space-y-8 max-w-3xl mx-auto">
          {implementationSteps.map((step, index) => (
            <li key={index}>
              <Card className="shadow-md">
                <CardContent className="flex items-start p-6">
                  <Badge variant="outline" className="mr-4 text-lg px-3 py-1">
                    {index + 1}
                  </Badge>
                  <div>
                    <h4 className="font-semibold text-xl mb-2">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
