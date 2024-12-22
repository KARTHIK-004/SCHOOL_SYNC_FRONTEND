import { ModeToggle } from "@/components/theme/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import UserInfo from "./sidebar-user-info";

function SidebarHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="sticky top-0 right-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 shadow-sm">
      <SidebarTrigger />
      <div className="flex-1">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <ModeToggle />
      <Button variant="outline" size="icon">
        <Plus className="h-5 w-5" />
        <span className="sr-only">Add new</span>
      </Button>
      <UserInfo />
    </div>
  );
}

export default SidebarHeader;
