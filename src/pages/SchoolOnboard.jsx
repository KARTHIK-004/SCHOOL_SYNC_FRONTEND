import SchoolOnboardForm from "@/components/Dashboard/Forms/School/school-onboard-form";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function SchoolOnboard() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-xl w-full">
          <Card className="mt-4 border">
            <CardContent className="p-6">
              <SchoolOnboardForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
