import React from "react";
import { BookOpen } from "lucide-react";

export const SelectClassPlaceholder = () => (
  <div className="h-full flex items-center justify-center lg:mt-40">
    <div className="flex flex-col items-center justify-center text-center p-4">
      <div className="bg-primary/10 p-3 rounded-full mb-4">
        <BookOpen className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No Class Selected</h3>
      <p className="text-muted-foreground max-w-sm">
        Select a class from the list to view and manage its sections
      </p>
    </div>
  </div>
);
