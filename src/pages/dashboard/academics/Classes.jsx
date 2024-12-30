import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
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
import { Skeleton } from "@/components/ui/skeleton";
import { AddClassDialog } from "@/components/Dashboard/Elements/add-class-dialog";
import { EditClassDialog } from "@/components/Dashboard/Elements/edit-class-dialog";
import { DeleteDialog } from "@/components/Dashboard/Elements/delete-dialog";
import { useToast } from "@/hooks/use-toast";
import { getClasses, createClass, updateClass, deleteClass } from "@/utils/api";

export function Classes() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editingClass, setEditingClass] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    fetchClasses();
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

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
    navigate(`/dashboard/academics/classes/${classItem._id}`, {
      state: { className: classItem.name },
    });
  };

  const filteredClasses = Array.isArray(classes)
    ? classes.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex h-full bg-background">
      <div className="w-1/3 p-4 border-r">
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
                  selectedClass && selectedClass._id === classItem._id
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
                onClick={() => handleClassClick(classItem)}
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

      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>

      {editingClass && (
        <EditClassDialog
          classItem={editingClass}
          onEdit={handleEditClass}
          onClose={() => setEditingClass(null)}
        />
      )}

      {deletingItem && (
        <DeleteDialog
          item={deletingItem}
          onDelete={() => handleDeleteClass(deletingItem.id)}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
