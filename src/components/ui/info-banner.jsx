import { useState } from "react";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function InfoBanner({ message, type = "info" }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertCircle,
  };

  const Icon = icons[type];

  return (
    <Alert
      variant="default"
      className={cn("flex items-center justify-between my-4", {
        "bg-primary/15 text-primary": type === "info",
        "bg-success/15 text-success": type === "success",
        "bg-warning/15 text-warning": type === "warning",
        "bg-destructive/15 text-destructive": type === "danger",
      })}
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-5 w-5 flex-shrink-0" />
        <AlertDescription className="text-sm font-medium">
          {message}
        </AlertDescription>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-full p-0"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </Alert>
  );
}
