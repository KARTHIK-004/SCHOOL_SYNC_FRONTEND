import React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleHelp } from "lucide-react";

const TextInput = ({
  register,
  errors,
  label,
  type = "text",
  name,
  toolTipText,
  unit,
  icon: Icon,
  placeholder,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
        {toolTipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button">
                  <CircleHelp className="w-4 h-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{toolTipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
        <Input
          id={name}
          type={type}
          {...register(name, { required: true })}
          className={cn(
            "w-full",
            Icon && "pl-10",
            errors[name] && "focus-visible:ring-destructive"
          )}
          placeholder={placeholder || label}
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-muted-foreground">{unit}</span>
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="text-xs text-destructive">{label} is required</p>
      )}
    </div>
  );
};

export default TextInput;
