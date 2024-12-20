import { useForm } from "react-hook-form";
import { useState } from "react";
import CustomCarousel from "@/components/ui/custom-carousel";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/ui/logo";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import { Lock, LogIn, Mail } from "lucide-react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  async function onSubmit(data) {
    console.log(data);
  }
  return (
    <div className="w-full lg:grid h-screen  lg:grid-cols-2 relative ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6 mt-10 md:mt-0">
          <div className="absolute left-1/3 top-14 md:top-5 md:left-5">
            <Logo />
          </div>
          <div className="grid gap-2 text-center mt-20 md:mt-0">
            <h1 className="text-3xl font-bold">Login to your Account</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              icon={Mail}
              label="Email Address"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="Eg. johndoe@gmail.com"
            />
            <PasswordInput
              icon={Lock}
              label="Password"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="******"
              forgotPasswordLink="/forgot-password"
            />

            <SubmitButton
              buttonIcon={LogIn}
              title="Sign Up"
              loading={isLoading}
              loadingTitle="Creating Account please wait..."
            />
          </form>
          <div className="text-center lg:text-left">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <CustomCarousel />
      </div>
    </div>
  );
}
