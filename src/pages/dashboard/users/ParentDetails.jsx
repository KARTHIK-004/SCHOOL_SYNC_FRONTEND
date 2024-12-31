import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getParentById } from "@/utils/api/parents";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Pencil } from "lucide-react";

const ParentDetails = () => {
  const { id } = useParams();
  const [parent, setParent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchParent = async () => {
      try {
        const data = await getParentById(id);
        setParent(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching parent:", error);
        toast({
          title: "Error",
          description: "Failed to load parent details",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchParent();
  }, [id, toast]);

  const parentDetails = parent
    ? [
        { label: "Name", value: `${parent.firstname} ${parent.lastname}` },
        { label: "Email", value: parent.email },
        { label: "Phone", value: parent.phone },
        { label: "WhatsApp", value: parent.whatsapp || "N/A" },
        { label: "Occupation", value: parent.occupation },
        { label: "Nationality", value: parent.nationality },
        { label: "Address", value: parent.address },
        { label: "State", value: parent.state },
        { label: "Relationship", value: parent.relationship },
        { label: "Preferred Contact", value: parent.preferredContact },
      ]
    : [];

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parent Details</h1>
          <p className="text-muted-foreground mt-2">
            View and manage parent information
          </p>
        </div>
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link to="/dashboard/parents">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Parents
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Parent Information</CardTitle>
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
          ) : !parent ? (
            <div className="text-center py-8">
              <p className="text-xl font-semibold">Parent not found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {parentDetails.map((detail, index) => (
                  <div key={index} className="space-y-1">
                    <h3 className="font-semibold text-sm ">{detail.label}</h3>
                    <p className="text-lg">{detail.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Button asChild>
                  <Link to={`/dashboard/parents/edit/${parent._id}`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Parent
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

export default ParentDetails;
