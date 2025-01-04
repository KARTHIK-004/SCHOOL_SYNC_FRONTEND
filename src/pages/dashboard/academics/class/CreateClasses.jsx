import React, { useState } from "react";
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
import { createClass, updateClass } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { ClassForm } from "@/components/Dashboard/Forms/Academics/class-form";

export default function CreateClasses() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (classData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (id) {
        await updateClass(id, classData);
        toast({
          title: "Success",
          description: "Class updated successfully",
        });
      } else {
        await createClass(classData);
        toast({
          title: "Success",
          description: "Class created successfully",
        });
      }
      navigate("/dashboard/academics/classes");
    } catch (error) {
      console.error("Error saving class:", error);
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while saving the class",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Register Class</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage class configurations
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/dashboard/academics/classes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Classes
          </Link>
        </Button>
      </div>

      <div className="container mx-auto max-w-6xl">
        <Card className="mt-4 border">
          <CardContent className="p-6">
            <ClassForm
              editingId={id}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </Card>
      </div>

      <TooltipProvider>
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                Class Configuration Guidelines
              </CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">
                      Class configuration guidelines
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Important guidelines for configuring classes</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Assign qualified teachers to each class.</li>
              <li>Set up class schedules and time slots.</li>
              <li>Configure room assignments and resources.</li>
              <li>Define subject curriculum and learning objectives.</li>
              <li>Specify assessment methods and grading criteria.</li>
            </ul>
          </CardContent>
        </Card>
      </TooltipProvider>
    </div>
  );
}
