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
import PhoneInput from "@/components/FormInputs/PhoneInput";
import { Lock } from "lucide-react";
import { countries } from "@/lib/countryData";
import {
  genders,
  occupations,
  relationships,
  titles,
  contactMethods,
} from "@/lib/formOption";

export default function ParentRegistration({ editingId, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      firstname: initialData?.firstname || "",
      lastname: initialData?.lastname || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      whatsapp: initialData?.whatsapp || "",
      address: initialData?.address || "",
      state: initialData?.state || "",
      occupation: initialData?.occupation || "",
      nationalId: initialData?.nationalId || "",
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Initialize select states
  const initialCountryCode = "IN";
  const initialCountry = countries.find(
    (item) => item.countryCode === initialCountryCode
  );

  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedNationality, setSelectedNationality] = useState(
    initialData?.nationality
      ? countries.find((c) => c.value === initialData.nationality)
      : initialCountry
  );
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedRelationship, setSelectedRelationship] = useState(null);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [selectedPreferredContact, setSelectedPreferredContact] =
    useState(null);
  const [phoneCode, setPhoneCode] = useState(false);
  const [whatsappCode, setWhatsappCode] = useState(false);
  const [imageUrl, setImageUrl] = useState("/student.png");

  async function saveParent(data) {
    try {
      setLoading(true);
      const formData = {
        ...data,
        imageUrl,
        title: selectedTitle?.value,
        nationality: selectedNationality?.value,
        gender: selectedGender?.value,
        relationship: selectedRelationship?.value,
        occupation: selectedOccupation?.value,
        preferredContact: selectedPreferredContact?.value,
        phoneCode,
        whatsappCode,
      };

      if (editingId) {
        // await updateParent(editingId, formData);
        // toast.success("Updated Successfully!");
      } else {
        // await createParent(formData);
        // toast.success("Successfully Created!");
      }

      reset();
      setImageUrl("/parent.png");
      console.log(data);
      // navigate("/parents");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveParent)}>
      <FormHeader
        href="/users/parents"
        parent=""
        title="Parents"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid sm:grid-cols-3 gap-4">
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

            <div className="grid sm:grid-cols-3 gap-4">
              <FormSelectInput
                label="Gender"
                name="gender"
                register={register}
                errors={errors}
                options={genders}
                option={selectedGender}
                setOption={setSelectedGender}
                isSearchable={false}
                required
              />
              <FormSelectInput
                label="Relationship"
                name="relationship"
                register={register}
                errors={errors}
                options={relationships}
                option={selectedRelationship}
                setOption={setSelectedRelationship}
                required
              />
              <FormSelectInput
                label="Occupation"
                name="occupation"
                register={register}
                errors={errors}
                options={occupations}
                option={selectedOccupation}
                setOption={setSelectedOccupation}
                required
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
                toolTipText="Enter a password to log in to the Parent Portal."
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
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
              <PhoneInput
                register={register}
                errors={errors}
                name="whatsapp"
                label="WhatsApp Number"
                toolTipText="Please enter your WhatsApp number"
                phoneCode={whatsappCode}
                setPhoneCode={setWhatsappCode}
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <FormSelectInput
                label="Nationality"
                name="nationality"
                register={register}
                errors={errors}
                options={countries}
                option={selectedNationality}
                setOption={setSelectedNationality}
                required
              />
              <TextInput
                register={register}
                errors={errors}
                label="National ID / Passport"
                name="nationalId"
                required
              />
              <FormSelectInput
                label="Preferred Contact Method"
                name="preferredContact"
                register={register}
                errors={errors}
                options={contactMethods}
                option={selectedPreferredContact}
                setOption={setSelectedPreferredContact}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <TextInput
                  register={register}
                  errors={errors}
                  label="State/Village"
                  name="state"
                  required
                />
                <TextArea
                  register={register}
                  errors={errors}
                  label="Address"
                  name="address"
                  required
                />
              </div>

              <div>
                <ImageInput
                  title="Parent Profile Photo"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="parentProfileImage"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FormFooter
        href="/parents"
        editingId={editingId}
        loading={loading}
        title="Parent"
        parent=""
      />
    </form>
  );
}
