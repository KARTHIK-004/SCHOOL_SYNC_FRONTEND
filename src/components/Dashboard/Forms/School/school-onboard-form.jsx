import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Send } from "lucide-react";
import { createSchool } from "@/utils/api";
import ImageInput from "@/components/FormInputs/ImageInput";
import { toast } from "@/hooks/use-toast";

export default function SchoolOnboardForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      schoolname: "",
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("/School_Sync.png");

  async function saveSchool(data) {
    setLoading(true);
    try {
      const schoolData = {
        schoolname: data.schoolname,
        logo: imageUrl,
      };

      const response = await createSchool(schoolData);
      toast({
        title: "Success",
        description: "School registered successfully!",
        variant: "success",
      });
      // navigate("/dashboard");
    } catch (error) {
      if (error.message === "A school with this name already exists") {
        setError("schoolname", {
          type: "manual",
          message:
            "This school name is already taken. Please choose a different name.",
        });
      } else {
        toast({
          title: "Error",
          description:
            error.message || "An error occurred while registering the school.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveSchool)}>
      <div className="text-center">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Welcome to School Sync
        </h1>
        <p className="leading-7 mt-2">
          Complete your school's profile to get started with SchoolSync
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 py-6">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid gap-4">
              <TextInput
                register={register}
                errors={errors}
                label="School Name"
                name="schoolname"
                required
              />
            </div>

            <div>
              <ImageInput
                title="Customise your School Logo"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint="schoolLogo"
                className="object-contain"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      <SubmitButton
        buttonIcon={Send}
        title="Register School"
        loading={loading}
        loadingTitle="Creating please wait..."
      />
    </form>
  );
}
