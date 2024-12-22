import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import TextArea from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import { Lock } from "lucide-react";
import { countries } from "@/lib/countryData";
import PhoneInput from "@/components/FormInputs/PhoneInput";

export default function SingleStudent({ editingId, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const navigate = useNavigate();

  const parents = [
    {
      label: "Parent 1",
      value: "1234",
    },
    {
      label: "Parent 2",
      value: "12345",
    },
  ];

  const genders = [
    {
      label: "MALE",
      value: "MALE",
    },
    {
      label: "FEMALE",
      value: "FEMALE",
    },
  ];

  const bloodGroup = [
    {
      label: "A+",
      value: "A+",
    },
    {
      label: "B+",
      value: "B+",
    },
    {
      label: "AB+",
      value: "AB+",
    },
    {
      label: "O+",
      value: "O+",
    },
    {
      label: "A-",
      value: "A-",
    },
    {
      label: "B-",
      value: "B-",
    },
    {
      label: "AB-",
      value: "AB-",
    },
    {
      label: "O-",
      value: "O-",
    },
    {
      label: "O",
      value: "O",
    },
  ];

  const classes = [
    {
      label: "S1",
      value: "1234",
    },
    {
      label: "S2",
      value: "12345",
    },
  ];

  const streams = [
    {
      label: "A",
      value: "1234",
    },
    {
      label: "B",
      value: "12345",
    },
  ];

  const initialCountryCode = "IN";
  const initialCountry = countries.find(
    (item) => item.countryCode === initialCountryCode
  );
  const [selectedNationality, setSelectedNationality] =
    useState(initialCountry);
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStream, setSelectedStream] = useState(null);
  const [phoneCode, setPhoneCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveStudent(data) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;
      console.log(data);

      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // navigate("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        // await createCategory(data);
        // setLoading(false);
        // toast.success("Successfully Created!");
        // reset();
        // setImageUrl("/placeholder.svg");
        // navigate("/dashboard/categories");
      }
    } catch (error) {
      // setLoading(false);
      // console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <FormHeader
        href="/students"
        parent=""
        title="Students"
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
                label="First Name"
                name="firstname"
                required
              />
              <TextInput
                register={register}
                errors={errors}
                label="Last Name"
                name="lastname"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <TextInput
                register={register}
                errors={errors}
                label="Date of Birth"
                name="dob"
                type="date"
                required
              />
              <FormSelectInput
                label="Gender"
                errors={errors}
                options={genders}
                value={selectedGender}
                onChange={setSelectedGender}
                required
              />
              <FormSelectInput
                label="Blood Group"
                errors={errors}
                options={bloodGroup}
                value={selectedBloodGroup}
                onChange={setSelectedBloodGroup}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput
                register={register}
                errors={errors}
                label="Email"
                name="email"
                type="email"
                required
              />
              <PasswordInput
                icon={Lock}
                label="Password"
                register={register}
                name="password"
                errors={errors}
                required={!editingId}
              />
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <FormSelectInput
                label="Parent"
                errors={errors}
                options={parents}
                value={selectedParent}
                onChange={setSelectedParent}
                toolTipText="Add New Parent"
                href="/dashboard/parent/new"
                required
              />
              <PhoneInput
                register={register}
                errors={errors}
                name="phone"
                label="Phone Number"
                toolTipText="Please enter your contact number"
                phoneCode={phoneCode}
                setPhoneCode={setPhoneCode}
                required
              />
              <FormSelectInput
                label="Nationality"
                errors={errors}
                options={countries}
                value={selectedNationality}
                onChange={setSelectedNationality}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <FormSelectInput
                label="Class"
                errors={errors}
                options={classes}
                value={selectedClass}
                onChange={setSelectedClass}
                toolTipText="Add New Class"
                href="/dashboard/academics/class/new"
                required
              />
              <FormSelectInput
                label="Stream"
                errors={errors}
                options={streams}
                value={selectedStream}
                onChange={setSelectedStream}
                toolTipText="Add New Stream"
                href="/dashboard/academics/stream/new"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <TextArea
                register={register}
                errors={errors}
                label="Description"
                name="description"
              />
              <div>
                <ImageInput
                  title="Student Photo"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="studentImage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormFooter
        href="/categories"
        editingId={editingId}
        loading={loading}
        title="Category"
        parent=""
      />
    </form>
  );
}
