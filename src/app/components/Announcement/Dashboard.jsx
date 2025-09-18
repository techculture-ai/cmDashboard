"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const getApiEndpoint = (type) => {
  const endpoints = {
    cmAnnouncement: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/cm`,
    pmAnnouncement: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/pm`,
    schemeCentralGovt: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/central-schemes`,
    schemeStateGovt: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/state-schemes`,
    innovativeProposals: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/innovative-proposals`,
    reviewMeetings: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/review-meetings`,
    newInitiatives: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/new-initiatives`,
    statement: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/statement`,
    cmHelpline: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deptUser/cm-helplines`,
  };
  return endpoints[type] || endpoints["cmAnnouncement"];
};

const Dashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [departmentData, setDepartmentData] = useState([]);
  const [error, setError] = useState(null);
  //   const router = useRouter();

  // Fetch data from all API endpoints
  const statusConfig = {
    cmHelpline: ["Open", "Resolved", "In Progress", "Pending"],
    newInitiatives: [
      "Open",
      "Implemented",
      "In Progress",
      "Planning",
      "On Hold",
    ],
    statement: ["Open", "Published", "In Progress", "Pending"],
    default: ["Open", "Completed", "In Progress", "Pending"],
  };

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiTypes = [
        "cmAnnouncement",
        "pmAnnouncement",
        "schemeCentralGovt",
        "schemeStateGovt",
        "innovativeProposals",
        "reviewMeetings",
        "newInitiatives",
        "statement",
        "cmHelpline",
      ];

      const fetchPromises = apiTypes.map(async (type) => {
        try {
          const response = await fetch(getApiEndpoint(type), {
            credentials: "include", // Ensure cookies are sent
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch ${type}`);
          }

          const data = await response.json();
          return { type, data: data.data || data || [] };
        } catch (error) {
          console.error(`Error fetching ${type}:`, error);
          return { type, data: [] };
        }
      });

      const results = await Promise.all(fetchPromises);

      const departmentMap = new Map();

      results.forEach(({ type, data }) => {
        if (Array.isArray(data)) {
          if (!departmentMap.has(type)) {
            const statuses = statusConfig[type] || statusConfig.default;

            departmentMap.set(type, {
              id: departmentMap.size + 1,
              name: type,
              icon: "📄", // You can customize icons per type if desired
              color: "#3b82f6", // Default color or customize per type
              totalAnnouncements: 0,
              statusData: statuses.map((status) => ({
                status,
                count: 0,
                color:
                  status === "Completed" ||
                  status === "Resolved" ||
                  status === "Implemented" ||
                  status === "Published"
                    ? "#10b981"
                    : status === "In Progress"
                    ? "#f59e0b"
                    : "#ef4444",
              })),
              lastLogin: "N/A",
              users: 0,
              activeUsers: 0,
              recentActivity: "No recent activity",
              apiData: {},
            });
          }
          console.log(
            "Final Processed Status Data:",
            departmentMap.get(type).statusData
          );

          const dept = departmentMap.get(type);
          dept.totalAnnouncements += data.length;

          data.forEach((item) => {
            const normalizedStatus = item.status?.toLowerCase() || "open";
            const statuses = statusConfig[type] || statusConfig.default;

            let matchedStatus = "Open"; // Fallback status
            for (let s of statuses) {
              if (s.toLowerCase() === normalizedStatus) {
                matchedStatus = s;
                break;
              }
            }

            const statusItem = dept.statusData.find(
              (s) => s.status === matchedStatus
            );
            if (statusItem) statusItem.count += 1;

            if (item.lastLogin || item.updatedAt || item.createdAt) {
              const dateStr =
                item.lastLogin || item.updatedAt || item.createdAt;
              dept.lastLogin = new Date(dateStr).toLocaleString();
              dept.recentActivity = item.details || "Updated item";
            }
          });
        }
      });

      const processedData = Array.from(departmentMap.values());
      setDepartmentData(processedData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");
      setDepartmentData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

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

  const handleTileClick = (department) => {
    setSelectedDepartment(department);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDepartment(null);
  };

  const getTotalStats = () => {
    const totalAnnouncements = departmentData.reduce(
      (sum, dept) => sum + dept.totalAnnouncements,
      0
    );
    const totalUsers = departmentData.reduce(
      (sum, dept) => sum + dept.users,
      0
    );
    const totalActiveUsers = departmentData.reduce(
      (sum, dept) => sum + dept.activeUsers,
      0
    );
    const totalCompleted = departmentData.reduce(
      (sum, dept) =>
        sum +
          dept.statusData.find((status) => status.status === "Completed")
            ?.count || 0,
      0
    );

    return { totalAnnouncements, totalUsers, totalActiveUsers, totalCompleted };
  };

  const stats = getTotalStats();

  const DepartmentTile = ({ department }) => {
    const completionRate =
      department.totalAnnouncements > 0
        ? Math.round(
            ((department.statusData.find((s) => s.status === "Completed")
              ?.count || 0) /
              department.totalAnnouncements) *
              100
          )
        : 0;

    return (
      <div
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
        style={{ borderLeft: `4px solid ${department.color}` }}
        onClick={() => handleTileClick(department)}
      >
        <div className="flex justify-between items-start mb-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg"
            style={{ backgroundColor: department.color }}
          >
            {department.icon}
          </div>
          <div
            className="px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{
              backgroundColor:
                completionRate > 70
                  ? "#10b981"
                  : completionRate > 50
                  ? "#f59e0b"
                  : "#ef4444",
            }}
          >
            {completionRate}%
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-gray-900">
          {department.name}
        </h3>

        <div className="flex justify-between items-center mb-4">
          <div>
            <div
              className="text-3xl font-bold mb-1"
              style={{ color: department.color }}
            >
              {department.totalAnnouncements}
            </div>
            <div className="text-sm text-gray-500">Total Announcements</div>
          </div>
          {/* <div className="text-right">
            <div className="text-xl font-bold text-gray-700">
              {department.activeUsers}/{department.users}
            </div>
            <div className="text-sm text-gray-500">Active Users</div>
          </div> */}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${completionRate}%`,
              backgroundColor: department.color,
            }}
          ></div>
        </div>

        <div className="text-sm text-gray-500 truncate">
          Last activity: {department.recentActivity}
        </div>
      </div>
    );
  };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col">
          {/* Scroll only on body, not header/footer */}
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Logout */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Department Dashboard ⚡
          </h1>
          <p className="text-gray-600">
            Monitor and manage all system components efficiently
          </p>
        </div>
        <button
          onClick={fetchAllData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-600 mr-3">⚠️</div>
            <div>
              <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading department data...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 text-center border-l-4 border-blue-500">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.totalAnnouncements}
              </div>
              <div className="text-gray-500 font-medium">
                Total Announcements
              </div>
            </div>

          </div>

          {/* Department Tiles */}
          {departmentData.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No department data found
              </h3>
              <p className="text-gray-500">
                No announcements or activities have been recorded yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentData.map((department) => (
                <DepartmentTile key={department.id} department={department} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Department Details Modal */}
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        {selectedDepartment && (
          <>
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl text-white"
                  style={{ backgroundColor: selectedDepartment.color }}
                >
                  {selectedDepartment.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedDepartment.name}
                  </h2>
                  <p className="text-gray-500">Department Analytics & Status</p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Key Metrics */}
              <div
                className={`grid grid-cols-${selectedDepartment.statusData.length} gap-4 mb-6`}
              >
                {selectedDepartment.statusData.map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg p-4 text-center"
                    style={{
                      backgroundColor:
                        s.status === "Completed" ||
                        s.status === "Resolved" ||
                        s.status === "Implemented" ||
                        s.status === "Published"
                          ? "#ecfdf5"
                          : s.status === "In Progress" ||
                            s.status === "Planning"
                          ? "#fefce8"
                          : "#fef2f2",
                    }}
                  >
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: s.color }}
                    >
                      {s.count}
                    </div>
                    <div className="text-xs text-gray-500">{s.status}</div>
                  </div>
                ))}
              </div>

              <hr className="my-6" />

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Status Distribution
                  </h3>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedDepartment.statusData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="status" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Bar
                          dataKey="count"
                          fill={selectedDepartment.color}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Status Overview
                  </h3>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={selectedDepartment.statusData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="count"
                          nameKey="status"
                        >
                          {selectedDepartment.statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <hr className="my-6" />

              {/* Department Details */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Department Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-2">Last Login</div>
                    <div className="font-semibold text-gray-800">
                      {selectedDepartment.lastLogin}
                    </div>
                  </div>
                  {/* <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-2">
                      User Activity
                    </div>
                    <div className="font-semibold text-gray-800">
                      {selectedDepartment.activeUsers} of{" "}
                      {selectedDepartment.users} active
                    </div>
                  </div> */}
                  <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                    <div className="text-sm text-gray-500 mb-2">
                      Recent Activity
                    </div>
                    <div className="text-gray-800">
                      {selectedDepartment.recentActivity}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
             
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
