"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "@/lib/queries/profile";
import { useAuthStore } from "@/store/useAuthStore";

export const useProfile = () => {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => fetchProfile(user!.id),
    enabled: !!user,
  });
};
