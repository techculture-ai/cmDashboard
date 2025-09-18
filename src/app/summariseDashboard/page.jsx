"use client";
import React, { useState, useEffect } from "react";
import { GoShieldCheck } from "react-icons/go";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Button } from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { useCallback } from "react";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { MdOutlinePentagon } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SlCalender } from "react-icons/sl";
import { IoIosArrowRoundForward } from "react-icons/io";
import axios from "axios";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Link from "next/link";

import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

// const data1 = [
//   { name: 'Completed', value: 125, fill: '#10b981' },       // green
//   { name: 'In Progress', value: 90, fill: '#3b82f6' },       // blue
//   { name: 'Pending', value: 30, fill: '#f59e0b' },           // yellow
//   { name: 'Delayed', value: 10, fill: '#ef4444' }            // red
// ];

const CustomBarLabel = ({ x, y, width, value }) => {
  return (
    <text
      x={x + width / 2}
      y={y - 5}
      fill="black"
      fontSize={13}
      textAnchor="middle"
      fontWeight="bold"
    >
      {value}
    </text>
  );
};

const SummariseDashboard = () => {
  const [districts, setDistricts] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");

  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(""); // optional

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

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const isCmLoggedIn = localStorage.getItem("isCmLoggedIn") === "true";
  //   if (!isCmLoggedIn) {
  //     router.push("/login");
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check`, {
          withCredentials: true, // ✅ send cookie
        });
        setIsLoading(false);
      } catch (err) {
        console.log("error messsage:", err);
        router.push("/login");
      }
    };
    checkAuth();
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("isCmLoggedIn"); // ✅ clear the login flag
  //   // Optionally clear cookies if your backend uses them
  //   // document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //   router.push("/");
  // };

  const handleLogout = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`,
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
  // ===============================================
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Replace your existing useEffect with this corrected version:
  useEffect(() => {
    // const fetchStatusCounts = async (type, setState) => {
    //   // const statuses = ["Completed", "In Progress", "Pending"];
    //   const statuses = status
    //     ? [status]
    //     : ["Completed", "In Progress", "Pending"];

    //   const colorMap = {

    //     Completed: "#10b981", // green
    //     "In Progress": "#f74a4a", //"#C53030", // metal red
    //     Pending: "#9333EA", // purple
    //     Delayed: "#ff0000", // red
    //   };

    //   try {
    //     // const results = await Promise.all(
    //     //   statuses.map(async (statusItem) => {
    //     //     // Build params object dynamically
    //     //     const params = {
    //     //       status: statusItem,
    //     //     };

    //     //     // Add district filter if selected
    //     //     if (districts) {
    //     //       params.district = districts;
    //     //     }

    //     //     // Add department filter if selected - use consistent parameter name
    //     //     if (selectedDepartment) {
    //     //       params.department = selectedDepartment; // ✅ Use consistent parameter name
    //     //       // OR if your API expects 'departmentSubmitted':
    //     //       // params.departmentSubmitted = selectedDepartment;
    //     //     }

    //     //     const res = await axios.get(
    //     //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}/status`,
    //     //       { params }
    //     //     );

    //     //     return {
    //     //       name: statusItem,
    //     //       value: res.data.length,
    //     //       fill: colorMap[statusItem],
    //     //     };
    //     //   })
    //     // );

    //     const results = await Promise.all(
    //       statuses.map(async (statusItem) => {
    //         const params = { status: statusItem };
    //         if (districts) params.district = districts;
    //         if (selectedDepartment) params.department = selectedDepartment;

    //         const res = await axios.get(
    //           `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}/status`,
    //           { params }
    //         );

    //         return {
    //           name: statusItem,
    //           value: res.data.length,
    //           fill: colorMap[statusItem],
    //         };
    //       })
    //     );

    //     // Fetch delayed count with consistent parameters
    //     // const delayedParams = {};

    //     // if (districts) {
    //     //   delayedParams.district = districts;
    //     // }

    //     // if (selectedDepartment) {
    //     //   delayedParams.department = selectedDepartment; // ✅ Use same parameter name
    //     //   // OR if your API expects 'departments':
    //     //   // delayedParams.departments = selectedDepartment;
    //     // }

    //     // const delayedRes = await axios.get(
    //     //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}`,
    //     //   { params: delayedParams }
    //     // );

    //     // const now = new Date();

    //     // const delayedCount = delayedRes.data.filter(
    //     //   (item) =>
    //     //     new Date(item.dateOfCompletion) < now && item.status !== "Completed"
    //     // ).length;

    //     // results.push({
    //     //   name: "Delayed",
    //     //   value: delayedCount,
    //     //   fill: colorMap["Delayed"],
    //     // });

    //     // setState(results);

    //     // ✅ Handle Delayed properly
    //     if (!status || status === "Delayed") {
    //       const delayedParams = {};
    //       if (districts) delayedParams.district = districts;
    //       if (selectedDepartment) delayedParams.department = selectedDepartment;

    //       const delayedRes = await axios.get(
    //         `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}`,
    //         { params: delayedParams }
    //       );

    //       const now = new Date();
    //       const delayedCount = delayedRes.data.filter(
    //         (item) =>
    //           new Date(item.dateOfCompletion) < now &&
    //           item.status !== "Completed"
    //       ).length;

    //       results.push({
    //         name: "Delayed",
    //         value: delayedCount,
    //         fill: colorMap["Delayed"],
    //       });
    //     }

    //     setState(results);
    //   } catch (err) {
    //     console.error(`Error fetching status for ${type}:`, err);
    //     console.error("Error details:", err.response?.data); // ✅ Add more detailed error logging
    //   }
    // };

    // ---------------------------------

    const fetchStatusCounts = async (type, setState) => {
      let statuses = [];
      let colorMap = {};

      // 🔹 Custom statuses
      if (type === "new-initiatives") {
        statuses = status
          ? [status]
          : ["Implemented", "In Progress", "Planning", "On Hold"];
        colorMap = {
          Implemented: "#10b981", // green
          "In Progress": "#3b82f6", // blue
          Planning: "#f59e0b", // yellow
          "On Hold": "#ef4444", // red
          Delayed: "#ff0000", // red (always include delayed)
        };
      } else if (type === "cm-helplines") {
        statuses = status ? [status] : ["Resolved", "In Progress", "Pending"];
        colorMap = {
          Resolved: "#10b981", // green
          "In Progress": "#3b82f6", // blue
          Pending: "#f59e0b", // yellow
          Delayed: "#ff0000", // red
        };
      }
      // 🔹 Statements
      else if (type === "statements") {
        statuses = status ? [status] : ["Published", "In Progress", "Pending"];
        colorMap = {
          Published: "#10b981", // green
          "In Progress": "#3b82f6", // blue
          Pending: "#f59e0b", // yellow
          Delayed: "#ff0000", // red
        };
      } else {
        // 🔹 Default for Announcements/Schemes/etc.
        statuses = status ? [status] : ["Completed", "In Progress", "Pending"];
        colorMap = {
          Completed: "#10b981",
          "In Progress": "#f74a4a",
          Pending: "#9333EA",
          Delayed: "#ff0000",
        };
      }

      try {
        const results = await Promise.all(
          statuses.map(async (statusItem) => {
            const params = { status: statusItem };
            if (districts) params.district = districts;
            if (selectedDepartment) params.department = selectedDepartment;

            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}/status`,
              { params }
            );

            return {
              name: statusItem,
              value: res.data.length,
              fill: colorMap[statusItem],
            };
          })
        );

        // 🔹 Always calculate Delayed (for every category)
        if (!status || status === "Delayed") {
          const delayedParams = {};
          if (districts) delayedParams.district = districts;
          if (selectedDepartment) delayedParams.department = selectedDepartment;

          const delayedRes = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}`,
            { params: delayedParams }
          );

          const now = new Date();
          const delayedCount = delayedRes.data.filter(
            (item) =>
              item.dateOfCompletion &&
              new Date(item.dateOfCompletion) < now &&
              item.status !== "Completed" &&
              item.status !== "Resolved" && // for helpline
              item.status !== "Implemented" // for initiatives
          ).length;

          results.push({
            name: "Delayed",
            value: delayedCount,
            fill: colorMap["Delayed"],
          });
        }

        setState(results);
      } catch (err) {
        console.error(`Error fetching status for ${type}:`, err);
        console.error("Error details:", err.response?.data);
      }
    };

    fetchStatusCounts("cm-announcements", setStatusData);
    fetchStatusCounts("pm-announcements", setPmStatusData);
    fetchStatusCounts("central-govt-schemes", setCentralGovtStatusData);
    fetchStatusCounts("state-govt-schemes", setStateGovtStatusData);
    fetchStatusCounts("review-meetings", setReviewMeetingStatusData);
    fetchStatusCounts("innovative-proposals", setInnovativeStatusData);
    fetchStatusCounts("new-initiatives", setNewInitiativeStatusData);
    fetchStatusCounts("hcm-instructions", setHcmInstructionStatusData);
    fetchStatusCounts("cm-helplines", setCmHelplineStatusData);
    fetchStatusCounts("statements", setStatementStatusData);
  }, [districts, status, selectedDepartment]);

  // Also add some debugging to see what's being sent:
  useEffect(() => {
    console.log("Filters changed:", {
      districts,
      status,
      selectedDepartment,
    });
  }, [districts, status, selectedDepartment]);

  const handleChangeDistricts = (event) => {
    setDistricts(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  // const handleChangeDepartment = (event) => {
  //   setDepartment(event.target.value);
  // };

  // ===============================================
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    const fetchAllCategoryData = async () => {
      try {
        const [
          cmRes,
          pmRes,
          stateRes,
          centralRes,
          innRes,
          newInitRes,
          hcmRes,
          cmHelpRes,
          stmtRes,
        ] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/cm-announcements/status-counts`
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/pm-announcements/status-counts`
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/state-govt-schemes/status-counts`
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/central-govt-schemes/status-counts`
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/innovative-proposals/status-counts`
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/new-initiatives/status-counts`
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/hcm-instructions/status-counts`
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/cm-helplines/status-counts`
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/statements/status-counts`
          ),
        ]);

        // Just pull the first item in each array (you can loop too, if needed)
        const mergedData = [
          cmRes.data[0],
          pmRes.data[0],
          stateRes.data[0],
          centralRes.data[0],
          innRes.data[0],
          newInitRes.data[0],
          hcmRes.data[0],
          cmHelpRes.data[0],
          stmtRes.data[0],
        ];

        setCategoryData(mergedData);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchAllCategoryData();
  }, []);

  // =================================================================
  if (isLoading) return <h1>Redirecting to login page...</h1>;

  return (
    <div className="py-0">
      <div className="w-full bg-secondary p-2 py-4 px-0">
        <div className="container flex items-center justify-between">
          <div className="leftSec flex items-center gap-3">
            <span className="rounded-full flex items-center justify-center w-12 h-12 bg-white">
              <GoShieldCheck size={30} className="text-secondary" />
            </span>

            <div className="info">
              <h4 className="text-white text-[20px] font-bold leading-5">
                Monitoring Dashboard
              </h4>
              <span className="text-white text-[14px] opacity-70">
                Government of Uttarakhand
              </span>
            </div>
          </div>

          <div className="rightSec flex items-center gap-8">
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="small"
                disabled
              />
              <SlCalender
                size={18}
                className="absolute top-[10px] right-3 z-50 pointer-events-none"
                disabled
              />
            </div>

            {/* <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              className="!capitalize !text-sm"
            >
              Logout
            </Button> */}
            {/* <Button className="!bg-white !text-secondary !capitalize gap-1 !px-4 !font-[600]">
              <FaRegUser size={16} /> Admin
            </Button> */}
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="w-full bg-white shadow-md p-2 px-4 h-20 rounded-lg flex items-center justify-between">
          <div className="search w-[300px] relative">
            <Button
              variant="outlined"
              className="!capitalize !text-sm flex items-center gap-1"
              onClick={handleGoHome}
            >
              Back to Home
            </Button>
          </div>

          <div className="filtersSec flex items-center justify-end gap-3">
            <div className="field w-[150px]">
              <Select
                value={districts}
                onChange={handleChangeDistricts}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                className="w-full"
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
                <MenuItem value="Udham Singh Nagar">Udham Singh Nagar</MenuItem>
                <MenuItem value="Uttarkashi">Uttarkashi</MenuItem>
              </Select>
            </div>

            <div className="field w-[150px]">
              <Select
                value={status}
                onChange={handleChangeStatus}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                className="w-full"
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value={"Completed"}>Completed</MenuItem>
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Delayed"}>Delayed</MenuItem>
              </Select>
            </div>

            {/* <div className="field w-[150px]">
              <Select
                value={department}
                onChange={handleChangeDepartment}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                className="w-full"
              >
                <MenuItem value="">All Departments</MenuItem>
                <MenuItem value={"Education"}>Education</MenuItem>
                <MenuItem value={"Health"}>Health</MenuItem>
                <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
                <MenuItem value={"Tourism"}>Tourism</MenuItem>
                <MenuItem value={"PWD"}>PWD</MenuItem>
              </Select>
            </div> */}

            <div className="field w-[150px]">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full p-2 border rounded-md"
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

        <h3 className="text-[18px] font-bold mb-3 mt-5">
          Status Overview by Category
        </h3>
        <div className="grid grid-cols-3 gap-8">
          {/* <BarChartComponent title="A. CM Announcements" chartTitle="Number of CM  Announcements (255)" data={data1} /> */}

          <BarChartComponent
            title="A. CM Announcements"
            chartTitle={`Number of CM Announcements  (${
              categoryData[0]?.total ?? 0
            })`}
            data={statusData}
            type="cm-announcements"
          />

          <BarChartComponent
            title="B. PM Announcement"
            chartTitle={`Number of PM Announcements  (${
              categoryData[1]?.total ?? 0
            })`}
            data={pmStatusData}
            type="pm-announcements"
          />

          <BarChartComponent
            title="C. Schemes (Central Government)"
            //chartTitle="Number of Schemes (Central Government) (255)"
            chartTitle={`Number of Schemes  (${categoryData[3]?.total ?? 0})`}
            data={centralGovtStatusData}
            type="central-govt-schemes"
          />

          <BarChartComponent
            title="D. Schemes (State Government)"
            //chartTitle="Number of Schemes (State Government) (255)"
            chartTitle={`Number of Schemes  (${categoryData[2]?.total ?? 0})`}
            data={stateGovtStatusData}
            type="state-govt-schemes"
          />

          {/* <BarChartComponent
            title="E. Reveiw Meetings"
            // chartTitle="Number of Reveiw Meetings (255)"
            chartTitle={`Number of Reveiw Meetings(${reviewMeetingStatusData.reduce(
              (acc, curr) => acc + curr.value,
              0
            )})`}
            data={reviewMeetingStatusData}
            type="review-meetings"
          /> */}

          <BarChartComponent
            title="F. Innovative Proposals"
            //chartTitle="Number of Innovative Proposals (255)"
            chartTitle={`Number of Innovative Proposals (${
              categoryData[4]?.total ?? 0
            })`}
            data={innovativeStatusData}
            type="innovative-proposals"
          />

          <BarChartComponent
            title="G. New Initiatives"
            chartTitle={`Number of New Initiatives (${
              categoryData[5]?.total ?? 0
            })`}
            data={newInitiativeStatusData}
            type="new-initiatives"
          />

          <BarChartComponent
            title="H. HCM Instructions"
            chartTitle={`Number of HCM Instructions (${
              categoryData[6]?.total ?? 0
            })`}
            data={hcmInstructionStatusData}
            type="hcm-instructions"
          />

          <BarChartComponent
            title="I. CM Helpline Status"
            chartTitle={`Number of CM Helpline Status(${
              categoryData[7]?.total ?? 0
            })`}
            data={cmHelplineStatusData}
            type="cm-helplines"
          />

          <BarChartComponent
            title="J. MP/MLA Statements"
            chartTitle={`Number of MP/MLA Statements (${
              categoryData[8]?.total ?? 0
            })`}
            data={statementStatusData}
            type="statements"
          />
        </div>

        <br />

        <TableData />
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-black text-gray-300 p-2 rounded text-sm shadow">
        <p className="font-semibold text-[13px]">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={index}
            style={{ color: entry.color }}
            className=" text-[13px] flex items-center gap-2"
          >
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const BarChartComponent = ({ title, chartTitle, data, type }) => {
  return (
    <div className="card bg-white p-4 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h4 className="text-[15px] font-bold mb-3">
          <Link
            href="/summariseDashboard/susdashboard"
            className="hover:text-sky-600"
          >
            {title}
          </Link>
        </h4>

        <Link
          href={{
            pathname: "/summariseDashboard/susdashboard",
            query: { type },
          }}
          className="text-[14px] font-[600] text-sky-500 flex items-center gap-1"
        >
          View <IoIosArrowRoundForward size={24} />
        </Link>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 20, left: -30, bottom: 0 }}
        >
          <Legend
            verticalAlign="top"
            align="center"
            iconType="circle"
            content={() => (
              <div className="flex items-center justify-center gap-2 mb-4 ml-4 mt-[-10px]">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-sm text-gray-600">{chartTitle}</span>
              </div>
            )}
          />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#555" }} />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" label={<CustomBarLabel />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const TableData = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="card bg-white shadow-md w-full rounded-md py-3">
        <div className="px-5">
          {/* <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          > */}
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            TabIndicatorProps={{ style: { display: "none" } }} // 🔴 hides the underline
          >
            <Tab label="All Categories" />
            <Tab label="CM Announcements" />
            <Tab label="Central Schemes" />
            <Tab label="State Schemes" />
            <Tab label="PM Announcements" />
            <Tab label="Review Meetings" />
            <Tab label="Innovative Proposals" />
            <Tab label="New Initiatives" />
            <Tab label="HCM Instructions" />
            <Tab label="MP/MLA Statements" />
            <Tab label="CM Helpline Status" />
            {/* <Tab label="Major Events" /> */}
          </Tabs>
        </div>
        <br />
        {/* {value === 0 && <AllCategoryTable />}

        {value === 1 && <CMAnnouncement type="cm-announcements" />}
        {value === 2 && <CMAnnouncement type="central-govt-schemes" />}
        {value === 3 && <CMAnnouncement type="state-govt-schemes" />}
        {value === 4 && <CMAnnouncement type="pm-announcements" />} */}
        {value === 0 && <AllCategoryTable />} {/* keep your summary table */}
        {value === 1 && <EnhancedTable type="cm-announcements" />}
        {value === 2 && <EnhancedTable type="central-govt-schemes" />}
        {value === 3 && <EnhancedTable type="state-govt-schemes" />}
        {value === 4 && <EnhancedTable type="pm-announcements" />}
        {value === 5 && <EnhancedTable type="review-meetings" />}
        {value === 6 && <EnhancedTable type="innovative-proposals" />}
        {value === 7 && <EnhancedTable type="new-initiatives" />}
        {value === 8 && <EnhancedTable type="hcm-instructions" />}
        {value === 9 && <EnhancedTable type="statements" />}
        {value === 10 && <EnhancedTable type="cm-helplines" />}
      </div>
    </>
  );
};

const AllCategoryTable = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchAllCategoryData = async () => {
      try {
        const endpoints = [
          { type: "cm-announcements", label: "CM Announcements" },
          { type: "pm-announcements", label: "PM Announcements" },
          { type: "state-govt-schemes", label: "State Schemes" },
          { type: "central-govt-schemes", label: "Central Schemes" },
          { type: "innovative-proposals", label: "Innovative Proposals" },
          { type: "new-initiatives", label: "New Initiatives" },
          { type: "hcm-instructions", label: "HCM Instructions" },
          { type: "statements", label: "Statements" },
          { type: "cm-helplines", label: "CM Helpline" },
        ];

        const results = await Promise.all(
          endpoints.map(async ({ type, label }) => {
            const [countsRes, fullDataRes] = await Promise.all([
              axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}/status-counts`
              ),
              axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}`),
            ]);

            const counts = countsRes.data[0] || {};
            const fullData = fullDataRes.data || [];

            const now = new Date();
            const delayedCount = fullData.filter(
              (item) =>
                item.dateOfCompletion &&
                new Date(item.dateOfCompletion) < now &&
                item.status !== "Completed"
            ).length;

            const completionRate = counts.total
              ? Math.round((counts.completed / counts.total) * 100)
              : 0;

            return {
              category: label,
              total: counts.total ?? 0,
              completed: counts.completed ?? 0,
              inProgress: counts.inProgress ?? 0,
              pending: counts.pending ?? 0,
              delayed: delayedCount,
              completionRate: completionRate,
            };
          })
        );

        setCategoryData(results);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchAllCategoryData();
  }, []);

  const columns = [
    { id: "Category", label: "Category", minWidth: 150 },
    { id: "Total", label: "Total", minWidth: 100 },
    { id: "Completed", label: "Completed", minWidth: 150 },
    { id: "In Progress", label: "In Progress", minWidth: 130 },
    { id: "Pending", label: "Pending", minWidth: 100 },
    { id: "Delayed", label: "Delayed", minWidth: 100 },
    { id: "Completion Rate", label: "Completion Rate", minWidth: 100 },
  ];

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryData.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{row.completed}</TableCell>
                <TableCell>{row.inProgress}</TableCell>
                <TableCell>{row.pending}</TableCell>
                <TableCell>{row.delayed}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <LinearProgress
                      variant="determinate"
                      value={row.completionRate}
                    />
                    <span>{row.completionRate}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50, 100, 150, 200]}
        component="div"
        count={categoryData.length}
        rowsPerPage={5}
        page={0}
      />
    </>
  );
};

// const DynamicTable = ({ columns, rows, pagination, onPageChange }) => {
//   const { page, rowsPerPage, total } = pagination;

//   return (
//     <>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               {columns.map((col) => (
//                 <TableCell key={col.id} style={{ minWidth: col.minWidth }}>
//                   {col.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row, i) => (
//                 <TableRow key={i}>
//                   {columns.map((col) => (
//                     <TableCell key={col.id}>
//                       {col.id === "Status" ? (
//                         <span className="inline-block px-2 py-1 bg-sky-300 whitespace-nowrap rounded-full text-[10px] text-sky-700 font-[600]">
//                           {row[col.id]}
//                         </span>
//                       ) : col.id === "dateOfAnnouncement" ||
//                         col.id === "dateOfCompletion" ? (
//                         new Date(row[col.id]).toLocaleDateString("en-IN", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                         })
//                       ) : col.id === "lastLogin" && row[col.id] ? (
//                         new Date(row[col.id]).toLocaleString("en-IN", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })
//                       ) : (
//                         row[col.id]
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[15, 30, 45, 60]}
//         component="div"
//         count={total}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={(_, newPage) => onPageChange(newPage)}
//       />
//     </>
//   );
// };

// const CMAnnouncement = ({ type = "cm-announcements" }) => {
//   const [announcements, setAnnouncements] = useState([]);
//   const [page, setPage] = useState(0);
//   const rowsPerPage = 15;

//   const columns = [
//     { id: "serialNo", label: "S.No.", minWidth: 70 },
//     { id: "announcementNo", label: "Announcement No.", minWidth: 170 },
//     { id: "dateOfAnnouncement", label: "Date", minWidth: 110 },
//     { id: "district", label: "District", minWidth: 120 },
//     { id: "details", label: "Details", minWidth: 200 },
//     { id: "department", label: "Department", minWidth: 100 },
//     { id: "dateOfCompletion", label: "Completion Date", minWidth: 100 },
//     { id: "status", label: "Status", minWidth: 100 },
//     // { id: "letterUpload", label: "Uploads", minWidth: 120 },
//     // { id: "lastLogin", label: "Last Login", minWidth: 120 },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}`
//         );
//         setAnnouncements(res.data);
//       } catch (error) {
//         console.error("Error fetching announcements:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <DynamicTable
//       columns={columns}
//       rows={announcements}
//       pagination={{ page, rowsPerPage, total: announcements.length }}
//       onPageChange={(newPage) => setPage(newPage)}
//     />
//   );
// };

// ---- styled helpers (from page 2) ----
const StyledTableContainer = styled(TableContainer)(() => ({
  borderRadius: "12px",
  boxShadow: "0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06)",
  border: "1px solid #e5e7eb",
  "& .MuiTable-root": { borderCollapse: "separate", borderSpacing: 0 },
}));

const StyledTableHead = styled(TableHead)(() => ({
  "& .MuiTableCell-head": {
    backgroundColor: "#f8fafc",
    color: "#374151",
    fontWeight: 600,
    fontSize: "0.875rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": { backgroundColor: "#fcfcfd" },
  "&:hover": { backgroundColor: "#f9fafb" },
}));

const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: "1px solid #f1f5f9",
  fontSize: "0.9rem",
}));

const getStatusChip = (status, overallStatus) => {
  const palette = (s) => {
    switch (s) {
      case "Completed":
        return { color: "#10b981", bg: "#d1fae5", text: "#065f46" };
      case "In Progress":
        return { color: "#3b82f6", bg: "#dbeafe", text: "#1e40af" };
      case "Pending":
        return { color: "#9333ea", bg: "#e9d5ff", text: "#6b21a8" };
      case "Delayed":
        return { color: "#ef4444", bg: "#fee2e2", text: "#dc2626" };
      case "On Time":
        return { color: "#10b981", bg: "#dcfce7", text: "#059669" };
      default:
        return { color: "#6b7280", bg: "#f3f4f6", text: "#374151" };
    }
  };
  const s = palette(status);
  const o = palette(overallStatus);
  return (
    <div className="flex flex-col gap-1">
      <Chip
        label={status}
        size="small"
        sx={{
          backgroundColor: s.bg,
          color: s.text,
          fontWeight: 600,
          fontSize: "0.75rem",
          height: 24,
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
            borderColor: o.color,
            color: o.text,
            fontSize: "0.7rem",
            height: 20,
          }}
        />
      )}
    </div>
  );
};

const EnhancedTable = ({ type, status, district, department }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // date parsing used in "overall status"
  const parseDateFlexible = (value) => {
    if (!value) return null;
    if (typeof value === "string" && value.includes("/")) {
      const [dd, mm, yyRaw] = value.split("/");
      let yy = parseInt(yyRaw, 10);
      if (yy < 100) yy += 2000;
      const d = new Date(yy, parseInt(mm, 10) - 1, parseInt(dd, 10));
      return isNaN(d) ? null : d;
    }
    const d = new Date(value);
    return isNaN(d) ? null : d;
  };

  const getOverallStatus = (item) => {
    const due = parseDateFlexible(item?.dateOfCompletion);
    if (!due) return "On Time";
    if (item?.status === "Completed") {
      const actual =
        parseDateFlexible(item?.completedOn) ||
        parseDateFlexible(item?.dateOfCompletion);
      return actual && actual > due ? "Delayed" : "On Time";
    }
    return new Date() > due ? "Delayed" : "On Time";
  };

  // columns differ by type (copied from page 2)
  const getColumnsForType = (t) => {
    if (t === "central-govt-schemes" || t === "state-govt-schemes") {
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
        // {
        //   id: "completedOn",
        //   label: "✅ Completed",
        //   minWidth: 130,
        //   align: "center",
        // },
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
    } else if (t === "innovative-proposals") {
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
    } else if (type === "review-meetings") {
      return [
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
    } else if (t === "statements") {
      return [
        { id: "serialNo", label: "S.No", minWidth: 80, align: "center" },
        { id: "mpMlaName", label: "👤 MP/MLA Name", minWidth: 180 },
        { id: "constituencyName", label: "🏛 Constituency", minWidth: 160 },
        {
          id: "dateOfStatement",
          label: "📅 Date",
          minWidth: 140,
          align: "center",
        },
        { id: "details", label: "📋 Statement Details", minWidth: 250 },
        { id: "relatedDept", label: "🏢 Department", minWidth: 150 },
        { id: "factualBrief", label: "📝 Factual Brief", minWidth: 180 },
        { id: "status", label: "⚡ Status", minWidth: 120, align: "center" },
        {
          id: "overallStatus",
          label: "📊 Overall",
          minWidth: 120,
          align: "center",
        },
      ];
    } else if (t === "new-initiatives") {
      return [
        { id: "serialNo", label: "S.No", minWidth: 80, align: "center" },
        { id: "initiativeName", label: "🚀 Initiative", minWidth: 200 },
        { id: "departmentName", label: "🏢 Department", minWidth: 150 },
        {
          id: "date",
          label: "📅 Start Date",
          minWidth: 140,
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
    } else if (t === "cm-helplines") {
      return [
        { id: "serialNo", label: "S.No", minWidth: 80, align: "center" },
        {
          id: "dateOfReview",
          label: "📅 Review Date",
          minWidth: 150,
          align: "center",
        },
        { id: "pendingDetails", label: "📋 Pending Details", minWidth: 200 },
        {
          id: "periodOfPendency",
          label: "⏳ Period of Pendency (Days)",
          minWidth: 180,
          align: "center",
        },
        { id: "relatedDept", label: "🏢 Related Department", minWidth: 200 },
        { id: "status", label: "⚡ Status", minWidth: 120, align: "center" },
        { id: "reasonForDelay", label: "⏰ Reason for Delay", minWidth: 200 },
        {
          id: "reviewAtDivisionalLevel",
          label: "🏢 Divisional Level Review",
          minWidth: 200,
        },
        { id: "reviewAtCsLevel", label: "🏢 CS Level Review", minWidth: 200 },
        { id: "outcomeOfReview", label: "📊 Outcome of Review", minWidth: 200 },
        {
          id: "actionOnDefaulter",
          label: "⚖ Action on Defaulter",
          minWidth: 200,
        },
        {
          id: "overallStatus",
          label: "📈 Overall",
          minWidth: 120,
          align: "center",
        },
      ];
    } else if (t === "hcm-instructions") {
      return [
        { id: "serialNo", label: "📌 Instruction ID", minWidth: 150 },
        {
          id: "dateOfReview",
          label: "📅 Date of Review",
          minWidth: 150,
          align: "center",
        },
        { id: "departmentName", label: "🏢 Department", minWidth: 200 },
        { id: "details", label: "📋 Instruction Details", minWidth: 250 },
        {
          id: "instructionsByHcm",
          label: "📝 Instructions by HCM",
          minWidth: 250,
        },
        {
          id: "actionByDepartment",
          label: "⚡ Action by Department",
          minWidth: 250,
        },
        {
          id: "dateOfCompletion",
          label: "⏰ Completion Date",
          minWidth: 160,
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
    } else {
      // default for CM/PM announcements (works for both)
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
        { id: "status", label: "⚡ Status", minWidth: 120, align: "center" },
        {
          id: "overallStatus",
          label: "📊 Overall",
          minWidth: 120,
          align: "center",
        },
        // {
        //   id: "completedOn",
        //   label: "✅ Completed",
        //   minWidth: 130,
        //   align: "center",
        // },
      ];
    }
  };

  const fetchRows = useCallback(async () => {
    try {
      setLoading(true);
      // same endpoints pattern used across your app
      let endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}`;
      const res = await axios.get(endpoint, {
        params: { status, district, department },
      });
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.announcements ||
          res.data.schemes ||
          res.data.proposals ||
          [];
      setRows(data);
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  }, [type, status, district, department]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const cols = getColumnsForType(type);

  return (
    <>
      <StyledTableContainer sx={{ maxHeight: 600, borderRadius: "12px" }}>
        <Table stickyHeader>
          <StyledTableHead>
            <TableRow>
              {cols.map((c) => (
                <TableCell
                  key={c.id}
                  style={{ minWidth: c.minWidth, textAlign: c.align || "left" }}
                >
                  {c.label}
                </TableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, idx) => {
                const overall = getOverallStatus(item);
                return (
                  <StyledTableRow key={item._id || idx}>
                    {cols.map((c) => {
                      const align = c.align || "left";

                      {
                        /* if (c.id === "serialNo") {
                        return (
                          <StyledTableCell key={c.id} align={align}>
                            <div className="font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-center min-w-[50px]">
                              {item.serialNo || "N/A"}
                            </div>
                          </StyledTableCell>
                        );
                      } */
                      }
                      if (c.id === "serialNo") {
                        return (
                          <StyledTableCell key={c.id} align={align}>
                            {item._id ? (
                              <Link
                                href={`/dept-form/${type}/view/${item._id}`}
                                className="font-semibold text-blue-600 underline cursor-pointer bg-gray-100 px-3 py-1 rounded-full text-center min-w-[50px] block"
                              >
                                {item.serialNo || "N/A"}
                              </Link>
                            ) : (
                              <div className="font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-center min-w-[50px]">
                                {item.serialNo || "N/A"}
                              </div>
                            )}
                          </StyledTableCell>
                        );
                      }

                      if (c.id === "status") {
                        return (
                          <StyledTableCell key={c.id} align={align}>
                            {getStatusChip(item.status || "N/A", overall)}
                          </StyledTableCell>
                        );
                      }

                      if (c.id === "overallStatus") {
                        return (
                          <StyledTableCell key={c.id} align={align}>
                            {getStatusChip(null, overall)}
                          </StyledTableCell>
                        );
                      }

                      if (
                        [
                          "dateOfApproval",
                          "dateOfCompletion",
                          "dateOfAnnouncement",
                          "dateOfSubmission",
                          "expectedCompletion",
                          "completedOn",
                          "dateOfReview",
                          "date",
                        ].includes(c.id)
                      ) {
                        let raw = item[c.id];
                        // expected/completed display rules copied from page 2
                        if (
                          c.id === "expectedCompletion" &&
                          item.status === "Completed"
                        )
                          raw = "";
                        if (
                          c.id === "completedOn" &&
                          item.status !== "Completed"
                        )
                          raw = "";
                        const val = raw
                          ? new Date(raw).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })
                          : raw === ""
                          ? "-"
                          : "N/A";

                        return (
                          <StyledTableCell key={c.id} align={align}>
                            <div className="bg-gray-50 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                              {val}
                            </div>
                          </StyledTableCell>
                        );
                      }

                      if (c.id === "representative") {
                        const name = item.representative?.name || "N/A";
                        return (
                          <StyledTableCell key={c.id} align={align}>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-sm">
                                  {name.charAt(0)}
                                </span>
                              </div>
                              <span className="font-medium text-gray-700">
                                {name}
                              </span>
                            </div>
                          </StyledTableCell>
                        );
                      }

                      return (
                        <StyledTableCell key={c.id} align={align}>
                          <span className="text-gray-700">
                            {item[c.id] ?? "N/A"}
                          </span>
                        </StyledTableCell>
                      );
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
        />
      </div>
    </>
  );
};

export default SummariseDashboard;

// -------------------------------------------------------------------------------------
