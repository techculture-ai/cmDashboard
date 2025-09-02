"use client";
import React, { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import AnnouncementData from "../components/Announcement/AnnouncementData";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const FormDataPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/department-login");
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // ✅ clear the login flag

    router.push("/");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[20%] p-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Department Dashboard
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <p className="text-gray-600 dark:text-gray-300">
              Welcome to the Form Data page. Use the sidebar to navigate through
              different announcement sections.
              <AnnouncementData />
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormDataPage;
