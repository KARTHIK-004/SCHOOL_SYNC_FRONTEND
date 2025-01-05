import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import {
  createSection,
  updateSection,
  getSectionById,
  getClasses,
} from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { titles } from "@/lib/formOption";

export function SectionForm({
  editingId,
  onSubmit,
  isSubmitting,
  classId,
  className,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    if (editingId) {
      setLoading(true);
      getSectionById(editingId)
        .then((data) => {
          reset(data);
          setSelectedTitle(data.title);
        })
        .catch((error) => {
          console.error("Error fetching section:", error);
          toast({
            title: "Error",
            description: "Failed to fetch section data",
            variant: "destructive",
          });
        })
        .finally(() => setLoading(false));
    } else if (classId && className) {
      setValue("class.id", classId);
      setValue("class.name", className);
    }
  }, [editingId, reset, toast, classId, className, setValue]);

  async function saveSection(data) {
    if (isSubmitting) return;

    try {
      setLoading(true);
      const sectionData = {
        ...data,
        class: {
          id: classId,
          name: className,
        },
      };
      console.log("Submitting section data:", sectionData);
      await onSubmit(sectionData);
    } catch (error) {
      console.error("Error in saveSection:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveSection)}>
      <FormHeader
        href={`/dashboard/academics/classes/${classId}/section`}
        parent="Academics"
        title="Sections"
        editingId={editingId}
        loading={loading || isSubmitting}
      />
      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput
                register={register}
                errors={errors}
                label="Section Name"
                name="sectionName"
                required
              />
              <TextInput
                register={register}
                errors={errors}
                label="Section Code"
                name="sectionCode"
                required
              />
            </div>
            <div className="grid sm:grid-cols-[1fr_3fr] gap-4">
              <FormSelectInput
                label="Title"
                name="title"
                register={register}
                errors={errors}
                options={titles}
                option={selectedTitle}
                setOption={setSelectedTitle}
                required
              />
              <TextInput
                register={register}
                errors={errors}
                label="Class Teacher"
                name="classTeacher"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <FormFooter
        href={`/dashboard/academics/classes/${classId}/section`}
        editingId={editingId}
        loading={loading || isSubmitting}
        title="Section"
        parent="Academics"
      />
    </form>
  );
}
