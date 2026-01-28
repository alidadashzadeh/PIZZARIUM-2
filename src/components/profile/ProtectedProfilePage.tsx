"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import ProfileSettings from "./ProfileSettings";

export default function ProtectedProfilePage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      // redirect to home if user is logged out
      router.replace("/");
    }
  }, [user, router]);

  // show loader while auth state is initializing
  if (user === undefined)
    return <div className="text-center mt-20">Loading...</div>;

  if (!user) return null; // redirecting

  return <ProfileSettings />;
}
