import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EditSectionDialog({ section, onEdit, onClose }) {
  const [sectionName, setSectionName] = useState(section.name);
  const [teacherName, setTeacherName] = useState(section.teacher);

  useEffect(() => {
    setSectionName(section.name);
    setTeacherName(section.teacher);
  }, [section]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(sectionName, teacherName);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Section</DialogTitle>
          <DialogDescription>
            Update the details of the section. Section name must be 10
            characters or less.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sectionName" className="text-right">
                Section Name
              </Label>
              <Input
                id="sectionName"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                className="col-span-3"
                maxLength={10}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teacherName" className="text-right">
                Teacher Name
              </Label>
              <Input
                id="teacherName"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
