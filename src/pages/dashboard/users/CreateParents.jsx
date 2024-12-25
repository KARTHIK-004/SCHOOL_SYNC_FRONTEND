import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ParentRegistration from "@/components/Dashboard/Forms/Users/parent-registration";

export default function CreateParents() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Register Parents
          </h1>
          <p className="text-muted-foreground mt-2">
            Efficiently manage new parent registrations
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/dashboard/users/parents">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Parents
          </Link>
        </Button>
      </div>

      <div className="container mx-auto max-w-6xl">
        <Card className="mt-4 border">
          <CardContent className="p-6">
            <ParentRegistration />
          </CardContent>
        </Card>
      </div>

      <TooltipProvider>
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Registration Tips</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Registration tips</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Helpful tips for efficient parent registration</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ensure all required fields are filled accurately.</li>
              <li>Verify parent information before submission.</li>
              <li>
                Include preferred contact method and additional contact details.
              </li>
              <li>Double-check nationality and ID/passport information.</li>
              <li>
                Contact support if you encounter any issues during the process.
              </li>
            </ul>
          </CardContent>
        </Card>
      </TooltipProvider>
    </div>
  );
}
