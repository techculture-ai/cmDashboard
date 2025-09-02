// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { Button } from "@mui/material";
// import { IoIosSearch } from "react-icons/io";
// import { MdOutlinePentagon } from "react-icons/md";
// import { IoMdTime } from "react-icons/io";
// import { GoShieldCheck } from "react-icons/go";
// import { LiaBullhornSolid } from "react-icons/lia";
// import { CiCircleCheck } from "react-icons/ci";
// import { TbProgressBolt } from "react-icons/tb";
// import { IoIosArrowRoundUp } from "react-icons/io";
// import { IoSearch } from "react-icons/io5";
// import LinearProgress from "@mui/material/LinearProgress";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   LabelList,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";
// import { DataGrid } from "@mui/x-data-grid";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";

// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

// import { useRouter } from "next/navigation";

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload?.length) {
//     const item = payload[0].payload;
//     return (
//       <div className="bg-white p-2 rounded shadow text-sm border border-gray-200">
//         <p className="font-semibold">{label}</p>
//         <div className="flex items-center gap-2 mt-1">
//           <div
//             className="w-3 h-3 rounded"
//             style={{ backgroundColor: item.fill }}
//           />
//           <span>
//             {item.name}: {item.value}
//           </span>
//         </div>
//       </div>
//     );
//   }
//   return null;
// };

// const getColumnsForType = (type) => {
//   if (type === "central-govt-schemes" || type === "state-govt-schemes") {
//     return [
//       { id: "serialNo", label: "SERIAL NO", minWidth: 120 },
//       // { id: "announcementNo", label: "ANNOUNCEMENT NO", minWidth: 150 },
//       { id: "details", label: "DETAILS", minWidth: 200 },
//       { id: "dateOfApproval", label: "📅 DATE OF APPROVAL", minWidth: 140 },
//       { id: "dateOfCompletion", label: "✅ DATE OF COMPLETION", minWidth: 150 },
//       {
//         id: "expectedCompletion",
//         label: "✅EXPECTED COMPLETION DATE",
//         minWidth: 150,
//       },
//       {
//         id: "completedOn",
//         label: "✅ COMPLETED ON",
//         minWidth: 170,
//       },
//       { id: "district", label: "📍 DISTRICT", minWidth: 120 },
//       { id: "department", label: "🏢 DEPARTMENT", minWidth: 140 },

//       { id: "numberOfBeneficiaries", label: "👥 BENEFICIARIES", minWidth: 120 },
//       { id: "status", label: "⚡ STATUS", minWidth: 100 },
//       { id: "overallStatus", label: "OVERALL STATUS", minWidth: 140 },
//     ];
//   } else if (type === "innovative-proposals") {
//     return [
//       { id: "serialNo", label: "SERIAL NO", minWidth: 120 },
//       { id: "details", label: "DETAILS", minWidth: 150 },
//       { id: "institutionName", label: "🏫 INSTITUTION", minWidth: 180 },
//       { id: "dateOfSubmission", label: "📅 SUBMISSION DATE", minWidth: 140 },
//       // { id: "expectedCompletion", label: "📅 EXPECTED COMPLETION DATE", minWidth: 140 },
//       { id: "representative", label: "👤 REPRESENTATIVE", minWidth: 160 },
//       { id: "district", label: "📍 DISTRICT", minWidth: 120 },
//       { id: "departmentSubmitted", label: "🏢 DEPARTMENT", minWidth: 140 },
//       { id: "officerSubmitted", label: "👮 OFFICER", minWidth: 140 },
//       { id: "actionTaken", label: "⚡ ACTION TAKEN", minWidth: 180 },
//       { id: "status", label: "📊 STATUS", minWidth: 100 },
//       { id: "overallStatus", label: "OVERALL STATUS", minWidth: 140 },
//     ];
//   } else {
//     return [
//       { id: "serialNo", label: "SERIAL NO", minWidth: 120 },
//       { id: "announcementNo", label: "ANNOUNCEMENT NO", minWidth: 150 },
//       { id: "details", label: "DETAILS", minWidth: 150 },
//       {
//         id: "dateOfAnnouncement",
//         label: "📅 ANNOUNCEMENT DATE",
//         minWidth: 150,
//       },

//       { id: "district", label: "📍 DISTRICT", minWidth: 120 },
//       { id: "department", label: "🏢 DEPARTMENT", minWidth: 140 },
//       { id: "status", label: "⚡ STATUS", minWidth: 100 },
//       { id: "overallStatus", label: "OVERALL STATUS", minWidth: 140 },
//       { id: "dateOfCompletion", label: "✅ DATE OF COMPLETION", minWidth: 150 },
//       {
//         id: "expectedCompletion",
//         label: "✅ EXPECTED COMPLETION DATE",
//         minWidth: 150,
//       },
//       {
//         id: "completedOn",
//         label: "✅ COMPLETED ON",
//         minWidth: 170,
//       },
//     ];
//   }
// };

// const getApiEndpoint = (type) => {
//   const endpoints = {
//     cmAnnouncement: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cm-announcements`,
//     pmAnnouncement: `${process.env.NEXT_PUBLIC_BASE_URL}/api/pm-announcements`,
//     schemeCentralGovt: `${process.env.NEXT_PUBLIC_BASE_URL}/api/central-govt-schemes`,
//     schemeStateGovt: `${process.env.NEXT_PUBLIC_BASE_URL}/api/state-govt-schemes`,
//     innovativeProposals: `${process.env.NEXT_PUBLIC_BASE_URL}/api/innovative-proposals`,
//   };
//   return endpoints[type];
// };

// const SummariseDashboard2 = ({ type }) => {
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("");

//   const [detailsOpen, setDetailsOpen] = useState(false);
//   const [selectedDetails, setSelectedDetails] = useState("");

//   const [districts, setDistricts] = useState("");
//   const [status, setStatus] = useState("");

//   const [startDate, setStartDate] = useState(new Date());

//   const [statusData, setStatusData] = useState([]);
//   const [pmStatusData, setPmStatusData] = useState([]);
//   const [centralGovtStatusData, setCentralGovtStatusData] = useState([]);
//   const [stateGovtStatusData, setStateGovtStatusData] = useState([]);
//   const [reviewMeetingStatusData, setReviewMeetingStatusData] = useState([]);
//   const [innovativeStatusData, setInnovativeStatusData] = useState([]);

//   const [announcementData, setAnnouncementData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const router = useRouter();
//   const handleGoHome = () => {
//     router.push("/summariseDashboard");
//   };

//   // dashboard 2 problem resolved //
//   // useEffect(() => {
//   //   const isCmLoggedIn = localStorage.getItem("isCmLoggedIn") === "true";
//   //   if (!isCmLoggedIn) {
//   //     router.push("/login");
//   //   } else {
//   //     setIsLoading(false);
//   //   }
//   // }, []);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check`, {
//           withCredentials: true, // ✅ send cookie
//         });
//         setIsLoading(false);
//       } catch (err) {
//         console.log("error messsage:", err);
//         router.push("/login");
//       }
//     };
//     checkAuth();
//   }, []);

//   useEffect(() => {
//     const fetchStatusCounts = async (type, setState) => {
//       const statuses = ["Completed", "In Progress", "Pending"];
//       const colorMap = {
//         // Completed: "#10b981",
//         // "In Progress": "#9A3412", // "#3b82f6",
//         // Pending: "#7e22ce", //"#f59e0b",
//         // Delayed: "#ef4444",
//         Completed: "#10b981", // green
//         "In Progress": "#3b82f6", // blue
//         Pending: "#9333EA", // purple
//         Delayed: "#ef4444", // red
//       };

//       try {
//         // Get all data first
//         const allDataRes = await axios.get(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}`,
//           {
//             params: {
//               district: districts,
//               department: selectedDepartment,
//             },
//           }
//         );

//         const allData = allDataRes.data;
//         const now = new Date();

//         // Count items by their original status (regardless of delay)
//         const statusCounts = {
//           Completed: 0,
//           "In Progress": 0,
//           Pending: 0,
//           Delayed: 0,
//         };

//         allData.forEach((item) => {
//           // Count by original status
//           if (statusCounts.hasOwnProperty(item.status)) {
//             statusCounts[item.status]++;
//           }

//           // Additionally count delayed items (but don't subtract from original status)
//           if (
//             item.status !== "Completed" &&
//             new Date(item.dateOfCompletion) < now
//           ) {
//             statusCounts.Delayed++;
//           }
//         });

//         // Convert to chart format
//         const results = Object.entries(statusCounts).map(([name, value]) => ({
//           name,
//           value,
//           fill: colorMap[name],
//         }));

//         setState(results);
//       } catch (err) {
//         console.error(`Error fetching status for ${type}:`, err);
//       }
//     };

//     fetchStatusCounts(type, setStatusData);
//   }, [districts, status, selectedDepartment]);

//   const fetchAnnouncements = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(getApiEndpoint(type));
//       const result = await response.json();

//       if (Array.isArray(result)) {
//         setAnnouncementData(result);
//       } else if (result.success) {
//         setAnnouncementData(
//           result.announcements || result.schemes || result.proposals || []
//         );
//       } else {
//         toast.error(
//           `Failed to fetch data: ${result?.message || "Unknown error"}`
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Error fetching data");
//     } finally {
//       setLoading(false);
//     }
//   }, [type]);

//   useEffect(() => {
//     fetchAnnouncements();
//   }, [fetchAnnouncements]);

//   const fetchDepartments = async () => {
//     try {
//       const urls = [
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/govt`,
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/public/`,
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/aided/`,
//       ];

//       const responses = await Promise.all(urls.map((url) => fetch(url)));
//       const data = await Promise.all(responses.map((res) => res.json()));

//       const allDepartments = data.flatMap((group) => group.departments || []);
//       setDepartments(allDepartments);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//       toast.error("Failed to load departments");
//     }
//   };
//   // ===============================================
//   useEffect(() => {
//     fetchDepartments();
//   }, []);
//   // --------------------------------------------------------
//   const [districtWiseStatus, setDistrictWiseStatus] = useState([]);

//   // useEffect(() => {
//   //   const fetchAndGroupByDistrict = async () => {
//   //     try {
//   //       const res = await axios.get(
//   //         `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}`,
//   //         {
//   //           params: {
//   //             status,
//   //             district: districts,
//   //             department: selectedDepartment,
//   //           },
//   //         }
//   //       );

//   //       const data = res.data;

//   //       const colorMap = {
//   //         Completed: "#10b981",
//   //         "In Progress": "#3b82f6",
//   //         Pending: "#f59e0b",
//   //         Delayed: "#ef4444",
//   //       };

//   //       const grouped = {};

//   //       const now = new Date();

//   //       data.forEach((item) => {
//   //         const district = item.district || "Unknown";
//   //         if (!grouped[district]) {
//   //           grouped[district] = {
//   //             Completed: 0,
//   //             "In Progress": 0,
//   //             Pending: 0,
//   //             Delayed: 0,
//   //           };
//   //         }

//   //         if (
//   //           item.status !== "Completed" &&
//   //           new Date(item.dateOfCompletion) < now
//   //         ) {
//   //           grouped[district].Delayed += 1;
//   //         } else {
//   //           grouped[district][item.status] += 1;
//   //         }
//   //       });

//   //       const result = Object.entries(grouped).map(([district, counts]) => ({
//   //         district,
//   //         data: Object.entries(counts).map(([name, value]) => ({
//   //           name,
//   //           value,
//   //           fill: colorMap[name],
//   //         })),
//   //       }));

//   //       setDistrictWiseStatus(result);
//   //     } catch (err) {
//   //       console.error("Error grouping by district:", err);
//   //     }
//   //   };

//   //   fetchAndGroupByDistrict();
//   // }, [type, status, districts, selectedDepartment]);

//   // ------------------------------------------------------

//   useEffect(() => {
//     const fetchAndGroupByDistrict = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}`,
//           {
//             params: {
//               status,
//               district: districts,
//               department: selectedDepartment,
//             },
//           }
//         );

//         const data = res.data;

//         const colorMap = {
//           // Completed: "#10b981",
//           // "In Progress": "#3b82f6",
//           // Pending: "#f59e0b",
//           // Delayed: "#ef4444",
//           Completed: "#10b981", // green
//           "In Progress": "#f74a4a", //"#C53030", // metal red
//           Pending: "#9333EA", // purple
//           Delayed: "#ff0000", // red
//         };

//         const grouped = {};
//         const now = new Date();

//         data.forEach((item) => {
//           const district = item.district || "Unknown";
//           if (!grouped[district]) {
//             grouped[district] = {
//               Completed: 0,
//               "In Progress": 0,
//               Pending: 0,
//               Delayed: 0,
//             };
//           }

//           // Check if item is delayed first
//           const isDelayed =
//             item.status !== "Completed" &&
//             new Date(item.dateOfCompletion) < now;

//           if (grouped[district].hasOwnProperty(item.status)) {
//             grouped[district][item.status] += 1;
//           }

//           if (
//             item.status !== "Completed" &&
//             new Date(item.dateOfCompletion) < now
//           ) {
//             grouped[district].Delayed += 1;
//           }
//         });

//         const result = Object.entries(grouped).map(([district, counts]) => ({
//           district,
//           data: Object.entries(counts).map(([name, value]) => ({
//             name,
//             value,
//             fill: colorMap[name],
//           })),
//         }));

//         setDistrictWiseStatus(result);
//       } catch (err) {
//         console.error("Error grouping by district:", err);
//       }
//     };

//     fetchAndGroupByDistrict();
//   }, [type, status, districts, selectedDepartment]);

//   const handleChangeStatus = (event) => {
//     setStatus(event.target.value);
//   };

//   const handleChangeDistricts = (event) => {
//     setDistricts(event.target.value);
//   };

//   const handleChangeDepartments = (event) => {
//     setDepartments(event.target.value);
//   };

//   // const totalCount = statusData.reduce((acc, item) => acc + item.value, 0);
//   const titleMap = {
//     "cm-announcements": "CM Announcements Dashboard",
//     "pm-announcements": "PM Announcements Dashboard",
//     "central-govt-schemes": "Central Government Schemes Dashboard",
//     "state-govt-schemes": "State Government Schemes Dashboard",
//     "innovative-proposals": "Innovative Proposals Dashboard",
//   };

//   const pageTitle = titleMap[type] || "Announcements Dashboard";

//   const completedCount =
//     statusData.find((item) => item.name === "Completed")?.value || 0;
//   const inProgressCount =
//     statusData.find((item) => item.name === "In Progress")?.value || 0;
//   const pendingCount =
//     statusData.find((item) => item.name === "Pending")?.value || 0;

//   const totalCount = completedCount + inProgressCount + pendingCount;
//   if (isLoading) return <h1>Redirecting to login page...</h1>;
//   return (
//     <section className="py-8">
//       <div className="container">
//         <div className="flex items-center justify-between w-full">
//           <div className="search w-[300px] relative">
//             <Button
//               variant="outlined"
//               className="!capitalize !text-sm flex items-center gap-1"
//               onClick={handleGoHome}
//             >
//               Back
//             </Button>
//           </div>
//           <div className="info flex flex-col">
//             <h3 className="text-[20px] font-[600]">{pageTitle}</h3>
//           </div>

//           <div className="search w-[300px] relative">
//             {/* <IoSearch
//               size={20}
//               className="text-gray-500 absolute top-3 left-2 z-50"
//             />
//             <input
//               type="text"
//               className="w-full h-[45px] border border-[rgba(0,0,0,0.3)] outline-none focus:border-[rgba(0,0,0,0.9)] rounded-md px-8 bg-white"
//               placeholder="Search Projects..."
//             /> */}
//           </div>
//         </div>

//         {/* Dashboard boxes start here */}
//         <div className="grid grid-cols-4 gap-3 my-5 dashboardBoxes">
//           <div className="box rounded-md bg-gradient-to-br from-blue-400 to-blue-700  flex justify-between gap-4 p-5 relative ">
//             <div className="info flex flex-col">
//               <span className="text-[14px] text-white opacity-80">
//                 Total Total Announcements
//               </span>
//               <span className="text-[30px] text-white font-bold leading-[50px]">
//                 {totalCount}
//               </span>
//               <div className="flex items-center gap-0">
//                 <IoIosArrowRoundUp size={25} className="text-white" />
//                 <span className="text-[12px] text-white font-[600] flex items-center ">
//                   {" "}
//                   12% increase from last month
//                 </span>
//               </div>
//             </div>

//             <span className="bg-[rgba(255,255,255,0.4)] flex items-center justify-center w-12 h-12 rounded-full">
//               <LiaBullhornSolid size={28} className="text-white" />
//             </span>
//           </div>

//           <div className="box rounded-md bg-gradient-to-br from-green-600 to-green-800  p-5">
//             <div className="flex justify-between gap-4 ">
//               <div className="info flex flex-col">
//                 <span className="text-[14px] text-white opacity-80">
//                   Completed
//                 </span>
//                 <span className="text-[30px] text-white font-bold leading-[50px]">
//                   {completedCount}
//                 </span>
//               </div>

//               <span className="bg-[rgba(255,255,255,0.4)] flex items-center justify-center w-12 h-12 rounded-full">
//                 <CiCircleCheck size={28} className="text-white" />
//               </span>
//             </div>

//             <LinearProgress
//               variant="determinate"
//               value={50}
//               className="success"
//             />
//             <div className="flex items-center gap-0 mt-2">
//               <span className="text-[12px] text-white font-[500] flex items-center ">
//                 {" "}
//                 10% of total announcements
//               </span>
//             </div>
//           </div>

//           <div className="box rounded-md bg-gradient-to-br from-orange-600 to-orange-800  gap-4 p-5">
//             <div className="flex justify-between gap-4 ">
//               <div className="info flex flex-col">
//                 <span className="text-[14px] text-white opacity-80">
//                   In Progres
//                 </span>
//                 <span className="text-[30px] text-white font-bold leading-[50px]">
//                   {inProgressCount}
//                 </span>
//               </div>

//               <span className="bg-[rgba(255,255,255,0.4)] flex items-center justify-center w-12 h-12 rounded-full">
//                 <TbProgressBolt size={28} className="text-white" />
//               </span>
//             </div>

//             <LinearProgress
//               variant="determinate"
//               value={50}
//               className="warning"
//             />
//             <div className="flex items-center gap-0 mt-2">
//               <span className="text-[12px] text-white font-[500] flex items-center ">
//                 50% of total announcements
//               </span>
//             </div>
//           </div>

//           <div className="box rounded-md bg-gradient-to-br from-purple-600 to-purple-700   gap-4 p-5">
//             <div className="flex justify-between gap-4 ">
//               <div className="info flex flex-col">
//                 <span className="text-[14px] text-white opacity-80">
//                   Pending
//                 </span>
//                 <span className="text-[30px] text-white font-bold leading-[50px]">
//                   {pendingCount}
//                 </span>
//               </div>

//               <span className="bg-[rgba(255,255,255,0.4)] flex items-center justify-center w-12 h-12 rounded-full">
//                 <IoMdTime size={28} className="text-white" />
//               </span>
//             </div>

//             <LinearProgress
//               variant="determinate"
//               value={50}
//               className="purple"
//             />
//             <div className="flex items-center gap-0 mt-2">
//               <span className="text-[12px] text-white font-[500] flex items-center ">
//                 40% of total announcements
//               </span>
//             </div>
//           </div>
//         </div>
//         {/* Dashboard boxes ends here */}

//         <div className="card bg-white shadow-sm p-5 rounded-md">
//           <div className="flex items-center mb-4 justify-between">
//             <div className="info">
//               <h3 className="text-[18px] font-[600] text-gray-800">
//                 Announcements by District
//               </h3>
//               <p className="text-[13px] font-[400] text-gray-700">
//                 Status breakdown for each district
//               </p>
//             </div>

//             <div className="flex items-center justify-end gap-3">
//               <div className="box">
//                 <Select
//                   value={status}
//                   onChange={handleChangeStatus}
//                   displayEmpty
//                   inputProps={{ "aria-label": "Without label" }}
//                   size="small"
//                 >
//                   <MenuItem value="">All Status</MenuItem>
//                   <MenuItem value={"Completed"}>Completed</MenuItem>
//                   <MenuItem value={"In Progress"}>In Progress</MenuItem>
//                   <MenuItem value={"Pending"}>Pending</MenuItem>
//                   <MenuItem value={"Overdue"}>Overdue</MenuItem>
//                 </Select>
//               </div>

//               <div className="box">
//                 <Select
//                   value={districts}
//                   onChange={handleChangeDistricts}
//                   displayEmpty
//                   inputProps={{ "aria-label": "Without label" }}
//                   size="small"
//                 >
//                   <MenuItem value="">All Districts</MenuItem>
//                   <MenuItem value="Almora">Almora</MenuItem>
//                   <MenuItem value="Bageshwar">Bageshwar</MenuItem>
//                   <MenuItem value="Chamoli">Chamoli</MenuItem>
//                   <MenuItem value="Champawat">Champawat</MenuItem>
//                   <MenuItem value="Dehradun">Dehradun</MenuItem>
//                   <MenuItem value="Haridwar">Haridwar</MenuItem>
//                   <MenuItem value="Nainital">Nainital</MenuItem>
//                   <MenuItem value="Pauri Garhwal">Pauri Garhwal</MenuItem>
//                   <MenuItem value="Pithoragarh">Pithoragarh</MenuItem>
//                   <MenuItem value="Rudraprayag">Rudraprayag</MenuItem>
//                   <MenuItem value="Tehri Garhwal">Tehri Garhwal</MenuItem>
//                   <MenuItem value="Udham Singh Nagar">
//                     Udham Singh Nagar
//                   </MenuItem>
//                   <MenuItem value="Uttarkashi">Uttarkashi</MenuItem>
//                 </Select>
//               </div>

//               <div className="box w-[150px]">
//                 {/* <Select
//                   value={departments}
//                   onChange={handleChangeDepartments}
//                   displayEmpty
//                   inputProps={{ "aria-label": "Without label" }}
//                   size="small"
//                 >
//                   <MenuItem value="">All Departments</MenuItem>
//                   <MenuItem value={"Education"}>Education</MenuItem>
//                   <MenuItem value={"Health"}>Health</MenuItem>
//                   <MenuItem value={"Rural Development"}>
//                     Rural Development
//                   </MenuItem>
//                   <MenuItem value={"Urban Development"}>
//                     Urban Development
//                   </MenuItem>
//                   <MenuItem value={"PWD"}>PWD</MenuItem>
//                 </Select> */}
//                 <select
//                   value={selectedDepartment}
//                   onChange={(e) => setSelectedDepartment(e.target.value)}
//                   className="w-full p-2 border rounded-md"
//                 >
//                   <option value="">All Dept</option>
//                   {departments.map((dept) => (
//                     <option key={dept._id} value={dept.name}>
//                       {dept.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//             {districtWiseStatus.map((districtItem, index) => (
//               <div key={index} className="border rounded-lg p-2 shadow-sm">
//                 <h2 className="text-center font-semibold text-sm mb-2">
//                   {districtItem.district}
//                 </h2>
//                 <ResponsiveContainer width="100%" height={150}>
//                   <BarChart data={districtItem.data}>
//                     <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//                     <YAxis hide />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Bar dataKey="value">
//                       {districtItem.data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.fill} />
//                       ))}
//                       <LabelList
//                         dataKey="value"
//                         position="top"
//                         fill="#000"
//                         fontSize={12}
//                       />
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="card bg-white shadow-sm p-5 rounded-md my-5">
//           <div className="flex items-center mb-4 justify-between">
//             <h3 className="text-[18px] font-[600] text-gray-800">
//               Announcements List
//             </h3>

//             <div className="flex items-center justify-end gap-3">
//               {/* <div className="box">
//                 <Select
//                   value={status}
//                   onChange={handleChangeStatus}
//                   displayEmpty
//                   inputProps={{ "aria-label": "Without label" }}
//                   size="small"
//                 >
//                   <MenuItem value="">All Status</MenuItem>
//                   <MenuItem value={"Completed"}>Completed</MenuItem>
//                   <MenuItem value={"In Progress"}>In Progress</MenuItem>
//                   <MenuItem value={"Pending"}>Pending</MenuItem>
//                   <MenuItem value={"Overdue"}>Overdue</MenuItem>
//                 </Select>
//               </div> */}

//               {/* <div className="box">
//                 <Select
//                   value={districts}
//                   onChange={handleChangeDistricts}
//                   displayEmpty
//                   inputProps={{ "aria-label": "Without label" }}
//                   size="small"
//                 >
//                   <MenuItem value="">All Districts</MenuItem>
//                   <MenuItem value={"Almora"}>Almora</MenuItem>
//                   <MenuItem value={"Bageshwar"}>Bageshwar</MenuItem>
//                   <MenuItem value={"Chamoli"}>Chamoli</MenuItem>
//                   <MenuItem value={"Champawat"}>Champawat</MenuItem>
//                   <MenuItem value={"Dehradun"}>Dehradun</MenuItem>
//                   <MenuItem value={"Haridwar"}>Haridwar</MenuItem>
//                   <MenuItem value={"Nainital"}>Nainital</MenuItem>
//                   <MenuItem value={"Pauri Garhwal"}>Pauri Garhwal</MenuItem>
//                 </Select>
//               </div> */}

//               <div className="box">
//                 {/* <select
//                   value={selectedDepartment}
//                   onChange={(e) => setSelectedDepartment(e.target.value)}
//                   className="w-full p-2 border rounded-md"
//                 >
//                   <option value="">All Dept</option>
//                   {departments.map((dept) => (
//                     <option key={dept._id} value={dept.name}>
//                       {dept.name}
//                     </option>
//                   ))}
//                 </select> */}
//                 {/* <Select
//                   value={departments}
//                   onChange={handleChangeDepartments}
//                   displayEmpty
//                   inputProps={{ "aria-label": "Without label" }}
//                   size="small"
//                 >
//                   <MenuItem value="">All Departments</MenuItem>
//                   <MenuItem value={"Education"}>Education</MenuItem>
//                   <MenuItem value={"Health"}>Health</MenuItem>
//                   <MenuItem value={"Rural Development"}>
//                     Rural Development
//                   </MenuItem>
//                   <MenuItem value={"Urban Development"}>
//                     Urban Development
//                   </MenuItem>
//                   <MenuItem value={"PWD"}>PWD</MenuItem>
//                 </Select> */}
//               </div>
//             </div>
//           </div>
//           <TableData
//             type={type}
//             status={status}
//             district={districts}
//             department={selectedDepartment}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// const TableData = ({ type, status, district, department }) => {
//   console.log("TableData type:", type);
//   const [announcementData, setAnnouncementData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const columns = [
//     { id: "Sno", label: "S.No.", minWidth: 70 },
//     { id: "AnnouncementNo", label: "Announcement No.", minWidth: 170 },
//     { id: "Date", label: "Date", minWidth: 110 },
//     {
//       id: "District",
//       label: "District",
//       minWidth: 120,
//     },
//     {
//       id: "Details",
//       label: "Details",
//       minWidth: 200,
//     },
//     {
//       id: "Department",
//       label: "Department",
//       minWidth: 100,
//     },
//     {
//       id: "Completion Date",
//       label: "Completion Date",
//       minWidth: 100,
//     },
//     {
//       id: "Status",
//       label: "Status",
//       minWidth: 100,
//     },
//     {
//       id: "Uploads",
//       label: "Uploads",
//       minWidth: 120,
//     },
//     {
//       id: "Last Login",
//       label: "Last Login",
//       minWidth: 120,
//     },
//   ];

//   // Parse "dd/MM/yy" or "dd/MM/yyyy" safely; fall back to native Date when possible
//   const parseDateFlexible = (value) => {
//     if (!value) return null;
//     // string like "22/08/25" or "22/08/2025"
//     if (typeof value === "string" && value.includes("/")) {
//       const parts = value.split("/");
//       if (parts.length >= 3) {
//         const dd = parseInt(parts[0], 10);
//         const mm = parseInt(parts[1], 10) - 1;
//         let yy = parseInt(parts[2], 10);
//         if (yy < 100) yy += 2000; // 2-digit year → 20yy
//         const d = new Date(yy, mm, dd);
//         return isNaN(d) ? null : d;
//       }
//     }
//     const d = new Date(value);
//     return isNaN(d) ? null : d;
//   };

//   // Compute "Delayed" / "On Time"
//   const getOverallStatus = (item) => {
//     const now = new Date();

//     // Always use dateOfCompletion as the due date
//     const due = parseDateFlexible(item?.dateOfCompletion);

//     if (!due) return "On Time"; // if no completion date, treat as on time

//     if (item?.status === "Completed") {
//       // Compare completedOn (or fallback) vs due date
//       const actual =
//         parseDateFlexible(item?.completedOn) ||
//         parseDateFlexible(item?.dateOfCompletion);
//       if (actual && actual > due) return "Delayed";
//       return "On Time";
//     }

//     // Not completed → compare today with due date
//     return now > due ? "Delayed" : "On Time";
//   };

//   const fetchAnnouncements = useCallback(async () => {
//     try {
//       setLoading(true);

//       let endpoint = "";
//       if (type === "cm-announcements") {
//         endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/cm-announcements`;
//       } else if (type === "pm-announcements") {
//         endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/pm-announcements`;
//       } else if (type === "central-govt-schemes") {
//         endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/central-govt-schemes`;
//       } else if (type === "state-govt-schemes") {
//         endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/state-govt-schemes`;
//       } else if (type === "innovative-proposals") {
//         endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/innovative-proposals`;
//       } else {
//         endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/pm-announcements`; // default fallback
//       }

//       // const response = await fetch(endpoint);
//       // const result = await response.json();

//       const res = await axios.get(endpoint, {
//         params: {
//           status,
//           district,
//           department,
//         },
//       });
//       const result = res.data;

//       if (Array.isArray(result)) {
//         setAnnouncementData(result);
//       } else if (result.success) {
//         // setAnnouncementData(
//         //   result.announcements || result.schemes || result.proposals || []
//         // );

//         let rawData =
//           result.announcements || result.schemes || result.proposals || [];

//         if (status) {
//           rawData = rawData.filter((item) => item.status === status);
//         }

//         if (district) {
//           rawData = rawData.filter((item) => item.district === district);
//         }

//         if (department) {
//           rawData = rawData.filter((item) => item.department === department);
//         }

//         setAnnouncementData(rawData);
//       } else {
//         toast.error(
//           `Failed to fetch data: ${result?.message || "Unknown error"}`
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Error fetching data");
//     } finally {
//       setLoading(false);
//     }
//   }, [type, status, district, department]);

//   useEffect(() => {
//     fetchAnnouncements();
//   }, [fetchAnnouncements]);

//   return (
//     <>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               {getColumnsForType(type).map((column) => (
//                 <TableCell
//                   key={column.id}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {announcementData.map((item, index) => (
//               <TableRow key={item._id || index}>
//                 {getColumnsForType(type).map((column) => {
//                   let value = "";
//                   if (column.id === "overallStatus") {
//                     value = getOverallStatus(item); // "Delayed" or "On Time"
//                   } else if (column.id === "serialNo") {
//                     value = item.serialNo || "N/A";
//                   } else if (column.id === "representative") {
//                     value = item.representative?.name || "N/A";
//                     {
//                     }
//                   } else if (
//                     [
//                       "dateOfApproval",
//                       "dateOfCompletion",
//                       "dateOfAnnouncement",
//                       "dateOfSubmission",
//                     ].includes(column.id)
//                   ) {
//                     // normal date columns
//                     const rawDate = item[column.id];
//                     value = rawDate
//                       ? new Date(rawDate).toLocaleDateString("en-IN", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                         })
//                       : "N/A";
//                   } else if (column.id === "expectedCompletion") {
//                     // ✅ empty if completed
//                     if (item.status === "Completed") {
//                       value = "";
//                     } else {
//                       const rawDate = item.expectedCompletion;
//                       value = rawDate
//                         ? new Date(rawDate).toLocaleDateString("en-IN", {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           })
//                         : "N/A";
//                     }
//                   } else if (column.id === "completedOn") {
//                     // ✅ show only if completed
//                     if (item.status === "Completed") {
//                       const rawDate = item.expectedCompletion;
//                       value = rawDate
//                         ? new Date(rawDate).toLocaleDateString("en-IN", {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           })
//                         : "N/A";
//                     } else {
//                       value = "";
//                     }
//                   } else {
//                     value = item[column.id] || "N/A";
//                   }

//                   return <TableCell key={column.id}>{value}</TableCell>;
//                 })}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[50, 100, 150, 200]}
//         component="div"
//         count={announcementData.length}
//         rowsPerPage={5}
//         page={0}
//       />
//     </>
//   );
// };
// export default SummariseDashboard2;

// ============================================== ++++++++++++++++++++++ ======================
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import { MdOutlinePentagon } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { GoShieldCheck } from "react-icons/go";
import { LiaBullhornSolid } from "react-icons/lia";
import { CiCircleCheck } from "react-icons/ci";
import { TbProgressBolt } from "react-icons/tb";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  Cell,
} from "recharts";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useRouter } from "next/navigation";

// Styled components for better table appearance
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  border: "1px solid #e5e7eb",
  "& .MuiTable-root": {
    borderCollapse: "separate",
    borderSpacing: 0,
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-head": {
    backgroundColor: "#f8fafc",
    color: "#374151",
    fontWeight: 600,
    fontSize: "0.875rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "2px solid #e5e7eb",
    padding: "16px 12px",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fafafa",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#ffffff",
  },
  "&:hover": {
    backgroundColor: "#f0f9ff",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease-in-out",
  },
  "& .MuiTableCell-body": {
    fontSize: "0.875rem",
    padding: "16px 12px",
    borderBottom: "1px solid #f1f5f9",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.status-cell": {
    padding: "12px",
  },
  "&.details-cell": {
    maxWidth: "300px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "&:hover": {
      whiteSpace: "normal",
      wordBreak: "break-word",
    },
  },
}));

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white p-2 rounded shadow text-sm border border-gray-200">
        <p className="font-semibold">{label}</p>
        <div className="flex items-center gap-2 mt-1">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: item.fill }}
          />
          <span>
            {item.name}: {item.value}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const getStatusChip = (status, overallStatus) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return {
          color: "#10b981",
          bg: "#d1fae5",
          textColor: "#065f46",
        };
      case "In Progress":
        return {
          color: "#3b82f6",
          bg: "#dbeafe",
          textColor: "#1e40af",
        };
      case "Pending":
        return {
          color: "#9333ea",
          bg: "#e9d5ff",
          textColor: "#6b21a8",
        };
      case "Delayed":
        return {
          color: "#ef4444",
          bg: "#fee2e2",
          textColor: "#dc2626",
        };
      case "On Time":
        return {
          color: "#10b981",
          bg: "#dcfce7",
          textColor: "#059669",
        };
      default:
        return {
          color: "#6b7280",
          bg: "#f3f4f6",
          textColor: "#374151",
        };
    }
  };

  const statusStyle = getStatusColor(status);
  const overallStyle = getStatusColor(overallStatus);

  return (
    <div className="flex flex-col gap-1">
      <Chip
        label={status}
        size="small"
        sx={{
          backgroundColor: statusStyle.bg,
          color: statusStyle.textColor,
          fontWeight: 600,
          fontSize: "0.75rem",
          height: "24px",
          "& .MuiChip-label": {
            padding: "0 8px",
          },
        }}
      />
      {overallStatus && (
        <Chip
          label={overallStatus}
          size="small"
          variant={overallStatus === "On Time" ? "filled" : "outlined"}
          sx={{
            backgroundColor:
              overallStatus === "On Time" ? "#dcfce7" : "transparent",
            borderColor: overallStyle.color,
            color: overallStyle.textColor,
            fontWeight: 500,
            fontSize: "0.7rem",
            height: "20px",
            "& .MuiChip-label": {
              padding: "0 6px",
            },
          }}
        />
      )}
    </div>
  );
};

const getColumnsForType = (type) => {
  if (type === "central-govt-schemes" || type === "state-govt-schemes") {
    return [
      { id: "serialNo", label: "S.No", minWidth: 80, align: "center" },
      { id: "details", label: "Project Details", minWidth: 250 },
      {
        id: "dateOfApproval",
        label: "📅 Approval Date",
        minWidth: 140,
        align: "center",
      },
      {
        id: "dateOfCompletion",
        label: "⏰ Due Date",
        minWidth: 130,
        align: "center",
      },
      {
        id: "expectedCompletion",
        label: "📋 Expected",
        minWidth: 130,
        align: "center",
      },
      {
        id: "completedOn",
        label: "✅ Completed",
        minWidth: 130,
        align: "center",
      },
      {
        id: "reason", // ✅ new column
        label: "🚨 Reason of Delay",
        minWidth: 200,
      },
      { id: "district", label: "📍 District", minWidth: 120 },
      { id: "department", label: "🏢 Department", minWidth: 140 },
      {
        id: "numberOfBeneficiaries",
        label: "👥 Beneficiaries",
        minWidth: 120,
        align: "center",
      },
      { id: "status", label: "⚡ Status", minWidth: 120, align: "center" },
      {
        id: "overallStatus",
        label: "📊 Overall",
        minWidth: 120,
        align: "center",
      },
    ];
  } else if (type === "new-initiatives") {
    return [
      { id: "serialNo", label: "S.No", minWidth: 90, align: "center" },
      { id: "departmentName", label: "🏢 Department", minWidth: 180 },
      { id: "date", label: "📅 Date", minWidth: 140, align: "center" },
      { id: "initiativeName", label: "Initiative", minWidth: 200 },
      { id: "details", label: "Details", minWidth: 240 },
      { id: "status", label: "Status", minWidth: 120, align: "center" },
    ];
  } else if (type === "hcm-instructions") {
    return [
      { id: "serialNo", label: "S.No", minWidth: 90, align: "center" },
      { id: "departmentName", label: "🏢 Department", minWidth: 180 },
      {
        id: "dateOfReview",
        label: "📅 Review Date",
        minWidth: 150,
        align: "center",
      },
      { id: "details", label: "Details", minWidth: 240 },
      { id: "instructionsByHcm", label: "Instruction", minWidth: 240 },
      { id: "actionByDepartment", label: "Action by Dept", minWidth: 200 },
      {
        id: "dateOfCompletion",
        label: "⏰ Due Date",
        minWidth: 140,
        align: "center",
      },
      { id: "status", label: "Status", minWidth: 120, align: "center" },
    ];
  } else if (type === "cm-helplines") {
    return [
      { id: "serialNo", label: "S.No", minWidth: 90, align: "center" },
      {
        id: "dateOfReview",
        label: "📅 Review Date",
        minWidth: 150,
        align: "center",
      },
      { id: "pendingDetails", label: "Pending Details", minWidth: 220 },
      {
        id: "periodOfPendency",
        label: "Pendency (days)",
        minWidth: 150,
        align: "center",
      },
      { id: "relatedDept", label: "Related Dept", minWidth: 180 },
      { id: "reasonForDelay", label: "Reason for Delay", minWidth: 200 },
      {
        id: "reviewAtDivisionalLevel",
        label: "Divisional Review",
        minWidth: 160,
        align: "center",
      },
      {
        id: "reviewAtCsLevel",
        label: "CS Level Review",
        minWidth: 150,
        align: "center",
      },
      { id: "outcomeOfReview", label: "Outcome", minWidth: 200 },
      { id: "actionOnDefaulter", label: "Action on Defaulter", minWidth: 180 },
      { id: "status", label: "Status", minWidth: 120, align: "center" },
    ];
  } else if (type === "statements") {
    return [
      { id: "serialNo", label: "S.No", minWidth: 90, align: "center" },
      { id: "mpMlaName", label: "MP/MLA", minWidth: 160 },
      { id: "constituencyName", label: "Constituency", minWidth: 150 },
      {
        id: "dateOfStatement",
        label: "📅 Date",
        minWidth: 130,
        align: "center",
      },
      { id: "details", label: "Details", minWidth: 240 },
      { id: "relatedDept", label: "Related Dept", minWidth: 180 },
      { id: "factualBrief", label: "Factual Brief", minWidth: 220 },
      { id: "status", label: "Status", minWidth: 120, align: "center" },
    ];
  } else if (type === "innovative-proposals") {
    return [
      { id: "serialNo", label: "S.No", minWidth: 80, align: "center" },
      { id: "details", label: "Proposal Details", minWidth: 250 },
      { id: "institutionName", label: "🏫 Institution", minWidth: 180 },
      {
        id: "dateOfSubmission",
        label: "📅 Submitted",
        minWidth: 140,
        align: "center",
      },
      { id: "representative", label: "👤 Representative", minWidth: 160 },
      { id: "district", label: "📍 District", minWidth: 120 },
      { id: "departmentSubmitted", label: "🏢 Department", minWidth: 140 },
      { id: "officerSubmitted", label: "👮 Officer", minWidth: 140 },
      { id: "actionTaken", label: "⚡ Action Taken", minWidth: 180 },
      { id: "status", label: "📊 Status", minWidth: 120, align: "center" },
      {
        id: "overallStatus",
        label: "📈 Overall",
        minWidth: 120,
        align: "center",
      },
    ];
  } else {
    return [
      { id: "serialNo", label: "S.No", minWidth: 80, align: "center" },
      { id: "announcementNo", label: "Announcement #", minWidth: 150 },
      { id: "details", label: "Announcement Details", minWidth: 250 },
      {
        id: "dateOfAnnouncement",
        label: "📅 Announced",
        minWidth: 140,
        align: "center",
      },
      { id: "district", label: "📍 District", minWidth: 120 },
      { id: "department", label: "🏢 Department", minWidth: 140 },

      {
        id: "dateOfCompletion",
        label: "⏰ Due Date",
        minWidth: 130,
        align: "center",
      },
      {
        id: "expectedCompletion",
        label: "📋 Expected",
        minWidth: 130,
        align: "center",
      },
      {
        id: "completedOn",
        label: "✅ Completed",
        minWidth: 130,
        align: "center",
      },
      {
        id: "reason", // ✅ new column
        label: "🚨 Reason of Delay",
        minWidth: 200,
      },
      { id: "status", label: "⚡ Status", minWidth: 120, align: "center" },
      {
        id: "overallStatus",
        label: "📊 Overall",
        minWidth: 120,
        align: "center",
      },
    ];
  }
};

const getApiEndpoint = (type) => {
  const endpoints = {
    cmAnnouncement: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cm-announcements`,
    pmAnnouncement: `${process.env.NEXT_PUBLIC_BASE_URL}/api/pm-announcements`,
    schemeCentralGovt: `${process.env.NEXT_PUBLIC_BASE_URL}/api/central-govt-schemes`,
    schemeStateGovt: `${process.env.NEXT_PUBLIC_BASE_URL}/api/state-govt-schemes`,
    innovativeProposals: `${process.env.NEXT_PUBLIC_BASE_URL}/api/innovative-proposals`,
    newInitiatives: `${process.env.NEXT_PUBLIC_BASE_URL}/api/new-initiatives`,
    hcmInstructions: `${process.env.NEXT_PUBLIC_BASE_URL}/api/hcm-instructions`,
    cmHelplines: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cm-helplines`,
    statements: `${process.env.NEXT_PUBLIC_BASE_URL}/api/statements`,
    // Add other mappings as needed
  };
  return endpoints[type];
};

const SummariseDashboard2 = ({ type }) => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState("");

  const [districts, setDistricts] = useState("");
  const [status, setStatus] = useState("");

  const [startDate, setStartDate] = useState(new Date());

  const [statusData, setStatusData] = useState([]);
  const [pmStatusData, setPmStatusData] = useState([]);
  const [centralGovtStatusData, setCentralGovtStatusData] = useState([]);
  const [stateGovtStatusData, setStateGovtStatusData] = useState([]);
  const [reviewMeetingStatusData, setReviewMeetingStatusData] = useState([]);
  const [innovativeStatusData, setInnovativeStatusData] = useState([]);

  const [newInitiativeStatusData, setNewInitiativeStatusData] = useState([]);
  const [hcmInstructionStatusData, setHcmInstructionStatusData] = useState([]);
  const [cmHelplineStatusData, setCmHelplineStatusData] = useState([]);
  const [statementStatusData, setStatementStatusData] = useState([]);

  const [announcementData, setAnnouncementData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const handleGoHome = () => {
    router.push("/summariseDashboard");
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check`, {
          withCredentials: true,
        });
        setIsLoading(false);
      } catch (err) {
        console.log("error messsage:", err);
        router.push("/login");
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchStatusCounts = async (type, setState) => {
      const statuses = ["Completed", "In Progress", "Pending"];
      const colorMap = {
        Completed: "#10b981",
        "In Progress": "#3b82f6",
        Pending: "#9333EA",
        Delayed: "#ef4444",
      };

      try {
        const allDataRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}`,
          {
            params: {
              district: districts,
              department: selectedDepartment,
            },
          }
        );

        const allData = allDataRes.data;
        const now = new Date();

        const statusCounts = {
          Completed: 0,
          "In Progress": 0,
          Pending: 0,
          Delayed: 0,
        };

        allData.forEach((item) => {
          if (statusCounts.hasOwnProperty(item.status)) {
            statusCounts[item.status]++;
          }

          if (
            item.status !== "Completed" &&
            new Date(item.dateOfCompletion) < now
          ) {
            statusCounts.Delayed++;
          }
        });

        const results = Object.entries(statusCounts).map(([name, value]) => ({
          name,
          value,
          fill: colorMap[name],
        }));

        setState(results);
      } catch (err) {
        console.error(`Error fetching status for ${type}:`, err);
      }
    };

    // -------------------------------

    fetchStatusCounts(type, setStatusData);
  }, [districts, status, selectedDepartment]);

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(getApiEndpoint(type));
      const result = await response.json();

      if (Array.isArray(result)) {
        setAnnouncementData(result);
      } else if (result.success) {
        setAnnouncementData(
          result.announcements || result.schemes || result.proposals || []
        );
      } else {
        toast.error(
          `Failed to fetch data: ${result?.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const fetchDepartments = async () => {
    try {
      const urls = [
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/govt`,
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/public/`,
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments/aided/`,
      ];

      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(responses.map((res) => res.json()));

      const allDepartments = data.flatMap((group) => group.departments || []);
      setDepartments(allDepartments);
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Failed to load departments");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const [districtWiseStatus, setDistrictWiseStatus] = useState([]);

  //   useEffect(() => {

  //     const fetchAndGroupByDepartment = (data) => {
  //   const departmentMap = {};

  //   data.forEach((item) => {
  //     const dept = item.departmentName || "Unknown";
  //     if (!departmentMap[dept]) {
  //       departmentMap[dept] = 0;
  //     }
  //     departmentMap[dept] += 1;
  //   });

  //   return Object.keys(departmentMap).map((dept) => ({
  //     name: dept,
  //     value: departmentMap[dept],
  //   }));
  // };

  //     const fetchAndGroupByDistrict = async () => {
  //       try {
  //         const res = await axios.get(
  //           `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}`,
  //           {
  //             params: {
  //               status,
  //               district: districts,
  //               department: selectedDepartment,
  //             },
  //           }
  //         );

  //         const data = res.data;

  //         const colorMap = {
  //           Completed: "#10b981",
  //           "In Progress": "#f74a4a",
  //           Pending: "#9333EA",
  //           Delayed: "#ff0000",
  //         };

  //         const grouped = {};
  //         const now = new Date();

  //         data.forEach((item) => {
  //           const district = item.district || "Unknown";
  //           if (!grouped[district]) {
  //             grouped[district] = {
  //               Completed: 0,
  //               "In Progress": 0,
  //               Pending: 0,
  //               Delayed: 0,
  //             };
  //           }

  //           if (grouped[district].hasOwnProperty(item.status)) {
  //             grouped[district][item.status] += 1;
  //           }

  //           if (
  //             item.status !== "Completed" &&
  //             new Date(item.dateOfCompletion) < now
  //           ) {
  //             grouped[district].Delayed += 1;
  //           }
  //         });

  //         const result = Object.entries(grouped).map(([district, counts]) => ({
  //           district,
  //           data: Object.entries(counts).map(([name, value]) => ({
  //             name,
  //             value,
  //             fill: colorMap[name],
  //           })),
  //         }));

  //         setDistrictWiseStatus(result);
  //       } catch (err) {
  //         console.error("Error grouping by district:", err);
  //       }
  //     };

  //     fetchAndGroupByDistrict();
  //     fetchAndGroupByDepartment();
  //   }, [type, status, districts, selectedDepartment]);

  useEffect(() => {
    const fetchAndGroupData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}`,
          {
            params: {
              status,
              district: districts,
              department: selectedDepartment,
            },
          }
        );

        const data = res.data;
        const now = new Date();

        const colorMap = {
          Completed: "#10b981",
          "In Progress": "#f74a4a",
          Pending: "#9333EA",
          Delayed: "#ff0000",
        };

        // if (
        //   [
        //     "new-initiatives",
        //     "hcm-instructions",
        //     "cm-helplines",
        //     "statements",
        //   ].includes(type)
        // ) {
        //   // -------- Department Wise --------
        //   const grouped = {};

        //   data.forEach((item) => {
        //     const dept = item.departmentName || "Unknown"; // use correct field
        //     console.log("Department:", dept);
        //     if (!grouped[dept]) {
        //       grouped[dept] = {
        //         Open: 0,
        //         Implemented: 0,
        //         "In Progress": 0,
        //         Planning: 0,
        //         "On Hold": 0,
        //         Delayed: 0,
        //       };
        //     }

        //     if (grouped[dept].hasOwnProperty(item.status)) {
        //       grouped[dept][item.status] += 1;
        //     }

        //     if (
        //       item.status !== "Completed" &&
        //       new Date(item.dateOfCompletion) < now
        //     ) {
        //       grouped[dept].Delayed += 1;
        //     }
        //   });

        //   const result = Object.entries(grouped).map(([dept, counts]) => ({
        //     department: dept,
        //     data: Object.entries(counts).map(([name, value]) => ({
        //       name,
        //       value,
        //       fill: colorMap[name],
        //     })),
        //   }));

        //   setDistrictWiseStatus(result); // reusing same state for chart
        // }

        if (
          [
            "new-initiatives",
            "hcm-instructions",
            "cm-helplines",
            "statements",
          ].includes(type)
        ) {
          const grouped = {};
          let statusOptions = [];
          let deptField = "departmentName"; // default

          if (type === "new-initiatives") {
            deptField = "departmentName";
            statusOptions = [
              "Open",
              "Implemented",
              "In Progress",
              "Planning",
              "On Hold",
              "Delayed",
            ];
          } else if (type === "hcm-instructions") {
            deptField = "departmentName";
            statusOptions = [
              "Open",
              "Completed",
              "In Progress",
              "Pending",
              "Delayed",
            ];
          } else if (type === "cm-helplines") {
            deptField = "relatedDept";
            statusOptions = [
              "Open",
              "Resolved",
              "In Progress",
              "Pending",
              "Delayed",
            ];
          } else if (type === "statements") {
            deptField = "relatedDept";
            statusOptions = [
              "Open",
              "Published",
              "In Progress",
              "Pending",
              "Delayed",
            ];
          }

          // initialize grouped structure
          data.forEach((item) => {
            const dept = item[deptField] || "Unknown";
            if (!grouped[dept]) {
              grouped[dept] = {};
              statusOptions.forEach((st) => (grouped[dept][st] = 0));
            }

            if (grouped[dept].hasOwnProperty(item.status)) {
              grouped[dept][item.status] += 1;
            }

            // only if you want to auto-mark "Delayed"
            if (
              item.status !== "Completed" &&
              item.dateOfCompletion &&
              new Date(item.dateOfCompletion) < now
            ) {
              if (grouped[dept].hasOwnProperty("Delayed")) {
                grouped[dept].Delayed += 1;
              }
            }
          });

          const result = Object.entries(grouped).map(([dept, counts]) => ({
            department: dept,
            data: Object.entries(counts).map(([name, value]) => ({
              name,
              value,
              fill: colorMap[name] || "#999", // fallback color
            })),
          }));

          setDistrictWiseStatus(result);
        } else {
          // -------- District Wise --------
          const grouped = {};

          data.forEach((item) => {
            const district = item.district || "Unknown";
            if (!grouped[district]) {
              grouped[district] = {
                Completed: 0,
                "In Progress": 0,
                Pending: 0,
                Delayed: 0,
              };
            }

            if (grouped[district].hasOwnProperty(item.status)) {
              grouped[district][item.status] += 1;
            }

            if (
              item.status !== "Completed" &&
              new Date(item.dateOfCompletion) < now
            ) {
              grouped[district].Delayed += 1;
            }
          });

          const result = Object.entries(grouped).map(([district, counts]) => ({
            district,
            data: Object.entries(counts).map(([name, value]) => ({
              name,
              value,
              fill: colorMap[name],
            })),
          }));

          setDistrictWiseStatus(result);
        }
      } catch (err) {
        console.error("Error grouping data:", err);
      }
    };

    fetchAndGroupData();
  }, [type, status, districts, selectedDepartment]);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeDistricts = (event) => {
    setDistricts(event.target.value);
  };

  const handleChangeDepartments = (event) => {
    setDepartments(event.target.value);
  };

  const titleMap = {
    "cm-announcements": "CM Announcements Dashboard",
    "pm-announcements": "PM Announcements Dashboard",
    "central-govt-schemes": "Central Government Schemes Dashboard",
    "state-govt-schemes": "State Government Schemes Dashboard",
    "innovative-proposals": "Innovative Proposals Dashboard",
    "new-initiatives": "New Initiatives Dashboard",
    "hcm-instructions": "HCM Instructions Dashboard",
    "cm-helplines": "CM Helplines Dashboard",
    statements: "Statements Dashboard",
  };

  const statusConfig = {
    "new-initiatives": [
      "Implemented",
      "In Progress",
      "Planning",
      "On Hold",
      "Open",
      "Delayed",
    ],
    "hcm-instructions": [
      "Completed",
      "In Progress",
      "Pending",
      "Open",
      "Delayed",
    ],
    "cm-helplines": ["Resolved", "In Progress", "Pending", "Open", "Delayed"],
    statements: ["Published", "In Progress", "Pending", "Open", "Delayed"],
    default: ["Completed", "In Progress", "Pending", "Delayed", "Open"], // fallback (like Announcements)
  };

  // ------------------------------------

  // Mapping for chart titles
  const chartTitleMap = {
    "new-initiatives": "Initiatives by Department",
    "hcm-instructions": "Instructions by Department",
    "cm-helplines": "Helpline Issues by Department",
    statements: "Statements by Department",
  };
  const chartTitle = chartTitleMap[type] || "Announcements by District";

  // Mapping for total labels
  const totalLabelMap = {
    "new-initiatives": "Total Initiatives",
    "hcm-instructions": "Total Instructions",
    "cm-helplines": "Total Helpline Issues",
    statements: "Total Statements",
  };
  const totalLabel = totalLabelMap[type] || "Total Announcements";

  // State for status counts
  const [statusCounts, setStatusCounts] = useState({});
  const [statusTotal, setStatusTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}`,
          {
            params: {
              status,
              district: districts,
              department: selectedDepartment,
            },
          }
        );
        const data = res.data;

        // Count statuses dynamically
        const counts = {};
        data.forEach((item) => {
          const st = item.status || "Unknown";
          counts[st] = (counts[st] || 0) + 1;
        });

        setStatusCounts(counts);
        setStatusTotal(data.length);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [type, status, districts, selectedDepartment]);
  // ------------------------------------

  const statuses = statusConfig[type] || statusConfig.default;

  const pageTitle = titleMap[type] || "Announcements Dashboard";

  const completedCount =
    statusData.find((item) => item.name === "Completed")?.value || 0;
  const inProgressCount =
    statusData.find((item) => item.name === "In Progress")?.value || 0;
  const pendingCount =
    statusData.find((item) => item.name === "Pending")?.value || 0;

  const totalCount = completedCount + inProgressCount + pendingCount;

  if (isLoading) return <h1>Redirecting to login page...</h1>;

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="container">
        <div className="flex items-center justify-between w-full mb-6">
          <div className="search w-[300px] relative">
            <Button
              variant="outlined"
              className="!capitalize !text-sm flex items-center gap-1 !border-blue-500 !text-blue-600 hover:!bg-blue-50"
              onClick={handleGoHome}
            >
              ← Back to Dashboard
            </Button>
          </div>
          <div className="info flex flex-col items-center">
            <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {pageTitle}
            </h1>
          </div>
          <div className="search w-[300px] relative"></div>
        </div>

        {/* Dashboard boxes */}
        {/* <div className="grid grid-cols-4 gap-6 my-8 dashboardBoxes">
          <div className="box rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex justify-between gap-4 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="info flex flex-col">
              <span className="text-sm text-blue-100 opacity-90">
                Total Announcements
              </span>
              <span className="text-3xl text-white font-bold leading-[50px]">
                {totalCount}
              </span>
              <div className="flex items-center gap-0">
                <IoIosArrowRoundUp size={25} className="text-green-300" />
                <span className="text-xs text-green-200 font-semibold">
                  12% increase
                </span>
              </div>
            </div>
            <span className="bg-white/20 flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-sm">
              <LiaBullhornSolid size={28} className="text-white" />
            </span>
          </div>

          <div className="box rounded-xl bg-gradient-to-br from-green-600 to-green-800 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-between gap-4">
              <div className="info flex flex-col">
                <span className="text-sm text-green-100 opacity-90">
                  Completed
                </span>
                <span className="text-3xl text-white font-bold leading-[50px]">
                  {completedCount}
                </span>
              </div>
              <span className="bg-white/20 flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-sm">
                <CiCircleCheck size={28} className="text-white" />
              </span>
            </div>
            <LinearProgress
              variant="determinate"
              value={(completedCount / totalCount) * 100}
              className="success mt-3"
              sx={{
                backgroundColor: "rgba(255,255,255,0.3)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#ffffff",
                },
              }}
            />
            <div className="flex items-center gap-0 mt-2">
              <span className="text-xs text-green-200 font-medium">
                {Math.round((completedCount / totalCount) * 100)}% of total
              </span>
            </div>
          </div>

          <div className="box rounded-xl bg-gradient-to-br from-orange-600 to-orange-800 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-between gap-4">
              <div className="info flex flex-col">
                <span className="text-sm text-orange-100 opacity-90">
                  In Progress
                </span>
                <span className="text-3xl text-white font-bold leading-[50px]">
                  {inProgressCount}
                </span>
              </div>
              <span className="bg-white/20 flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-sm">
                <TbProgressBolt size={28} className="text-white" />
              </span>
            </div>
            <LinearProgress
              variant="determinate"
              value={(inProgressCount / totalCount) * 100}
              className="warning mt-3"
              sx={{
                backgroundColor: "rgba(255,255,255,0.3)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#ffffff",
                },
              }}
            />
            <div className="flex items-center gap-0 mt-2">
              <span className="text-xs text-orange-200 font-medium">
                {Math.round((inProgressCount / totalCount) * 100)}% of total
              </span>
            </div>
          </div>

          <div className="box rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-between gap-4">
              <div className="info flex flex-col">
                <span className="text-sm text-purple-100 opacity-90">
                  Pending
                </span>
                <span className="text-3xl text-white font-bold leading-[50px]">
                  {pendingCount}
                </span>
              </div>
              <span className="bg-white/20 flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-sm">
                <IoMdTime size={28} className="text-white" />
              </span>
            </div>
            <LinearProgress
              variant="determinate"
              value={(pendingCount / totalCount) * 100}
              className="purple mt-3"
              sx={{
                backgroundColor: "rgba(255,255,255,0.3)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#ffffff",
                },
              }}
            />
            <div className="flex items-center gap-0 mt-2">
              <span className="text-xs text-purple-200 font-medium">
                {Math.round((pendingCount / totalCount) * 100)}% of total
              </span>
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-4 gap-6 my-8 dashboardBoxes">
          {/* TOTAL CARD */}
          <div className="box rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex justify-between gap-4 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="info flex flex-col">
              <span className="text-sm text-blue-100 opacity-90">
                {totalLabel}
              </span>
              <span className="text-3xl text-white font-bold leading-[50px]">
                {statusTotal}
              </span>
            </div>
            <span className="bg-white/20 flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-sm">
              <LiaBullhornSolid size={28} className="text-white" />
            </span>
          </div>

          {/* STATUS CARDS */}
          {Object.entries(statusCounts).map(([status, count]) => {
            const tileClass = [
              "Completed",
              "Implemented",
              "Resolved",
              "Published",
            ].includes(status)
              ? "from-green-600 to-green-800"
              : status === "In Progress"
              ? "from-orange-600 to-orange-800"
              : ["Pending", "On Hold", "Open"].includes(status)
              ? "from-purple-600 to-purple-700"
              : "from-rose-600 to-rose-700";

            const Icon = [
              "Completed",
              "Implemented",
              "Resolved",
              "Published",
            ].includes(status)
              ? CiCircleCheck
              : status === "In Progress"
              ? TbProgressBolt
              : ["Pending", "On Hold", "Open"].includes(status)
              ? IoMdTime
              : IoIosArrowRoundUp;

            return (
              <div
                key={status}
                className={`box rounded-xl bg-gradient-to-br ${tileClass} p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <div className="flex justify-between gap-4">
                  <div className="info flex flex-col">
                    <span className="text-sm text-white/80">{status}</span>
                    <span className="text-3xl text-white font-bold leading-[50px]">
                      {count}
                    </span>
                  </div>
                  <span className="bg-white/20 flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-sm">
                    <Icon size={28} className="text-white" />
                  </span>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={statusTotal ? (count / statusTotal) * 100 : 0}
                  className="mt-3"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#ffffff" },
                  }}
                />
                <div className="flex items-center gap-0 mt-2">
                  <span className="text-xs text-white/80 font-medium">
                    {statusTotal ? Math.round((count / statusTotal) * 100) : 0}%
                    of total
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* District wise chart */}
        <div className="card bg-white shadow-lg p-6 rounded-xl border border-gray-200 mb-8">
          <div className="flex items-center mb-6 justify-between">
            <div className="info">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                📊 Announcements by District
              </h3>
              <p className="text-sm font-normal text-gray-600">
                Status breakdown for each district
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <div className="box">
                <Select
                  value={status}
                  onChange={handleChangeStatus}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                  className="rounded-lg"
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value={"Completed"}>Completed</MenuItem>
                  <MenuItem value={"In Progress"}>In Progress</MenuItem>
                  <MenuItem value={"Pending"}>Pending</MenuItem>
                  {/* <MenuItem value={"Delayed"}>Delayed</MenuItem> */}
                </Select>
              </div>

              <div className="box">
                <Select
                  value={districts}
                  onChange={handleChangeDistricts}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                  className="rounded-lg"
                >
                  <MenuItem value="">All Districts</MenuItem>
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

              <div className="box w-[150px]">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Dept</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {districtWiseStatus.map((districtItem, index) => (
              <div
                key={index}
                className="border rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-gray-50 to-white"
              >
                <h2 className="text-center font-bold text-sm mb-3 text-gray-800 bg-gray-100 py-2 px-3 rounded-lg">
                  📍 {districtItem.district || districtItem.department}
                </h2>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={districtItem.data}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {districtItem.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                      <LabelList
                        dataKey="value"
                        position="top"
                        fill="#000"
                        fontSize={11}
                        fontWeight="600"
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="card bg-white shadow-lg p-6 rounded-xl border border-gray-200">
          <div className="flex items-center mb-6 justify-between">
            <div className="info">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                📋 Detailed Announcements List
              </h3>
              <p className="text-sm text-gray-600">
                Complete overview of all announcements with current status
              </p>
            </div>
          </div>
          <TableData
            type={type}
            status={status}
            district={districts}
            department={selectedDepartment}
          />
        </div>
      </div>
    </section>
  );
};

const TableData = ({ type, status, district, department }) => {
  console.log("TableData type:", type);
  const [announcementData, setAnnouncementData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Parse date function
  const parseDateFlexible = (value) => {
    if (!value) return null;
    if (typeof value === "string" && value.includes("/")) {
      const parts = value.split("/");
      if (parts.length >= 3) {
        const dd = parseInt(parts[0], 10);
        const mm = parseInt(parts[1], 10) - 1;
        let yy = parseInt(parts[2], 10);
        if (yy < 100) yy += 2000;
        const d = new Date(yy, mm, dd);
        return isNaN(d) ? null : d;
      }
    }
    const d = new Date(value);
    return isNaN(d) ? null : d;
  };

  // Compute overall status
  const getOverallStatus = (item) => {
    const now = new Date();
    const due = parseDateFlexible(item?.dateOfCompletion);

    if (!due) return "On Time";

    if (item?.status === "Completed") {
      const actual =
        parseDateFlexible(item?.completedOn) ||
        parseDateFlexible(item?.dateOfCompletion);
      if (actual && actual > due) return "Delayed";
      return "On Time";
    }

    return now > due ? "Delayed" : "On Time";
  };

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true);

      let endpoint = "";
      if (type === "cm-announcements") {
        endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/cm-announcements`;
      } else if (type === "pm-announcements") {
        endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/pm-announcements`;
      } else if (type === "central-govt-schemes") {
        endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/central-govt-schemes`;
      } else if (type === "state-govt-schemes") {
        endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/state-govt-schemes`;
      } else if (type === "innovative-proposals") {
        endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/innovative-proposals`;
      } else if (type === "new-initiatives") {
        endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/new-initiatives`;
      } else if (type === "hcm-instructions") {
        endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/hcm-instructions`;
      } else if (type === "cm-helplines") {
        endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/cm-helplines`;
      } else if (type === "statements") {
        endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/statements`;
      } else {
        endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/pm-announcements`;
      }

      const res = await axios.get(endpoint, {
        params: {
          status,
          district,
          department,
        },
      });
      const result = res.data;

      if (Array.isArray(result)) {
        setAnnouncementData(result);
      } else if (result.success) {
        let rawData =
          result.announcements || result.schemes || result.proposals || [];

        if (status) {
          rawData = rawData.filter((item) => item.status === status);
        }

        if (district) {
          rawData = rawData.filter((item) => item.district === district);
        }

        if (department) {
          rawData = rawData.filter((item) => item.department === department);
        }

        setAnnouncementData(rawData);
      } else {
        console.error(
          `Failed to fetch data: ${result?.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [type, status, district, department]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <StyledTableContainer sx={{ maxHeight: 600, borderRadius: "12px" }}>
        <Table stickyHeader>
          <StyledTableHead>
            <TableRow>
              {getColumnsForType(type).map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    textAlign: column.align || "left",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {announcementData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => {
                const overallStatus = getOverallStatus(item);
                return (
                  <StyledTableRow key={item._id || index}>
                    {getColumnsForType(type).map((column) => {
                      let value = "";
                      let cellContent = "";

                      if (column.id === "overallStatus") {
                        value = overallStatus;
                        cellContent = (
                          <StyledTableCell
                            className="status-cell"
                            align={column.align}
                          >
                            {getStatusChip(null, value)}
                          </StyledTableCell>
                        );
                      } else if (column.id === "status") {
                        value = item.status || "N/A";
                        cellContent = (
                          <StyledTableCell
                            className="status-cell"
                            align={column.align}
                          >
                            {getStatusChip(value, overallStatus)}
                          </StyledTableCell>
                        );
                      } else if (column.id === "serialNo") {
                        value = page * rowsPerPage + index + 1;
                        cellContent = (
                          <StyledTableCell align={column.align}>
                            <div className="font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-center min-w-[50px]">
                              {value}
                            </div>
                          </StyledTableCell>
                        );
                      } else if (column.id === "representative") {
                        value = item.representative?.name || "N/A";
                        cellContent = (
                          <StyledTableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-sm">
                                  {value.charAt(0)}
                                </span>
                              </div>
                              <span className="font-medium text-gray-700">
                                {value}
                              </span>
                            </div>
                          </StyledTableCell>
                        );
                      } else if (column.id === "details") {
                        value = item[column.id] || "N/A";
                        cellContent = (
                          <StyledTableCell className="details-cell">
                            <div className="font-medium text-gray-800 leading-relaxed">
                              {value}
                            </div>
                          </StyledTableCell>
                        );
                      } else if (column.id === "district") {
                        value = item[column.id] || "N/A";
                        cellContent = (
                          <StyledTableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-blue-600">📍</span>
                              <span className="font-medium text-gray-700">
                                {value}
                              </span>
                            </div>
                          </StyledTableCell>
                        );
                      } else if (
                        column.id === "department" ||
                        column.id === "departmentSubmitted"
                      ) {
                        value = item[column.id] || "N/A";
                        cellContent = (
                          <StyledTableCell>
                            <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium inline-block">
                              {value}
                            </div>
                          </StyledTableCell>
                        );
                      } else if (column.id === "numberOfBeneficiaries") {
                        value = item[column.id] || "0";
                        cellContent = (
                          <StyledTableCell align={column.align}>
                            <div className="bg-green-50 text-green-800 px-3 py-1 rounded-lg text-sm font-semibold inline-block">
                              👥 {value}
                            </div>
                          </StyledTableCell>
                        );
                      } else if (
                        [
                          "dateOfApproval",
                          "dateOfCompletion",
                          "dateOfAnnouncement",
                          "dateOfSubmission",
                        ].includes(column.id)
                      ) {
                        const rawDate = item[column.id];
                        value = rawDate
                          ? new Date(rawDate).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "N/A";
                        cellContent = (
                          <StyledTableCell align={column.align}>
                            <div className="bg-gray-50 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                              {value}
                            </div>
                          </StyledTableCell>
                        );
                      } else if (column.id === "expectedCompletion") {
                        if (item.status === "Completed") {
                          value = "";
                          cellContent = (
                            <StyledTableCell align={column.align}>
                              <span className="text-gray-400 italic">-</span>
                            </StyledTableCell>
                          );
                        } else {
                          const rawDate = item.expectedCompletion;
                          value = rawDate
                            ? new Date(rawDate).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "N/A";
                          cellContent = (
                            <StyledTableCell align={column.align}>
                              <div className="bg-yellow-50 text-yellow-800 px-3 py-1 rounded-lg text-sm font-medium">
                                {value}
                              </div>
                            </StyledTableCell>
                          );
                        }
                      } else if (column.id === "completedOn") {
                        if (item.status === "Completed") {
                          const rawDate = item.expectedCompletion;
                          value = rawDate
                            ? new Date(rawDate).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "N/A";
                          cellContent = (
                            <StyledTableCell align={column.align}>
                              <div className="bg-green-50 text-green-800 px-3 py-1 rounded-lg text-sm font-medium">
                                ✅ {value}
                              </div>
                            </StyledTableCell>
                          );
                        } else {
                          value = "";
                          cellContent = (
                            <StyledTableCell align={column.align}>
                              <span className="text-gray-400 italic">-</span>
                            </StyledTableCell>
                          );
                        }
                      } else {
                        value = item[column.id] || "N/A";
                        cellContent = (
                          <StyledTableCell align={column.align}>
                            <span className="text-gray-700">{value}</span>
                          </StyledTableCell>
                        );
                      }

                      return cellContent;
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={announcementData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="text-gray-600"
          sx={{
            "& .MuiTablePagination-toolbar": {
              paddingLeft: 0,
              paddingRight: 0,
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontSize: "0.875rem",
                color: "#374151",
              },
            "& .MuiTablePagination-select": {
              fontSize: "0.875rem",
            },
          }}
        />
      </div>
    </>
  );
};

export default SummariseDashboard2;
