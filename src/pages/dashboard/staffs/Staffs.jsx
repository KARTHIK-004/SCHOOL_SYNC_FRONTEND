import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

export default function Staffs() {
  return (
    <div>
      Staffs
      <Button>
        <Link to="/dashboard/staffs/new">New Students</Link>
      </Button>
    </div>
  );
}
