import React from "react";
import { Badge } from "./badge";

function SmallTitle({ logo, title }) {
  return (
    <div>
      <Badge
        variant="secondary"
        className="h-8 items-center mb-8 px-4 py-2 text-sm"
      >
        {logo} {title}
      </Badge>
    </div>
  );
}

export default SmallTitle;
