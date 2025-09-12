import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between bg-gray-800 py-2 px-5">
      <h1 className="text-white">Navbar</h1>
      <ul className="flex gap-3 text-blue-300">
        <Link href="/">
          <li className="cursor-pointer">Home</li>
        </Link>
        <Link href="/about">
          <li className="cursor-pointer">About</li>
        </Link>
        <Link href="/about/profile">
          <li className="cursor-pointer">Profile</li>
        </Link>
      </ul>
    </nav>
  );
}
