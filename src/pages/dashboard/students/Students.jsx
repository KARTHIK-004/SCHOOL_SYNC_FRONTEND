import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

export default function Students() {
  return (
    <>
      <div className="">
        <h2>Students</h2>
        <Button>
          <Link to="/dashboard/students/new">New Students</Link>
        </Button>
      </div>
    </>
  );
}
