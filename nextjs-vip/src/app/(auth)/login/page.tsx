"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import React from "react";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const callbackURL = searchParams?.callbackUrl ?? "/dashboard";

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: callbackURL,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackURL);
      }

      if (!res?.ok && res?.status === 401) {
        throw "Email or Password is incorrect";
      }
    } catch (error) {
      setIsLoading(false);
      setError(error as string);
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center border bg-gray-50 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-800">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="font-bold text-red-600">{error}</div>
        <form
          method="POST"
          className="space-y-6"
          onSubmit={(e) => handleLogin(e)}
        >
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
              disabled={isLoading}
              type="submit"
              className={`flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                isLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {isLoading ? "Loading..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not registered?{" "}
          <Link
            href="/register"
            className="leading-6 font-semibold text-indigo-500 hover:text-indigo-400"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
