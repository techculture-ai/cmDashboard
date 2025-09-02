"use client";
import React, { useState } from "react";
import { Button, FormControlLabel, Checkbox } from "@mui/material";
import { MdKeyboardBackspace } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const DepartmentLogin = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/admin/auth/login",
  //       { email, password },
  //       { withCredentials: true }
  //     );

  //     if (response.status === 200) {
  //       router.push("/data-forms");
  //     }
  //   } catch (err) {
  //     console.error("Login failed:", err.response?.data?.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Clear previous success
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth/login`,
        // '' // ✅ Correct API
        // "https://cmbhartibackend.onrender.com/api/admin/auth/login",
        {
          identifier: email, // ✅ Must use 'identifier', not 'email' or 'username'
          password,
        },
        {
          withCredentials: true, // ✅ Include cookies if backend sets them
        }
      );

      // if (response.status === 200) {

      //   router.push(`/form-Data/cmAnnouncement`);
      // }
      if (response.status === 200) {
        // localStorage.setItem("isDeptLoggedIn", "true");
        setSuccessMessage("✅ Login successful. Redirecting...");
        setTimeout(() => {
          router.push(`/form-Data/pmAnnouncement`);
        }, 1500); // delay redirect for 1.5s
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "❌ Login failed. Please try again.";
      setErrorMessage("❌" + message + " !!");
    }
  };

  return (
    <div className="bg-gradient-to-br bg-secondary to-blue-400 min-h-screen flex items-center justify-center font-sans fixed top-0 left-0 z-[100] w-full">
      <Link href="/">
        <Button
          variant="text"
          className="!text-white !fixed top-5 left-5 gap-2 !bg-[rgba(255,255,255,0.1)]"
        >
          <MdKeyboardBackspace size={20} /> Back
        </Button>
      </Link>

      <div className="w-[400px] bg-white rounded-2xl shadow-lg p-8 relative">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          Department Login Portal
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6 mt-2">
          Enter your department credentials to access the portal
        </p>

        <form className="space-y-1" onSubmit={handleSubmit}>
          {errorMessage && (
            <p className="text-red-600 text-center font-medium py-2">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-600 text-center font-medium py-2">
              {successMessage}
            </p>
          )}
          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department Email
            </label>
            <input
              type="text"
              placeholder="Enter your department email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
              required
            />
          </div>

          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
                required
              />
              <Button
                className="!w-8 !h-8 !rounded-full !min-w-8 !bg-gray-100 !absolute top-1 right-2"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? (
                  <FaEyeSlash className="text-gray-700" />
                ) : (
                  <FaEye className="text-gray-700" />
                )}
              </Button>
              {/* <a
                href="#"
                className="absolute right-3 -top-6 text-xs font-bold text-blue-600"
              >
                Forgot password?
              </a> */}
            </div>
          </div>

          <div className="flex items-center pt-5">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Remember me"
            />
          </div>

          <Button type="submit" className="w-full btn-custom">
            <span>Sign In</span>
          </Button>

          {/* <p className="text-sm text-center text-gray-600 py-2">
            Having trouble?{" "}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Contact Admin
            </a>
          </p> */}
        </form>

        <p className="text-xs text-center text-gray-400 mt-6 border-t pt-4">
          Departmental access only. Unauthorized usage is punishable.
        </p>
      </div>
    </div>
  );
};

export default DepartmentLogin;
