import React, { useState, useEffect } from "react";
import { getParents } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Parents = () => {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const data = await getParents();
        setParents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching parents:", error);
        toast({
          title: "Error",
          description: "Failed to load parents. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchParents();
  }, [toast]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <CardTitle className="text-2xl font-bold">Parents</CardTitle>
          <Link to="/parents/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Parent
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Phone
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parents.map((parent) => (
                    <TableRow key={parent._id}>
                      <TableCell className="font-medium">{`${parent.firstname} ${parent.lastname}`}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {parent.email}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {parent.phone}
                      </TableCell>
                      <TableCell>
                        <Link to={`/dashboard/parents/${parent._id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Parents;
