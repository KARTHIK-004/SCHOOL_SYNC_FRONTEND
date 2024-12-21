import React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function TextArea({
  register,
  errors,
  label,
  name,
  helperText = "",
  rows = 3,
  placeholder = "",
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      <Textarea
        id={name}
        {...register(name, { required: true })}
        rows={rows}
        placeholder={placeholder}
        className={cn(errors[name] && "focus-visible:ring-destructive")}
      />
      {errors[name] && (
        <p className="text-sm text-destructive">{label} is required</p>
      )}
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
