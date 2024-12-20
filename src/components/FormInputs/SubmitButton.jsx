import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, Plus } from "lucide-react";

const SubmitButton = ({
  title,
  loadingTitle = "Saving Please wait...",
  loading = false,
  className,
  loaderIcon: LoaderIcon = Loader2,
  buttonIcon: ButtonIcon = Plus,
  showIcon = true,
  ...props
}) => {
  return (
    <Button
      type={loading ? "button" : "submit"}
      disabled={loading}
      className={cn(
        "flex items-center justify-center",
        loading && "cursor-not-allowed",
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
          {loadingTitle}
        </>
      ) : (
        <>
          {showIcon && <ButtonIcon className="w-4 h-4 mr-2" />}
          {title}
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
