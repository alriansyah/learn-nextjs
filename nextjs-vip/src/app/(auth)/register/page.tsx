"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { push } = useRouter();
  const [error, setError] = useState<{
    status: boolean;
    statusCode: number;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, password }),
      });

      const result = await res.json();

      if (res.ok && result.status) {
        form.reset();
        setIsLoading(false);
        push("/login");
      } else {
        throw result;
      }
    } catch (error) {
      setError(
        error as { status: boolean; statusCode: number; message: string },
      );
      setIsLoading(false);
      console.log("Error submitting form:", error);
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center border bg-gray-50 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-800">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="font-bold text-red-600">{error?.message}</div>
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm/6 font-medium text-gray-700"
            >
              Your fullname
            </label>
            <div className="mt-2">
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                autoComplete="name"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-indigo-800/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-indigo-800/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-blue-700/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                isLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {isLoading ? "Loading..." : "Sign up"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          You have an account?{" "}
          <Link
            href="/login"
            className="leading-6 font-semibold text-indigo-500 hover:text-indigo-400"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
