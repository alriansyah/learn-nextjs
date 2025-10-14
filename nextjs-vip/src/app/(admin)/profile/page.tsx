"use client";
import React from "react";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

export default function ProfilePage() {
  const { data: session }: { data: Session | null } = useSession();

  console.log("session : ", session);

  return (
    <div>
      <h1>ProfilePage</h1>
      <h2>{session?.user?.fullname}</h2>
    </div>
  );
}
