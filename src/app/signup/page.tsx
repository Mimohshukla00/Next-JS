"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// import mimoh from "@/src/app/api/users/route";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    userName: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    setLoading(true); // Set loading to true when signup starts
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      // Optionally redirect the user after a successful signup
      router.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading back to false when signup is done
    }
  };

  useEffect(() => {
    if (
      user.userName.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {loading ? "Loading..." : "Create an Account"}
        </h1>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="userName"
              type="text"
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>

          <button
            className={`w-full p-3 text-white rounded-lg focus:outline-none focus:ring-2 ${
              isButtonDisabled || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
            }`}
            onClick={onSignup}
            disabled={isButtonDisabled || loading}
          >
            {/* {loading ? "Loading..." : "Sign Up"} */}
            Sign Up
          </button>

          <div className="text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
