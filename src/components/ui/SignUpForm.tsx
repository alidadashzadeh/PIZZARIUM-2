import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@/hooks/auth/useSignup";

export interface SignUpFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpFormProps {
  onClose?: () => void;
}

export const SignUpForm = ({ onClose }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordValue = watch("password", "");
  const { signUpUser, errorMsg } = useSignUp(onClose);

  return (
    <form
      onSubmit={handleSubmit(signUpUser)}
      className="max-w-md mx-auto p-6 flex flex-col gap-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>

      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1 relative">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-[18px] text-gray-500 cursor-pointer hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </Button>
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 relative">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === passwordValue || "Passwords do not match",
          })}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-0 top-[18px] text-gray-500 cursor-pointer hover:text-gray-700"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </Button>
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {errorMsg && <div className="text-red-500 text-center">{errorMsg}</div>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
};
