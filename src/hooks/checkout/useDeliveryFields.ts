// import { useState, useEffect } from "react";
// import { useDeliveryStore } from "@/store/useDeliveryStore";

// export function useDeliveryFields(
//   field: "address" | "phone_number",
//   defaultValue?: string
// ) {
//   const delivery = useDeliveryStore((s) => s.delivery);
//   const setShipping = useDeliveryStore((s) => s.setShipping);

//   const [useDefault, setUseDefault] = useState(false);

//   // Update delivery field whenever checkbox or default value changes
//   useEffect(() => {
//     if (useDefault) {
//       setShipping({ [field]: defaultValue ?? "" });
//     } else {
//       setShipping({ [field]: "" });
//     }
//   }, [useDefault, defaultValue, field, setShipping]);

//   // Change handler for input
//   const onChange = (value: string) => {
//     setShipping({ [field]: value });
//   };

//   // Current value in store
//   const value = delivery[field] ?? "";

//   return { useDefault, setUseDefault, value, onChange };
// }

import { useState, useEffect } from "react";
import { useDeliveryStore } from "@/store/useDeliveryStore";

export function useDeliveryFields(
  field: "full_name" | "address" | "phone_number" | "delivery_instructions",
  defaultValue?: string
) {
  const delivery = useDeliveryStore((s) => s.delivery);
  const setShipping = useDeliveryStore((s) => s.setShipping);

  const [useDefault, setUseDefault] = useState(false);

  // Only address + phone should support "use default"
  const supportsDefault = field === "address" || field === "phone_number";

  // Update delivery field whenever checkbox or default value changes
  useEffect(() => {
    if (!supportsDefault) return;

    if (useDefault) {
      setShipping({ [field]: defaultValue ?? "" });
    } else {
      setShipping({ [field]: "" });
    }
  }, [useDefault, defaultValue, field, setShipping, supportsDefault]);

  // Change handler for input
  const onChange = (value: string) => {
    setShipping({ [field]: value });
  };

  // Current value in store
  const value = delivery[field] ?? "";

  return {
    useDefault: supportsDefault ? useDefault : false,
    setUseDefault: supportsDefault ? setUseDefault : () => {},
    value,
    onChange,
  };
}
