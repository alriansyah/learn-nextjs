"use client";

import { useState } from "react";

export default function AdminProductPage() {
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
    <div>
      <h1>{status}</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5"
        onClick={handleRevalidate}
      >
        Revalidate
      </button>
    </div>
  );
}
