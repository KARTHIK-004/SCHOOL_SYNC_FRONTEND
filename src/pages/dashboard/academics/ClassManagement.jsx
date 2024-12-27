import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  ChevronRight,
  Pencil,
  Trash2,
  Users,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AddClassDialog } from "@/components/Dashboard/Elements/add-class-dialog";
import { AddSectionDialog } from "@/components/Dashboard/Elements/add-section-dialog";
import { EditClassDialog } from "@/components/Dashboard/Elements/edit-class-dialog";
import { EditSectionDialog } from "@/components/Dashboard/Elements/edit-section-dialog";
import { DeleteDialog } from "@/components/Dashboard/Elements/delete-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
  getSections,
  createSection,
  updateSection,
  deleteSection,
} from "@/utils/api";

export default function ClassManagement() {
  const { toast } = useToast();
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editingClass, setEditingClass] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchClasses();
    fetchSections();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await getClasses();
      const fetchedClasses = Array.isArray(response)
        ? response
        : response?.data?.classes || response?.classes || [];
      setClasses(fetchedClasses);
    } catch (error) {
      console.error("Failed to fetch classes", error);
      toast({
        title: "Failed to load classes",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
      setClasses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await getSections();
      const fetchedSections = response.data?.sections || [];

      const sectionsByClass = fetchedSections.reduce(
        (sectionGroups, section) => {
          const className = section.class.name;
          if (!sectionGroups[className]) {
            sectionGroups[className] = [];
          }
          sectionGroups[className].push(section);
          return sectionGroups;
        },
        {}
      );

      setSections(sectionsByClass);
    } catch (error) {
      console.error("Failed to fetch sections", error);
      toast({
        title: "Failed to load sections",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
      setSections({});
    }
  };

  const handleAddClass = async (className) => {
    try {
      const newClass = await createClass(className);
      if (newClass && newClass._id) {
        setClasses((prevClasses) => [...prevClasses, newClass]);
        toast({
          title: "Class Added",
          description: `${className} has been successfully added.`,
        });
      } else {
        throw new Error("Invalid class data received");
      }
    } catch (error) {
      console.error("Failed to add class", error);
      toast({
        title: "Failed to add class",
        description:
          error.message || "An error occurred while adding the class.",
        variant: "destructive",
      });
    }
  };

  const handleEditClass = async (classId, newName) => {
    try {
      const updatedClass = await updateClass(classId, { name: newName });
      setClasses(classes.map((c) => (c._id === classId ? updatedClass : c)));
      const oldClass = classes.find((c) => c._id === classId);
      if (oldClass) {
        setSections((prevSections) => {
          const updatedSections = { ...prevSections };
          if (updatedSections[oldClass.name]) {
            updatedSections[newName] = updatedSections[oldClass.name];
            delete updatedSections[oldClass.name];
          }
          return updatedSections;
        });
        if (selectedClass === oldClass.name) {
          setSelectedClass(newName);
        }
      }
      toast({
        title: "Class Updated",
        description: `Class has been renamed to ${newName}.`,
      });
    } catch (error) {
      console.error("Failed to update class", error);
      toast({
        title: "Failed to update class",
        description:
          error.message || "An error occurred while updating the class.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClass = async (id) => {
    try {
      await deleteClass(id);
      const deletedClass = classes.find((classItem) => classItem._id === id);
      setClasses((prevClasses) =>
        prevClasses.filter((classItem) => classItem._id !== id)
      );
      setSections((prevSections) => {
        const updatedSections = { ...prevSections };
        delete updatedSections[deletedClass.name];
        return updatedSections;
      });
      if (selectedClass === deletedClass.name) {
        setSelectedClass(null);
      }
      toast({
        title: "Class Deleted",
        description: `${deletedClass.name} has been deleted.`,
        variant: "destructive",
      });
    } catch (error) {
      console.error("Failed to delete class", error);
      toast({
        title: "Failed to delete class",
        description:
          error.message || "An error occurred while deleting the class.",
        variant: "destructive",
      });
    }
  };

  const handleAddSection = async (sectionName, teacherName) => {
    if (selectedClass) {
      try {
        const classObj = classes.find(
          (classItem) => classItem.name === selectedClass
        );
        const sectionData = {
          name: sectionName,
          class: classObj._id,
          teacher: teacherName,
        };
        const newSection = await createSection(sectionData);
        setSections((prevSections) => ({
          ...prevSections,
          [selectedClass]: [...(prevSections[selectedClass] || []), newSection],
        }));
        setClasses((prevClasses) =>
          prevClasses.map((classItem) =>
            classItem.name === selectedClass
              ? { ...classItem, sections: (classItem.sections || 0) + 1 }
              : classItem
          )
        );
        toast({
          title: "Section Added Successfully",
          description: `${sectionName} has been successfully added to the ${selectedClass} class.`,
        });
      } catch (error) {
        toast({
          title: "Failed to add section",
          description:
            error.response?.data?.message ||
            error.message ||
            "An error occurred while adding the section.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please select a class before adding a section.",
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
      setSections((prevSections) => ({
        ...prevSections,
        [selectedClass]: prevSections[selectedClass].map((s) =>
          s._id === id ? { ...s, name: newName, teacher: newTeacher } : s
        ),
      }));
      toast({
        title: "Section Updated",
        description: `Section has been updated to ${newName}.`,
      });
    } catch (error) {
      console.error("Failed to update section", error);
      toast({
        title: "Failed to update section",
        description:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while updating the section.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSection = async (id) => {
    try {
      await deleteSection(id);
      setSections((prevSections) => ({
        ...prevSections,
        [selectedClass]: prevSections[selectedClass].filter(
          (s) => s._id !== id
        ),
      }));
      setClasses((prevClasses) =>
        prevClasses.map((c) =>
          c.name === selectedClass ? { ...c, sections: c.sections - 1 } : c
        )
      );
      toast({
        title: "Section Deleted",
        description: `Section has been deleted from ${selectedClass}.`,
      });
    } catch (error) {
      console.error("Failed to delete section", error);
      toast({
        title: "Failed to delete section",
        description:
          error.message || "An error occurred while deleting the section.",
        variant: "destructive",
      });
    }
  };

  const handleClassClick = (className) => {
    setSelectedClass(className);
    setIsMobileMenuOpen(false);
  };

  const filteredClasses = Array.isArray(classes)
    ? classes.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col md:flex-row h-full bg-background">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden p-4 bg-card border-b">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "Hide Classes" : "Show Classes"}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-full md:w-80 p-4 border-r bg-card ${
          isMobileMenuOpen ? "block" : "hidden md:block"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Classes</h2>
          </div>
          <AddClassDialog onAddClass={handleAddClass} />
        </div>

        <div className="mb-4 relative">
          <Input
            type="search"
            placeholder="Search classes..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {isLoading ? (
            Array(4)
              .fill()
              .map((_, i) => (
                <div key={i} className="p-3 rounded-lg">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
          ) : filteredClasses.length > 0 ? (
            filteredClasses.map((classItem) => (
              <div
                key={classItem._id}
                className={`p-3 rounded-lg hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center justify-between group ${
                  selectedClass === classItem.name
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
                onClick={() => handleClassClick(classItem.name)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{classItem.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {classItem.sections} sections
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{classItem.students} students</span>
                  </div>
                </div>
                <div className="hidden group-hover:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingClass(classItem);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletingItem({
                        type: "class",
                        id: classItem._id,
                        name: classItem.name,
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-4">
              No classes found
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {selectedClass ? (
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <span>Classes</span>
                  <ChevronRight className="h-4 w-4" />
                  <span>{selectedClass}</span>
                </div>
                <h1 className="text-2xl font-bold">{selectedClass}</h1>
              </div>
              <AddSectionDialog onAddSection={handleAddSection} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                Array(3)
                  .fill()
                  .map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-1/2 mb-4" />
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardContent>
                    </Card>
                  ))
              ) : sections[selectedClass]?.length > 0 ? (
                sections[selectedClass].map((section) => (
                  <Card key={section._id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">
                          {section.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setEditingSection(section)}
                          >
                            <Pencil className="h-4 w-4" />
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
                ))
              ) : (
                <div className="col-span-full text-center text-muted-foreground py-4">
                  No sections found for this class
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Select a class to view its sections
          </div>
        )}
      </div>

      {editingClass && (
        <EditClassDialog
          classItem={editingClass}
          onEdit={handleEditClass}
          onClose={() => setEditingClass(null)}
        />
      )}

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
          onDelete={
            deletingItem.type === "class"
              ? () => handleDeleteClass(deletingItem.id)
              : () => handleDeleteSection(deletingItem.id)
          }
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
