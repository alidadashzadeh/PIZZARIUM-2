import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "@/lib/queries/auth";
import { LoginFormInputs } from "@/components/ui/SignInForm";
import { useAuthStore } from "@/store/useAuthStore";

export function useSignin(onClose?: () => void) {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const setSession = useAuthStore((s) => s.setSession);

	const login = async (values: LoginFormInputs) => {
		setErrorMsg(null);

		try {
			const { session, user } = await signIn(values.email, values.password);

			if (!session || !user) {
				throw new Error("Invalid credentials");
			}

			setSession(session);

			toast("Welcome Back!");

			onClose?.();
		} catch (err) {
			setErrorMsg("Invalid email or password");
		}
	};

	return { login, errorMsg };
}
