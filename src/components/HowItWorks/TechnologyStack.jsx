import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Database, Globe, Shield } from "lucide-react";
import SectionHeader from "../ui/section-header";

const technologies = [
  {
    title: "Backend",
    description:
      "Built with Node.js and Express for robust and scalable server-side operations.",
    icon: Server,
  },
  {
    title: "Database",
    description:
      "Utilizes MongoDB for reliable and efficient data storage and retrieval.",
    icon: Database,
  },
  {
    title: "Frontend",
    description:
      "Developed with React js for a responsive and dynamic user interface.",
    icon: Globe,
  },
  {
    title: "Security",
    description:
      "Implements industry-standard encryption and authentication protocols.",
    icon: Shield,
  },
];

export function TechnologyStack() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          <SectionHeader
            logo="💻"
            title="Technical Foundation"
            heading="Cutting-Edge Technology Stack"
            description="Our school management system is built on a robust and modern technology stack, ensuring reliability, scalability, and performance."
          />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technologies.map((tech, index) => (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <tech.icon
                    className="w-6 h-6 mr-2 text-primary"
                    aria-hidden="true"
                  />
                  <span>{tech.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{tech.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
