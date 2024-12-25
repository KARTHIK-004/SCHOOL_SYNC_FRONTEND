import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Send } from "lucide-react";
import { createSchool } from "@/utils/api";
import { toast } from "@/hooks/use-toast";
import ImageInput from "@/components/FormInputs/ImageInput";

export default function SchoolOnboardForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      schoolname: "",
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("/School_Sync.png");

  async function onSubmit(data) {
    console.log(data);
    try {
      const response = await createSchool(onSubmit);
      console.log("Form submitted successfully:", response);
      toast({
        title: "Success",
        description: "School registered successfully!",
        variant: "success",
      });
      // navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.message.includes("School with this name already exists")) {
        toast({
          title: "Error",
          description:
            "This School Name has already been submitted. Please use a different School Name address.",
          variant: "destructive",
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
                label="School Name"
                register={register}
                name="schoolname"
                errors={errors}
                placeholder="School Sync"
              />
            </div>

            <div>
              {/* <ImageInput
                title="Customise your School Logo"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint="schoolLogo"
                className="object-contain"
                size="sm"
              /> */}
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
