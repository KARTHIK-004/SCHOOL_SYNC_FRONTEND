import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { ChevronRight, Pencil, Trash2, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddSectionDialog } from "@/components/Dashboard/Elements/add-section-dialog";
import { EditSectionDialog } from "@/components/Dashboard/Elements/edit-section-dialog";
import { DeleteDialog } from "@/components/Dashboard/Elements/delete-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  getSectionsByClassId,
  createSection,
  updateSection,
  deleteSection,
  getClass,
} from "@/utils/api";

export function Sections() {
  const { classId } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  const [sections, setSections] = useState([]);
  const [classInfo, setClassInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  useEffect(() => {
    if (classId) {
      fetchSections();
      fetchClassInfo();
    }
  }, [classId]);

  const fetchSections = async () => {
    if (!classId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await getSectionsByClassId(classId);
      setSections(response.data.sections || []);
    } catch (error) {
      console.error("Failed to fetch sections", error);
      setError("Failed to load sections. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load sections. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClassInfo = async () => {
    if (!classId) return;
    try {
      const response = await getClass(classId);
      setClassInfo(response.data);
    } catch (error) {
      console.error("Failed to fetch class info", error);
      toast({
        title: "Error",
        description: "Failed to load class information. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddSection = async (sectionName, teacherName) => {
    if (!classId) return;
    try {
      const sectionData = {
        name: sectionName,
        class: classId,
        teacher: teacherName,
      };
      const newSection = await createSection(sectionData);
      setSections((prevSections) => [...prevSections, newSection]);
      toast({
        title: "Success",
        description: `${sectionName} has been successfully added to the class.`,
      });
    } catch (error) {
      console.error("Failed to add section", error);
      toast({
        title: "Error",
        description: "Failed to add section. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditSection = async (id, newName, newTeacher) => {
    try {
      await updateSection(id, {
        name: newName,
        teacher: newTeacher,
      });
      setSections((prevSections) =>
        prevSections.map((s) =>
          s._id === id ? { ...s, name: newName, teacher: newTeacher } : s
        )
      );
      toast({
        title: "Success",
        description: `Section has been updated to ${newName}.`,
      });
    } catch (error) {
      console.error("Failed to update section", error);
      toast({
        title: "Error",
        description: "Failed to update section. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSection = async (id) => {
    try {
      await deleteSection(id);
      setSections((prevSections) => prevSections.filter((s) => s._id !== id));
      toast({
        title: "Success",
        description: "Section has been deleted from the class.",
      });
    } catch (error) {
      console.error("Failed to delete section", error);
      toast({
        title: "Error",
        description: "Failed to delete section. Please try again.",
        variant: "destructive",
      });
    }
  };

  const className =
    location.state?.className || classInfo?.name || "Loading...";

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link to="/dashboard/classes">Classes</Link>
            <ChevronRight className="h-4 w-4" />
            <span>{className}</span>
          </div>
          <h1 className="text-2xl font-bold">{className}</h1>
        </div>
        <AddSectionDialog onAddSection={handleAddSection} />
      </div>

      <ScrollArea className="flex-grow">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <p className="text-lg font-semibold mb-2">{error}</p>
            <Button onClick={fetchSections}>Try Again</Button>
          </div>
        ) : sections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
            {sections.map((section) => (
              <Card key={section._id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{section.name}</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditingSection(section)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit section</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          setDeletingItem({
                            type: "section",
                            id: section._id,
                            name: section.name,
                          })
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete section</span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Class Teacher: {section.teacher}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{section.students} students</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-lg font-semibold mb-4">
              No sections found for this class
            </p>
            <AddSectionDialog onAddSection={handleAddSection}>
              <Button>Add Your First Section</Button>
            </AddSectionDialog>
          </div>
        )}
      </ScrollArea>

      {editingSection && (
        <EditSectionDialog
          section={editingSection}
          onEdit={(newName, newTeacher) =>
            handleEditSection(editingSection._id, newName, newTeacher)
          }
          onClose={() => setEditingSection(null)}
        />
      )}

      {deletingItem && (
        <DeleteDialog
          item={deletingItem}
          onDelete={() => handleDeleteSection(deletingItem.id)}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
