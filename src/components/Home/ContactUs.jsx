import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import SectionHeader from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Send } from "lucide-react";
import TextArea from "@/components/FormInputs/TextAreaInput";
import PhoneInput from "@/components/FormInputs/PhoneInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import { countries } from "@/lib/countryData";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const roles = [
    {
      label: "Principal",
      value: "Principal",
    },
    {
      label: "School Administrator",
      value: "Administrator",
    },
    {
      label: "Teacher",
      value: "Teacher",
    },
    {
      label: "Student",
      value: "Student",
    },
    {
      label: "IT Support",
      value: "ITSupport",
    },
    {
      label: "Receptionist",
      value: "Receptionist",
    },
    {
      label: "Counselor",
      value: "Counselor",
    },
    {
      label: "Head of Department",
      value: "HOD",
    },
    {
      label: "Non-Teaching Staff",
      value: "NonTeachingStaff",
    },
    {
      label: "Others",
      value: "Others",
    },
  ];

  const mediaSources = [
    {
      label: "Social Media",
      value: "SocialMedia",
    },
    {
      label: "Search Engine",
      value: "SearchEngine",
    },
    {
      label: "Word of Mouth",
      value: "WordOfMouth",
    },
    {
      label: "Others",
      value: "Others",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [phoneCode, setPhoneCode] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const initialCountryCode = "IN";
  const initialCountry = countries.find(
    (item) => item.countryCode === initialCountryCode
  );
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Handle form submission logic here
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mx-auto max-w-3xl text-center mb-8">
          <SectionHeader
            logo="👋"
            title="Get In Touch"
            heading="Get Your School Management System"
            description="Ready to transform your school's digital infrastructure? 
            Fill out the form below and we'll help you get started with a customized
            solution tailored to your institution's needs."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Speak to someone in sales</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  To create a more value-added solution, it is essential to
                  analyze the possibilities for improvement.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="secondary">Book Appointment</Button>
              </CardFooter>
            </Card>
            <Card className="bg-secondary text-secondary-foreground">
              <CardHeader>
                <CardTitle>Contact our team</CardTitle>
                <CardDescription className="text-secondary-foreground/80">
                  To create a more value-added solution, it is essential to
                  analyze the possibilities for improvement.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="default">Send an Email</Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Our team will reach out within 24 hours to schedule a
                personalized demo and discuss your specific needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                  label="Full Name"
                  register={register}
                  name="name"
                  errors={errors}
                  placeholder="John Doe"
                />
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <TextInput
                    label="Email Address"
                    register={register}
                    name="email"
                    type="email"
                    errors={errors}
                    placeholder="Eg. johndoe@gmail.com"
                  />
                  <PhoneInput
                    register={register}
                    errors={errors}
                    name="phone"
                    label="Phone Number"
                    toolTipText="Please enter your contact number"
                    phoneCode={phoneCode}
                    setPhoneCode={setPhoneCode}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <TextInput
                    label="School Name"
                    register={register}
                    name="school"
                    errors={errors}
                    placeholder="Evernote High School"
                  />
                  <FormSelectInput
                    label="Countries"
                    name="country"
                    register={register}
                    errors={errors}
                    options={countries}
                    option={selectedCountry}
                    setOption={setSelectedCountry}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <TextInput
                    label="School Website/Social Media Page(fb,linkedin)"
                    register={register}
                    name="website"
                    errors={errors}
                    placeholder="https://www.evernotehighschool.com"
                  />
                  <TextInput
                    label="Number of Students"
                    register={register}
                    name="students"
                    type="number"
                    errors={errors}
                    placeholder="500"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <FormSelectInput
                    label="Role"
                    name="role"
                    register={register}
                    errors={errors}
                    options={roles}
                    option={selectedRole}
                    setOption={setSelectedRole}
                  />
                  <FormSelectInput
                    label="How did you hear about us?"
                    name="media"
                    register={register}
                    errors={errors}
                    options={mediaSources}
                    option={selectedMedia}
                    setOption={setSelectedMedia}
                  />
                </div>
                <TextArea
                  label="Please share with us the key pain points you want to solve"
                  register={register}
                  name="points"
                  errors={errors}
                />
                <SubmitButton
                  buttonIcon={Send}
                  title="Submit"
                  loading={isLoading}
                  loadingTitle="Submitting..."
                />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
