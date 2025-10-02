"use client";

import { useState } from "react";

export default function AdminProductsPage() {
  const [status, setStatus] = useState<string>("");

  const handleRevalidate = async () => {
    try {
      const response = await fetch("/api/revalidate?tag=products&secret=1234", {
        method: "POST",
      });
      const data = await response.json();

      setStatus(data.message);
      console.log("Revalidate response:", data);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unknown error");
      console.error("Error revalidating:", error);
    }
  };

  return (
    <div className="flex h-96 w-3/6 items-center justify-center rounded-[12px] bg-gray-300">
      <h1>{status}</h1>
      <button
        className="m-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={handleRevalidate}
      >
        Revalidate
      </button>
    </div>
  );
}
