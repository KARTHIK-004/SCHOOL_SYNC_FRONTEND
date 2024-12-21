import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Users,
  GraduationCap,
  DollarSign,
  BarChart2,
  PieChart,
  TrendingUp,
  CalendarCheck,
  FileText,
  UserPlus,
  ClipboardList,
  BookOpen,
  Award,
  CreditCard,
  Receipt,
  PiggyBank,
  TrendingDown,
} from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

const tabs = [
  { value: "students", label: "Students", icon: Users },
  { value: "academics", label: "Academics", icon: GraduationCap },
  { value: "finance", label: "Finance", icon: DollarSign },
  { value: "analytics", label: "Analytics", icon: BarChart2 },
];

const features = {
  students: [
    {
      title: "Enrollment Management",
      description:
        "Streamline the admission process with online applications and document management.",
      icon: UserPlus,
    },
    {
      title: "Student Profiles",
      description:
        "Maintain comprehensive student records including academic history and personal information.",
      icon: ClipboardList,
    },
    {
      title: "Attendance Tracking",
      description:
        "Monitor student attendance with automated reporting and notification systems.",
      icon: CalendarCheck,
    },
    {
      title: "Parent Portal",
      description:
        "Provide parents with real-time access to their child's academic progress and school updates.",
      icon: Users,
    },
  ],
  academics: [
    {
      title: "Curriculum Management",
      description:
        "Design and manage course curricula, lesson plans, and educational resources.",
      icon: BookOpen,
    },
    {
      title: "Grading System",
      description:
        "Implement a flexible grading system with customizable assessment criteria.",
      icon: Award,
    },
    {
      title: "Learning Management System",
      description:
        "Facilitate online learning with integrated tools for assignments and discussions.",
      icon: GraduationCap,
    },
    {
      title: "Academic Calendar",
      description:
        "Organize school events, exams, and important dates in a centralized calendar.",
      icon: CalendarCheck,
    },
  ],
  finance: [
    {
      title: "Fee Management",
      description:
        "Automate fee collection, generate invoices, and track payments efficiently.",
      icon: CreditCard,
    },
    {
      title: "Payroll Processing",
      description:
        "Manage staff salaries, deductions, and generate pay slips with ease.",
      icon: Receipt,
    },
    {
      title: "Budgeting Tools",
      description:
        "Plan and allocate budgets for various departments and track expenses.",
      icon: PiggyBank,
    },
    {
      title: "Financial Reporting",
      description:
        "Generate comprehensive financial reports for auditing and decision-making.",
      icon: TrendingDown,
    },
  ],
  analytics: [
    {
      title: "Customizable Dashboards",
      description:
        "Create personalized dashboards with key metrics tailored to your institution's needs.",
      icon: PieChart,
    },
    {
      title: "Performance Trends",
      description:
        "Analyze long-term performance trends across various academic and administrative domains.",
      icon: TrendingUp,
    },
    {
      title: "Attendance Insights",
      description:
        "Track and visualize attendance patterns to improve student engagement and retention.",
      icon: CalendarCheck,
    },
    {
      title: "Comprehensive Reporting",
      description:
        "Generate detailed reports with advanced filtering and export capabilities.",
      icon: FileText,
    },
  ],
};

export default function FeaturesSection() {
  return (
    <section className="py-12 sm:py-20 bg-background">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            logo="⚡"
            title="Enterprise-Grade Solutions"
            heading="Integrated Educational Management"
            description="Elevate your institution's operational efficiency with our
            comprehensive suite of management tools, designed for the modern
            educational landscape."
          />
        </div>

        <div className="mt-16">
          <Tabs defaultValue="students" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                  {features[tab.value].map((feature, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                            <feature.icon className="h-5 w-5 text-primary" />
                          </div>
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
