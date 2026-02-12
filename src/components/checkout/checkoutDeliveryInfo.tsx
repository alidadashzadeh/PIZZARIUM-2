"use client";

import React from "react";
import { Card } from "../ui/card";
import { useProfile } from "@/hooks/profile/useProfile";
import { Input } from "../ui/input";
import { Large } from "../ui/Typography";
import { useDeliveryFields } from "@/hooks/checkout/useDeliveryFields";

export default function CheckoutDeliveryInfo() {
  const { data: profile } = useProfile();

  const nameField = useDeliveryFields("full_name", "");
  const addressField = useDeliveryFields("address", profile?.address);
  const phoneField = useDeliveryFields("phone_number", profile?.phone_number);
  const instructionField = useDeliveryFields("delivery_instructions", "");

  return (
    <Card className="p-6 space-y-2 pb-12">
      <Large className="text-xl font-semibold">Delivery Info</Large>

      {/* Full Name (Mandatory) */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Full Name <span className="text-red-500">*</span>
        </label>

        <Input
          placeholder="Enter your full name"
          value={nameField.value}
          onChange={(e) => nameField.onChange(e.target.value)}
        />
      </div>
      {/* Address */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={addressField.useDefault}
            onChange={(e) => addressField.setUseDefault(e.target.checked)}
          />
          Use my default address
        </label>

        {addressField.useDefault ? (
          <p className="text-sm text-gray-700">
            {profile?.address || (
              <span className="text-red-500">No default address saved</span>
            )}
          </p>
        ) : (
          <Input
            placeholder="Enter delivery address"
            value={addressField.value}
            onChange={(e) => addressField.onChange(e.target.value)}
          />
        )}
      </div>

      {/* Phone */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={phoneField.useDefault}
            onChange={(e) => phoneField.setUseDefault(e.target.checked)}
          />
          Use my default phone number
        </label>

        {phoneField.useDefault ? (
          <p className="text-sm text-gray-700">
            {profile?.phone_number || (
              <span className="text-red-500">No default phone saved</span>
            )}
          </p>
        ) : (
          <Input
            placeholder="Enter phone number"
            value={phoneField.value}
            onChange={(e) => phoneField.onChange(e.target.value)}
          />
        )}

        {/* delivery instructions */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Delivery Instructions{" "}
            <span className="text-gray-400">(optional)</span>
          </label>

          <Input
            placeholder="e.g. Leave at door, call when outside..."
            value={instructionField.value}
            onChange={(e) => instructionField.onChange(e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
}
