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
import MultiSelectInput from "@/components/FormInputs/MultiSelectInput";
import { Lock } from "lucide-react";
import { countries } from "@/lib/countryData";
import {
  genders,
  departments,
  designations,
  qualifications,
  subjects,
  contactMethods,
  classes,
  titles,
} from "@/lib/formOption";
import { createTeacher, updateTeacher } from "@/utils/api";
import { toast } from "@/hooks/use-toast";

export default function TeacherRegistration({ editingId, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
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
      designation: initialData?.designation || "",
      department: initialData?.department || "",
      dateOfJoining: initialData?.dateOfJoining || "",
      qualification: initialData?.qualification || "",
      mainSubject: initialData?.mainSubject || "",
      yearsOfExperience: initialData?.yearsOfExperience || "",
      nationalId: initialData?.nationalId || "",
      emergencyContact: initialData?.emergencyContact || "",
      previousInstitute: initialData?.previousInstitute || "",
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
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [selectedMainSubject, setSelectedMainSubject] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedPreferredContact, setSelectedPreferredContact] =
    useState(null);
  const [phoneCode, setPhoneCode] = useState(false);
  const [whatsappCode, setWhatsappCode] = useState(false);
  const [imageUrl, setImageUrl] = useState("/teacher.png");

  async function saveTeacher(data) {
    console.log(data);
    // try {
    //   setLoading(true);
    //   const formData = {
    //     ...data,
    //     imageUrl,
    //     title: selectedTitle?.value,
    //     nationality: selectedNationality?.value,
    //     gender: selectedGender?.value,
    //     department: selectedDepartment?.value,
    //     designation: selectedDesignation?.value,
    //     qualification: selectedQualification?.value,
    //     mainSubject: selectedMainSubject?.value,
    //     subjects: selectedSubjects.map((sub) => sub.value),
    //     classes: selectedClasses.map((cls) => cls.value),
    //     preferredContact: selectedPreferredContact?.value,
    //   };

    //   if (editingId) {
    //     await updateTeacher(editingId, formData);
    //     toast({
    //       title: "Success",
    //       description: "Teacher information updated successfully",
    //     });
    //   } else {
    //     await createTeacher(formData);
    //     toast({
    //       title: "Success",
    //       description: "Teacher registered successfully",
    //     });
    //   }
    //   setImageUrl("/teacher.png");
    // } catch (error) {
    //   console.error(error);
    //   if (
    //     error.status === "error" &&
    //     error.message ===
    //       "This email is already registered. Please use a different email address."
    //   ) {
    //     toast({
    //       title: "Registration Failed",
    //       description:
    //         "This email is already registered. Please use a different email address.",
    //       variant: "destructive",
    //     });
    //   } else {
    //     toast({
    //       title: "Error",
    //       description: "An unexpected error occurred. Please try again.",
    //       variant: "destructive",
    //     });
    //   }
    // } finally {
    //   setLoading(false);
    // }
  }

  return (
    <form onSubmit={handleSubmit(saveTeacher)}>
      <FormHeader
        href="/users/teachers"
        parent=""
        title="Teachers"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            {/* Basic Information */}
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

            {/* Professional Information */}
            <div className="grid sm:grid-cols-3 gap-4">
              <FormSelectInput
                label="Department"
                name="department"
                register={register}
                errors={errors}
                options={departments}
                option={selectedDepartment}
                setOption={setSelectedDepartment}
                required
              />
              <FormSelectInput
                label="Designation"
                name="designation"
                register={register}
                errors={errors}
                options={designations}
                option={selectedDesignation}
                setOption={setSelectedDesignation}
                required
              />
              <TextInput
                register={register}
                errors={errors}
                label="Date of Birth"
                name="dob"
                type="date"
                required
              />
            </div>

            {/* Academic Information */}
            <div className="grid sm:grid-cols-3 gap-4">
              <FormSelectInput
                label="Qualification"
                name="qualification"
                register={register}
                errors={errors}
                options={qualifications}
                option={selectedQualification}
                setOption={setSelectedQualification}
                required
              />
              <FormSelectInput
                label="Main Subject"
                name="mainSubject"
                register={register}
                errors={errors}
                options={subjects}
                option={selectedMainSubject}
                setOption={setSelectedMainSubject}
                required
              />
              <TextInput
                register={register}
                errors={errors}
                label="Years of Experience"
                name="yearsOfExperience"
                type="number"
                required
              />
            </div>

            {/* Subjects and Classes */}
            <div className="grid sm:grid-cols-2 gap-4">
              <MultiSelectInput
                label="Teaching Subjects"
                name="subjects"
                register={register}
                errors={errors}
                options={subjects}
                value={selectedSubjects}
                onChange={setSelectedSubjects}
                required
              />
              <MultiSelectInput
                label="Teaching Classes"
                name="classes"
                register={register}
                errors={errors}
                options={classes}
                value={selectedClasses}
                onChange={setSelectedClasses}
                required
              />
            </div>

            {/* Contact Information */}
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
                toolTipText="Enter a password to log in to the Teacher Portal."
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
                name="emergencyContact"
                label="Emergency Contact"
                toolTipText="Please enter emergency contact number"
                phoneCode={whatsappCode}
                setPhoneCode={setWhatsappCode}
                required
              />
            </div>

            {/* Additional Information */}
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

            {/* Previous Experience */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Previous Institute"
                  name="previousInstitute"
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
                  title="Teacher Profile Photo"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="teacherProfileImage"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FormFooter
        href="/teachers"
        editingId={editingId}
        loading={loading}
        title="Teacher"
        parent=""
      />
    </form>
  );
}
