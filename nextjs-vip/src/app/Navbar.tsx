import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between bg-gray-800 py-2 px-5">
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
        <button
          className="text-sm text-white bg-blue-700 py-1 px-3 rounded-lg cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      </div>
    </nav>
  );
}
