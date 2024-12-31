import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import {
  ChevronRight,
  Pencil,
  Trash2,
  Users,
  MoreHorizontal,
  AlertCircle,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddSectionDialog } from "@/components/Dashboard/Elements/add-section-dialog";
import { EditSectionDialog } from "@/components/Dashboard/Elements/edit-section-dialog";
import { DeleteDialog } from "@/components/Dashboard/Elements/delete-dialog";
import { useToast } from "@/hooks/use-toast";
import StudentList from "./StudentList";
import {
  getSectionsByClassId,
  createSection,
  updateSection,
  deleteSection,
  getClass,
  getStudentsBySection,
} from "@/utils/api";

function Sections() {
  const { classId } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  const [sections, setSections] = useState([]);
  const [classInfo, setClassInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [selectedSection, setSelectedSection] = useState(null);
  const [students, setStudents] = useState([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);

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

  const handleSectionClick = async (section) => {
    setSelectedSection(section);
    setIsLoadingStudents(true);
    try {
      const response = await getStudentsBySection(section._id);
      setStudents(response.data.students || []);
    } catch (error) {
      console.error("Failed to fetch students", error);
      toast({
        title: "Error",
        description: "Failed to load students. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingStudents(false);
    }
  };

  const filteredSections = sections.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSections = React.useMemo(() => {
    let sortableSections = [...filteredSections];
    sortableSections.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortableSections;
  }, [filteredSections, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const className =
    location.state?.className || classInfo?.name || "Loading...";

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link to="/dashboard/classes">Classes</Link>
            <ChevronRight className="h-4 w-4" />
            <span>{className}</span>
          </div>
          <h1 className="text-2xl font-bold">{className}</h1>
        </div>
        <AddSectionDialog onAddSection={handleAddSection}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Section
          </Button>
        </AddSectionDialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search sections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <Card className="col-span-full">
              <CardContent className="flex items-center justify-center h-24">
                <p>Loading sections...</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center h-32">
                <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                <p className="text-lg font-semibold mb-2">{error}</p>
                <Button onClick={fetchSections}>Try Again</Button>
              </CardContent>
            </Card>
          ) : sortedSections.length > 0 ? (
            sortedSections.map((section) => (
              <Card
                key={section._id}
                className="cursor-pointer hover:bg-accent transition-colors"
              >
                <CardHeader>
                  <CardTitle>{section.name}</CardTitle>
                  <CardDescription>Teacher: {section.teacher}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Students: {section.students}</p>
                  <div className="flex justify-between items-center mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => handleSectionClick(section)}
                        >
                          View Students
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        {isLoadingStudents ? (
                          <p>Loading students...</p>
                        ) : (
                          <StudentList
                            students={students}
                            onClose={() => setSelectedSection(null)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => setEditingSection(section)}
                        >
                          Edit Section
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            setDeletingItem({
                              type: "section",
                              id: section._id,
                              name: section.name,
                            })
                          }
                        >
                          Delete Section
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center h-32">
                <p className="text-lg font-semibold mb-4">
                  No sections found for this class
                </p>
                <AddSectionDialog onAddSection={handleAddSection}>
                  <Button>Add Your First Section</Button>
                </AddSectionDialog>
              </CardContent>
            </Card>
          )}
        </div>
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

export default Sections;
