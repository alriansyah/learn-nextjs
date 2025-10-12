"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session !== undefined && session?.user.role !== "admin") {
      router.push("/");
    }
  }, [router, session, session?.user.role, status]);

  return (
    <div className="flex h-96 w-full items-center justify-center rounded-[12px] bg-gray-300">
      <h1>Dashboard</h1>
    </div>
  );
}
