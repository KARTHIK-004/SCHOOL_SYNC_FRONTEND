import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  Users,
  FileText,
  MessageCircle,
  BarChart,
  CreditCard,
  Shield,
  Laptop,
} from "lucide-react";
import SectionHeader from "../ui/section-header";

const features = [
  {
    title: "Student Information Management",
    description:
      "Easily manage student records, including personal details, academic history, and attendance.",
    icon: Users,
  },
  {
    title: "Course Management",
    description:
      "Create and manage courses, assign teachers, and track curriculum progress.",
    icon: BookOpen,
  },
  {
    title: "Scheduling",
    description:
      "Effortlessly create and manage class schedules, exam timetables, and school events.",
    icon: Calendar,
  },
  {
    title: "Grade Management",
    description:
      "Record and calculate grades, generate report cards, and track student performance over time.",
    icon: FileText,
  },
  {
    title: "Communication",
    description:
      "Facilitate communication between teachers, students, and parents through integrated messaging.",
    icon: MessageCircle,
  },
  {
    title: "Reporting and Analytics",
    description:
      "Generate insightful reports on student performance, attendance, and other key metrics.",
    icon: BarChart,
  },
  {
    title: "Financial Management",
    description:
      "Handle school fees, generate invoices, and manage financial records efficiently.",
    icon: CreditCard,
  },
  {
    title: "Security and Access Control",
    description:
      "Ensure data privacy with role-based access control and secure authentication.",
    icon: Shield,
  },
  {
    title: "Online Learning Integration",
    description:
      "Seamlessly integrate with popular e-learning platforms for hybrid education models.",
    icon: Laptop,
  },
];

export function Features() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 ">
          <SectionHeader
            logo="🎓"
            title="Core Functionality"
            heading="How Our School Management System Works"
            description="Our school management system offers a wide range of features designed to streamline every aspect of educational administration."
          />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <feature.icon
                    className="w-6 h-6 mr-2 text-primary"
                    aria-hidden="true"
                  />
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
