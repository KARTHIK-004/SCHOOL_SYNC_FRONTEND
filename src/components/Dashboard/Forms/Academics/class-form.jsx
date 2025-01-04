import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import { createClass, updateClass, getClassById } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function ClassForm({ editingId, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (editingId) {
      setLoading(true);
      getClassById(editingId)
        .then((data) => {
          reset(data);
        })
        .catch((error) => {
          console.error("Error fetching class:", error);
          toast({
            title: "Error",
            description: "Failed to fetch class data",
            variant: "destructive",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [editingId, reset, toast]);

  async function saveClass(data) {
    if (isSubmitting) return;

    try {
      setLoading(true);
      setApiError(null);
      await onSubmit(data);
    } catch (error) {
      console.error(error);
      if (
        error.message ===
        "You have already created a class with this class code"
      ) {
        setError("classCode", {
          type: "manual",
          message: "You have already used this class code",
        });
        setApiError(
          "You have already created a class with this class code. Please use a different class code."
        );
      } else {
        toast({
          title: "Error",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveClass)}>
      <FormHeader
        href="/dashboard/academics/classes"
        parent="Academics"
        title="Classes"
        editingId={editingId}
        loading={loading || isSubmitting}
      />
      {apiError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <TextInput
              register={register}
              errors={errors}
              label="Class Name"
              name="className"
              required
            />
            <TextInput
              register={register}
              errors={errors}
              label="Class Code"
              name="classCode"
              required
            />
          </div>
        </div>
      </div>
      <FormFooter
        href="/dashboard/academics/classes"
        editingId={editingId}
        loading={loading || isSubmitting}
        title="Class"
        parent="Academics"
      />
    </form>
  );
}
