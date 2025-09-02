"use client";
import { useParams, useRouter } from "next/navigation";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";

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
  TextField,
  InputAdornment,
} from "@mui/material";
import { SlCalender } from "react-icons/sl";
import { IoDocumentTextOutline, IoImageOutline } from "react-icons/io5";

import {
  HiOutlineOfficeBuilding,
  HiOutlineLocationMarker,
  HiOutlineSearch,
} from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";

const ReviewMeeting = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [dateOfReview, setDateOfReview] = useState(new Date());
  const [dateOfMoMRelease, setDateOfMoMRelease] = useState(new Date());

  const [district, setDistrict] = useState("");
  const [department, setDepartment] = useState("");

  const [departments, setDepartments] = useState([]);

  const [serialNo, setSerialNo] = useState("");
  const [subject, setSubject] = useState("");
  const [keyTakeAways, setKeyTakeAways] = useState("");
  const [details, setDetails] = useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [momFile, setMomFile] = useState(null);
  const [letterFile, setLetterFile] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);

  const [letterServerName, setLetterServerName] = useState("");
  const [pictureServerName, setPictureServerName] = useState("");
  const [momServerName, setMomServerName] = useState("");

  const { id } = useParams();
  const router = useRouter();
  const isEditMode = !!id;

  const fetchReviewMeetingData = useCallback(async () => {
    if (!id) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/review-meetings/${id}`
      );
      const result = await res.json();

      if (result.success) {
        const data = result.meeting;
        setSerialNo(data.serialNo || "");
        setSubject(data.subject || "");
        setDepartment(data.department || "");
        setDateOfReview(new Date(data.dateOfReview));
        setKeyTakeAways(data.keyTakeAways || "");
        setDistrict(data.district || "");
        setDetails(data.details || "");
        setDateOfMoMRelease(new Date(data.dateOfMoMRelease));
        setActionTaken(data.actionTaken || "");
        setLastLogin(data.lastLogin || "");
        setMomFile(data.momUpload || null);
        setLetterFile(data.letterUpload || null);
        setPictureFile(data.pictureUpload || null);
        setLetterServerName(data.letterUpload || "");
        setPictureServerName(data.pictureUpload || "");
        setMomServerName(data.momUpload || "");
      } else {
        toast.error("Failed to load review meeting");
      }
    } catch (error) {
      console.error("Error loading:", error);
      toast.error("Error loading data");
    }
  }, [id]);

  const fetchDepartments = useCallback(async () => {
    try {
      const departmentSources = [
        {
          url: "https://cmbhartibackend.onrender.com/api/departments/govt/",
          group: "Government Departments",
        },
        {
          url: "https://cmbhartibackend.onrender.com/api/departments/public/",
          group: "Public Undertakings",
        },
        {
          url: "https://cmbhartibackend.onrender.com/api/departments/aided/",
          group: "Aided Departments",
        },
      ];

      const responses = await Promise.all(
        departmentSources.map((src) => fetch(src.url))
      );
      const results = await Promise.all(responses.map((res) => res.json()));

      const allDepartments = results.flatMap((result, index) => {
        const source = departmentSources[index];
        const departmentsArray = result.departments || [];
        return departmentsArray.map((dept) => ({
          ...dept,
          group: source.group,
        }));
      });

      setDepartments(allDepartments);
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Failed to load departments");
    }
  }, []);



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
      fetchReviewMeetingData();
    }
    fetchDepartments();
  }, [fetchReviewMeetingData, fetchDepartments, isEditMode]);

  const handleChangeDistrict = (event) => {
    setDistrict(event.target.value);
  };

  const handleChangeDepartment = (event) => {
    setDepartment(event.target.value);
  };

  const handleMomUpload = (e) => setMomFile(e.target.files[0]);
  const handleLetterUpload = (e) => setLetterFile(e.target.files[0]);
  const handlePictureUpload = (e) => setPictureFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("serialNo", serialNo);
      formData.append("subject", subject);
      formData.append("department", department);
      formData.append("dateOfReview", dateOfReview.toISOString());
      formData.append("keyTakeAways", keyTakeAways);
      formData.append("district", district);
      formData.append("details", details);
      formData.append("dateOfMoMRelease", dateOfMoMRelease.toISOString());
      formData.append("actionTaken", actionTaken);

      if (lastLogin) {
        formData.append("lastLogin", new Date(lastLogin).toISOString());
      }

      if (momFile) formData.append("momFile", momFile);
      if (letterFile) formData.append("letterFile", letterFile);
      if (pictureFile) formData.append("pictureFile", pictureFile);

      const res = await fetch(
        isEditMode
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/review-meetings/${id}`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/review-meetings/`,
        {
          method: isEditMode ? "PUT" : "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit");
      }

      const result = await res.json();
      toast.success("Review Meeting submitted successfully!");
      router.back();
      console.log(result);
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Submission failed: " + err.message);
    }
  };

  const filteredDepartments = useMemo(() => {
    if (!searchTerm) return departments;
    return departments.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [departments, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <Card className="mb-8 overflow-hidden shadow-xl border-0">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold mb-2">
                  {isEditMode ? "✏️ Edit" : "➕ Create"} Review Meeting
                </Typography>
                <Typography variant="body1" className="text-purple-100">
                  {isEditMode
                    ? "Update existing review meeting details"
                    : "Add new review meeting to the system"}
                </Typography>
              </div>
              <div className="text-right">
                <Chip
                  label={isEditMode ? "Edit Mode" : "Create Mode"}
                  className="!bg-white !text-purple-600 !font-semibold"
                />
              </div>
            </div>
          </div>
        </Card>

        <form className="space-y-8">
          {/* Basic Information Section */}
          <Card className="shadow-lg border-0 overflow-visible pb-48 pt-10">
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
                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      🔢 Serial Number
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter Serial Number"
                      value={serialNo}
                      onChange={(e) => setSerialNo(e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      📋 Subject
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter Meeting Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      📅 Date of Review
                    </label>
                    <div className="relative">
                      <DatePicker
                        selected={dateOfReview}
                        onChange={(date) => setDateOfReview(date)}
                        dateFormat="dd/MM/yy"
                        className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300"
                      />
                      <BsCalendarDate
                        size={18}
                        className="absolute top-3 right-3 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      <HiOutlineLocationMarker /> District
                    </label>
                    <Select
                      value={district}
                      onChange={handleChangeDistrict}
                      displayEmpty
                      className="w-full !rounded-xl !bg-white dark:!bg-gray-700"
                      sx={{
                        height: "48px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "&:hover fieldset": {
                            borderColor: "#9333ea",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#9333ea",
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
                    className="w-full h-32 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300 resize-none"
                    placeholder="Brief detail about the review meeting"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>

                <div className="mt-6 space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                    🎯 Key Takeaways
                  </label>
                  <textarea
                    className="w-full h-32 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300 resize-none"
                    placeholder="Enter key takeaways from the meeting"
                    value={keyTakeAways}
                    onChange={(e) => setKeyTakeAways(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Department and MoM Section */}
          <Card className="shadow-lg border-0 overflow-hidden pb-36">
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
                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      <HiOutlineOfficeBuilding /> Department
                    </label>
                    <div className="max-w-md relative">
                      <Select
                        value={department}
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
                        sx={{
                          height: "48px",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "&:hover fieldset": {
                              borderColor: "#9333ea",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#9333ea",
                              borderWidth: "2px",
                            },
                          },
                        }}
                      >
                        {/* Search Box */}
                        <div className="p-2 border-b border-gray-200 dark:border-gray-600 sticky top-0 bg-white dark:bg-gray-700 z-50">
                          <TextField
                            size="small"
                            placeholder="Search departments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                            className="w-full"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <HiOutlineSearch className="text-gray-400" />
                                </InputAdornment>
                              ),
                              className:
                                "!rounded-lg !bg-gray-50 dark:!bg-gray-600",
                            }}
                          />
                        </div>

                        <MenuItem value="">
                          <em className="text-gray-400">Select Department</em>
                        </MenuItem>

                        {filteredDepartments.length > 0 ? (
                          filteredDepartments.map((item, index) => (
                            <MenuItem key={item._id || index} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>
                            <em className="text-gray-400">
                              No departments found
                            </em>
                          </MenuItem>
                        )}
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      📅 Date of MoM Release
                    </label>
                    <div className="relative">
                      <DatePicker
                        selected={dateOfMoMRelease}
                        onChange={(date) => setDateOfMoMRelease(date)}
                        dateFormat="dd/MM/yy"
                        className="w-full h-12 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl px-4 bg-white dark:bg-gray-700 transition-all duration-300"
                      />
                      <BsCalendarDate
                        size={18}
                        className="absolute top-3 right-3 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                    ⚡ Action Taken
                  </label>
                  <textarea
                    className="w-full h-32 border-2 border-gray-200 dark:border-gray-600 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 transition-all duration-300 hover:border-gray-300 resize-none"
                    placeholder="Describe the actions taken during the meeting"
                    value={actionTaken}
                    onChange={(e) => setActionTaken(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Uploads and Additional Info */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-gray-50 to-orange-50 dark:from-gray-800 dark:to-orange-900/20 p-6 border-b">
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
                      📄 Upload MoM (Minutes of Meeting)
                    </label>
                    <div className="relative group">
                      <div className="w-full h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-orange-400 outline-none rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 relative flex flex-col items-center justify-center gap-2 hover:bg-gradient-to-br hover:from-orange-100 hover:to-yellow-100 transition-all duration-300 cursor-pointer group-hover:scale-[1.02]">
                        <input
                          type="file"
                          className="w-full h-full opacity-0 absolute top-0 left-0 z-10 cursor-pointer"
                          onChange={handleMomUpload}
                          accept=".pdf,.doc,.docx"
                        />
                        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                          <MdCloudUpload size={24} />
                          <span className="font-medium">
                            {momFile
                              ? momFile.name || "MoM File Selected"
                              : "Click to Upload MoM"}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          PDF, DOC, DOCX files accepted
                        </span>
                      </div>
                    </div>
                  </div> */}

                  <div className="space-y-2">
                    <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm flex items-center gap-2">
                      📄 Upload MoM (Minutes of Meeting)
                    </label>
                    <div className="relative group">
                      <div className="w-full h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-orange-400 outline-none rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 relative flex flex-col items-center justify-center gap-2 hover:bg-gradient-to-br hover:from-orange-100 hover:to-yellow-100 transition-all duration-300 cursor-pointer group-hover:scale-[1.02]">
                        <input
                          type="file"
                          className="w-full h-full opacity-0 absolute top-0 left-0 z-10 cursor-pointer"
                          onChange={handleMomUpload}
                          accept=".pdf,.doc,.docx"
                        />
                        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                          <MdCloudUpload size={24} />
                          <span className="font-medium">
                            {momFile
                              ? typeof momFile === "string"
                                ? momFile // backend filename
                                : momFile.name || "MoM File Selected"
                              : "Click to Upload MoM"}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          PDF, DOC, DOCX files accepted
                        </span>
                      </div>
                    </div>

                    {/* ✅ Add Download Button for MoM, same as Letter */}
                    {momServerName && (
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => downloadDocument(momServerName)}
                          className="bg-orange-50 hover:bg-orange-100 text-orange-700 text-sm font-medium px-6 py-3 rounded-xl border border-orange-200 hover:border-orange-300 transition-all duration-200 ease-in-out"
                        >
                          📥 Download MoM
                        </button>
                      </div>
                    )}
                  </div>

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
                              ? letterFile.name || "Letter File Selected"
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
                              ? pictureFile.name || "Picture File Selected"
                              : "Click to Upload Picture"}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          JPG, PNG, GIF files accepted
                        </span>
                      </div>
                    </div>
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
                  {isEditMode
                    ? "💾 Update Review Meeting"
                    : "🚀 Submit Review Meeting"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ReviewMeeting;
