"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Profile() {
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data);
      // Optionally redirect the user after a successful signup
      router.push("/login");
    } catch (error:any) {
      console.log(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Profile
        </h1>
        <hr></hr>

        <button onClick={logout} className=" mt-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}
