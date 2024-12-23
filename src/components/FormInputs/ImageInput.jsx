import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ImageInput({
  title,
  imageUrl,
  setImageUrl,
  endpoint,
  className,
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <img
            alt={title}
            className={cn("h-40 w-full rounded-md object-cover", className)}
            src={imageUrl}
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const fileUrl = URL.createObjectURL(file);
                setImageUrl(fileUrl);

                if (endpoint) {
                  const formData = new FormData();
                  formData.append("file", file);

                  fetch(endpoint, {
                    method: "POST",
                    body: formData,
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("Upload successful:", data);
                      if (data.url) {
                        setImageUrl(data.url);
                      }
                    })
                    .catch((error) => {
                      alert(`ERROR! ${error.message}`);
                      console.error("Upload error:", error);
                    });
                }
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
