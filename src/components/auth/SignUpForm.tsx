"use client";

import { motion } from "framer-motion";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { AuthUserType } from "../layout/Topbar";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignUpFormProps = {
  isLogin: boolean;
  setAuthUser: (param: AuthUserType) => void;
  onClose: () => void;
};

export default function SignUpForm({
  isLogin,
  setAuthUser,
  onClose,
}: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    // reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    const { name, email } = data;
    setAuthUser({
      name,
      email,
    });
    toast.success("Sign up successfull! You are a member now.");
    onClose();
  };

  return (
    <motion.div
      layout
      animate={{ opacity: isLogin ? 0 : 1 }}
      style={{ display: isLogin ? "none" : "block" }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        <Input
          type="text"
          label="Full Name*"
          placeholder="Full Name"
          {...register("name", { required: "Full Name is required!" })}
          error={errors.name}
        />
        <Input
          type="email"
          label="Email*"
          placeholder="Email"
          {...register("email", { required: "Email is required!" })}
          error={errors.email}
        />
        <Input
          type="password"
          label="Password*"
          placeholder="Password"
          {...register("password", { required: "Password is required!" })}
          error={errors.password}
        />
        <Input
          type="password"
          label="Confirm Password*"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
          error={errors.confirmPassword}
        />
        <Button
          type="submit"
          text="Sign Up"
          isLoading={isSubmitting}
          loadingText="Signing Up..."
          className="w-full mt-3"
        />
      </form>
    </motion.div>
  );
}
