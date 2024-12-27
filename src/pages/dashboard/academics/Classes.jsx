import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Search,
  ChevronRight,
  Pencil,
  Trash2,
  Users,
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
import { ScrollArea } from "@/components/ui/scroll-area";

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

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setClasses([
        { id: "1", name: "Class 5", sections: 3, students: 120 },
        { id: "2", name: "Class 6", sections: 2, students: 80 },
        { id: "3", name: "Class 7", sections: 4, students: 160 },
        { id: "4", name: "Class 8", sections: 3, students: 115 },
      ]);
      setSections({
        "Class 5": [
          { id: "1", name: "5A", teacher: "Ms. Sarah", students: 40 },
          { id: "2", name: "5B", teacher: "Mr. John", students: 38 },
          { id: "3", name: "5C", teacher: "Ms. Emily", students: 42 },
        ],
        "Class 6": [
          { id: "4", name: "6A", teacher: "Mr. Smith", students: 35 },
          { id: "5", name: "6B", teacher: "Ms. Johnson", students: 45 },
        ],
        "Class 7": [
          { id: "6", name: "7A", teacher: "Mr. Brown", students: 40 },
          { id: "7", name: "7B", teacher: "Ms. Davis", students: 38 },
          { id: "8", name: "7C", teacher: "Mr. Wilson", students: 42 },
          { id: "9", name: "7D", teacher: "Ms. Taylor", students: 40 },
        ],
        "Class 8": [
          { id: "10", name: "8A", teacher: "Mr. Anderson", students: 38 },
          { id: "11", name: "8B", teacher: "Ms. Thomas", students: 40 },
          { id: "12", name: "8C", teacher: "Mr. Jackson", students: 37 },
        ],
      });
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleAddClass = (className) => {
    const newClass = {
      id: Date.now().toString(),
      name: className,
      sections: 0,
      students: 0,
    };
    setClasses([...classes, newClass]);
    setSections({ ...sections, [className]: [] });
    toast({
      title: "Class Added",
      description: `${className} has been successfully added.`,
    });
  };

  const handleEditClass = (id, newName) => {
    const oldName = classes.find((c) => c.id === id).name;
    setClasses(classes.map((c) => (c.id === id ? { ...c, name: newName } : c)));
    setSections({ ...sections, [newName]: sections[oldName] });
    delete sections[oldName];
    if (selectedClass === oldName) setSelectedClass(newName);
    toast({
      title: "Class Updated",
      description: `${oldName} has been renamed to ${newName}.`,
    });
  };

  const handleDeleteClass = (id) => {
    const className = classes.find((c) => c.id === id).name;
    setClasses(classes.filter((c) => c.id !== id));
    delete sections[className];
    if (selectedClass === className) setSelectedClass(null);
    toast({
      title: "Class Deleted",
      description: `${className} has been deleted.`,
    });
  };

  const handleAddSection = (sectionName, teacherName) => {
    if (selectedClass) {
      const newSection = {
        id: Date.now().toString(),
        name: sectionName,
        teacher: teacherName,
        students: 0,
      };
      setSections({
        ...sections,
        [selectedClass]: [...sections[selectedClass], newSection],
      });
      setClasses(
        classes.map((c) =>
          c.name === selectedClass ? { ...c, sections: c.sections + 1 } : c
        )
      );
      toast({
        title: "Section Added",
        description: `${sectionName} has been added to ${selectedClass}.`,
      });
    }
  };

  const handleEditSection = (id, newName, newTeacher) => {
    if (selectedClass) {
      setSections({
        ...sections,
        [selectedClass]: sections[selectedClass].map((s) =>
          s.id === id ? { ...s, name: newName, teacher: newTeacher } : s
        ),
      });
      toast({
        title: "Section Updated",
        description: `Section has been updated.`,
      });
    }
  };

  const handleDeleteSection = (id) => {
    if (selectedClass) {
      setSections({
        ...sections,
        [selectedClass]: sections[selectedClass].filter((s) => s.id !== id),
      });
      setClasses(
        classes.map((c) =>
          c.name === selectedClass ? { ...c, sections: c.sections - 1 } : c
        )
      );
      toast({
        title: "Section Deleted",
        description: `Section has been deleted from ${selectedClass}.`,
      });
    }
  };

  const handleClassClick = (className) => {
    setSelectedClass(className);
  };

  const filteredClasses = classes.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background">
      {/* Sidebar */}
      <div className="w-full md:w-80 p-4 border-r bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Classes</h2>
          </div>
          <AddClassDialog onAddClass={handleAddClass} />
        </div>

        <div className="mb-4">
          <Input
            type="search"
            placeholder="Search classes..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ScrollArea className="space-y-2">
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
                key={classItem.id}
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
                        id: classItem.id,
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
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        {selectedClass ? (
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
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
                  <Card key={section.id}>
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
                                id: section.id,
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
          onEdit={handleEditSection}
          onClose={() => setEditingSection(null)}
        />
      )}

      {deletingItem && (
        <DeleteDialog
          item={deletingItem}
          onDelete={
            deletingItem.type === "class"
              ? handleDeleteClass
              : handleDeleteSection
          }
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
