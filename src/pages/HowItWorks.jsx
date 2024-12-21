import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  Users,
  FileText,
  MessageCircle,
  BarChart,
} from "lucide-react";

export default function HowItWorks() {
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
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">
        How Our School Management System Works
      </h1>
      <p className="text-xl text-center text-muted-foreground mb-12">
        Streamline your school's operations with our comprehensive,
        user-friendly management system.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <feature.icon className="w-6 h-6 mr-2" />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to transform your school's management?
        </h2>
        <Button size="lg">Get Started</Button>
      </div>
    </div>
  );
}
