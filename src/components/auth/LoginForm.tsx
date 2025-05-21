"use client";

import { motion } from "framer-motion";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { toast } from "sonner";
import { AuthUserType } from "../layout/Topbar";

type FormData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  isLogin: boolean;
  setAuthUser: (param: AuthUserType) => void;
  onClose: () => void;
}

export default function LoginForm({ isLogin, setAuthUser, onClose }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    if (email === "admin@gmail.com" || password === "123123") {
      toast.success("Login successfull! You are a member now.");
      setAuthUser({
        name: 'Admin',
        email: 'admin@gmail.com'
      });
      onClose();
    } else {
      toast.error("Login fail! Invalid Credentials.")
    }
  };

  return (
    <motion.div
      layout
      animate={{ opacity: isLogin ? 1 : 0 }}
      style={{ display: isLogin ? "block" : "none" }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
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
        <Button
          type="submit"
          text="Login"
          isLoading={isSubmitting}
          loadingText="Logging In..."
          className="w-full mt-3"
        />
      </form>
    </motion.div>
  );
}
