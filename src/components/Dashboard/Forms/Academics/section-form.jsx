import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import { createSection, updateSection } from "@/utils/api";
import { toast } from "@/hooks/use-toast";
import { titles } from "@/lib/formOption";

export function SectionForm({ editingId, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sectionName: initialData?.sectionName || "",
      sectionCode: initialData?.sectionCode || "",
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);

  async function saveSection(data) {
    try {
      setLoading(true);
      if (editingId) {
        await updateSection(editingId, data);
        toast({
          title: "Success",
          description: "Section updated successfully",
        });
      } else {
        await createSection(data);
        toast({
          title: "Success",
          description: "Section created successfully",
        });
      }
      reset();
      navigate("/sections");
    } catch (error) {
      console.error(error);
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
        href="/sections"
        parent=""
        title="Sections"
        editingId={editingId}
        loading={loading}
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
        href="/sections"
        editingId={editingId}
        loading={loading}
        title="Section"
        parent=""
      />
    </form>
  );
}
