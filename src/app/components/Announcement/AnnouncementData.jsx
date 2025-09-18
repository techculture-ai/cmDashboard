"use client";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Suspense } from "react";
import {
  Button,
  Tabs,
  Tab,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  MdOutlineEdit,
  MdOutlineDeleteOutline,
  MdSearch,
} from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { IoMdAdd } from "react-icons/io";
import { LiaFilterSolid } from "react-icons/lia";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// Custom SearchBox component to replace the missing one
const SearchBox = ({ placeholder, onSearch, className = "" }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      value={searchValue}
      onChange={handleSearch}
      className={className}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MdSearch size={20} className="text-gray-400" />
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          backgroundColor: "white",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3b82f6",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3b82f6",
          },
        },
      }}
    />
  );
};

// Define columns for different types
const getColumnsForType = (type) => {
  if (type === "schemeCentralGovt" || type === "schemeStateGovt") {
    return [
      { id: "actions", label: "🔧 ACTIONS", minWidth: 120 },
      { id: "serialNo", label: "SERIAL NO", minWidth: 120 },
      // { id: "announcementNo", label: "ANNOUNCEMENT NO", minWidth: 150 },
      { id: "dateOfApproval", label: "📅 DATE OF APPROVAL", minWidth: 140 },
      { id: "dateOfCompletion", label: "✅ DATE OF COMPLETION", minWidth: 150 },
      { id: "district", label: "📍 DISTRICT", minWidth: 120 },
      { id: "department", label: "🏢 DEPARTMENT", minWidth: 140 },
      { id: "details", label: "📋 DETAILS", minWidth: 200 },
      { id: "numberOfBeneficiaries", label: "👥 BENEFICIARIES", minWidth: 120 },
      { id: "status", label: "⚡ STATUS", minWidth: 100 },
    ];
  } else if (type === "innovativeProposals") {
    return [
      { id: "actions", label: "🔧 ACTIONS", minWidth: 120 },
      { id: "serialNo", label: "SERIAL NO", minWidth: 120 },
      { id: "institutionName", label: "🏫 INSTITUTION", minWidth: 180 },
      { id: "dateOfSubmission", label: "📅 SUBMISSION DATE", minWidth: 140 },
      { id: "representative", label: "👤 REPRESENTATIVE", minWidth: 160 },
      { id: "district", label: "📍 DISTRICT", minWidth: 120 },
      { id: "departmentSubmitted", label: "🏢 DEPARTMENT", minWidth: 140 },
      { id: "officerSubmitted", label: "👮 OFFICER", minWidth: 140 },
      { id: "actionTaken", label: "⚡ ACTION TAKEN", minWidth: 180 },
      { id: "status", label: "📊 STATUS", minWidth: 100 },
    ];
  } else if (type === "reviewMeetings") {
    return [
      { id: "actions", label: "🔧 ACTIONS", minWidth: 120 },
      { id: "serialNo", label: "SERIAL NO", minWidth: 120 },
      { id: "subject", label: "📌 SUBJECT", minWidth: 180 },
      { id: "department", label: "🏢 DEPARTMENT", minWidth: 140 },
      { id: "dateOfReview", label: "📅 DATE OF REVIEW", minWidth: 150 },
      { id: "keyTakeAways", label: "📝 KEY TAKEAWAYS", minWidth: 180 },
      { id: "district", label: "📍 DISTRICT", minWidth: 120 },
      { id: "details", label: "📋 DETAILS", minWidth: 200 },
      { id: "dateOfMoMRelease", label: "📅 MOM RELEASE DATE", minWidth: 160 },
      { id: "actionTaken", label: "⚡ ACTION TAKEN", minWidth: 140 },
      // optional file fields if you want download links:
      // { id: "momUpload", label: "📄 MOM FILE", minWidth: 140 },
      // { id: "letterUpload", label: "📄 LETTER FILE", minWidth: 140 },
      // { id: "pictureUpload", label: "🖼️ PICTURE", minWidth: 140 },
    ];
  } else if (type === "newInitiatives") {
    return [
      { id: "actions", label: "🔧 ACTIONS", minWidth: 120 },
      { id: "serialNo", label: "SERIAL NO", minWidth: 120 },
      { id: "departmentName", label: "🏢 DEPARTMENT", minWidth: 160 },
      { id: "date", label: "📅 DATE", minWidth: 140 },
      { id: "initiativeName", label: "🚀 INITIATIVE NAME", minWidth: 200 },
      { id: "details", label: "📋 DETAILS", minWidth: 220 },
      { id: "status", label: "⚡ STATUS", minWidth: 120 },
      // { id: "letterFile", label: "📄 LETTER FILE", minWidth: 150 }, // map manually in render
      // { id: "pictureFile", label: "🖼️ PICTURE", minWidth: 150 }, // map manually in render
      // { id: "lastLogin", label: "👤 LAST LOGIN", minWidth: 160 },
    ];
  } else if (type === "hcmInstruction") {
    return [
      { id: "actions", label: "🔧 ACTIONS", minWidth: 120 },
      { id: "serialNo", label: "SERIAL NO", minWidth: 120 },
      { id: "dateOfReview", label: "📅 DATE OF REVIEW", minWidth: 160 },
      { id: "departmentName", label: "🏢 DEPARTMENT", minWidth: 160 },
      { id: "details", label: "📋 DETAILS", minWidth: 220 },
      {
        id: "instructionsByHcm",
        label: "📝 INSTRUCTIONS BY HCM",
        minWidth: 220,
      },
      {
        id: "actionByDepartment",
        label: "✅ ACTION BY DEPARTMENT",
        minWidth: 220,
      },
      { id: "dateOfCompletion", label: "📅 DATE OF COMPLETION", minWidth: 160 },
      { id: "status", label: "⚡ STATUS", minWidth: 120 },
      // { id: "letterFile", label: "📄 LETTER FILE", minWidth: 150 },
      // { id: "pictureFile", label: "🖼️ PICTURE", minWidth: 150 },
      // { id: "lastLogin", label: "👤 LAST LOGIN", minWidth: 160 },
    ];
  } else if (type === "statement") {
    return [
      { id: "actions", label: "🔧 ACTIONS", minWidth: 120 },
      { id: "serialNo", label: "SERIAL NO", minWidth: 120 },
      { id: "mpMlaName", label: "👤 MP/MLA NAME", minWidth: 180 },
      { id: "constituencyName", label: "📍 CONSTITUENCY", minWidth: 180 },
      { id: "dateOfStatement", label: "📅 DATE OF STATEMENT", minWidth: 160 },
      { id: "details", label: "📋 DETAILS", minWidth: 220 },
      { id: "relatedDept", label: "🏢 RELATED DEPARTMENT", minWidth: 200 },
      { id: "factualBrief", label: "📑 FACTUAL BRIEF", minWidth: 220 },
      { id: "status", label: "⚡ STATUS", minWidth: 120 },
      // { id: "letterFile", label: "📄 LETTER FILE", minWidth: 150 },
      // { id: "pictureFile", label: "🖼️ PICTURE", minWidth: 150 },
      // { id: "lastLogin", label: "👤 LAST LOGIN", minWidth: 160 },
    ];
  } else if (type === "cmHelpline") {
    return [
      { id: "actions", label: "🔧 ACTIONS", minWidth: 120 },
      { id: "serialNo", label: "SERIAL NO", minWidth: 120 },
      { id: "dateOfReview", label: "📅 DATE OF REVIEW", minWidth: 160 },
      { id: "pendingDetails", label: "📝 PENDING DETAILS", minWidth: 220 },
      {
        id: "periodOfPendency",
        label: "⏳ PENDENCY PERIOD (Days)",
        minWidth: 200,
      },
      { id: "relatedDept", label: "🏢 RELATED DEPARTMENT", minWidth: 200 },
      { id: "status", label: "⚡ STATUS", minWidth: 120 },
      { id: "reasonForDelay", label: "⏱️ REASON FOR DELAY", minWidth: 200 },
      {
        id: "reviewAtDivisionalLevel",
        label: "🏢 DIVISIONAL REVIEW",
        minWidth: 180,
      },
      { id: "reviewAtCsLevel", label: "🏢 CS LEVEL REVIEW", minWidth: 180 },
      { id: "outcomeOfReview", label: "📊 OUTCOME OF REVIEW", minWidth: 220 },
      {
        id: "actionOnDefaulter",
        label: "⚖️ ACTION ON DEFAULTER",
        minWidth: 200,
      },
      // { id: "letterFile", label: "📄 LETTER FILE", minWidth: 150 },
      // { id: "pictureFile", label: "🖼️ PICTURE", minWidth: 150 },
      // { id: "lastLogin", label: "👤 LAST LOGIN", minWidth: 160 },
    ];
  } else if (type === "cmAnnouncement") {
    // For CM and PM announcements
    return [
      {
        id: "actions",
        label: "🔧 ACTIONS",
        minWidth: 120,
      },
      {
        id: "serialNo",
        label: "SERIAL NO",
        minWidth: 120,
      },
      { id: "announcementNo", label: "ANNOUNCEMENT NO", minWidth: 150 },
      {
        id: "dateOfAnnouncement",
        label: "📅 ANNOUNCEMENT DATE",
        minWidth: 150,
      },
      { id: "district", label: "📍 DISTRICT", minWidth: 120 },
      { id: "department", label: "🏢 DEPARTMENT", minWidth: 140 },
      { id: "status", label: "⚡ STATUS", minWidth: 100 },
      { id: "dateOfCompletion", label: "✅ DATE OF COMPLETION", minWidth: 150 },
    ];
  } else {
    // For CM and PM announcements
    return [
      { id: "actions", label: "🔧 ACTIONS", minWidth: 120 },
      { id: "serialNo", label: "SERIAL NO", minWidth: 120 },
      { id: "announcementNo", label: "ANNOUNCEMENT NO", minWidth: 150 },
      {
        id: "dateOfAnnouncement",
        label: "📅 ANNOUNCEMENT DATE",
        minWidth: 150,
      },
      { id: "district", label: "📍 DISTRICT", minWidth: 120 },
      { id: "department", label: "🏢 DEPARTMENT", minWidth: 140 },
      { id: "status", label: "⚡ STATUS", minWidth: 100 },
      { id: "dateOfCompletion", label: "✅ DATE OF COMPLETION", minWidth: 150 },
    ];
  }
};

const AnnouncementData = () => {
  // const searchParams = useSearchParams(); // ✅ valid hook usage
  // const departmentParam = searchParams.get("department");
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const isDeptLoggedIn = localStorage.getItem("isDeptLoggedIn") === "true";
  //   if (!isDeptLoggedIn) {
  //     router.push("/department-login");
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth/check`,
          {
            withCredentials: true, // ✅ send cookie
          }
        );
        setIsLoading(false);
      } catch (err) {
        console.log("error messsage:", err);
        router.push("/department-login");
      }
    };
    checkAuth();
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("isDeptLoggedIn"); // ✅ clear the login flag

  //   router.push("/");
  // };

  const handleLogout = async () => {
    console.log("logout clicked");
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    router.push("/");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const getAnnouncementTypeFromPath = (path) => {
    if (path.includes("/form-Data/cmAnnouncement")) return "cmAnnouncement";
    if (path.includes("/form-Data/pmAnnouncement")) return "pmAnnouncement";
    if (path.includes("/form-Data/schemeCentralGovt"))
      return "schemeCentralGovt";
    if (path.includes("/form-Data/schemeStateGovt")) return "schemeStateGovt";
    if (path.includes("/form-Data/innovativeProposals"))
      return "innovativeProposals";
    if (path.includes("/form-Data/reviewMeetings")) return "reviewMeetings";
    if (path.includes("/form-Data/newInitiatives")) return "newInitiatives";
    if (path.includes("/form-Data/hcmInstruction")) return "hcmInstruction";
    if (path.includes("/form-Data/statement")) return "statement";
    if (path.includes("/form-Data/cmHelpline")) return "cmHelpline";
    return "cmAnnouncement";
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [announcementData, setAnnouncementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(
    getAnnouncementTypeFromPath(pathname)
  );

  useEffect(() => {
    const currentType = getAnnouncementTypeFromPath(pathname);
    setActiveTab(currentType);
  }, [pathname]);

  useEffect(() => {
    fetchAnnouncements();
  }, [activeTab]);

  const getApiEndpoint = (type) => {
    // const departmentQuery = departmentParam
    //   ? `?department=${departmentParam}`
    //   : "";
    const endpoints = {
      cmAnnouncement: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/cm`,
      pmAnnouncement: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/pm`,
      schemeCentralGovt: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/central-schemes`,
      schemeStateGovt: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/state-schemes`,
      innovativeProposals: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/innovative-proposals`,
      reviewMeetings: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/review-meetings`,
      newInitiatives: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/new-initiatives`,
      hcmInstruction: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/hcm-instructions`,
      statement: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/statement`,
      cmHelpline: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/cm-helplines`,
      // schemeCentralGovt: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deptUser/`,
    };
    return endpoints[type] || endpoints["cmAnnouncement"];
  };

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      // const response = await fetch(getApiEndpoint(activeTab));
      const response = await fetch(getApiEndpoint(activeTab), {
        credentials: "include",
      });

      const result = await response.json();

      if (Array.isArray(result)) {
        setAnnouncementData(result);
      } else if (result.success) {
        setAnnouncementData(result.announcements || []);
      } else {
        toast.error(
          `Failed to fetch announcements: ${result?.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error("Error fetching announcements");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // const handleTabChange = (event, newValue) => {
  //   setActiveTab(newValue);
  //   router.push(`/announcement/${newValue}`);
  //   setPage(0);
  // };

  // const handleTabChange = (event, newValue) => {
  //   setActiveTab(newValue);
  //   router.push(`/form-Data/${newValue}?department=${departmentParam}`);
  // };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        const loadingToast = toast.loading("Deleting announcement...");
        const response = await fetch(`${getApiEndpoint(activeTab)}/${id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (result.success) {
          setAnnouncementData(
            announcementData.filter((item) => item._id !== id)
          );
          toast.success("Announcement deleted successfully");
        } else {
          toast.error(`Failed to delete: ${result.message}`);
        }
      } catch (error) {
        console.error("Error deleting announcement:", error);
        toast.error("An error occurred while deleting");
      } finally {
        toast.dismiss();
      }
    }
  };

  const getAnnouncementTypeLabel = (type) => {
    switch (type) {
      case "cmAnnouncement":
        return "CM Announcements";
      case "pmAnnouncement":
        return "PM Announcements";
      case "schemeCentralGovt":
        return "Central Govt Schemes";
      case "schemeStateGovt":
        return "State Govt Schemes";
      case "innovativeProposals":
        return "Innovative Proposals";
      case "reviewMeetings":
        return "Review Meetings";
      case "newInitiatives":
        return "New Initiatives";
      case "hcmInstruction":
        return "HCM Instructions";
      case "statement":
        return "Statements";
      case "cmHelpline":
        return "CM Helpline";
      default:
        return "Announcements";
    }
  };

  const getAddLink = () => `/announcement/${activeTab}/add`;
  const getEditLink = (id) => `/form-Data/${activeTab}/edit/${id}`;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "in progress":
        return "info";
      default:
        return "default";
    }
  };

  const isSchemeType = (type) => {
    return type === "schemeCentralGovt" || type === "schemeStateGovt";
  };

  const isInnovativeType = (type) => {
    return type === "innovativeProposals";
  };

  const filteredAnnouncementData = announcementData.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.serialNo?.toLowerCase().includes(query) ||
      item.announcementNo?.toLowerCase().includes(query) ||
      item.details?.toLowerCase().includes(query) ||
      item.district?.toLowerCase().includes(query) ||
      item.department?.toLowerCase().includes(query) ||
      item.status?.toLowerCase().includes(query) ||
      (item.dateOfAnnouncement &&
        new Date(item.dateOfAnnouncement)
          .toLocaleDateString("en-GB")
          .toLowerCase()
          .includes(query)) ||
      (item.dateOfCompletion &&
        new Date(item.dateOfCompletion)
          .toLocaleDateString("en-GB")
          .toLowerCase()
          .includes(query))
    );
  });

  const columns = getColumnsForType(activeTab);

  const renderTableCell = (item, columnId) => {
    switch (columnId) {
      case "actions":
        return (
          <TableCell sx={{ padding: "12px" }}>
            <div className="flex items-center gap-2">
              <Tooltip title="Edit Announcement" placement="top">
                <Link href={getEditLink(item._id)}>
                  <Button
                    className="!bg-[#101854] hover:!bg-[#0d1446] !text-white !font-bold !uppercase !px-6 !py-1 !rounded-md !transition-all !duration-300"
                    size="small"
                  >
                    UPDATE
                  </Button>
                </Link>
              </Tooltip>
            </div>
          </TableCell>
        );
      // case "serialNo":
      //   return (
      //     <TableCell
      //       sx={{
      //         padding: "12px",
      //         fontWeight: 600,
      //         color: "#1e293b",
      //       }}
      //     >
      //       {item.serialNo}
      //     </TableCell>
      //   );
      case "serialNo": {
        const href = activeTab
          ? `/form-Data/${activeTab}/view/${item._id}`
          : null;

        return (
          <TableCell
            sx={{
              padding: "12px",
              fontWeight: 600,
              color: "#1e293b",
            }}
          >
            {href ? (
              <Link
                href={href}
                style={{
                  color: "#2563eb",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {item.serialNo}
              </Link>
            ) : (
              item.serialNo
            )}
          </TableCell>
        );
      }

      case "announcementNo":
        return (
          <TableCell
            sx={{
              padding: "12px",
              fontWeight: 500,
              color: "#475569",
            }}
          >
            {item.announcementNo || "N/A"}
          </TableCell>
        );
      case "dateOfAnnouncement":
        return (
          <TableCell sx={{ padding: "12px", color: "#6b7280" }}>
            {item.dateOfAnnouncement
              ? new Date(item.dateOfAnnouncement).toLocaleDateString("en-GB")
              : "-"}
          </TableCell>
        );
      case "dateOfApproval":
        return (
          <TableCell sx={{ padding: "12px", color: "#6b7280" }}>
            {item.dateOfApproval
              ? new Date(item.dateOfApproval).toLocaleDateString("en-GB")
              : "-"}
          </TableCell>
        );
      case "dateOfSubmission":
        return (
          <TableCell sx={{ padding: "12px", color: "#6b7280" }}>
            {item.dateOfSubmission
              ? new Date(item.dateOfSubmission).toLocaleDateString("en-GB")
              : "-"}
          </TableCell>
        );
      case "institutionName":
        return (
          <TableCell
            sx={{
              padding: "12px",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            {item.institutionName || "-"}
          </TableCell>
        );
      case "representative":
        return (
          <TableCell sx={{ padding: "12px" }}>
            <div className="text-sm">
              <div className="font-medium text-gray-900">
                {item.representative?.name || "-"}
              </div>
              <div className="text-gray-500 text-xs">
                {item.representative?.contact || "-"}
              </div>
            </div>
          </TableCell>
        );
      case "departmentSubmitted":
        return (
          <TableCell
            sx={{
              padding: "12px",
              fontSize: "13px",
              color: "#374151",
            }}
          >
            {item.departmentSubmitted || "-"}
          </TableCell>
        );
      case "officerSubmitted":
        return (
          <TableCell
            sx={{
              padding: "12px",
              fontSize: "13px",
              color: "#374151",
            }}
          >
            {item.officerSubmitted || "-"}
          </TableCell>
        );
      case "actionTaken":
        return (
          <TableCell
            sx={{
              padding: "12px",
              fontSize: "13px",
              color: "#374151",
              maxWidth: "180px",
            }}
          >
            <div className="truncate" title={item.actionTaken}>
              {item.actionTaken || "-"}
            </div>
          </TableCell>
        );
      case "dateOfCompletion":
        return (
          <TableCell sx={{ padding: "12px", color: "#6b7280" }}>
            {item.dateOfCompletion
              ? new Date(item.dateOfCompletion).toLocaleDateString("en-GB")
              : "-"}
          </TableCell>
        );
      case "district":
        return (
          <TableCell sx={{ padding: "12px" }}>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {item.district}
            </span>
          </TableCell>
        );
      case "department":
        return (
          <TableCell
            sx={{
              padding: "12px",
              fontSize: "13px",
              color: "#374151",
            }}
          >
            {item.department}
          </TableCell>
        );
      case "details":
        return (
          <TableCell
            sx={{
              padding: "12px",
              fontSize: "13px",
              color: "#374151",
              maxWidth: "200px",
            }}
          >
            <div className="truncate" title={item.details}>
              {item.details || "-"}
            </div>
          </TableCell>
        );
      case "numberOfBeneficiaries":
        return (
          <TableCell sx={{ padding: "12px", color: "#6b7280" }}>
            {item.numberOfBeneficiaries || "-"}
          </TableCell>
        );
      case "status":
        return (
          <TableCell sx={{ padding: "12px" }}>
            <Chip
              label={item.status}
              color={getStatusColor(item.status)}
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: "11px",
                height: "24px",
                borderRadius: "12px",
              }}
            />
          </TableCell>
        );

      case "subject":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.subject || "-"}
          </TableCell>
        );

      case "dateOfReview":
        return (
          <TableCell sx={{ padding: "12px", color: "#6b7280" }}>
            {item.dateOfReview
              ? new Date(item.dateOfReview).toLocaleDateString("en-GB")
              : "-"}
          </TableCell>
        );

      case "keyTakeAways":
        return (
          <TableCell
            sx={{
              padding: "12px",
              fontSize: "13px",
              color: "#374151",
              maxWidth: "180px",
            }}
          >
            <div className="truncate" title={item.keyTakeAways}>
              {item.keyTakeAways || "-"}
            </div>
          </TableCell>
        );

      case "dateOfMoMRelease":
        return (
          <TableCell sx={{ padding: "12px", color: "#6b7280" }}>
            {item.dateOfMoMRelease
              ? new Date(item.dateOfMoMRelease).toLocaleDateString("en-GB")
              : "-"}
          </TableCell>
        );

      // -------------------- NEW INITIATIVES --------------------
      case "date":
        return (
          <TableCell sx={{ padding: "12px", color: "#6b7280" }}>
            {item.date ? new Date(item.date).toLocaleDateString("en-GB") : "-"}
          </TableCell>
        );

      case "initiativeName":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.initiativeName || "-"}
          </TableCell>
        );
      case "departmentName":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.departmentName || "-"}
          </TableCell>
        );
      case "letterFile":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.letterFile ? (
              <a
                href={`/uploads/${item.letterFile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Letter
              </a>
            ) : (
              "-"
            )}
          </TableCell>
        );
      case "pictureFile":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.pictureFile ? (
              <a
                href={`/uploads/${item.pictureFile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Picture
              </a>
            ) : (
              "-"
            )}
          </TableCell>
        );

      // -------------------- HCM INSTRUCTIONS --------------------
      case "instructionsByHcm":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.instructionsByHcm || "-"}
          </TableCell>
        );
      case "actionByDepartment":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.actionByDepartment || "-"}
          </TableCell>
        );

      // -------------------- STATEMENTS --------------------
      case "mpMlaName":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.mpMlaName || "-"}
          </TableCell>
        );
      case "constituencyName":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.constituencyName || "-"}
          </TableCell>
        );
      case "dateOfStatement":
        return (
          <TableCell sx={{ padding: "12px", color: "#6b7280" }}>
            {item.dateOfStatement
              ? new Date(item.dateOfStatement).toLocaleDateString("en-GB")
              : "-"}
          </TableCell>
        );
      case "factualBrief":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.factualBrief || "-"}
          </TableCell>
        );

      // -------------------- CM HELPLINE --------------------
      case "pendingDetails":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.pendingDetails || "-"}
          </TableCell>
        );
      case "periodOfPendency":
        return (
          <TableCell sx={{ padding: "12px", color: "#6b7280" }}>
            {item.periodOfPendency ?? "-"}
          </TableCell>
        );
      case "relatedDept":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.relatedDept || "-"}
          </TableCell>
        );
      case "reasonForDelay":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.reasonForDelay || "-"}
          </TableCell>
        );
      case "reviewAtDivisionalLevel":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.reviewAtDivisionalLevel || "-"}
          </TableCell>
        );
      case "reviewAtCsLevel":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.reviewAtCsLevel || "-"}
          </TableCell>
        );
      case "outcomeOfReview":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.outcomeOfReview || "-"}
          </TableCell>
        );
      case "actionOnDefaulter":
        return (
          <TableCell
            sx={{ padding: "12px", fontSize: "13px", color: "#374151" }}
          >
            {item.actionOnDefaulter || "-"}
          </TableCell>
        );

      default:
        return <TableCell sx={{ padding: "12px" }}>-</TableCell>;
    }
  };

  return (
    // <div className="w-full mt-6">
    <div className="w-full mt-6 overflow-x-hidden">
      {/* Enhanced Header Card */}
      <div className="bg-gradient-to-r from-white to-gray-50 dark:from-themeDark dark:to-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                {getAnnouncementTypeLabel(activeTab)}
              </h2>
              <p className="text-blue-100 text-sm">
                Manage and track all announcements efficiently ..
              </p>
            </div>

            {/* <div className="flex items-center gap-3">
              <div className="search w-[300px] relative">
                <button
                  onClick={handleGoHome}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Back to Home
                </button>{" "}
                <button
                  variant="outlined"
                  color="error"
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Enhanced Tabs Section */}
        <div className="bg-white dark:bg-gray-800 px-6 pt-4 border-b border-gray-100 dark:border-gray-700">
          <Tabs
            value={activeTab}
            // onChange={handleTabChange}
            aria-label="announcement type tabs"
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                padding: "12px 24px",
                borderRadius: "8px 8px 0 0",
                margin: "0 4px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  color: "#3b82f6",
                },
              },
              "& .Mui-selected": {
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                color: "#3b82f6 !important",
              },
              "& .MuiTabs-indicator": {
                height: "3px",
                borderRadius: "2px",
                backgroundColor: "#3b82f6",
              },
            }}
          >
            {/* <Tab label="🏛️ CM Announcements" value="cmAnnouncement" />
            <Tab label="🏢 PM Announcements" value="pmAnnouncement" />
            <Tab label="📋 Central Govt Scheme" value="schemeCentralGovt" />
            <Tab label="💡 Innovative Proposals" value="innovativeProposal" /> */}
          </Tabs>
        </div>

        {/* Enhanced Search and Filter Section */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <SearchBox
                placeholder="🔍 Search announcements..."
                onSearch={handleSearch}
                className="!rounded-lg !shadow-sm hover:!shadow-md !transition-shadow !duration-300"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg">
                Total:{" "}
                <span className="font-semibold text-blue-600">
                  {filteredAnnouncementData.length}
                </span>
              </div>
              {/* <Button className="!bg-white dark:!bg-gray-700 !text-gray-700 dark:!text-gray-200 !border !border-gray-200 dark:!border-gray-600 hover:!bg-gray-50 dark:hover:!bg-gray-600 !font-medium !px-4 !py-2 !rounded-lg !shadow-sm hover:!shadow-md !transition-all !duration-300">
                <LiaFilterSolid size={18} className="mr-2" /> Filters
              </Button> */}
            </div>
          </div>
        </div>

        {/* Enhanced Table Section */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center gap-3 text-blue-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-lg font-medium">
                Loading announcements...
              </span>
            </div>
          </div>
        ) : (
          <>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table stickyHeader aria-label="data table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell
                      sx={{
                        backgroundColor: "#f8fafc",
                        borderBottom: "2px solid #e2e8f0",
                        fontWeight: 700,
                        fontSize: "12px",
                        color: "#475569",
                        padding: "16px 12px",
                      }}
                    >
                      <Checkbox
                        {...label}
                        size="small"
                        sx={{
                          color: "#3b82f6",
                          "&.Mui-checked": { color: "#3b82f6" },
                        }}
                      />
                    </TableCell> */}
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        sx={{
                          backgroundColor: "#f8fafc",
                          borderBottom: "2px solid #e2e8f0",
                          fontWeight: 700,
                          fontSize: "12px",
                          color: "#475569",
                          padding: "16px 12px",
                          minWidth: column.minWidth,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAnnouncementData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + 1}
                        align="center"
                        sx={{ padding: "48px 16px" }}
                      >
                        <div className="text-center">
                          <div className="text-6xl mb-4">
                            {isSchemeType(activeTab)
                              ? "📋"
                              : isInnovativeType(activeTab)
                              ? "💡"
                              : "📢"}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                            No{" "}
                            {isSchemeType(activeTab)
                              ? "schemes"
                              : isInnovativeType(activeTab)
                              ? "proposals"
                              : "announcements"}{" "}
                            found
                          </h3>
                          <p className="text-gray-500 dark:text-gray-500">
                            Try adjusting your search criteria or add a new{" "}
                            {isSchemeType(activeTab)
                              ? "scheme"
                              : isInnovativeType(activeTab)
                              ? "proposal"
                              : "announcement"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAnnouncementData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={item._id}
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(59, 130, 246, 0.05)",
                              transform: "scale(1.001)",
                              transition: "all 0.2s ease",
                            },
                            "&:nth-of-type(even)": {
                              backgroundColor: "rgba(248, 250, 252, 0.5)",
                            },
                          }}
                        >
                          {/* <TableCell sx={{ padding: "12px" }}>
                            <Checkbox
                              {...label}
                              size="small"
                              sx={{
                                color: "#3b82f6",
                                "&.Mui-checked": { color: "#3b82f6" },
                              }}
                            />
                          </TableCell> */}
                          {columns.map((column) =>
                            renderTableCell(item, column.id)
                          )}
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Enhanced Pagination */}
            <div className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={filteredAnnouncementData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  "& .MuiTablePagination-toolbar": {
                    padding: "16px 24px",
                  },
                  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                    {
                      fontWeight: 500,
                      color: "#374151",
                    },
                  "& .MuiIconButton-root": {
                    backgroundColor: "#f3f4f6",
                    margin: "0 2px",
                    "&:hover": {
                      backgroundColor: "#e5e7eb",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "#f9fafb",
                      color: "#d1d5db",
                    },
                  },
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnnouncementData;
