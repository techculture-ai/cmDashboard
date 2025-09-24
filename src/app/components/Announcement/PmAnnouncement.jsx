"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { MdCloudUpload, MdCheckCircle, MdError, MdInfo } from "react-icons/md";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import { SlCalender } from "react-icons/sl";
import { IoDocumentTextOutline, IoImageOutline } from "react-icons/io5";
import {
  HiOutlineOfficeBuilding,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";
import axios from "axios";

const PMAnnouncement = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const [startDate3, setStartDate3] = useState(new Date());

  const [status, setStatus] = useState("");
  const [district, setDistrict] = useState("");
  const [department, setDepartment] = useState("");

  const [departments, setDepartments] = useState([]);

  const [sNo, setSNo] = useState("");
  const [announcementNo, setAnnouncementNo] = useState("");
  const [details, setDetails] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [reason, setReason] = useState("");
  const [letterFile, setLetterFile] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);

  const [letterServerName, setLetterServerName] = useState("");
  const [pictureServerName, setPictureServerName] = useState("");

  const [documentUpload, setDocumentUpload] = useState(null);

  const { id } = useParams();
  const router = useRouter();
  const isEditMode = !!id;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth/check`,
          {
            withCredentials: true, // ✅ send cookie
          }
        );
      } catch (err) {
        console.log("error messsage:", err);
        router.push("/department-login");
      }
    };
    checkAuth();
  }, []);

  // When fetching announcement data
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/pm-announcement/${id}`);
      const data = await res.json();
      setDocumentUpload(data?.data?.documentUpload || "");
      // set other fields here...
    }
    fetchData();
  }, [id]);

  // Download function
  const downloadDocument = (fileName) => {
    if (!fileName) return;
    const link = document.createElement("a");
    link.href = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${fileName}`;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  useEffect(() => {
    if (isEditMode) {
      fetchCMAnnouncementData();
    }
  }, [id]);

  const fetchCMAnnouncementData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/pm-announcements/${id}`
      );
      const result = await res.json();

      if (result.success) {
        const data = result.data;
        setSNo(data.serialNo || "");
        setAnnouncementNo(data.announcementNo || "");
        // setStartDate(new Date(data.dateOfAnnouncement));
        setDistrict(data.district || "");
        setDetails(data.details || "");
        setDepartment(data.department || "");
        // setStartDate2(new Date(data.dateOfCompletion));
        // setStartDate3(new Date(data.expectedCompletion));
        setStartDate(
          data.dateOfAnnouncement
            ? new Date(data.dateOfAnnouncement)
            : new Date()
        );
        setStartDate2(
          data.dateOfCompletion ? new Date(data.dateOfCompletion) : new Date()
        );
        setStartDate3(
          data.expectedCompletion
            ? new Date(data.expectedCompletion)
            : new Date()
        );

        setStatus(data.status || "");
        setLastLogin(data.lastLogin || "");
        setReason(data.reason || "");
        setLetterFile(data.letterUpload || null);
        setPictureFile(data.pictureUpload || null);
        setDocumentUpload(data.documentUpload || null);

        setLetterServerName(data.letterUpload || "");
        setPictureServerName(data.pictureUpload || "");
      } else {
        toast.error("Failed to load announcement");
      }
    } catch (error) {
      console.error("Error loading:", error);
      toast.error("Error loading data");
    }
  };

  const fetchDepartments = async () => {
    try {
      const urls = [
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/govt/`,
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/public/`,
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/aided/`,
      ];

      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(responses.map((res) => res.json()));

      // Flatten all arrays and merge
      const allDepartments = data.flatMap((group) => group.departments || []);
      setDepartments(allDepartments);
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Failed to load departments");
    }
  };

  useEffect(() => {
    if (isEditMode) {
      fetchCMAnnouncementData();
    }
    fetchDepartments(); // <-- fetch dynamically
  }, [id]);

  const handleChangeDistrict = (event) => {
    setDistrict(event.target.value);
  };

  const handleChangeDepartment = (event) => {
    setDepartment(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleLetterUpload = (e) => setLetterFile(e.target.files[0]);
  const handlePictureUpload = (e) => setPictureFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("serialNo", sNo);
      formData.append("announcementNo", announcementNo);
      formData.append("dateOfAnnouncement", startDate.toISOString());
      formData.append("district", district);
      formData.append("details", details);
      formData.append("department", department);
      formData.append("dateOfCompletion", startDate2.toISOString());
      formData.append("status", status);
      formData.append("reason", reason);
      formData.append("expectedCompletion", startDate3.toISOString());
      if (lastLogin) {
        formData.append("lastLogin", new Date(lastLogin).toISOString());
      }

      if (letterFile) formData.append("letterFile", letterFile);
      if (pictureFile) formData.append("pictureFile", pictureFile);

      const res = await fetch(
        isEditMode
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/pm-announcements/${id}`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/pm-announcements/`,
        {
          method: isEditMode ? "PUT" : "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit");
      }

      if (isEditMode) {
        setTimeout(() => router.back(), 1000); // 1 second delay
      }

      const result = await res.json();
      toast.success("Announcement submitted successfully!");
      console.log(result);
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Submission failed: " + err.message);
    }
  };

  // const departments = [
  //   "Agriculture Department",
  //   "Animal Husbandry Department",
  //   "Budget Department",
  //   "Cane Development and Sugar Industry Department",
  //   "Co-operative Department",
  //   "Uttarakhand Dairy Development Department",
  //   "Directorate of Departmental Accounts",
  //   "Directorate of Training & Employment",
  //   "Disaster Mitigation and Management Centre (DMMC)",
  //   "Excise Department",
  //   "Fisheries Department",
  //   "Food, Civil Supplies & Consumer Affairs Department",
  //   "Forest Department",
  //   "Higher Education Department",
  //   "Information Technology Development Agency (I.T.D.A.)",
  //   "Information and Public Relation Department",
  //   "Irrigation Department",
  //   "Labour Department",
  //   "Uttarakhand Medical Education Department",
  //   "Medical Health and Family Welfare Department",
  //   "Minor Irrigation Department",
  //   "Panchayati Raj Department",
  //   "Public Works Department",
  //   "Renewable Energy Development Agency",
  //   "Revenue & Board of Revenue Department",
  //   "Rural Development Department",
  //   "Rural Works Department",
  //   "School Education Department",
  //   "Sericulture Department",
  //   "Sports Department",
  //   "Stamps and Registration Department",
  //   "State Council for Science and Technology",
  //   "State Horticulture Mission",
  //   "State Tax Department",
  //   "State Water & Sanitation Mission",
  //   "Tourism Department",
  //   "Town and Country Planning Department",
  //   "Transport Department",
  //   "Uttarakhand Jal Sansthan Department",
  //   "Vigilance Establishment",
  //   "Uttarakhand",
  // ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <MdCheckCircle className="text-green-500" />;
      case "In Progress":
        return <MdInfo className="text-blue-500" />;
      case "Pending":
        return <MdError className="text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "In Progress":
        return "info";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <Card className="mb-8 overflow-hidden shadow-xl border-0">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold mb-2">
                  {isEditMode ? "✏️ Update" : "➕ Create"} PM Announcement
                </Typography>
                <Typography variant="body1" className="text-blue-100">
                  {isEditMode
                    ? "Update existing announcement details"
                    : "Add new announcement to the system"}
                </Typography>
              </div>
              <div className="text-right">
                <Chip
                  label={isEditMode ? "Update Mode" : "Create Mode"}
                  className="!bg-white !text-blue-600 !font-semibold"
                />
              </div>
            </div>
          </div>
        </Card>

        <form className="space-y-8">
          {/* Basic Information Section */}
          <Card className="shadow-lg border-0 overflow-hidden">
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
                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      🔢 Serial Number
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter Serial Number"
                      value={sNo}
                      onChange={(e) => setSNo(e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      📋 Announcement Number
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter Announcement Number"
                      value={announcementNo}
                      onChange={(e) => setAnnouncementNo(e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      📅 Date of Announcement
                    </label>
                    <div className="relative">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300"
                        dateFormat="dd/MM/yyyy"
                        disabled
                      />
                      <BsCalendarDate
                        size={18}
                        className="absolute top-3 right-3 text-gray-400 pointer-events-none"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      <HiOutlineLocationMarker /> District
                    </label>
                    <Select
                      disabled
                      value={district}
                      onChange={handleChangeDistrict}
                      displayEmpty
                      className="w-full !rounded-xl !bg-white dark:!bg-gray-700"
                      sx={{
                        height: "48px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "&:hover fieldset": {
                            borderColor: "#3b82f6",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#3b82f6",
                            borderWidth: "2px",
                          },
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em className="text-gray-400">Select District</em>
                      </MenuItem>
                      <MenuItem value="Almora">Almora</MenuItem>
                      <MenuItem value="Bageshwar">Bageshwar</MenuItem>
                      <MenuItem value="Chamoli">Chamoli</MenuItem>
                      <MenuItem value="Champawat">Champawat</MenuItem>
                      <MenuItem value="Dehradun">Dehradun</MenuItem>
                      <MenuItem value="Haridwar">Haridwar</MenuItem>
                      <MenuItem value="Nainital">Nainital</MenuItem>
                      <MenuItem value="Pauri Garhwal">Pauri Garhwal</MenuItem>
                      <MenuItem value="Pithoragarh">Pithoragarh</MenuItem>
                      <MenuItem value="Rudraprayag">Rudraprayag</MenuItem>
                      <MenuItem value="Tehri Garhwal">Tehri Garhwal</MenuItem>
                      <MenuItem value="Udham Singh Nagar">
                        Udham Singh Nagar
                      </MenuItem>
                      <MenuItem value="Uttarkashi">Uttarkashi</MenuItem>
                    </Select>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                    📝 Details
                  </label>
                  <textarea
                    className="w-full h-32 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300 resize-none"
                    placeholder="Brief detail about the announcement"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    disabled
                  />
                </div>

                {documentUpload && (
                  <button
                    type="button"
                    // onClick={() => downloadDocument(documentUpload)}
                    onClick={() => downloadDocument(documentUpload)}
                    className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                  >
                    📥 Download Document
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Department and Status Section */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/20 p-6 border-b">
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 dark:text-white flex items-center gap-2"
                >
                  🏢 Department & Status Information
                </Typography>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      <HiOutlineOfficeBuilding /> Department
                    </label>
                    <Select
                      value={department}
                      onChange={handleChangeDepartment}
                      displayEmpty
                      className="w-full !rounded-xl !bg-white dark:!bg-gray-700"
                      disabled
                    >
                      <MenuItem value="">
                        <em className="text-gray-400">Select Department</em>
                      </MenuItem>
                      {departments.map((item, index) => (
                        <MenuItem key={item._id || index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      📅 Date of Completion
                    </label>
                    <div className="relative">
                      <DatePicker
                        selected={startDate2}
                        onChange={(date) => setStartDate2(date)}
                        className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300"
                        dateFormat="dd/MM/yyyy"
                        disabled
                      />
                      <BsCalendarDate
                        size={18}
                        className="absolute top-3 right-3 text-gray-400 pointer-events-none"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      ⚡ Status
                    </label>
                    <Select
                      value={status}
                      onChange={handleChangeStatus}
                      displayEmpty
                      className="w-full !rounded-xl !bg-white dark:!bg-gray-700"
                      sx={{
                        height: "48px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "&:hover fieldset": {
                            borderColor: "#3b82f6",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#3b82f6",
                            borderWidth: "2px",
                          },
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em className="text-gray-400">Select Status</em>
                      </MenuItem>
                      <MenuItem value="Completed">
                        <div className="flex items-center gap-2">
                          <MdCheckCircle className="text-green-500" />
                          Completed
                        </div>
                      </MenuItem>
                      <MenuItem value="In Progress">
                        <div className="flex items-center gap-2">
                          <MdInfo className="text-blue-500" />
                          In Progress
                        </div>
                      </MenuItem>
                      <MenuItem value="Pending">
                        <div className="flex items-center gap-2">
                          <MdError className="text-orange-500" />
                          Pending
                        </div>
                      </MenuItem>
                    </Select>
                  </div>

                  {status && (
                    <div className="space-y-2">
                      <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm">
                        Current Status
                      </label>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        {getStatusIcon(status)}
                        <Chip
                          label={status}
                          color={getStatusColor(status)}
                          size="small"
                          className="font-semibold"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Conditional Status-based Fields */}
                {(status === "In Progress" || status === "Pending") && (
                  <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                      <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                        ⚠️ Reason for Delay
                      </label>
                      <textarea
                        className="w-full h-32 border-2 border-orange-200 dark:border-orange-600 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl px-4 py-3 bg-orange-50 dark:bg-orange-900/20 transition-all duration-300 resize-none"
                        placeholder="Please explain the reason for delay..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                        🎯 Expected Completion Date
                      </label>
                      <div className="relative">
                        <DatePicker
                          selected={startDate3}
                          onChange={(date) => setStartDate3(date)}
                          className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300"
                          dateFormat="dd/MM/yyyy"
                        />
                        <BsCalendarDate
                          size={18}
                          className="absolute top-3 right-3 text-gray-400 pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {status === "Completed" && (
                  <div className="mt-6 space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      ✅ Completion Date & Time
                    </label>
                    <div className="relative">
                      <DatePicker
                        selected={startDate3}
                        onChange={(date) => setStartDate3(date)}
                        className="w-full h-12 border-2 border-green-200 dark:border-green-600 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl px-4 bg-green-50 dark:bg-green-900/20 transition-all duration-300"
                        dateFormat="dd/MM/yyyy"
                      />
                      <BsCalendarDate
                        size={18}
                        className="absolute top-3 right-3 text-green-400 pointer-events-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* File Uploads and Additional Info */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 p-6 border-b">
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 dark:text-white flex items-center gap-2"
                >
                  📎 File Uploads & Additional Information
                </Typography>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      <IoDocumentTextOutline /> Upload Letter
                    </label>
                    <div className="relative group">
                      <div className="w-full h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 outline-none rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 relative flex flex-col items-center justify-center gap-2 hover:bg-gradient-to-br hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 cursor-pointer group-hover:scale-[1.02]">
                        <input
                          type="file"
                          className="w-full h-full opacity-0 absolute top-0 left-0 z-10 cursor-pointer"
                          onChange={handleLetterUpload}
                          accept=".pdf,.doc,.docx"
                        />
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                          <MdCloudUpload size={24} />
                          <span className="font-medium">
                            {letterFile
                              ? letterFile.name || "File Selected"
                              : "Click to Upload Letter"}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          PDF, DOC, DOCX files accepted
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      <IoImageOutline /> Upload Picture
                    </label>
                    <div className="relative group">
                      <div className="w-full h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-400 outline-none rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 relative flex flex-col items-center justify-center gap-2 hover:bg-gradient-to-br hover:from-purple-100 hover:to-pink-100 transition-all duration-300 cursor-pointer group-hover:scale-[1.02]">
                        <input
                          type="file"
                          className="w-full h-full opacity-0 absolute top-0 left-0 z-10 cursor-pointer"
                          onChange={handlePictureUpload}
                          accept="image/*"
                        />
                        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                          <MdCloudUpload size={24} />
                          <span className="font-medium">
                            {pictureFile
                              ? pictureFile.name || "File Selected"
                              : "Click to Upload Picture"}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          JPG, PNG, GIF files accepted
                        </span>
                      </div>
                    </div>
                  </div> */}

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      <IoDocumentTextOutline /> Upload Letter
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="relative group">
                        <div className="w-full h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 outline-none rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 relative flex flex-col items-center justify-center gap-2 hover:bg-gradient-to-br hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 cursor-pointer group-hover:scale-[1.02] p-10">
                          <input
                            type="file"
                            className="w-full h-full opacity-0 absolute top-0 left-0 z-10 cursor-pointer"
                            onChange={handleLetterUpload}
                            accept=".pdf,.doc,.docx"
                          />
                          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                            <MdCloudUpload size={24} />
                            <span className="font-medium">
                              {letterFile
                                ? typeof letterFile === "string"
                                  ? letterFile // backend filename
                                  : letterFile.name || "File Selected"
                                : "Click to Upload Letter"}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            PDF, DOC, DOCX files accepted
                          </span>
                        </div>
                      </div>
                    </div>

                    {letterServerName && (
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => downloadDocument(letterServerName)}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium px-6 py-3 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-200 ease-in-out"
                        >
                          📥 Download Letter
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      <IoImageOutline /> Upload Picture
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="relative group">
                        <div className="w-full h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-400 outline-none rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 relative flex flex-col items-center justify-center gap-2 hover:bg-gradient-to-br hover:from-purple-100 hover:to-pink-100 transition-all duration-300 cursor-pointer group-hover:scale-[1.02] p-10">
                          <input
                            type="file"
                            className="w-full h-full opacity-0 absolute top-0 left-0 z-10 cursor-pointer"
                            onChange={handlePictureUpload}
                            accept="image/*"
                          />
                          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                            <MdCloudUpload size={24} />
                            <span className="font-medium">
                              {/* {pictureFile
                                                ? pictureFile.name || "File Selected"
                                                : "Click to Upload Picture"} */}
                              {pictureFile
                                ? typeof pictureFile === "string"
                                  ? pictureFile // backend filename
                                  : pictureFile.name || "File Selected"
                                : "Click to Upload Picture"}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            JPG, PNG, GIF files accepted
                          </span>
                        </div>
                      </div>
                    </div>
                    {pictureServerName && (
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => downloadDocument(pictureServerName)}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium px-6 py-3 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-200 ease-in-out"
                        >
                          📥 Download Image
                        </button>

                        {/* Optional preview */}
                        <img
                          src={`${
                            process.env.NEXT_PUBLIC_BASE_URL
                          }/uploads/${encodeURIComponent(pictureServerName)}`}
                          alt="Uploaded Preview"
                          className="w-16 h-16 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>

                  {/* <div className="space-y-2 md:col-span-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      👤 Last Login by Department
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter last login information"
                      value={lastLogin}
                      onChange={(e) => setLastLogin(e.target.value)}
                    />
                  </div> */}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-end gap-4">
                <Button
                  variant="outlined"
                  color="error"
                  className="!rounded-xl !px-8 !py-3 !font-semibold !border-2 hover:!bg-red-50 !transition-all !duration-300"
                  onClick={() => router.back()}
                >
                  ❌ Cancel
                </Button>
                <Button
                  variant="contained"
                  className="!bg-gradient-to-r !from-blue-600 !to-indigo-600 hover:!from-blue-700 hover:!to-indigo-700 !rounded-xl !px-8 !py-3 !font-semibold !shadow-lg hover:!shadow-xl !transition-all !duration-300 !transform hover:!scale-105"
                  onClick={handleSubmit}
                >
                  {isEditMode
                    ? "💾 Update Announcement"
                    : "🚀 Submit Announcement"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default PMAnnouncement;
