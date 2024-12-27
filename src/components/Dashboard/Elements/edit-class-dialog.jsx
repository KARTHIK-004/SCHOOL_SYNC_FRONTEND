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

export function EditClassDialog({ classItem, onEdit, onClose }) {
  const [className, setClassName] = useState(classItem?.name || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setClassName(classItem?.name || "");
  }, [classItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!classItem?._id) {
      console.error("No class ID available");
      return;
    }

    if (!className.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onEdit(classItem._id, className.trim());
      onClose();
    } catch (error) {
      console.error("Failed to edit class:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
          <DialogDescription>Update the name of the class.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="className" className="text-right">
                Class Name
              </Label>
              <Input
                id="className"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="col-span-3"
                placeholder="Enter class name"
                disabled={isSubmitting}
                required
                minLength={1}
                maxLength={50}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!className.trim() || isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
