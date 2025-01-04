import React from "react";
import { useParams, Link } from "react-router-dom";
import { sections, classes } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ClipboardList } from "lucide-react";

const EmptyState = () => (
  <Card className="border-dashed">
    <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
      <div className="bg-primary/10 p-3 rounded-full">
        <ClipboardList className="h-8 w-8 text-primary" />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">No Sections Available</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Get started by creating your first section. Sections help organize
          students and teachers within this class.
        </p>
      </div>
      <Button asChild>
        <Link to="/dashboard/academics/classes/section/new">
          <Plus className="h-4 w-4 mr-2" />
          Create First Section
        </Link>
      </Button>
    </CardContent>
  </Card>
);

const SectionCard = ({ section, classId }) => (
  <Link
    to={`/dashboard/academics/classes/${classId}/sections/${section.id}`}
    className="block"
  >
    <div className="bg-card h-[180px] p-8 rounded-lg border border-border hover:border-primary/50 transition-colors">
      <h3 className="text-2xl font-semibold mb-4">Section {section.name}</h3>
      <div className="space-y-2 text-muted-foreground">
        <p>Teacher: {section.teacher}</p>
        <p>Students: {section.students}</p>
      </div>
    </div>
  </Link>
);

const Sections = () => {
  const { classId } = useParams();
  const currentClass = classes.find((c) => c.id === classId);
  const classSections = sections[classId || ""] || [];

  if (!currentClass) {
    return (
      <div className="container mx-auto px-4">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{currentClass.name}</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view sections for {currentClass.name}
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/academics/classes/section/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Link>
        </Button>
      </div>

      {classSections.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classSections.map((section) => (
            <SectionCard key={section.id} section={section} classId={classId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sections;
