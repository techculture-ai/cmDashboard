"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
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

const InnovativeProposals = () => {
  const [mounted, setMounted] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startDate2, setStartDate2] = useState(null);

  const [status, setStatus] = useState("");
  const [district, setDistrict] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);

  const [serialNo, setSerialNo] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [repName, setRepName] = useState("");
  const [repContact, setRepContact] = useState("");
  const [details, setDetails] = useState("");
  const [nodalOfficer, setNodalOfficer] = useState("");
  const [actionTaken, setActionTaken] = useState("");
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

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       await axios.get(
  //         `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth/check`,
  //         {
  //           withCredentials: true, // ✅ send cookie
  //         }
  //       );
  //     } catch (err) {
  //       console.log("error messsage:", err);
  //       router.push("/department-login");
  //     }
  //   };
  //   checkAuth();
  // }, []);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    // Initialize dates only on client side
    if (!startDate) setStartDate(new Date());
    if (!startDate2) setStartDate2(new Date());

    // Load CSS dynamically on client side
    if (typeof document !== "undefined") {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/react-datepicker@4.21.0/dist/react-datepicker.css";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
    if (isEditMode && mounted) {
      fetchProposalData();
    }
  }, [id, mounted]);

  const fetchProposalData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/innovative-proposals/${id}`
      );
      const result = await res.json();

      if (result.success) {
        // const data = result.data;
        const data = result.proposal;
        setSerialNo(data.serialNo || "");
        setInstitutionName(data.institutionName || "");
        setStartDate(new Date(data.dateOfSubmission));
        setRepName(data.representative?.name || ""); // <-- FIXED
        setRepContact(data.representative?.contact || ""); // <-- FIXED
        setDistrict(data.district || "");
        setDetails(data.details || "");
        setDepartment(data.departmentSubmitted || "");
        setNodalOfficer(data.officerSubmitted || "");
        setActionTaken(data.actionTaken || "");
        setStatus(data.status || "");
        setLastLogin(data.lastLogin || "");
        setLetterFile(data.letterFile || null);
        setPictureFile(data.pictureFile || null);
        setDocumentUpload(data.documentUpload || null);

        setLetterServerName(data.letterUpload || "");
        setPictureServerName(data.pictureUpload || "");
      } else {
        toast.error("Failed to load proposal");
      }
    } catch (error) {
      console.error("Error loading:", error);
      toast.error("Error loading data");
    }
  };

  const fetchDepartments = async () => {
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
  };

  // useEffect(() => {
  //   if (isEditMode) {
  //     fetchProposalData();
  //   }
  //   fetchDepartments(); // <-- fetch dynamically
  // }, [id]);

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

    if (!startDate) {
      toast.error("Please select the submission date");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("serialNo", serialNo);
      formData.append("institutionName", institutionName);
      formData.append("dateOfSubmission", startDate.toISOString());
      formData.append("representativeName", repName);
      formData.append("representativeContact", repContact);
      formData.append("district", district);
      formData.append("details", details);
      formData.append("departmentSubmitted", department);
      formData.append("officerSubmitted", nodalOfficer);
      formData.append("actionTaken", actionTaken);
      formData.append("status", status);
      if (lastLogin)
        formData.append("lastLogin", new Date(lastLogin).toISOString());
      if (letterFile) formData.append("letterFile", letterFile);
      if (pictureFile) formData.append("pictureFile", pictureFile);

      const res = await fetch(
        isEditMode
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/innovative-proposals/${id}`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/innovative-proposals`,
        {
          method: isEditMode ? "PUT" : "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Submission failed");
      }

      toast.success("Innovative Proposal submitted successfully!");

      // Reset form after successful submission (only for new entries)
      if (!isEditMode) {
        setSerialNo("");
        setInstitutionName("");
        setStartDate(new Date());
        setStartDate2(new Date());
        setRepName("");
        setRepContact("");
        setDistrict("");
        setDetails("");
        setDepartment("");
        setNodalOfficer("");
        setActionTaken("");
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

  const districts = [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi",
  ];

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
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold mb-2">
                  {isEditMode ? "✏️ Update" : "💡 Create"} Innovative Proposal
                </Typography>
                <Typography variant="body1" className="text-purple-100">
                  {isEditMode
                    ? "Update existing innovative proposal details"
                    : "Submit your innovative ideas and proposals for government consideration"}
                </Typography>
              </div>
              <div className="text-right">
                <Chip
                  label={isEditMode ? "Update Mode" : "Create Mode"}
                  className="!bg-white !text-purple-600 !font-semibold"
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
                      value={serialNo}
                      onChange={(e) => setSerialNo(e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      🏢 Institution/Individual/Company Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter the Name"
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      📅 Date of Submission
                    </label>
                    <div className="relative">
                      <ClientOnlyDatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        placeholder="Select submission date"
                        className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300"
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
                      {districts.map((dist) => (
                        <MenuItem key={dist} value={dist}>
                          {dist}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                    📝 Details
                  </label>
                  <textarea
                    className="w-full h-32 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300 resize-none"
                    placeholder="Brief detail about the innovative proposal"
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

          {/* Representative Information Section */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/20 p-6 border-b">
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 dark:text-white flex items-center gap-2"
                >
                  👤 Representative Information
                </Typography>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      👨‍💼 Representative Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter Representative Name"
                      value={repName}
                      onChange={(e) => setRepName(e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      📞 Representative Contact
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter Contact Information"
                      value={repContact}
                      onChange={(e) => setRepContact(e.target.value)}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Department and Status Information */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-gray-50 to-orange-50 dark:from-gray-800 dark:to-orange-900/20 p-6 border-b">
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
                      <HiOutlineOfficeBuilding /> Department Submitted To
                    </label>
                    <Select
                      disabled
                      value={department}
                      onChange={handleChangeDepartment}
                      displayEmpty
                      className="w-full !rounded-xl !bg-white dark:!bg-gray-700"
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
                      👨‍💼 Officer Submitted To
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300"
                      placeholder="Name of the Nodal Officer"
                      value={nodalOfficer}
                      onChange={(e) => setNodalOfficer(e.target.value)}
                      disabled
                    />
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

                <div className="mt-6 space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                    📋 Action Taken by Department
                  </label>
                  <textarea
                    className="w-full h-32 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300 resize-none"
                    placeholder="Brief description about the action taken for the innovative idea"
                    value={actionTaken}
                    onChange={(e) => setActionTaken(e.target.value)}
                    disabled
                  />
                </div>
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
                      <IoDocumentTextOutline /> Upload Letter with Date
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
                      <IoImageOutline /> Upload Picture with Date
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
                  className="!bg-gradient-to-r !from-purple-600 !to-pink-600 hover:!from-purple-700 hover:!to-pink-700 !rounded-xl !px-8 !py-3 !font-semibold !shadow-lg hover:!shadow-xl !transition-all !duration-300 !transform hover:!scale-105"
                  onClick={handleSubmit}
                >
                  {isEditMode ? "💾 Update Proposal" : "🚀 Submit Proposal"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default InnovativeProposals;
