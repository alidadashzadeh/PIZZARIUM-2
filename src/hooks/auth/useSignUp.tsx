import { useState } from "react";
import { toast } from "sonner";
import { signUp } from "@/lib/queries/auth";
import { createProfile } from "@/lib/queries/profile";
import { SignUpFormInputs } from "@/components/ui/SignUpForm";

export function useSignUp(onClose?: () => void) {
  const [errorMsg, setErrorMsg] = useState<string>("");

  const signUpUser = async (data: SignUpFormInputs) => {
    setErrorMsg("");

    if (data.password !== data.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      const { user, session } = await signUp(data.email, data.password);

      if (!user) {
        setErrorMsg("Failed to sign up. Please try again.");
        return;
      }

      await createProfile({
        id: user.id,
        username: user.email?.split("@")[0] || "username",
        avatar: "",
      });

      toast("Check your Email for verification");

      onClose?.();
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred");
    } finally {
    }
  };

  return { signUpUser, errorMsg };
}
