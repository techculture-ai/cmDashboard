"use client";
import React from "react";
import Sidebar from "../../components/Sidebar";
import AnnouncementData from "../../components/Announcement/AnnouncementData";

const FormDataPage = () => {
  return (
    // FormDataPage.jsx
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pl-64">
      <Sidebar />

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Department Dashboard
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <p className="text-gray-600 dark:text-gray-300">
              Welcome to the Form Data page. Use the sidebar to navigate through
              different announcement sections.
            </p>
            <AnnouncementData />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormDataPage;
