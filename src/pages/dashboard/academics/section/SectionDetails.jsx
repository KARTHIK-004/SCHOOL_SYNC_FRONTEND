import React from "react";
import { useParams } from "react-router-dom";
import { sections, classes } from "@/utils/data";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TimeTable = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = [1, 2, 3, 4];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {days.map((day) => (
        <div
          key={day}
          className="rounded-lg border border-border/50 bg-card p-4"
        >
          <h3 className="text-lg font-semibold mb-4">{day}</h3>
          <div className="space-y-3">
            {periods.map((period) => (
              <div
                key={period}
                className="rounded-md bg-muted/50 p-3 space-y-1"
              >
                <div className="font-medium">Period {period}</div>
                <div className="text-sm text-muted-foreground">
                  Subject {period}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const StudentsList = () => (
  <ScrollArea className="h-[300px]">
    <div className="space-y-1">
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <Avatar>
            <AvatarFallback className="bg-muted border-2 border-border">
              {String(i + 1).padStart(2, "0")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">Student {i + 1}</div>
            <div className="text-sm text-muted-foreground">
              Roll No: {String(i + 1).padStart(2, "0")}
            </div>
          </div>
        </div>
      ))}
    </div>
  </ScrollArea>
);

const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-md text-sm font-medium transition-colors",
      active
        ? "bg-background text-foreground"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    )}
  >
    {children}
  </button>
);

const SectionDetails = () => {
  const [activeTab, setActiveTab] = React.useState("timetable");
  const { classId, sectionId } = useParams();
  const currentClass = classes.find((c) => c.id === classId);
  const section = sections[classId || ""]?.find((s) => s.id === sectionId);

  if (!currentClass || !section) {
    return <div className="text-muted-foreground">Section not found</div>;
  }

  return (
    <div className="pt-14 lg:pt-0 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {currentClass.name} - Section {section.name}
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Teacher: {section.teacher}
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex gap-2 p-1 rounded-lg bg-muted/50 w-fit">
          <TabButton
            active={activeTab === "timetable"}
            onClick={() => setActiveTab("timetable")}
          >
            Time Table
          </TabButton>
          <TabButton
            active={activeTab === "students"}
            onClick={() => setActiveTab("students")}
          >
            Students
          </TabButton>
        </div>

        <div className="min-h-[300px]">
          {activeTab === "timetable" ? <TimeTable /> : <StudentsList />}
        </div>
      </div>
    </div>
  );
};

export default SectionDetails;
