import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
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
import { genders, bloodGroups, religions } from "@/lib/formOption";
import {
  getParents,
  getClasses,
  getSectionsByClassId,
  getSections,
  createStudent,
  updateStudentProfile,
} from "@/utils/api";

export default function SingleStudent({ editingId, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: initialData?.firstname || "",
      lastname: initialData?.lastname || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
      state: initialData?.state || "",
      dob: initialData?.dob || "",
      admissiondate: initialData?.admissiondate || "",
      birthcertificateno: initialData?.birthcertificateno || "",
      regno: initialData?.regno || "",
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [parents, setParents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  const [formData, setFormData] = useState({
    nationality: initialData?.nationality
      ? countries.find((c) => c.value === initialData.nationality)
      : countries.find((item) => item.countryCode === "IN"),
    parent: initialData?.parent
      ? {
          value: initialData.parent.id,
          label: initialData.parent.name,
        }
      : null,
    gender: initialData?.gender
      ? {
          value: initialData.gender,
          label: genders.find((g) => g.value === initialData.gender)?.label,
        }
      : null,
    religion: initialData?.religion
      ? {
          value: initialData.religion,
          label: religions.find((r) => r.value === initialData.religion)?.label,
        }
      : null,
    bloodGroup: initialData?.bloodGroup
      ? {
          value: initialData.bloodGroup,
          label: bloodGroups.find((b) => b.value === initialData.bloodGroup)
            ?.label,
        }
      : null,
    class: initialData?.class
      ? {
          value: initialData.class._id,
          label: initialData.class.name,
        }
      : null,
    section: initialData?.section
      ? {
          value: initialData.section._id,
          label: initialData.section.name,
        }
      : null,
  });

  const [phoneCode, setPhoneCode] = useState(initialData?.phoneCode || false);
  const [imageUrl, setImageUrl] = useState(
    initialData?.imageUrl || "/student.png"
  );

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    async function fetchParents() {
      try {
        const response = await getParents();
        const parents = response.data?.parents;
        if (Array.isArray(parents)) {
          const formattedParents = parents.map((parent) => ({
            label: `${parent.firstname} ${parent.lastname}`,
            value: parent._id,
          }));
          setParents(formattedParents);
        } else {
          console.error("Unexpected API response format:", response);
          setParents([]);
        }
      } catch (error) {
        console.error("Failed to fetch parents:", error);
        toast.error("Failed to load parents");
        setParents([]);
      }
    }

    fetchParents();
  }, []);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const response = await getClasses();
        if (Array.isArray(response)) {
          const formattedClasses = response.map((cls) => ({
            label: cls.name,
            value: cls._id,
          }));
          setClasses(formattedClasses);
        } else {
          console.error("Unexpected API response format:", response);
          setClasses([]);
        }
      } catch (error) {
        console.error("Failed to fetch classes:", error);
        toast.error("Failed to load classes");
        setClasses([]);
      }
    }

    fetchClasses();
  }, []);

  useEffect(() => {
    async function fetchInitialSections() {
      try {
        const response = await getSections();
        if (Array.isArray(response.data.sections)) {
          const formattedSections = response.data.sections.map((section) => ({
            label: section.name,
            value: section._id,
          }));
          setSections(formattedSections);
        } else {
          console.error("Unexpected API response format:", response);
          setSections([]);
        }
      } catch (error) {
        console.error("Failed to fetch initial sections:", error);
        toast.error("Failed to load sections");
        setSections([]);
      }
    }

    fetchInitialSections();
  }, []);

  const fetchSectionsByClass = async (classId) => {
    try {
      const response = await getSectionsByClassId(classId);
      if (Array.isArray(response.data.sections)) {
        const formattedSections = response.data.sections.map((section) => ({
          label: section.name,
          value: section._id,
        }));
        setSections(formattedSections);
      } else {
        console.error("Unexpected API response format:", response);
        setSections([]);
      }
    } catch (error) {
      console.error("Failed to fetch sections for class:", error);
      toast.error("Failed to load sections for selected class");
      setSections([]);
    }
  };

  const handleClassChange = (selectedClass) => {
    updateFormData("class", selectedClass);
    updateFormData("section", null);
    if (selectedClass) {
      fetchSectionsByClass(selectedClass.value);
    } else {
      setSections([]);
    }
  };

  async function saveStudent(data) {
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
        // Format class data like parent
        class: formData.class
          ? {
              id: formData.class.value,
              name: formData.class.label,
            }
          : null,
        // Format section data like parent
        section: formData.section
          ? {
              id: formData.section.value,
              name: formData.section.label,
            }
          : null,
        // Keep parent structure the same
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

      // reset();
      setImageUrl("/student.png");
      // navigate("/students");
    } catch (error) {
      console.error("Error saving student:", error);
      toast.error(
        error?.message || "An error occurred while saving the student"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveStudent)}>
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
                options={
                  parents.length > 0
                    ? parents
                    : [{ label: "No parents found", value: "" }]
                }
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
                options={
                  classes.length > 0
                    ? classes
                    : [{ label: "No classes found", value: "" }]
                }
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
                options={
                  sections.length > 0
                    ? sections
                    : [{ label: "No sections found", value: "" }]
                }
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
