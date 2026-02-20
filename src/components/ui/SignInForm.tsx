import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useSignin } from "@/hooks/auth/useSignIn";

export interface LoginFormInputs {
	email: string;
	password: string;
}

interface SignUpFormProps {
	onClose?: () => void;
}

export const SignInForm = ({ onClose }: SignUpFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormInputs>();
	const [showPassword, setShowPassword] = useState(false);
	const { login, errorMsg } = useSignin(onClose);

	return (
		<form
			onSubmit={handleSubmit(login)}
			className="max-w-md mx-auto p-6 flex flex-col gap-6 "
		>
			<h2 className="text-2xl font-bold text-center">Sign In</h2>

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
					{...register("password", { required: "Password is required" })}
					className="pr-10 relative"
				/>
				<Button
					type="button"
					variant="ghost"
					onClick={() => setShowPassword(!showPassword)}
					className="absolute right-0 top-[18px] cursor-pointer text-gray-500 hover:text-gray-700"
				>
					{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
				</Button>
				{errors.password && (
					<span className="text-red-500 text-sm">
						{errors.password.message}
					</span>
				)}
			</div>

			{errorMsg && <div className="text-red-500 text-center">{errorMsg}</div>}

			<Button type="submit" disabled={isSubmitting} className="w-full">
				{isSubmitting ? "Logging in..." : "Login"}
			</Button>
		</form>
	);
};
