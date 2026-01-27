"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { H2, Muted, P } from "@/components/ui/Typography";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import { useProfile } from "@/hooks/profile/useProfile";

export default function ProfileSettings() {
  const user = useAuthStore((s) => s.user);
  const { data: profile } = useProfile();

  const [form, setForm] = useState({
    username: profile?.username ?? "",
    phone_number: profile?.phone_number ?? "",
    address: profile?.address ?? "",
  });

  const { mutate, isPending } = useUpdateProfile(user.id!);

  const handleSave = () => {
    mutate({
      user_id: user.id,
      ...form,
    });
  };
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <H2>Profile</H2>
      <Muted>Update your personal information</Muted>

      {/* Avatar */}
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <Image
            src={profile?.avatar ?? "/avatar-placeholder.png"}
            alt="Avatar"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <P>Profile Picture</P>
            <Button variant="outline" size="sm">
              Change Avatar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Username */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-2">
            <Label>Username</Label>
            <Input
              placeholder={profile?.username ?? "your_username"}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </CardContent>
        </Card>

        {/* Phone */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-2">
            <Label>Phone Number</Label>
            <Input
              placeholder={profile?.phone_number ?? "+1 555 123 4567"}
              value={form.phone_number}
              onChange={(e) =>
                setForm({ ...form, phone_number: e.target.value })
              }
            />
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-2">
            <Label>Address</Label>
            <Input
              placeholder={profile?.address ?? "123 Main St, New York, NY"}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col gap-2">
            <Label>Loyal member since</Label>
            <Input
              value={new Date(user.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              disabled
            />
          </CardContent>
        </Card>
      </div>

      {/* Submit button */}
      <div className="flex justify-start">
        <Button
          size="lg"
          className="w-auto"
          onClick={handleSave}
          disabled={isPending}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
