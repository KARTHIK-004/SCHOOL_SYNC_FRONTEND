import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getStudentById } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Name:</h3>
              <p>{`${student.firstname} ${student.lastname}`}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email:</h3>
              <p>{student.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Phone:</h3>
              <p>{student.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold">Date of Birth:</h3>
              <p>{new Date(student.dob).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-semibold">Gender:</h3>
              <p>{student.gender}</p>
            </div>
            <div>
              <h3 className="font-semibold">Address:</h3>
              <p>{student.address}</p>
            </div>
            <div>
              <h3 className="font-semibold">Class:</h3>
              <p>{student.class ? student.class.name : "N/A"}</p>
            </div>
            <div>
              <h3 className="font-semibold">Section:</h3>
              <p>{student.section ? student.section.name : "N/A"}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to={`/dashboard/students/edit/${student._id}`}>
              <Button>Edit Student</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDetails;
