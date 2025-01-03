import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getStudentById } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Pencil } from "lucide-react";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        setStudent(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student:", error);
        toast({
          title: "Error",
          description: "Failed to load student details",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, toast]);

  const studentDetails = student
    ? [
        { label: "Name", value: `${student.firstname} ${student.lastname}` },
        { label: "Email", value: student.email },
        { label: "Phone", value: student.phone },
        {
          label: "Date of Birth",
          value: new Date(student.dob).toLocaleDateString(),
        },
        { label: "Gender", value: student.gender },
        { label: "Address", value: student.address },
        { label: "Class", value: student.class ? student.class.name : "N/A" },
        {
          label: "Section",
          value: student.section ? student.section.name : "N/A",
        },
      ]
    : [];

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Details</h1>
          <p className="text-muted-foreground mt-2">
            View and manage student information
          </p>
        </div>
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link to="/dashboard/students">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Students
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>
          ) : !student ? (
            <div className="text-center py-8">
              <p className="text-xl font-semibold">Student not found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studentDetails.map((detail, index) => (
                  <div key={index} className="space-y-1">
                    <h3 className="font-semibold text-sm ">{detail.label}</h3>
                    <p className="text-lg">{detail.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Button asChild>
                  <Link to={`/dashboard/students/edit/${student._id}`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Student
                  </Link>
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDetails;
