"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status }: { data: Session | null; status: string } =
    useSession();

  console.log("session : ", session);

  return (
    <nav className="flex items-center justify-between bg-gray-800 px-5 py-2">
      <div className="flex gap-5">
        <h1 className="text-white">Navbar</h1>
        <ul className="flex gap-3 text-blue-300">
          <Link href="/">
            <li
              className={`cursor-pointer ${
                pathname === "/" ? "text-blue-300" : "text-white"
              }`}
            >
              Home
            </li>
          </Link>
          <Link href="/about">
            <li
              className={`cursor-pointer ${
                pathname === "/about" ? "text-blue-300" : "text-white"
              }`}
            >
              About
            </li>
          </Link>
          <Link href="/about/profile">
            <li
              className={`cursor-pointer ${
                pathname === "/about/profile" ? "text-blue-300" : "text-white"
              }`}
            >
              Profile
            </li>
          </Link>
        </ul>
      </div>
      <div>
        {status === "authenticated" ? (
          <div className="flex items-center gap-3 text-white">
            <h4>{session?.user?.fullname}</h4>
            <button
              className="cursor-pointer rounded-lg bg-blue-700 px-3 py-1 text-sm text-white"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="cursor-pointer rounded-lg bg-blue-700 px-3 py-1 text-sm text-white"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
