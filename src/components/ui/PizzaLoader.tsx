"use client";

import Image from "next/image";
import React from "react";

export function PizzaLoader() {
  return (
    <div className="flex items-center justify-center h-full p-8 debug-spin">
      <div className="animate-spin-slow will-change-transform">
        <Image
          src="/logo.png"
          alt="Loading..."
          width={80}
          height={80}
          className="drop-shadow-lg"
        />
      </div>
    </div>
  );
}
