import React, { useState, useEffect, useCallback } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Pencil,
  Trash2,
  GraduationCap,
  Plus,
  Search,
  Users,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getClasses, deleteClass } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const ClassesList = ({
  classes,
  searchQuery,
  onMobileClose,
  onDelete,
  onEdit,
}) => {
  const filteredClasses = classes.filter((cls) =>
    cls.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollArea className="h-full lg:mb-16">
      <ul className="space-y-1 pr-4">
        {filteredClasses.map((cls) => (
          <li key={cls._id}>
            <Link
              to={`/dashboard/academics/classes/${cls._id}/section`}
              className="block p-3 rounded-md hover:bg-accent/50 transition-colors group relative"
              onClick={onMobileClose}
            >
              <div className="font-medium mb-0.5">{cls.className}</div>
              <div className="text-sm text-muted-foreground flex flex-col gap-0.5">
                <span>{cls.sections} sections</span>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{cls.students} students</span>
                </div>
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit(cls._id);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(cls._id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

const Classes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchClasses = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedClasses = await getClasses();
      setClasses(fetchedClasses);
      setError(null);
    } catch (err) {
      setError("Failed to fetch classes. Please try again.");
      toast({
        title: "Error",
        description: "Failed to fetch classes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  useEffect(() => {
    // Refresh the class list when navigating back to this component
    if (location.pathname === "/dashboard/academics/classes") {
      fetchClasses();
    }
  }, [location, fetchClasses]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await deleteClass(id);
        toast({
          title: "Success",
          description: "Class deleted successfully",
        });
        fetchClasses(); // Refresh the list after deletion
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete class. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/academics/classes/${id}/edit`);
  };

  const handleRefresh = () => {
    fetchClasses();
  };

  return (
    <div className="flex h-full overflow-hidden">
      <div className="fixed w-[320px] h-full border-r bg-background">
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Classes</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw
                  className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
                />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/dashboard/academics/classes/new">
                  <Plus className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search classes..."
              className="pl-9 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <ClassesList
              classes={classes}
              searchQuery={searchQuery}
              onMobileClose={() => {}}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </div>
      </div>
      <div className="ml-[320px] flex-1 bg-background overflow-y-auto">
        <ScrollArea className="h-full">
          <div className="px-4">
            <Outlet />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Classes;
