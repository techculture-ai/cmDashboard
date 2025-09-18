"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { MdCheckCircle, MdError, MdInfo, MdDownload } from "react-icons/md";
import { Card, CardContent, Typography, Chip, Divider } from "@mui/material";
import { SlCalender } from "react-icons/sl";
import { IoDocumentTextOutline, IoImageOutline } from "react-icons/io5";
import {
  HiOutlineOfficeBuilding,
  HiOutlineLocationMarker,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";

const ReviewMeetingView = () => {
  const [meetingData, setMeetingData] = useState({
    serialNo: "",
    subject: "",
    department: "",
    dateOfReview: "",
    keyTakeAways: "",
    district: "",
    details: "",
    dateOfMoMRelease: "",
    actionTaken: "",
    lastLogin: "",
    momUpload: null,
    letterUpload: null,
    pictureUpload: null,
  });
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const router = useRouter();

  const fetchMeetingData = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/review-meetings/${id}`
      );
      const result = await res.json();

      if (result.success) {
        const data = result.meeting;
        setMeetingData({
          serialNo: data.serialNo || "",
          subject: data.subject || "",
          department: data.department || "",
          dateOfReview: data.dateOfReview || "",
          keyTakeAways: data.keyTakeAways || "",
          district: data.district || "",
          details: data.details || "",
          dateOfMoMRelease: data.dateOfMoMRelease || "",
          actionTaken: data.actionTaken || "",
          lastLogin: data.lastLogin || "",
          momUpload: data.momUpload || null,
          letterUpload: data.letterUpload || null,
          pictureUpload: data.pictureUpload || null,
        });
      } else {
        toast.error("Failed to load review meeting");
      }
    } catch (error) {
      console.error("Error loading:", error);
      toast.error("Error loading data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMeetingData();
  }, [fetchMeetingData]);

  const downloadDocument = (fileName) => {
    if (!fileName) return;
    const link = document.createElement("a");
    link.href = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${fileName}`;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
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
                    📋 Review Meeting Details
                  </Typography>
                  <Typography variant="body1" className="text-purple-100">
                    View review meeting information and outcomes
                  </Typography>
                </div>
              </div>
              <div className="text-right">
                <Chip
                  label="View Mode"
                  className="!bg-white !text-purple-600 !font-semibold"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Basic Information Section */}
        <Card className="shadow-lg border-0 overflow-hidden mb-8">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 p-6 border-b">
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
                  value={meetingData.serialNo}
                  icon={SlCalender}
                />
                <InfoRow
                  label="Subject"
                  value={meetingData.subject}
                  icon={IoDocumentTextOutline}
                />
                <InfoRow
                  label="Date of Review"
                  value={formatDate(meetingData.dateOfReview)}
                  icon={BsCalendarDate}
                />
                <InfoRow
                  label="District"
                  value={meetingData.district}
                  icon={HiOutlineLocationMarker}
                />
              </div>

              <Divider className="my-6" />

              <div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  Meeting Details
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <Typography className="text-gray-900 dark:text-white leading-relaxed">
                    {meetingData.details || "No details provided"}
                  </Typography>
                </div>
              </div>

              {meetingData.keyTakeAways && (
                <div className="mt-6">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                    Key Takeaways
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-600">
                    <Typography className="text-gray-900 dark:text-white leading-relaxed">
                      {meetingData.keyTakeAways}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Department & MoM Information Section */}
        <Card className="shadow-lg border-0 overflow-hidden mb-8">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/20 p-6 border-b">
              <Typography
                variant="h6"
                className="font-bold text-gray-800 dark:text-white flex items-center gap-2"
              >
                🏢 Department & MoM Information
              </Typography>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow
                  label="Department"
                  value={meetingData.department}
                  icon={HiOutlineOfficeBuilding}
                />
                <InfoRow
                  label="Date of MoM Release"
                  value={formatDate(meetingData.dateOfMoMRelease)}
                  icon={BsCalendarDate}
                />

                {meetingData.lastLogin && (
                  <div className="md:col-span-2">
                    <InfoRow
                      label="Last Login by Department"
                      value={new Date(meetingData.lastLogin)
                        .toString()
                        .split("GMT")[0]
                        .trim()}
                      icon={BsCalendarDate}
                    />
                  </div>
                )}
              </div>

              {meetingData.actionTaken && (
                <div className="mt-6">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                    Action Taken
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-600">
                    <Typography className="text-gray-900 dark:text-white leading-relaxed">
                      {meetingData.actionTaken}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* File Downloads Section */}
        {(meetingData.momUpload ||
          meetingData.letterUpload ||
          meetingData.pictureUpload) && (
          <Card className="shadow-lg border-0 overflow-hidden mb-8">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-gray-50 to-orange-50 dark:from-gray-800 dark:to-orange-900/20 p-6 border-b">
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 dark:text-white flex items-center gap-2"
                >
                  📎 Attachments
                </Typography>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {meetingData.momUpload && (
                    <div className="text-center">
                      <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-2 border-dashed border-orange-200 dark:border-orange-600">
                        <IoDocumentTextOutline
                          className="mx-auto text-orange-600 mb-3"
                          size={32}
                        />
                        <Typography className="font-medium text-gray-900 dark:text-white mb-3">
                          Minutes of Meeting (MoM)
                        </Typography>
                        <button
                          onClick={() =>
                            downloadDocument(meetingData.momUpload)
                          }
                          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          <MdDownload size={16} />
                          Download
                        </button>
                      </div>
                    </div>
                  )}

                  {meetingData.letterUpload && (
                    <div className="text-center">
                      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-600">
                        <IoDocumentTextOutline
                          className="mx-auto text-blue-600 mb-3"
                          size={32}
                        />
                        <Typography className="font-medium text-gray-900 dark:text-white mb-3">
                          Letter
                        </Typography>
                        <button
                          onClick={() =>
                            downloadDocument(meetingData.letterUpload)
                          }
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <MdDownload size={16} />
                          Download
                        </button>
                      </div>
                    </div>
                  )}

                  {meetingData.pictureUpload && (
                    <div className="text-center">
                      <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-dashed border-purple-200 dark:border-purple-600">
                        <div className="flex flex-col items-center">
                          <IoImageOutline
                            className="text-purple-600 mb-3"
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
                                meetingData.pictureUpload
                              )}`}
                              alt="Meeting Preview"
                              className="w-16 h-16 object-cover rounded border"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </div>

                          <button
                            onClick={() =>
                              downloadDocument(meetingData.pictureUpload)
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
                Meeting ID: {id}
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

export default ReviewMeetingView;
