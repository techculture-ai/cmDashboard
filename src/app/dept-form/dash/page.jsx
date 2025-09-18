"use client";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Dashboard from "@/app/components/Announcement/Dashboard";

const FormDataPage = () => {
  return (
    // FormDataPage.jsx
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pl-64">
      <Sidebar />

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Dashboard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormDataPage;
