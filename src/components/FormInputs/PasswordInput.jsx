import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CircleHelp, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const PasswordInput = ({
  register,
  errors,
  label,
  name,
  toolTipText,
  icon: Icon,
  placeholder,
  forgotPasswordLink,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Label htmlFor={name} className="text-sm font-medium">
            {label}
          </Label>
          {toolTipText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0">
                    <CircleHelp className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{toolTipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {forgotPasswordLink && (
          <Link
            to={forgotPasswordLink}
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
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
          type={showPassword ? "text" : "password"}
          {...register(name, {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            },
          })}
          className={cn(
            "pr-10",
            Icon && "pl-10",
            errors[name] && "focus-visible:ring-destructive"
          )}
          placeholder={placeholder || label}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute inset-y-0 right-0 px-3 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Eye className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      {errors[name] && (
        <p className="text-xs text-destructive">{errors[name].message}</p>
      )}
    </div>
  );
};

export default PasswordInput;
