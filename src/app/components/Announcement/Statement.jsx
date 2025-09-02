"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  MdCloudUpload,
  MdCheckCircle,
  MdError,
  MdInfo,
  MdPublish,
  MdPause,
} from "react-icons/md";

import {
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Autocomplete,
  TextField,
  Popper,
  Paper,
  InputAdornment,
} from "@mui/material";
import { SlCalender } from "react-icons/sl";
import { IoDocumentTextOutline, IoImageOutline } from "react-icons/io5";
import {
  HiOutlineOfficeBuilding,
  HiOutlineLocationMarker,
  HiOutlineSearch,
  HiOutlineUserGroup,
  HiOutlineLightBulb,
} from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";

// Create a wrapper component for DatePicker to handle SSR properly
const ClientOnlyDatePicker = ({
  selected,
  onChange,
  placeholder,
  className,
  disabled,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <input
        type="text"
        className={className}
        placeholder={placeholder}
        readOnly
        value=""
        disabled={disabled}
      />
    );
  }

  const DatePicker = require("react-datepicker").default;

  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      className={className}
      placeholderText={placeholder}
      dateFormat="dd/MM/yyyy"
      disabled={disabled}
    />
  );
};

const Statement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [mounted, setMounted] = useState(false);
  const [dateOfStatement, setDateOfStatement] = useState(null);

  const [status, setStatus] = useState("");
  const [relatedDept, setRelatedDept] = useState("");
  const [departments, setDepartments] = useState([]);

  const [serialNo, setSerialNo] = useState("");
  const [mpMlaName, setMpMlaName] = useState("");
  const [constituencyName, setConstituencyName] = useState("");
  const [details, setDetails] = useState("");
  const [factualBrief, setFactualBrief] = useState("");
  const [lastLogin, setLastLogin] = useState("");

  const [letterFile, setLetterFile] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);

  const [letterServerName, setLetterServerName] = useState("");
  const [pictureServerName, setPictureServerName] = useState("");

  const [documentUpload, setDocumentUpload] = useState(null);

  const { id } = useParams();
  const router = useRouter();
  const isEditMode = !!id;

  const downloadDocument = (fileName) => {
    if (!fileName) return;
    const link = document.createElement("a");
    link.href = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${fileName}`;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    // Initialize date only on client side
    if (!dateOfStatement) setDateOfStatement(new Date());

    // Load CSS dynamically on client side
    if (typeof document !== "undefined") {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/react-datepicker@4.21.0/dist/react-datepicker.css";
      document.head.appendChild(link);
    }
    // Only run on mount, so ignore date warning intentionally
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStatementData = useCallback(async () => {
    if (typeof window === "undefined") return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/statements/${id}`
      );
      const result = await res.json();

      if (result.success) {
        const data = result.statement;
        setSerialNo(data.serialNo || "");
        setMpMlaName(data.mpMlaName || "");
        setConstituencyName(data.constituencyName || "");
        setDateOfStatement(new Date(data.dateOfStatement));
        setDetails(data.details || "");
        setRelatedDept(data.relatedDept || "");
        setFactualBrief(data.factualBrief || "");
        setStatus(data.status || "");
        setLastLogin(data.lastLogin || "");
        setLetterFile(data.uploads?.letter || null);
        setPictureFile(data.uploads?.picture || null);
        setDocumentUpload(data.documentUpload || null);

        setLetterServerName(data.uploads?.letter || "");
        setPictureServerName(data.uploads?.picture || "");
      } else {
        toast.error("Failed to load statement");
      }
    } catch (error) {
      console.error("Error loading:", error);
      toast.error("Error loading data");
    }
  }, [id]);

  const fetchDepartments = useCallback(async () => {
    try {
      const base = process.env.NEXT_PUBLIC_BASE_URL;
      const urls = [
        `${base}/api/departments/govt/`,
        `${base}/api/departments/public/`,
        `${base}/api/departments/aided/`,
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
  }, []);

  useEffect(() => {
    fetchDepartments();
    if (isEditMode && mounted) {
      fetchStatementData();
    }
  }, [id, mounted, isEditMode, fetchStatementData, fetchDepartments]);

  const handleChangeDepartment = (event) => {
    setRelatedDept(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleLetterUpload = (e) => setLetterFile(e.target.files[0]);
  const handlePictureUpload = (e) => setPictureFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dateOfStatement) {
      toast.error("Please select the statement date");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("serialNo", serialNo);
      formData.append("mpMlaName", mpMlaName);
      formData.append("constituencyName", constituencyName);
      formData.append("dateOfStatement", dateOfStatement.toISOString());
      formData.append("details", details);
      formData.append("relatedDept", relatedDept);
      formData.append("factualBrief", factualBrief);
      formData.append("status", status);
      if (lastLogin)
        formData.append("lastLogin", new Date(lastLogin).toISOString());
      if (letterFile) formData.append("letterFile", letterFile);
      if (pictureFile) formData.append("pictureFile", pictureFile);

      const res = await fetch(
        isEditMode
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/statements/${id}`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/statements`,
        {
          method: isEditMode ? "PUT" : "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Submission failed");
      }

      toast.success("Statement submitted successfully!");

      // Reset form after successful submission (only for new entries)
      if (!isEditMode) {
        setSerialNo("");
        setMpMlaName("");
        setConstituencyName("");
        setDateOfStatement(new Date());
        setDetails("");
        setRelatedDept("");
        setFactualBrief("");
        setStatus("");
        setLastLogin("");
        setLetterFile(null);
        setPictureFile(null);
      }

      if (isEditMode) {
        setTimeout(() => router.back(), 1000); // 1 second delay
      }
    } catch (err) {
      toast.error("Error: " + err.message);
      console.error(err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Published":
        return <MdPublish className="text-green-500" />;
      case "In Progress":
        return <MdInfo className="text-blue-500" />;
      case "Pending":
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
      case "Published":
        return "success";
      case "In Progress":
        return "info";
      case "Pending":
        return "warning";
      case "On Hold":
        return "error";
      case "Open":
        return "secondary";
      default:
        return "default";
    }
  };

  const filteredDepartments = useMemo(() => {
    if (!searchTerm) return departments;
    return departments.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [departments, searchTerm]);

  // Show loading state until component is mounted on client
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8 overflow-hidden shadow-xl border-0 animate-pulse">
            <div className="bg-gray-300 p-6 h-32"></div>
          </Card>
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <Card
                key={i}
                className="shadow-lg border-0 overflow-hidden animate-pulse"
              >
                <div className="bg-gray-200 p-6 h-16"></div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="space-y-2">
                        <div className="h-5 bg-gray-200 rounded w-20"></div>
                        <div className="h-12 bg-gray-100 border border-gray-200 rounded-xl"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <Card className="mb-8 overflow-hidden shadow-xl border-0">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold mb-2">
                  {isEditMode ? "Edit" : "Create"} MP/MLA Statement
                </Typography>
                <Typography variant="body1" className="text-indigo-100">
                  {isEditMode
                    ? "Update existing MP/MLA statement details"
                    : "Record new MP/MLA statement for parliamentary/assembly proceedings"}
                </Typography>
              </div>
              <div className="text-right">
                <Chip
                  label={isEditMode ? "Edit Mode" : "Create Mode"}
                  className="!bg-white !text-indigo-600 !font-semibold"
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
                  Basic Information
                </Typography>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      Serial Number
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter Serial Number"
                      value={serialNo}
                      onChange={(e) => setSerialNo(e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      Date of Statement
                    </label>
                    <div className="relative">
                      <ClientOnlyDatePicker
                        selected={dateOfStatement}
                        onChange={(date) => setDateOfStatement(date)}
                        placeholder="Select statement date"
                        className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300"
                        disabled
                      />
                      <BsCalendarDate
                        size={18}
                        className="absolute top-3 right-3 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      <HiOutlineUserGroup /> MP/MLA Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter MP/MLA Name"
                      value={mpMlaName}
                      onChange={(e) => setMpMlaName(e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      <HiOutlineLocationMarker /> Constituency Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter Constituency Name"
                      value={constituencyName}
                      onChange={(e) => setConstituencyName(e.target.value)}
                      disabled
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                    Details
                  </label>
                  <textarea
                    className="w-full h-32 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300 resize-none"
                    placeholder="Enter detailed information about the statement..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    disabled
                  />
                </div>

                {documentUpload && (
                  <button
                    type="button"
                    onClick={() => downloadDocument(documentUpload)}
                    className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                  >
                    Download Document
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Department and Status Section */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-gray-50 to-orange-50 dark:from-gray-800 dark:to-orange-900/20 p-6 border-b">
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 dark:text-white flex items-center gap-2"
                >
                  Department & Status Information
                </Typography>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      <HiOutlineOfficeBuilding /> Related Department
                    </label>
                    <Select
                      disabled
                      value={relatedDept}
                      onChange={handleChangeDepartment}
                      displayEmpty
                      className="w-full !rounded-xl !bg-white dark:!bg-gray-700"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 300,
                            width: "auto",
                            minWidth: "10%",
                            padding: 0,
                          },
                        },
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "center",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "center",
                        },
                      }}
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
                      Status
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
                      <MenuItem value="Open">
                        <div className="flex items-center gap-2">
                          <HiOutlineLightBulb className="text-purple-500" />
                          Open
                        </div>
                      </MenuItem>
                      <MenuItem value="Published">
                        <div className="flex items-center gap-2">
                          <MdPublish className="text-green-500" />
                          Published
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
                          <MdError className="text-yellow-500" />
                          Pending
                        </div>
                      </MenuItem>
                      <MenuItem value="On Hold">
                        <div className="flex items-center gap-2">
                          <MdPause className="text-red-500" />
                          On Hold
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
{/* 
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      Last Login by Department
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300"
                      value={lastLogin}
                      onChange={(e) => setLastLogin(e.target.value)}
                      disabled
                    />
                  </div> */}
                </div>

                <div className="mt-6 space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                    Factual Brief
                  </label>
                  <textarea
                    className="w-full h-32 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300 resize-none"
                    placeholder="Enter factual brief about the statement..."
                    value={factualBrief}
                    onChange={(e) => setFactualBrief(e.target.value)}
                    disabled
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Uploads Section */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 p-6 border-b">
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 dark:text-white flex items-center gap-2"
                >
                  File Uploads & Additional Information
                </Typography>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          Download Letter
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
                          Download Image
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
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  className="!bg-gradient-to-r !from-indigo-600 !to-purple-600 hover:!from-indigo-700 hover:!to-purple-700 !rounded-xl !px-8 !py-3 !font-semibold !shadow-lg hover:!shadow-xl !transition-all !duration-300 !transform hover:!scale-105"
                  onClick={handleSubmit}
                >
                  {isEditMode ? "Update Statement" : "Submit Statement"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Statement;
