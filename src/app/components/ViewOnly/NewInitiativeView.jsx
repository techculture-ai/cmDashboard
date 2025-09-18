"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  MdCheckCircle,
  MdError,
  MdInfo,
  MdPause,
  MdDownload,
} from "react-icons/md";
import { Card, CardContent, Typography, Chip, Divider } from "@mui/material";
import { SlCalender } from "react-icons/sl";
import { IoDocumentTextOutline, IoImageOutline } from "react-icons/io5";
import {
  HiOutlineOfficeBuilding,
  HiOutlineLightBulb,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";

const NewInitiativeView = () => {
  const [initiativeData, setInitiativeData] = useState({
    serialNo: "",
    departmentName: "",
    date: "",
    initiativeName: "",
    details: "",
    status: "",
    lastLogin: "",
    letterFile: null,
    pictureFile: null,
  });
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const router = useRouter();

  const fetchInitiativeData = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/new-initiatives/${id}`
      );
      const result = await res.json();

      if (result.success) {
        const data = result.initiative;
        setInitiativeData({
          serialNo: data.serialNo || "",
          departmentName: data.departmentName || "",
          date: data.date || "",
          initiativeName: data.initiativeName || "",
          details: data.details || "",
          status: data.status || "",
          lastLogin: data.lastLogin || "",
          letterFile: data.uploads?.letter || null,
          pictureFile: data.uploads?.picture || null,
        });
      } else {
        toast.error("Failed to load initiative");
      }
    } catch (error) {
      console.error("Error loading:", error);
      toast.error("Error loading data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchInitiativeData();
  }, [fetchInitiativeData]);

  const downloadDocument = (fileName) => {
    if (!fileName) return;
    const link = document.createElement("a");
    link.href = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${fileName}`;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Implemented":
        return <MdCheckCircle className="text-green-500" />;
      case "In Progress":
        return <MdInfo className="text-blue-500" />;
      case "Planning":
        return <MdError className="text-yellow-500" />;
      case "On Hold":
        return <MdPause className="text-red-500" />;
      case "Open":
        return <HiOutlineLightBulb className="text-purple-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Implemented":
        return "success";
      case "In Progress":
        return "info";
      case "Planning":
        return "warning";
      case "On Hold":
        return "error";
      case "Open":
        return "secondary";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const InfoRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-start gap-3 py-3">
      {Icon && <Icon className="text-gray-500 mt-1 flex-shrink-0" size={20} />}
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {label}
        </div>
        <div className="text-gray-900 dark:text-white mt-1">
          {value || "Not specified"}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-8 overflow-hidden shadow-xl border-0">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <HiOutlineArrowLeft size={24} />
                </button>
                <div>
                  <Typography variant="h4" className="font-bold mb-2">
                    🚀 New Initiative Details
                  </Typography>
                  <Typography variant="body1" className="text-green-100">
                    View new initiative information and current status
                  </Typography>
                </div>
              </div>
              <div className="text-right">
                <Chip
                  label="View Mode"
                  className="!bg-white !text-green-600 !font-semibold"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Basic Information Section */}
        <Card className="shadow-lg border-0 overflow-hidden mb-8">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-6 border-b">
              <Typography
                variant="h6"
                className="font-bold text-gray-800 dark:text-white flex items-center gap-2"
              >
                📄 Basic Information
              </Typography>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow
                  label="Serial Number"
                  value={initiativeData.serialNo}
                  icon={SlCalender}
                />
                <InfoRow
                  label="Initiative Name"
                  value={initiativeData.initiativeName}
                  icon={HiOutlineLightBulb}
                />
                <InfoRow
                  label="Date"
                  value={formatDate(initiativeData.date)}
                  icon={BsCalendarDate}
                />
                <InfoRow
                  label="Department Name"
                  value={initiativeData.departmentName}
                  icon={HiOutlineOfficeBuilding}
                />
              </div>

              <Divider className="my-6" />

              <div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  Initiative Details
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <Typography className="text-gray-900 dark:text-white leading-relaxed">
                    {initiativeData.details || "No details provided"}
                  </Typography>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status and Progress Section */}
        <Card className="shadow-lg border-0 overflow-hidden mb-8">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/20 p-6 border-b">
              <Typography
                variant="h6"
                className="font-bold text-gray-800 dark:text-white flex items-center gap-2"
              >
                ⚡ Status & Progress Information
              </Typography>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                    Current Status
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    {getStatusIcon(initiativeData.status)}
                    <Chip
                      label={initiativeData.status || "Not specified"}
                      color={getStatusColor(initiativeData.status)}
                      className="font-semibold"
                    />
                  </div>
                </div>

                {initiativeData.lastLogin && (
                  <InfoRow
                    label="Last Login by Department"
                    value={new Date(initiativeData.lastLogin)
                      .toString()
                      .split("GMT")[0]
                      .trim()}
                    icon={BsCalendarDate}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Downloads Section */}
        {(initiativeData.letterFile || initiativeData.pictureFile) && (
          <Card className="shadow-lg border-0 overflow-hidden mb-8">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 p-6 border-b">
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 dark:text-white flex items-center gap-2"
                >
                  📎 Attachments
                </Typography>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {initiativeData.letterFile && (
                    <div className="text-center">
                      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-600">
                        <IoDocumentTextOutline
                          className="mx-auto text-blue-600 mb-3"
                          size={32}
                        />
                        <Typography className="font-medium text-gray-900 dark:text-white mb-3">
                          Letter Document
                        </Typography>
                        <button
                          onClick={() =>
                            downloadDocument(initiativeData.letterFile)
                          }
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <MdDownload size={16} />
                          Download
                        </button>
                      </div>
                    </div>
                  )}

                  {initiativeData.pictureFile && (
                    <div className="text-center">
                      <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-dashed border-green-200 dark:border-green-600">
                        <div className="flex flex-col items-center">
                          <IoImageOutline
                            className="text-green-600 mb-3"
                            size={32}
                          />
                          <Typography className="font-medium text-gray-900 dark:text-white mb-3">
                            Picture
                          </Typography>

                          {/* Optional image preview */}
                          <div className="mb-3">
                            <img
                              src={`${
                                process.env.NEXT_PUBLIC_BASE_URL
                              }/uploads/${encodeURIComponent(
                                initiativeData.pictureFile
                              )}`}
                              alt="Initiative Preview"
                              className="w-16 h-16 object-cover rounded border"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </div>

                          <button
                            onClick={() =>
                              downloadDocument(initiativeData.pictureFile)
                            }
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <MdDownload size={16} />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Card */}
        <Card className="shadow-lg border-0 overflow-hidden">
          <CardContent className="p-6">
            <div className="text-center">
              <Typography
                variant="h6"
                className="text-gray-600 dark:text-gray-400 mb-2"
              >
                Initiative ID: {id}
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-500 dark:text-gray-500"
              >
                Last updated: {new Date().toLocaleDateString()}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewInitiativeView;
