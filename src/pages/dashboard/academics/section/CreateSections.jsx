import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createSection, updateSection } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { SectionForm } from "@/components/Dashboard/Forms/Academics/section-form";
import InfoBanner from "@/components/ui/info-banner";

export default function CreateSections() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (sectionData) => {
    try {
      if (id) {
        await updateSection(id, sectionData);
        toast({
          title: "Success",
          description: "Section updated successfully",
        });
      } else {
        await createSection(sectionData);
        toast({
          title: "Success",
          description: "Section created successfully",
        });
      }
      // navigate('/sections');
    } catch (error) {
      console.error("Error saving section:", error);
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while saving the section",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Register Section
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and manage academic sections
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/dashboard/academics/classes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sections
          </Link>
        </Button>
      </div>

      <InfoBanner message="Please create the teacher first." type="warning" />

      <div className="container mx-auto max-w-6xl">
        <Card className="mt-4 border">
          <CardContent className="p-6">
            <SectionForm editingId={id} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>

      <TooltipProvider>
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Section Guidelines</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Section guidelines</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Important guidelines for setting up academic sections</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Define clear section names and identifiers.</li>
              <li>Specify the grade level and academic year.</li>
              <li>Set appropriate student capacity limits.</li>
              <li>Assign section coordinators or heads.</li>
              <li>Review section policies before finalizing.</li>
            </ul>
          </CardContent>
        </Card>
      </TooltipProvider>
    </div>
  );
}
