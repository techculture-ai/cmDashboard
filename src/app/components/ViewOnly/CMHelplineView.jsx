"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  MdCheckCircle,
  MdError,
  MdInfo,
  MdDownload,
  MdPhone,
} from "react-icons/md";
import { Card, CardContent, Typography, Chip, Divider } from "@mui/material";
import { SlCalender } from "react-icons/sl";
import { IoDocumentTextOutline, IoImageOutline } from "react-icons/io5";
import {
  HiOutlineOfficeBuilding,
  HiOutlineArrowLeft,
  HiOutlineClock,
} from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";

const CMHelplineView = () => {
  const [cmHelplineData, setCmHelplineData] = useState({
    serialNo: "",
    dateOfReview: "",
    pendingDetails: "",
    periodOfPendency: "",
    relatedDept: "",
    status: "",
    reasonForDelay: "",
    reviewAtDivisionalLevel: "",
    reviewAtCsLevel: "",
    outcomeOfReview: "",
    actionOnDefaulter: "",
    lastLogin: "",
    letterFile: null,
    pictureFile: null,
  });
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const router = useRouter();

  const fetchCmHelplineData = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cm-helplines/${id}`
      );
      const result = await res.json();

      if (result.success) {
        const data = result.cmHelpline;
        setCmHelplineData({
          serialNo: data.serialNo || "",
          dateOfReview: data.dateOfReview || "",
          pendingDetails: data.pendingDetails || "",
          periodOfPendency: data.periodOfPendency || "",
          relatedDept: data.relatedDept || "",
          status: data.status || "",
          reasonForDelay: data.reasonForDelay || "",
          reviewAtDivisionalLevel: data.reviewAtDivisionalLevel || "",
          reviewAtCsLevel: data.reviewAtCsLevel || "",
          outcomeOfReview: data.outcomeOfReview || "",
          actionOnDefaulter: data.actionOnDefaulter || "",
          lastLogin: data.lastLogin || "",
          letterFile: data.uploads?.letter || null,
          pictureFile: data.uploads?.picture || null,
        });
      } else {
        toast.error("Failed to load CM helpline data");
      }
    } catch (error) {
      console.error("Error loading:", error);
      toast.error("Error loading data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCmHelplineData();
  }, [fetchCmHelplineData]);

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
      case "Resolved":
        return <MdCheckCircle className="text-green-500" />;
      case "In Progress":
        return <MdInfo className="text-blue-500" />;
      case "Pending":
        return <MdError className="text-orange-500" />;
      case "Open":
        return <MdCheckCircle className="text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "success";
      case "In Progress":
        return "info";
      case "Pending":
        return "warning";
      case "Open":
        return "success";
      default:
        return "default";
    }
  };

  const getReviewStatusColor = (reviewStatus) => {
    switch (reviewStatus) {
      case "Yes":
        return "success";
      case "No":
        return "error";
      case "Pending":
        return "warning";
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
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
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <HiOutlineArrowLeft size={24} />
                </button>
                <div>
                  <Typography
                    variant="h4"
                    className="font-bold mb-2 flex items-center gap-2"
                  >
                    <MdPhone size={32} />
                    CM Helpline Details
                  </Typography>
                  <Typography variant="body1" className="text-red-100">
                    View CM helpline record information and current status
                  </Typography>
                </div>
              </div>
              <div className="text-right">
                <Chip
                  label="View Mode"
                  className="!bg-white !text-red-600 !font-semibold"
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
                Basic Information
              </Typography>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow
                  label="Serial Number"
                  value={cmHelplineData.serialNo}
                  icon={SlCalender}
                />
                <InfoRow
                  label="Date of Review"
                  value={formatDate(cmHelplineData.dateOfReview)}
                  icon={BsCalendarDate}
                />
                <InfoRow
                  label="Related Department"
                  value={cmHelplineData.relatedDept}
                  icon={HiOutlineOfficeBuilding}
                />
                <InfoRow
                  label="Period of Pendency"
                  value={
                    cmHelplineData.periodOfPendency
                      ? `${cmHelplineData.periodOfPendency} days`
                      : "Not specified"
                  }
                  icon={HiOutlineClock}
                />
              </div>

              <div className="mt-6">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  Current Status
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  {getStatusIcon(cmHelplineData.status)}
                  <Chip
                    label={cmHelplineData.status || "Not specified"}
                    color={getStatusColor(cmHelplineData.status)}
                    className="font-semibold"
                  />
                </div>
              </div>

              <Divider className="my-6" />

              <div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  Pending Details
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <Typography className="text-gray-900 dark:text-white leading-relaxed">
                    {cmHelplineData.pendingDetails || "No details provided"}
                  </Typography>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Status Section */}
        <Card className="shadow-lg border-0 overflow-hidden mb-8">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/20 p-6 border-b">
              <Typography
                variant="h6"
                className="font-bold text-gray-800 dark:text-white flex items-center gap-2"
              >
                Review Status & Information
              </Typography>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                    Review at Divisional Level
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Chip
                      label={
                        cmHelplineData.reviewAtDivisionalLevel ||
                        "Not specified"
                      }
                      color={getReviewStatusColor(
                        cmHelplineData.reviewAtDivisionalLevel
                      )}
                      size="small"
                      className="font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                    Review at CS Level
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Chip
                      label={cmHelplineData.reviewAtCsLevel || "Not specified"}
                      color={getReviewStatusColor(
                        cmHelplineData.reviewAtCsLevel
                      )}
                      size="small"
                      className="font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {cmHelplineData.reasonForDelay && (
                  <div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                      Reason for Delay
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-600">
                      <Typography className="text-gray-900 dark:text-white leading-relaxed">
                        {cmHelplineData.reasonForDelay}
                      </Typography>
                    </div>
                  </div>
                )}

                {cmHelplineData.outcomeOfReview && (
                  <div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                      Outcome of Review
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-600">
                      <Typography className="text-gray-900 dark:text-white leading-relaxed">
                        {cmHelplineData.outcomeOfReview}
                      </Typography>
                    </div>
                  </div>
                )}

                {cmHelplineData.actionOnDefaulter && (
                  <div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                      Action on Defaulter
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-600">
                      <Typography className="text-gray-900 dark:text-white leading-relaxed">
                        {cmHelplineData.actionOnDefaulter}
                      </Typography>
                    </div>
                  </div>
                )}

                {cmHelplineData.lastLogin && (
                  <InfoRow
                    label="Last Login by Department"
                    value={new Date(cmHelplineData.lastLogin)
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
        {(cmHelplineData.letterFile || cmHelplineData.pictureFile) && (
          <Card className="shadow-lg border-0 overflow-hidden mb-8">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 p-6 border-b">
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 dark:text-white flex items-center gap-2"
                >
                  Attachments
                </Typography>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cmHelplineData.letterFile && (
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
                            downloadDocument(cmHelplineData.letterFile)
                          }
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <MdDownload size={16} />
                          Download
                        </button>
                      </div>
                    </div>
                  )}

                  {cmHelplineData.pictureFile && (
                    <div className="text-center">
                      <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-dashed border-purple-200 dark:border-purple-600">
                        <div className="flex flex-col items-center">
                          <IoImageOutline
                            className="text-purple-600 mb-3"
                            size={32}
                          />
                          <Typography className="font-medium text-gray-900 dark:text-white mb-3">
                            Picture Attachment
                          </Typography>

                          {/* Optional image preview */}
                          <div className="mb-3">
                            <img
                              src={`${
                                process.env.NEXT_PUBLIC_BASE_URL
                              }/uploads/${encodeURIComponent(
                                cmHelplineData.pictureFile
                              )}`}
                              alt="CM Helpline Preview"
                              className="w-16 h-16 object-cover rounded border"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </div>

                          <button
                            onClick={() =>
                              downloadDocument(cmHelplineData.pictureFile)
                            }
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
                CM Helpline Record ID: {id}
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

export default CMHelplineView;
