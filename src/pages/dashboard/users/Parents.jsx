import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

export default function Parents() {
  return (
    <>
      <div className="">
        <h2>Students</h2>
        <Button>
          <Link to="/dashboard/users/parents/new">New Parent</Link>
        </Button>
      </div>
    </>
  );
}
