import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SmallTitle from "@/components/ui/small-title";

const features = [
  { title: "Complete Student Management System", included: true },
  { title: "Parent-Teacher Communication Platform", included: true },
  { title: "Attendance Tracking System", included: true },
  { title: "24/7 Customer Support", included: true },
  { title: "Academic & Examination Tools", included: true },
  { title: "Basic Financial Management", included: true },
  { title: "Real-time Notifications", included: true },
  { title: "Regular System Updates", included: true },
];

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = React.useState("annually");

  const price = billingCycle === "monthly" ? 299 : 2990;

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-4">
            <SmallTitle logo="🎯" title="Choose Your Plan" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Transparent, Per-Student Pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Simple, predictable pricing that grows with your institution. All
            features included, no hidden fees.
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            Special discounts available for large institutions.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Tabs
            defaultValue="monthly"
            value={billingCycle}
            onValueChange={setBillingCycle}
            className="w-full max-w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annually">
                Annually (2 months free)
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-10">
          <Card className="max-w-[1200px] mx-auto">
            <CardContent className="p-10">
              <div className="grid lg:grid-cols-[2fr,1fr] gap-10">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-semibold">
                      {billingCycle === "monthly" ? "Monthly" : "Annual"} School
                      License
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      {billingCycle === "monthly"
                        ? "Flexible month-to-month access to our comprehensive school management system. Ideal for schools that prefer monthly budgeting or want to start with a short-term commitment."
                        : "Get a full year of access at a discounted rate. Perfect for schools looking to secure long-term access and save on their annual education technology budget."}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-primary">
                      Everything you need included
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                      {features.map((feature) => (
                        <div
                          key={feature.title}
                          className="flex items-center gap-3"
                        >
                          <Check className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-muted-foreground">
                            {feature.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:border-l lg:pl-10 lg:pt-4">
                  <div className="text-center space-y-8">
                    <div>
                      <p className="text-lg text-muted-foreground mb-4">
                        Simple per-student pricing
                      </p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-6xl font-bold">₹{price}</span>
                        <span className="text-xl text-muted-foreground">
                          {billingCycle === "monthly"
                            ? "/student/month"
                            : "/student/year"}
                        </span>
                      </div>
                      {billingCycle === "annually" && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Equivalent to ₹249/student/month
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Button size="lg" className="w-full py-6 text-lg">
                        Start Free Trial
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        14-day free trial • No credit card required •{" "}
                        <br className="sm:hidden" />
                        Volume discounts available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
