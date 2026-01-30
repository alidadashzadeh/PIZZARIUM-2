import { useState, useEffect } from "react";
import { useDeliveryStore } from "@/store/useDeliveryStore";

export function useDeliveryFields(
  field: "address" | "phone_number",
  defaultValue?: string
) {
  const shipping = useDeliveryStore((s) => s.shipping);
  const setShipping = useDeliveryStore((s) => s.setShipping);

  const [useDefault, setUseDefault] = useState(false);

  // Update shipping field whenever checkbox or default value changes
  useEffect(() => {
    if (useDefault) {
      setShipping({ [field]: defaultValue ?? "" });
    } else {
      setShipping({ [field]: "" });
    }
  }, [useDefault, defaultValue, field, setShipping]);

  // Change handler for input
  const onChange = (value: string) => {
    setShipping({ [field]: value });
  };

  // Current value in store
  const value = shipping[field] ?? "";

  return { useDefault, setUseDefault, value, onChange };
}
