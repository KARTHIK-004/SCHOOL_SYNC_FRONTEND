import React from "react";
import CloseButton from "@/components/FormInputs/CloseButton";
import SubmitButton from "@/components/FormInputs/SubmitButton";

export default function FormFooter({
  href,
  editingId,
  loading,
  title,
  parent,
}) {
  return (
    <div className="flex items-center  gap-2 py-4 justify-between ">
      <CloseButton href={href} parent={parent} />
      <SubmitButton
        title={editingId ? `Update ${title}` : `Save ${title}`}
        loading={loading}
      />
    </div>
  );
}
