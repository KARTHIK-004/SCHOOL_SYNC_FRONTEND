import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AddNewButton({ href, toolTipText }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant={"outline"} size={"sm"}>
            <Link to={href}>
              <Plus className="w-4 h-4" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{toolTipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
