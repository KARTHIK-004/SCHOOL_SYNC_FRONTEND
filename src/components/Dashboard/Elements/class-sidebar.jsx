import { useState } from "react";
import { GraduationCap, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export function ClassSidebar({
  classes,
  selectedClass,
  onClassSelect,
  searchQuery,
  onSearchChange,
  onAddClass,
}) {
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [newClassName, setNewClassName] = useState("");

  const handleAddClass = () => {
    if (newClassName.trim()) {
      onAddClass(newClassName.trim());
      setNewClassName("");
      setIsAddingClass(false);
    }
  };

  return (
    <div className="w-64 border-r bg-gray-50/40 p-4 flex flex-col h-screen">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <GraduationCap className="h-6 w-6" />
          Classes
        </div>
        <Dialog open={isAddingClass} onOpenChange={setIsAddingClass}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddClass}>Add Class</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Input
        type="search"
        placeholder="Search classes..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="mb-4"
      />
      <ScrollArea className="flex-grow">
        <div className="space-y-2">
          {classes
            .filter((c) =>
              c.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((cls) => (
              <button
                key={cls.id}
                onClick={() => onClassSelect(cls)}
                className={`w-full rounded-lg p-3 text-left transition-colors ${
                  selectedClass.id === cls.id
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="font-medium">{cls.name}</div>
                <div className="text-sm text-muted-foreground">
                  {cls.sections} sections • {cls.students} students
                </div>
              </button>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}
