import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  UserPlus,
  FileSpreadsheet,
  HelpCircle,
  User,
  Users,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SingleStudent from "@/components/Dashboard/Forms/Students/single-student-form";
import BulkStudent from "@/components/Dashboard/Forms/Students/bulk-student-form";
import InfoBanner from "@/components/ui/info-banner";
import { createStudent, updateStudentProfile } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";

export default function CreateStudents() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (studentData) => {
    try {
      if (id) {
        await updateStudentProfile(id, studentData);
        toast({
          title: "Success",
          description: "Student updated successfully",
        });
      } else {
        const newStudentData = { ...studentData };
        await createStudent(newStudentData);
        toast({
          title: "Success",
          description: "Student created successfully",
        });
      }
      // navigate('/dashboard/students');
    } catch (error) {
      console.error("Error saving student:", error);
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while saving the student",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Student Admission
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage new student entries efficiently
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/dashboard/students">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Students
          </Link>
        </Button>
      </div>

      <InfoBanner
        message="Please create the Parent, Class, and Stream first."
        type="warning"
      />

      <div className="container mx-auto max-w-6xl">
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid grid-cols-2 h-auto p-1 bg-primary-foreground">
            <TabsTrigger
              value="single"
              className="flex items-center gap-2 py-3 rounded-none"
            >
              <User className="h-5 w-5" />
              Single Student Admission
            </TabsTrigger>
            <TabsTrigger
              value="bulk"
              className="flex items-center gap-2 py-3 rounded-none"
            >
              <Users className="h-5 w-5" />
              Bulk Student Admission
            </TabsTrigger>
          </TabsList>
          <Card className="mt-4 border">
            <CardContent className="p-6">
              <TabsContent value="single">
                <SingleStudent editingId={id} onSubmit={handleSubmit} />
              </TabsContent>
              <TabsContent value="bulk">
                <BulkStudent />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>

      <TooltipProvider>
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Admission Tips</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Admission tips</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Helpful tips for efficient student admission</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ensure all required fields are filled accurately.</li>
              <li>Double-check student information before submission.</li>
              <li>
                For bulk admission, use our provided template for data
                consistency.
              </li>
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
