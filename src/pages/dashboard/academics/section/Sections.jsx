import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Plus,
  ClipboardList,
  Loader2,
  Pencil,
  Trash2,
  Users,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { getSectionsByClassId, getClassById, deleteSection } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";

const EmptyState = ({ classId, className }) => (
  <Card className="border-dashed">
    <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
      <div className="bg-primary/10 p-3 rounded-full">
        <ClipboardList className="h-8 w-8 text-primary" />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">No Sections Available</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Get started by creating your first section. Sections help organize
          students and teachers within this class.
        </p>
      </div>
      <Button asChild>
        <Link
          to={`/dashboard/academics/classes/${classId}/section/new`}
          state={{ className: className }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create First Section
        </Link>
      </Button>
    </CardContent>
  </Card>
);

const SectionCard = ({ section, classId, className, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <Card
      className="relative group hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Section {section.sectionName}</span>
          <Badge variant="secondary">{section.sectionCode}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>Teacher: {section.classTeacher}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Students: {section.students}</span>
          </div>
        </div>
        {showActions && (
          <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" asChild>
              <Link
                to={`/dashboard/academics/classes/${classId}/section/${section._id}/edit`}
                state={{ className: className }}
              >
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the section and remove its data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(section._id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Sections = () => {
  const { classId } = useParams();
  const [currentClass, setCurrentClass] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    if (!classId) return;

    setLoading(true);
    try {
      const [classData, sectionsData] = await Promise.all([
        getClassById(classId),
        getSectionsByClassId(classId),
      ]);
      setCurrentClass(classData);
      setSections(sectionsData.data.sections || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch class and section data",
        variant: "destructive",
      });
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [classId, toast]);

  const handleDelete = async (sectionId) => {
    try {
      await deleteSection(sectionId);
      toast({
        title: "Success",
        description: "Section deleted successfully",
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting section:", error);
      toast({
        title: "Error",
        description: "Failed to delete section",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!currentClass) {
    return (
      <div className="container mx-auto px-4">
        <EmptyState classId={classId || ""} className="" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{currentClass.className}</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view sections for {currentClass.className}
          </p>
        </div>
        <Button asChild>
          <Link
            to={`/dashboard/academics/classes/${classId}/section/new`}
            state={{ className: currentClass.className }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Link>
        </Button>
      </div>

      {sections.length === 0 ? (
        <EmptyState
          classId={classId || ""}
          className={currentClass.className}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {sections.map((section) => (
            <SectionCard
              key={section._id}
              section={section}
              classId={classId || ""}
              className={currentClass.className}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sections;
