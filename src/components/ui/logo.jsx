import { GraduationCap } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 m-2">
      <span className="rounded-full bg-primary p-1 text-secondary">
        <GraduationCap />
      </span>
      <div className="text-2xl font-bold ">
        School <span className="text-primary">Sync</span>
      </div>
    </Link>
  );
}

export default Logo;
