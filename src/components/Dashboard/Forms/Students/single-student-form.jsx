import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Lock } from "lucide-react";
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import TextArea from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import PhoneInput from "@/components/FormInputs/PhoneInput";
import { countries } from "@/lib/countryData";
import { genders, bloodGroups, religions } from "@/lib/formOption";
import {
  getParents,
  getClasses,
  getSectionsByClassId,
  getSections,
  createStudent,
  updateStudentProfile,
  getStudentById,
} from "@/utils/api";

// Utility function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export default function SingleStudent({ editingId }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [parents, setParents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [initialData, setInitialData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    nationality: countries.find((item) => item.countryCode === "IN"),
    parent: null,
    gender: null,
    religion: null,
    bloodGroup: null,
    class: null,
    section: null,
  });

  const [phoneCode, setPhoneCode] = useState("+91");
  const [imageUrl, setImageUrl] = useState("/student.png");

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [parentsResponse, classesData, sectionsData] = await Promise.all([
          getParents(),
          getClasses(),
          getSections(),
        ]);
        const parentsData = parentsResponse.data?.parents || [];

        setParents(
          (parentsData.length > 0 ? parentsData : []).map((parent) => ({
            label: `${parent.firstname} ${parent.lastname}`,
            value: parent._id,
          }))
        );
        setClasses(
          (classesData.length > 0 ? classesData : []).map((cls) => ({
            label: cls.name,
            value: cls._id,
          }))
        );
        setSections(
          (sectionsData.length > 0 ? sectionsData : []).map((section) => ({
            label: section.name,
            value: section._id,
          }))
        );

        if (editingId) {
          const studentData = await getStudentById(editingId);
          const formattedData = {
            ...studentData,
            dob: formatDate(studentData.dob),
            admissiondate: formatDate(studentData.admissiondate),
          };

          setInitialData(formattedData);
          reset(formattedData);
          setFormData({
            nationality: countries.find(
              (c) => c.value === studentData.nationality
            ),
            parent: studentData.parent
              ? { value: studentData.parent.id, label: studentData.parent.name }
              : null,
            gender: studentData.gender
              ? {
                  value: studentData.gender,
                  label: genders.find((g) => g.value === studentData.gender)
                    ?.label,
                }
              : null,
            religion: studentData.religion
              ? {
                  value: studentData.religion,
                  label: religions.find((r) => r.value === studentData.religion)
                    ?.label,
                }
              : null,
            bloodGroup: studentData.bloodGroup
              ? {
                  value: studentData.bloodGroup,
                  label: bloodGroups.find(
                    (b) => b.value === studentData.bloodGroup
                  )?.label,
                }
              : null,
            class: studentData.class
              ? { value: studentData.class.id, label: studentData.class.name }
              : null,
            section: studentData.section
              ? {
                  value: studentData.section.id,
                  label: studentData.section.name,
                }
              : null,
          });
          setPhoneCode(studentData.phoneCode || "+91");
          setImageUrl(studentData.imageUrl || "/student.png");
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Failed to load initial data");
      }
    }

    fetchInitialData();
  }, [editingId, reset]);

  const handleClassChange = async (selectedClass) => {
    updateFormData("class", selectedClass);
    updateFormData("section", null);
    if (selectedClass) {
      try {
        const response = await getSectionsByClassId(selectedClass.value);
        const sectionsData = response.data?.sections || [];
        setSections(
          sectionsData.map((section) => ({
            label: section.name,
            value: section._id,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch sections for class:", error);
        toast.error("Failed to load sections for selected class");
        setSections([]);
      }
    } else {
      setSections([]);
    }
  };

  async function onSubmit(data) {
    try {
      setLoading(true);
      const studentData = {
        ...data,
        imageUrl,
        phoneCode,
        nationality: formData.nationality?.value,
        gender: formData.gender?.value,
        religion: formData.religion?.value,
        bloodGroup: formData.bloodGroup?.value,
        class: formData.class
          ? {
              id: formData.class.value,
              name: formData.class.label,
            }
          : null,
        section: formData.section
          ? {
              id: formData.section.value,
              name: formData.section.label,
            }
          : null,
        parent: formData.parent
          ? {
              id: formData.parent.value,
              name: formData.parent.label,
            }
          : null,
      };

      if (editingId) {
        await updateStudentProfile(editingId, studentData);
        toast.success("Student updated successfully!");
      } else {
        await createStudent(studentData);
        toast.success("Student created successfully!");
      }

      navigate("/students");
    } catch (error) {
      console.error("Error saving student:", error);
      toast.error(
        error.message || "An error occurred while saving the student"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                name="gender"
                register={register}
                errors={errors}
                options={genders}
                option={formData.gender}
                setOption={(value) => updateFormData("gender", value)}
                isSearchable={false}
                required
              />
              <FormSelectInput
                label="Blood Group"
                name="bloodGroup"
                register={register}
                errors={errors}
                options={bloodGroups}
                option={formData.bloodGroup}
                setOption={(value) => updateFormData("bloodGroup", value)}
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
                toolTipText="Enter a password to log in to the Student Portal."
              />
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                label="Parent Name"
                name="parent"
                register={register}
                errors={errors}
                options={parents}
                option={formData.parent}
                setOption={(value) => updateFormData("parent", value)}
                toolTipText="Add New Parent/Guardian"
                href="/dashboard/users/parents/new"
                required
              />
              <FormSelectInput
                label="Religion"
                name="religion"
                register={register}
                errors={errors}
                options={religions}
                option={formData.religion}
                setOption={(value) => updateFormData("religion", value)}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <FormSelectInput
                label="Class"
                name="class"
                register={register}
                errors={errors}
                options={classes}
                option={formData.class}
                setOption={handleClassChange}
                toolTipText="Add New Class"
                href="/dashboard/academics/classes"
                required
              />
              <FormSelectInput
                label="Section"
                name="section"
                register={register}
                errors={errors}
                options={sections}
                option={formData.section}
                setOption={(value) => updateFormData("section", value)}
                toolTipText="Add New Stream"
                href="/dashboard/academics/classes"
                required
                isDisabled={!formData.class}
              />
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <TextInput
                register={register}
                errors={errors}
                label="Admission Date"
                name="admissiondate"
                type="date"
                required
              />
              <TextInput
                register={register}
                errors={errors}
                label="Birth Certificate No"
                name="birthcertificateno"
                required
              />
              <TextInput
                register={register}
                errors={errors}
                label="Register No"
                name="regno"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <FormSelectInput
                  label="Nationality"
                  name="nationality"
                  register={register}
                  errors={errors}
                  options={countries}
                  option={formData.nationality}
                  setOption={(value) => updateFormData("nationality", value)}
                  required
                />
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
                  title="Student Profile Photo"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="studentProfileImage"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FormFooter
        href="/students"
        editingId={editingId}
        loading={loading}
        title="Student"
        parent=""
      />
    </form>
  );
}
