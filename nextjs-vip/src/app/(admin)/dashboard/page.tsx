"use client";

import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

export default function DashboardPage() {
  const { data: session, status }: { data: Session | null; status: string } =
    useSession();

  // console.log("session", session);
  // console.log("status", status);

  return (
    <div className="flex h-96 w-full items-center justify-center rounded-[12px] bg-gray-300">
      <h1>Dashboard</h1>
    </div>
  );
}
