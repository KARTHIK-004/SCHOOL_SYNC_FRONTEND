import { Pencil, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionCard({
  sectionName,
  teacherName,
  studentCount,
  onEdit,
  onDelete,
}) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{sectionName}</CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit section</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete section</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          <p>Class Teacher: {teacherName}</p>
          <p className="mt-1 flex items-center gap-1">
            <Users className="h-4 w-4" />
            {studentCount} students
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
