"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Ensure proper import
import axios from "axios";

export default function Login() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter(); // Ensure correct usage

  const onLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("/api/users/login", {
        email: user.email,
        password: user.password,
      });
      console.log(response.data);
      router.push("/profile");
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsButtonDisabled(!(user.password.length > 0 && user.email.length > 0));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login to Your Account
        </h1>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              className="w-full text-blue-500 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              className="w-full text-blue-500 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
          <button
            className={`w-full p-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={onLogin}
            disabled={isButtonDisabled || loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
