"use client";

import React from "react";
import { Card } from "../ui/card";
import { useProfile } from "@/hooks/profile/useProfile";
import { Input } from "../ui/input";
import { Large } from "../ui/Typography";
import { useDeliveryFields } from "@/hooks/checkout/useDeliveryFields";

export default function CheckoutDeliveryInfo() {
  const { data: profile } = useProfile();

  const addressField = useDeliveryFields("address", profile?.address);
  const phoneField = useDeliveryFields("phone_number", profile?.phone_number);

  return (
    <Card className="p-6 space-y-6">
      <Large className="text-xl font-semibold">Delivery Info</Large>

      {/* Address */}
      <div className="space-y-3">
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
      </div>
    </Card>
  );
}
