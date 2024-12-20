import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function CloseButton({ href, parent = "inventory" }) {
  return (
    <Button type="button" variant="outline" asChild>
      <Link
        to={parent === "" ? `/dashboard${href}` : `/dashboard/${parent}${href}`}
      >
        Close
      </Link>
    </Button>
  );
}
