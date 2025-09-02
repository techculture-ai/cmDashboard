"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { MdCloudUpload } from "react-icons/md";
import { Button } from "@mui/material";
import { SlCalender } from "react-icons/sl";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DataForms = () => {
  const [selectedTab_, setSelectedTab_] = useState(0);

  const menuTabs = [
    { name: "CM Announcement" },
    { name: " PM Announcement" },
    { name: "Schemes (Central Government)" },
    { name: "Schemes (State Government)" },
    { name: "Reveiw Meetings" },
    { name: " Innovative Proposals" },
    { name: " Session Statement" },
    { name: " CM Helpline" },
  ];

  const SelectedTab = (index) => {
    setSelectedTab_(index);
  };

  return (
    <section className="py-8">
      <div className="container">
        <h1 className="text-[22px] font-bold text-secondary pb-3">
          Monitoring Dashboard
        </h1>

        <hr />

        <div className="flex justify-between gap-5 mt-4">
          <div className="sidebar w-[25%] bg-white rounded-md p-3 flex flex-col gap-2">
            {menuTabs?.length !== 0 &&
              menuTabs?.map((item, index) => {
                return (
                  <Button
                    key={index}
                    className={`gap-3 !w-full !capitalize !text-gray-700 !text-left !justify-start !font-[600] !py-[10px] hover:!bg-gray-200 ${
                      selectedTab_ === index && "!bg-gray-100"
                    }`}
                    onClick={() => SelectedTab(index)}
                  >
                    <span
                      className={` text-white !text-[13px] font-bold flex items-center justify-center w-7 h-7 rounded-full ${
                        selectedTab_ === index ? "!bg-secondary" : "bg-primary"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>{" "}
                    {item?.name}
                  </Button>
                );
              })}
          </div>

          <div className="rightContent w-[75%] bg-white rounded-md p-5">
            {selectedTab_ === 0 && <CMAnnouncement />}

            {selectedTab_ === 2 && <SchemesCentralGovernment />}
            {selectedTab_ === 3 && <SchemesStateGovernment />}

            {selectedTab_ === 1 && <PMAnnouncement />}

            {selectedTab_ === 5 && <InnovativeProposals />}

            {selectedTab_ === 4 && <ReveiwMeetings />}
          </div>
        </div>
      </div>
    </section>
  );
};

const PMAnnouncement = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const [startDate3, setStartDate3] = useState(new Date());

  const [status, setStatus] = useState("");
  const [district, setDistrict] = useState("");
  const [department, setDepartment] = useState("");

  const [serialNo, setSerialNo] = useState("");
  const [announcementNo, setAnnouncementNo] = useState("");
  const [details, setDetails] = useState("");
  const [reason, setReason] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [letterFile, setLetterFile] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);

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
      formData.append("serialNo", serialNo);
      formData.append("announcementNo", announcementNo);
      formData.append("dateOfAnnouncement", startDate.toISOString());
      formData.append("district", district);
      formData.append("details", details);
      formData.append("department", department);
      formData.append("dateOfCompletion", startDate2.toISOString());
      formData.append("status", status);
      if (lastLogin) {
        formData.append("lastLogin", new Date(lastLogin).toISOString());
      }
      if (reason) {
        formData.append("reason", reason);
      }
      if (letterFile) formData.append("letterFile", letterFile);
      if (pictureFile) formData.append("pictureFile", pictureFile);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pm-announcements/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Submission failed");
      }

      const result = await res.json();
      alert("PM Announcement submitted successfully!");
      console.log(result);

      // Optionally reset form state here
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error: " + err.message);
    }
  };

  const departments = [
    "Agriculture Department",
    "Animal Husbandry Department",
    "Budget Department",
    "Cane Development and Sugar Industry Department",
    "Co-operative Department",
    "Uttarakhand Dairy Development Department",
    "Directorate of Departmental Accounts",
    "Directorate of Training & Employment",
    "Disaster Mitigation and Management Centre (DMMC)",
    "Excise Department",
    "Fisheries Department",
    "Food, Civil Supplies & Consumer Affairs Department",
    "Forest Department",
    "Higher Education Department",
    "Information Technology Development Agency (I.T.D.A.)",
    "Information and Public Relation Department",
    "Irrigation Department",
    "Labour Department",
    "Uttarakhand Medical Education Department",
    "Medical Health and Family Welfare Department",
    "Minor Irrigation Department",
    "Panchayati Raj Department",
    "Public Works Department",
    "Renewable Energy Development Agency",
    "Revenue & Board of Revenue Department",
    "Rural Development Department",
    "Rural Works Department",
    "School Education Department",
    "Sericulture Department",
    "Sports Department",
    "Stamps and Registration Department",
    "State Council for Science and Technology",
    "State Horticulture Mission",
    "State Tax Department",
    "State Water & Sanitation Mission",
    "Tourism Department",
    "Town and Country Planning Department",
    "Transport Department",
    "Uttarakhand Jal Sansthan Department",
    "Vigilance Establishment",
    "Uttarakhand",
  ];

  return (
    <form className="mt-0">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">S.No.</span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Enter S.No."
              value={serialNo}
              onChange={(e) => setSerialNo(e.target.value)}
              disabled
            />
          </div>

          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Announcement No.
            </span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Enter Announcement No."
              value={announcementNo}
              onChange={(e) => setAnnouncementNo(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Date of Announcements
            </span>
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <SlCalender
                size={18}
                className="absolute top-[12px] right-3 z-50 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              District
            </span>
            <Select
              value={district}
              onChange={handleChangeDistrict}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value="">
                <em>Select District</em>
              </MenuItem>
              <MenuItem value={"Almora"}>Almora</MenuItem>
              <MenuItem value={"Bageshwar"}>Bageshwar</MenuItem>
              <MenuItem value={"Chamoli"}>Chamoli</MenuItem>
              <MenuItem value={"Champawat"}>Champawat</MenuItem>
              <MenuItem value={"Dehradun"}>Dehradun</MenuItem>
              <MenuItem value={"Haridwar"}>Haridwar</MenuItem>
              <MenuItem value={"Nainital"}>Nainital</MenuItem>
              <MenuItem value={"Pauri Garhwal"}>Pauri Garhwal</MenuItem>
              <MenuItem value={"Pithoragarh"}>Pithoragarh</MenuItem>
              <MenuItem value={"Rudraprayag"}>Rudraprayag</MenuItem>
              <MenuItem value={"Tehri Garhwal"}>Tehri Garhwal</MenuItem>
              <MenuItem value={"Udham Singh Nagar"}>Udham Singh Nagar</MenuItem>
              <MenuItem value={"Udham Singh Nagar"}>Uttarkashi</MenuItem>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">Details</span>
          <textarea
            className="w-full h-[120px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-3 bg-gray-100"
            placeholder="Brief detail about the announcement"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Department
            </span>
            <Select
              value={department}
              onChange={handleChangeDepartment}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value="">
                <em>Select Department</em>
              </MenuItem>

              {departments?.length !== 0 &&
                departments?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Date of Completion
            </span>
            <div className="relative">
              <DatePicker
                selected={startDate2}
                onChange={(date) => setStartDate2(date)}
              />
              <SlCalender
                size={18}
                className="absolute top-[12px] right-3 z-50 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">Status</span>
            <Select
              value={status}
              onChange={handleChangeStatus}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value="">
                <em>Select Status</em>
              </MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"Pending"}>Pending</MenuItem>
            </Select>
          </div>

          {status === "Completed" && (
            <div className="flex flex-col gap-1 completed-status">
              <span className="text-gray-800 font-[500] text-[15px]">
                Date & Time
              </span>
              <div className="relative">
                <DatePicker
                  selected={startDate3}
                  onChange={(date) => setStartDate3(date)}
                />
                <SlCalender
                  size={18}
                  className="absolute top-[12px] right-3 z-50 pointer-events-none"
                />
              </div>
            </div>
          )}
        </div>

        {status === "In Progress" && (
          <>
            <div className="flex flex-col gap-1">
              <span className="text-gray-800 font-[500] text-[15px]">
                Reason for Delay
              </span>
              <textarea
                className="w-full h-[120px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-3 bg-orange-50"
                placeholder="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>

            <div className="flex flex-col gap-1 completed-status">
              <span className="text-gray-800 font-[500] text-[15px]">
                Date & Time
              </span>
              <div className="relative">
                <DatePicker
                  selected={startDate3}
                  onChange={(date) => setStartDate3(date)}
                />
                <SlCalender
                  size={18}
                  className="absolute top-[12px] right-3 z-50 pointer-events-none"
                />
              </div>
            </div>
          </>
        )}

        {status === "Pending" && (
          <>
            <div className="flex flex-col gap-1">
              <span className="text-gray-800 font-[500] text-[15px]">
                Reason for Delay
              </span>
              <textarea
                className="w-full h-[120px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-3 bg-orange-50"
                placeholder="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>

            <div className="flex flex-col gap-1 completed-status">
              <span className="text-gray-800 font-[500] text-[15px]">
                Completion Date & Time
              </span>
              <div className="relative">
                <DatePicker
                  selected={startDate3}
                  onChange={(date) => setStartDate3(date)}
                />
                <SlCalender
                  size={18}
                  className="absolute top-[12px] right-3 z-50 pointer-events-none"
                />
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Uploads (Letter) with Date
            </span>
            <div className="w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200">
              <input
                type="file"
                className="w-full h-full opacity-0 absolute top-0 left-0 z-50"
                onChange={handleLetterUpload}
              />
              <span className="text-[15px] text-gray-800 flex items-center gap-3">
                <MdCloudUpload size={22} /> Upload
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Uploads (Picture) with Date{" "}
            </span>
            <div className="w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200">
              <input
                type="file"
                className="w-full h-full opacity-0 absolute top-0 left-0 z-50"
                onChange={handlePictureUpload}
              />
              <span className="text-[15px] text-gray-800 flex items-center gap-3">
                <MdCloudUpload size={22} /> Upload
              </span>
            </div>
          </div>

          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Last login by the department
            </span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Last login"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 my-4">
        <Button className="btn-custom" onClick={handleSubmit}>
          <span>Submit</span>
        </Button>
        <Button variant="outlined" color="error" className="btn-border">
          <span>Cancel</span>
        </Button>
      </div>
    </form>
  );
};

const CMAnnouncement = () => {

    const { id } = useParams();
    const router = useRouter();

  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const [startDate3, setStartDate3] = useState(new Date());

  const [status, setStatus] = useState("");
  const [district, setDistrict] = useState("");
  const [department, setDepartment] = useState("");

  const [sNo, setSNo] = useState("");
  const [announcementNo, setAnnouncementNo] = useState("");
  const [details, setDetails] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [reason, setReason] = useState("");
  const [letterFile, setLetterFile] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);

   const [departments, setDepartments] = useState([]);

  const fetchCMAnnouncementData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cm-announcements/${id}`
      );
      const result = await res.json();

      if (result.success) {
        const data = result.data;
        setSNo(data.serialNo || "");
        setAnnouncementNo(data.announcementNo || "");
        setStartDate(new Date(data.dateOfAnnouncement));
        setDistrict(data.district || "");
        setDetails(data.details || "");
        setDepartment(data.department || "");
        setStartDate2(new Date(data.dateOfCompletion));
        setStatus(data.status || "");
        setLastLogin(data.lastLogin || "");
        setReason(data.reason || "");
        setLetterFile(data.letterUpload || null);
        setPictureFile(data.pictureUpload || null);
      } else {
        toast.error("Failed to load announcement");
      }
    } catch (error) {
      console.error("Error loading:", error);
      toast.error("Error loading data");
    } finally {
      setLoading(false);
    }
  };


    const fetchDepartments = async () => {
      try {
        const urls = [
          "http://localhost:5000/api/departments/govt/",
          "http://localhost:5000/api/departments/public/",
          "http://localhost:5000/api/departments/aided/",
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
        if (id) {
          fetchCMAnnouncementData();
        }
        fetchDepartments();
      }, [id]);

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
            if (lastLogin) {
              formData.append("lastLogin", new Date(lastLogin).toISOString());
            }
            if (reason) {
              formData.append("reason", reason);
            }
            if (startDate3) {
              formData.append(
                "expectedCompletionDate",
                startDate3.toISOString()
              );
            }
            if (letterFile) formData.append("letterFile", letterFile);
            if (pictureFile) formData.append("pictureFile", pictureFile);

            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/cm-announcements/${id}`,
              {
                method: "PUT",
                body: formData,
              }
            );

            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || "Failed to submit");
            }

            const result = await res.json();
            toast.success("Announcement updated successfully!");
            router.push("/data-forms");
          } catch (err) {
            console.error("Submit error:", err);
            toast.error("Submission failed: " + err.message);
          }
        };


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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData();
  //     formData.append("serialNo", sNo); // ✅ Match schema
  //     formData.append("announcementNo", announcementNo);
  //     formData.append("dateOfAnnouncement", startDate.toISOString());
  //     formData.append("district", district);
  //     formData.append("details", details);
  //     formData.append("department", department);
  //     formData.append("dateOfCompletion", startDate2.toISOString());
  //     formData.append("status", status);
  //     if (lastLogin) {
  //       formData.append("lastLogin", new Date(lastLogin).toISOString());
  //     }

  //     if (letterFile) formData.append("letterFile", letterFile); // Must be mapped to 'letterUpload'
  //     if (pictureFile) formData.append("pictureFile", pictureFile); // Must be mapped to 'pictureUpload'

  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cm-announcements/`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       throw new Error(errorData.message || "Failed to submit");
  //     }

  //     const result = await res.json();
  //     alert("Announcement submitted successfully!");
  //     console.log(result);

  //     // Optionally reset form here
  //   } catch (err) {
  //     console.error("Submit error:", err);
  //     alert("Submission failed: " + err.message);
  //   }
  // };

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

  return (
    <form className="mt-0">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">S.No.</span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Enter S.No."
              value={sNo}
              onChange={(e) => setSNo(e.target.value)}
              disabled
            />
          </div>

          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Announcement No. (migrated from Portal)
            </span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Enter Announcement No."
              value={announcementNo}
              onChange={(e) => setAnnouncementNo(e.target.value)}
              disabled
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Date of Announcements
            </span>
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                disabled
              />
              <SlCalender
                size={18}
                className="absolute top-[12px] right-3 z-50 pointer-events-none"
                disabled
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              District
            </span>
            <Select
              value={district}
              onChange={handleChangeDistrict}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
              disabled
            >
              <MenuItem value="">
                <em>Select District</em>
              </MenuItem>
              <MenuItem value={"Almora"}>Almora</MenuItem>
              <MenuItem value={"Bageshwar"}>Bageshwar</MenuItem>
              <MenuItem value={"Chamoli"}>Chamoli</MenuItem>
              <MenuItem value={"Champawat"}>Champawat</MenuItem>
              <MenuItem value={"Dehradun"}>Dehradun</MenuItem>
              <MenuItem value={"Haridwar"}>Haridwar</MenuItem>
              <MenuItem value={"Nainital"}>Nainital</MenuItem>
              <MenuItem value={"Pauri Garhwal"}>Pauri Garhwal</MenuItem>
              <MenuItem value={"Pithoragarh"}>Pithoragarh</MenuItem>
              <MenuItem value={"Rudraprayag"}>Rudraprayag</MenuItem>
              <MenuItem value={"Tehri Garhwal"}>Tehri Garhwal</MenuItem>
              <MenuItem value={"Udham Singh Nagar"}>Udham Singh Nagar</MenuItem>
              <MenuItem value={"Udham Singh Nagar"}>Uttarkashi</MenuItem>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">Details</span>
          <textarea
            className="w-full h-[120px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-3 bg-gray-100"
            placeholder="Brief detail about the announcement"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            disabled
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Department
            </span>
            <Select
              value={department}
              onChange={handleChangeDepartment}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
              disabled
            >
              <MenuItem value="">
                <em>Select Department</em>
              </MenuItem>

              {departments?.length !== 0 &&
                departments?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Date of Completion
            </span>
            <div className="relative">
              <DatePicker
                selected={startDate2}
                onChange={(date) => setStartDate2(date)}
                disabled
              />
              <SlCalender
                size={18}
                className="absolute top-[12px] right-3 z-50 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">Status</span>
            <Select
              value={status}
              onChange={handleChangeStatus}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value="">
                <em>Select Status</em>
              </MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"Pending"}>Pending</MenuItem>
            </Select>
          </div>

          {status === "Completed" && (
            <div className="flex flex-col gap-1 completed-status">
              <span className="text-gray-800 font-[500] text-[15px]">
                Date & Time
              </span>
              <div className="relative">
                <DatePicker
                  selected={startDate3}
                  onChange={(date) => setStartDate3(date)}
                  disabled
                />
                <SlCalender
                  size={18}
                  className="absolute top-[12px] right-3 z-50 pointer-events-none"
                />
              </div>
            </div>
          )}
        </div>

        {status === "In Progress" && (
          <>
            <div className="flex flex-col gap-1">
              <span className="text-gray-800 font-[500] text-[15px]">
                Reason for Delay
              </span>
              <textarea
                className="w-full h-[120px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-3 bg-orange-50"
                placeholder="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>

            <div className="flex flex-col gap-1 completed-status">
              <span className="text-gray-800 font-[500] text-[15px]">
                Completion Date & Time
              </span>
              <div className="relative">
                <DatePicker
                  selected={startDate3}
                  onChange={(date) => setStartDate3(date)}
                  disabled
                />
                <SlCalender
                  size={18}
                  className="absolute top-[12px] right-3 z-50 pointer-events-none"
                />
              </div>
            </div>
          </>
        )}

        {status === "Pending" && (
          <>
            <div className="flex flex-col gap-1">
              <span className="text-gray-800 font-[500] text-[15px]">
                Reason for Delay
              </span>
              <textarea
                className="w-full h-[120px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-3 bg-orange-50"
                placeholder="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>

            <div className="flex flex-col gap-1 completed-status">
              <span className="text-gray-800 font-[500] text-[15px]">
                Completion Date & Time
              </span>
              <div className="relative">
                <DatePicker
                  selected={startDate3}
                  onChange={(date) => setStartDate3(date)}
                />
                <SlCalender
                  size={18}
                  className="absolute top-[12px] right-3 z-50 pointer-events-none"
                />
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Uploads (Letter) with Date
            </span>
            <div className="w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200">
              <input
                type="file"
                className="w-full h-full opacity-0 absolute top-0 left-0 z-50"
                onChange={handleLetterUpload}
              />
              <span className="text-[15px] text-gray-800 flex items-center gap-3">
                <MdCloudUpload size={22} /> Upload
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Uploads (Picture) with Date{" "}
            </span>
            <div className="w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200">
              <input
                type="file"
                className="w-full h-full opacity-0 absolute top-0 left-0 z-50"
                onChange={handlePictureUpload}
              />
              <span className="text-[15px] text-gray-800 flex items-center gap-3">
                <MdCloudUpload size={22} /> Upload
              </span>
            </div>
          </div>

          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Last login by the department
            </span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Last login"
              value={lastLogin}
              onChange={(e) => setLastLogin(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 my-4">
        <Button className="btn-custom" onClick={handleSubmit}>
          <span>Submit</span>
        </Button>
        <Button variant="outlined" color="error" className="btn-border">
          <span>Cancel</span>
        </Button>
      </div>
    </form>
  );
};

const SchemesCentralGovernment = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());

  const [status, setStatus] = useState("");
  const [district, setDistrict] = useState("");
  const [department, setDepartment] = useState("");

  const [sNo, setSNo] = useState("");
  const [details, setDetails] = useState("");
  const [beneficiaries, setBeneficiaries] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [letterFile, setLetterFile] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);

  const handleChangeDistrict = (event) => {
    setDistrict(event.target.value);
  };

  const handleChangeDepartment = (event) => {
    setDepartment(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("serialNo", sNo);
    formData.append("dateOfApproval", startDate.toISOString());
    formData.append("dateOfCompletion", startDate2.toISOString());
    formData.append("district", district);
    formData.append("department", department);
    formData.append("details", details);
    formData.append("numberOfBeneficiaries", beneficiaries);
    formData.append("status", status);
    formData.append("lastLogin", lastLogin);

    if (letterFile) {
      formData.append("letterFile", letterFile);
    }

    if (pictureFile) {
      formData.append("pictureFile", pictureFile);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/central-govt-schemes`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Submission failed");
      }

      const result = await res.json();
      alert("Scheme submitted successfully!");
      console.log(result);

      // Optional: Reset form state
      setSNo("");
      setStartDate(new Date());
      setStartDate2(new Date());
      setDistrict("");
      setDepartment("");
      setDetails("");
      setBeneficiaries("");
      setStatus("");
      setLastLogin("");
      setLetterFile(null);
      setPictureFile(null);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Submission failed: " + error.message);
    }
  };

  const departments = [
    "Agriculture Department",
    "Animal Husbandry Department",
    "Budget Department",
    "Cane Development and Sugar Industry Department",
    "Co-operative Department",
    "Uttarakhand Dairy Development Department",
    "Directorate of Departmental Accounts",
    "Directorate of Training & Employment",
    "Disaster Mitigation and Management Centre (DMMC)",
    "Excise Department",
    "Fisheries Department",
    "Food, Civil Supplies & Consumer Affairs Department",
    "Forest Department",
    "Higher Education Department",
    "Information Technology Development Agency (I.T.D.A.)",
    "Information and Public Relation Department",
    "Irrigation Department",
    "Labour Department",
    "Uttarakhand Medical Education Department",
    "Medical Health and Family Welfare Department",
    "Minor Irrigation Department",
    "Panchayati Raj Department",
    "Public Works Department",
    "Renewable Energy Development Agency",
    "Revenue & Board of Revenue Department",
    "Rural Development Department",
    "Rural Works Department",
    "School Education Department",
    "Sericulture Department",
    "Sports Department",
    "Stamps and Registration Department",
    "State Council for Science and Technology",
    "State Horticulture Mission",
    "State Tax Department",
    "State Water & Sanitation Mission",
    "Tourism Department",
    "Town and Country Planning Department",
    "Transport Department",
    "Uttarakhand Jal Sansthan Department",
    "Vigilance Establishment",
    "Uttarakhand",
  ];

  return (
    <form className="mt-0">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">S.No.</span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Enter S.No."
              value={sNo}
              onChange={(e) => setSNo(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Date of Approval
            </span>
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <SlCalender
                size={18}
                className="absolute top-[12px] right-3 z-50 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Date of Completion
            </span>
            <div className="relative">
              <DatePicker
                selected={startDate2}
                onChange={(date) => setStartDate2(date)}
              />
              <SlCalender
                size={18}
                className="absolute top-[12px] right-3 z-50 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              District
            </span>
            <Select
              value={district}
              onChange={handleChangeDistrict}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value="">
                <em>Select District</em>
              </MenuItem>
              <MenuItem value={"Almora"}>Almora</MenuItem>
              <MenuItem value={"Bageshwar"}>Bageshwar</MenuItem>
              <MenuItem value={"Chamoli"}>Chamoli</MenuItem>
              <MenuItem value={"Champawat"}>Champawat</MenuItem>
              <MenuItem value={"Dehradun"}>Dehradun</MenuItem>
              <MenuItem value={"Haridwar"}>Haridwar</MenuItem>
              <MenuItem value={"Nainital"}>Nainital</MenuItem>
              <MenuItem value={"Pauri Garhwal"}>Pauri Garhwal</MenuItem>
              <MenuItem value={"Pithoragarh"}>Pithoragarh</MenuItem>
              <MenuItem value={"Rudraprayag"}>Rudraprayag</MenuItem>
              <MenuItem value={"Tehri Garhwal"}>Tehri Garhwal</MenuItem>
              <MenuItem value={"Udham Singh Nagar"}>Udham Singh Nagar</MenuItem>
              <MenuItem value={"Udham Singh Nagar"}>Uttarkashi</MenuItem>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">Details</span>
          <textarea
            className="w-full h-[120px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-3 bg-gray-100"
            placeholder="Brief detail about the announcement"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Department
            </span>
            <Select
              value={department}
              onChange={handleChangeDepartment}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value="">
                <em>Select Department</em>
              </MenuItem>

              {departments?.length !== 0 &&
                departments?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Date of Completion
            </span>
            <div className="relative">
              <DatePicker
                selected={startDate2}
                onChange={(date) => setStartDate2(date)}
              />
              <SlCalender
                size={18}
                className="absolute top-[12px] right-3 z-50 pointer-events-none"
              />
            </div>
          </div>

          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              No. of Beneficiaries under the Scheme
            </span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Enter Number"
              value={beneficiaries}
              onChange={(e) => setBeneficiaries(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">Status</span>
            <Select
              value={status}
              onChange={handleChangeStatus}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value="">
                <em>Select Status</em>
              </MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"Pending"}>Pending</MenuItem>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Uploads (Letter) with Date
            </span>
            <div className="w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200">
              <input
                type="file"
                className="w-full h-full opacity-0 absolute top-0 left-0 z-50"
                onChange={(e) => setLetterFile(e.target.value)}
              />
              <span className="text-[15px] text-gray-800 flex items-center gap-3">
                <MdCloudUpload size={22} /> Upload
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Uploads (Picture) with Date{" "}
            </span>
            <div className="w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200">
              <input
                type="file"
                className="w-full h-full opacity-0 absolute top-0 left-0 z-50"
                onChange={(e) => setPictureFile(e.target.value)}
              />
              <span className="text-[15px] text-gray-800 flex items-center gap-3">
                <MdCloudUpload size={22} /> Upload
              </span>
            </div>
          </div>

          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Last login by the department
            </span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Last login"
              value={lastLogin}
              onChange={(e) => setLastLogin(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 my-4">
        <Button className="btn-custom" onClick={handleSubmit}>
          <span>Submit</span>
        </Button>
        <Button variant="outlined" color="error" className="btn-border">
          <span>Cancel</span>
        </Button>
      </div>
    </form>
  );
};

const SchemesStateGovernment = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());

  const [status, setStatus] = useState("");
  const [district, setDistrict] = useState("");
  const [department, setDepartment] = useState("");

  const [sNo, setSNo] = useState("");
  const [details, setDetails] = useState("");
  const [beneficiaries, setBeneficiaries] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [letterFile, setLetterFile] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);

  const handleChangeDistrict = (event) => {
    setDistrict(event.target.value);
  };

  const handleChangeDepartment = (event) => {
    setDepartment(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("serialNo", sNo);
    formData.append("dateOfApproval", startDate.toISOString());
    formData.append("dateOfCompletion", startDate2.toISOString());
    formData.append("district", district);
    formData.append("department", department);
    formData.append("details", details);
    formData.append("numberOfBeneficiaries", beneficiaries);
    formData.append("status", status);
    formData.append("lastLogin", lastLogin);

    if (letterFile) {
      formData.append("letterFile", letterFile);
    }

    if (pictureFile) {
      formData.append("pictureFile", pictureFile);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/state-govt-schemes`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Submission failed");
      }

      const result = await res.json();
      alert("Scheme submitted successfully!");
      console.log(result);

      // Optional: Reset form state
      setSNo("");
      setStartDate(new Date());
      setStartDate2(new Date());
      setDistrict("");
      setDepartment("");
      setDetails("");
      setBeneficiaries("");
      setStatus("");
      setLastLogin("");
      setLetterFile(null);
      setPictureFile(null);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Submission failed: " + error.message);
    }
  };

  const departments = [
    "Agriculture Department",
    "Animal Husbandry Department",
    "Budget Department",
    "Cane Development and Sugar Industry Department",
    "Co-operative Department",
    "Uttarakhand Dairy Development Department",
    "Directorate of Departmental Accounts",
    "Directorate of Training & Employment",
    "Disaster Mitigation and Management Centre (DMMC)",
    "Excise Department",
    "Fisheries Department",
    "Food, Civil Supplies & Consumer Affairs Department",
    "Forest Department",
    "Higher Education Department",
    "Information Technology Development Agency (I.T.D.A.)",
    "Information and Public Relation Department",
    "Irrigation Department",
    "Labour Department",
    "Uttarakhand Medical Education Department",
    "Medical Health and Family Welfare Department",
    "Minor Irrigation Department",
    "Panchayati Raj Department",
    "Public Works Department",
    "Renewable Energy Development Agency",
    "Revenue & Board of Revenue Department",
    "Rural Development Department",
    "Rural Works Department",
    "School Education Department",
    "Sericulture Department",
    "Sports Department",
    "Stamps and Registration Department",
    "State Council for Science and Technology",
    "State Horticulture Mission",
    "State Tax Department",
    "State Water & Sanitation Mission",
    "Tourism Department",
    "Town and Country Planning Department",
    "Transport Department",
    "Uttarakhand Jal Sansthan Department",
    "Vigilance Establishment",
    "Uttarakhand",
  ];

  return (
    <form className="mt-0">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">S.No.</span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Enter S.No."
              value={sNo}
              onChange={(e) => setSNo(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Date of Approval
            </span>
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <SlCalender
                size={18}
                className="absolute top-[12px] right-3 z-50 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Date of Completion
            </span>
            <div className="relative">
              <DatePicker
                selected={startDate2}
                onChange={(date) => setStartDate2(date)}
              />
              <SlCalender
                size={18}
                className="absolute top-[12px] right-3 z-50 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              District
            </span>
            <Select
              value={district}
              onChange={handleChangeDistrict}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value="">
                <em>Select District</em>
              </MenuItem>
              <MenuItem value={"Almora"}>Almora</MenuItem>
              <MenuItem value={"Bageshwar"}>Bageshwar</MenuItem>
              <MenuItem value={"Chamoli"}>Chamoli</MenuItem>
              <MenuItem value={"Champawat"}>Champawat</MenuItem>
              <MenuItem value={"Dehradun"}>Dehradun</MenuItem>
              <MenuItem value={"Haridwar"}>Haridwar</MenuItem>
              <MenuItem value={"Nainital"}>Nainital</MenuItem>
              <MenuItem value={"Pauri Garhwal"}>Pauri Garhwal</MenuItem>
              <MenuItem value={"Pithoragarh"}>Pithoragarh</MenuItem>
              <MenuItem value={"Rudraprayag"}>Rudraprayag</MenuItem>
              <MenuItem value={"Tehri Garhwal"}>Tehri Garhwal</MenuItem>
              <MenuItem value={"Udham Singh Nagar"}>Udham Singh Nagar</MenuItem>
              <MenuItem value={"Udham Singh Nagar"}>Uttarkashi</MenuItem>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">Details</span>
          <textarea
            className="w-full h-[120px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-3 bg-gray-100"
            placeholder="Brief detail about the announcement"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Department
            </span>
            <Select
              value={department}
              onChange={handleChangeDepartment}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value="">
                <em>Select Department</em>
              </MenuItem>

              {departments?.length !== 0 &&
                departments?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Date of Completion
            </span>
            <div className="relative">
              <DatePicker
                selected={startDate2}
                onChange={(date) => setStartDate2(date)}
              />
              <SlCalender
                size={18}
                className="absolute top-[12px] right-3 z-50 pointer-events-none"
              />
            </div>
          </div>

          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              No. of Beneficiaries under the Scheme
            </span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Enter Number"
              value={beneficiaries}
              onChange={(e) => setBeneficiaries(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">Status</span>
            <Select
              value={status}
              onChange={handleChangeStatus}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value="">
                <em>Select Status</em>
              </MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"Pending"}>Pending</MenuItem>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Uploads (Letter) with Date
            </span>
            <div className="w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200">
              <input
                type="file"
                className="w-full h-full opacity-0 absolute top-0 left-0 z-50"
                onChange={(e) => setLetterFile(e.target.value)}
              />
              <span className="text-[15px] text-gray-800 flex items-center gap-3">
                <MdCloudUpload size={22} /> Upload
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Uploads (Picture) with Date{" "}
            </span>
            <div className="w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200">
              <input
                type="file"
                className="w-full h-full opacity-0 absolute top-0 left-0 z-50"
                onChange={(e) => setPictureFile(e.target.value)}
              />
              <span className="text-[15px] text-gray-800 flex items-center gap-3">
                <MdCloudUpload size={22} /> Upload
              </span>
            </div>
          </div>

          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Last login by the department
            </span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Last login"
              value={lastLogin}
              onChange={(e) => setLastLogin(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 my-4">
        <Button className="btn-custom" onClick={handleSubmit}>
          <span>Submit</span>
        </Button>
        <Button variant="outlined" color="error" className="btn-border">
          <span>Cancel</span>
        </Button>
      </div>
    </form>
  );
};

const InnovativeProposals = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());

  const [status, setStatus] = useState("");
  const [district, setDistrict] = useState("");
  const [department, setDepartment] = useState("");

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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/innovative-proposals`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Submission failed");
      }

      alert("Innovative Proposal submitted successfully!");
    } catch (err) {
      alert("Error: " + err.message);
      console.error(err);
    }
  };

  const departments = [
    "Agriculture Department",
    "Animal Husbandry Department",
    "Budget Department",
    "Cane Development and Sugar Industry Department",
    "Co-operative Department",
    "Uttarakhand Dairy Development Department",
    "Directorate of Departmental Accounts",
    "Directorate of Training & Employment",
    "Disaster Mitigation and Management Centre (DMMC)",
    "Excise Department",
    "Fisheries Department",
    "Food, Civil Supplies & Consumer Affairs Department",
    "Forest Department",
    "Higher Education Department",
    "Information Technology Development Agency (I.T.D.A.)",
    "Information and Public Relation Department",
    "Irrigation Department",
    "Labour Department",
    "Uttarakhand Medical Education Department",
    "Medical Health and Family Welfare Department",
    "Minor Irrigation Department",
    "Panchayati Raj Department",
    "Public Works Department",
    "Renewable Energy Development Agency",
    "Revenue & Board of Revenue Department",
    "Rural Development Department",
    "Rural Works Department",
    "School Education Department",
    "Sericulture Department",
    "Sports Department",
    "Stamps and Registration Department",
    "State Council for Science and Technology",
    "State Horticulture Mission",
    "State Tax Department",
    "State Water & Sanitation Mission",
    "Tourism Department",
    "Town and Country Planning Department",
    "Transport Department",
    "Uttarakhand Jal Sansthan Department",
    "Vigilance Establishment",
    "Uttarakhand",
  ];

  return (
    <form className="mt-0">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">S.No.</span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Enter S.No."
              value={serialNo}
              onChange={(e) => setSerialNo(e.target.value)}
            />
          </div>

          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Name of Institutions/Individual/Company
            </span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Enter the Name"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Date of Submission
            </span>
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <SlCalender
                size={18}
                className="absolute top-[12px] right-3 z-50 pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div className="py-3 pb-0">
          <h4 className="text-[15px] font-[600] text-gray-700">
            Name of the Representative with Contact
          </h4>

          <div className="grid grid-cols-2 gap-4 my-3">
            <div className="form-group flex flex-col gap-1">
              <span className="text-gray-800 font-[500] text-[15px]">Name</span>
              <input
                type="text"
                className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
                placeholder="Enter Name"
                value={repName}
                onChange={(e) => setRepName(e.target.value)}
              />
            </div>

            <div className="form-group flex flex-col gap-1">
              <span className="text-gray-800 font-[500] text-[15px]">
                Contact
              </span>
              <input
                type="text"
                className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
                placeholder="Enter Contact"
                value={repContact}
                onChange={(e) => setRepContact(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">District</span>
          <Select
            value={district}
            onChange={handleChangeDistrict}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            size="small"
          >
            <MenuItem value="">
              <em>Select District</em>
            </MenuItem>
            <MenuItem value={"Almora"}>Almora</MenuItem>
            <MenuItem value={"Bageshwar"}>Bageshwar</MenuItem>
            <MenuItem value={"Chamoli"}>Chamoli</MenuItem>
            <MenuItem value={"Champawat"}>Champawat</MenuItem>
            <MenuItem value={"Dehradun"}>Dehradun</MenuItem>
            <MenuItem value={"Haridwar"}>Haridwar</MenuItem>
            <MenuItem value={"Nainital"}>Nainital</MenuItem>
            <MenuItem value={"Pauri Garhwal"}>Pauri Garhwal</MenuItem>
            <MenuItem value={"Pithoragarh"}>Pithoragarh</MenuItem>
            <MenuItem value={"Rudraprayag"}>Rudraprayag</MenuItem>
            <MenuItem value={"Tehri Garhwal"}>Tehri Garhwal</MenuItem>
            <MenuItem value={"Udham Singh Nagar"}>Udham Singh Nagar</MenuItem>
            <MenuItem value={"Udham Singh Nagar"}>Uttarkashi</MenuItem>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">Details</span>
          <textarea
            className="w-full h-[120px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-3 bg-gray-100"
            placeholder="Brief detail about the announcement"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Department the proposal was submitted
            </span>
            <Select
              value={department}
              onChange={handleChangeDepartment}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value="">
                <em>Select Department</em>
              </MenuItem>

              {departments?.length !== 0 &&
                departments?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Officer the proposal was submitted
            </span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Name of the Nodal Officer"
              value={nodalOfficer}
              onChange={(e) => setNodalOfficer(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Action taken by the Department
            </span>
            <textarea
              className="w-full h-[120px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-3 bg-gray-100"
              placeholder="Brief Description about the action taken further innovative idea"
              value={actionTaken}
              onChange={(e) => setActionTaken(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 my-5">
        <div className="flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">Status</span>
          <Select
            value={status}
            onChange={handleChangeStatus}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            size="small"
          >
            <MenuItem value="">
              <em>Select Status</em>
            </MenuItem>
            <MenuItem value={"Completed"}>Completed</MenuItem>
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Pending"}>Pending</MenuItem>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">
            Uploads (Letter) with Date
          </span>
          <div className="w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200">
            <input
              type="file"
              className="w-full h-full opacity-0 absolute top-0 left-0 z-50"
              onChange={handleLetterUpload}
            />
            <span className="text-[15px] text-gray-800 flex items-center gap-3">
              <MdCloudUpload size={22} /> Upload
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">
            Uploads (Picture) with Date{" "}
          </span>
          <div className="w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200">
            <input
              type="file"
              className="w-full h-full opacity-0 absolute top-0 left-0 z-50"
              onChange={handlePictureUpload}
            />
            <span className="text-[15px] text-gray-800 flex items-center gap-3">
              <MdCloudUpload size={22} /> Upload
            </span>
          </div>
        </div>

        <div className="form-group flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">
            Last login by the department
          </span>
          <input
            type="text"
            className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
            placeholder="Last login"
            value={lastLogin}
            onChange={(e) => setLastLogin(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 my-4">
        <Button className="btn-custom" onClick={handleSubmit}>
          <span>Submit</span>
        </Button>
        <Button variant="outlined" color="error" className="btn-border">
          <span>Cancel</span>
        </Button>
      </div>
    </form>
  );
};

const ReveiwMeetings = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());

  const [status, setStatus] = useState("");
  const [district, setDistrict] = useState("");
  const [department, setDepartment] = useState("");

  const [serialNo, setSerialNo] = useState("");
  const [subject, setSubject] = useState("");
  const [keyTakeaways, setKeyTakeaways] = useState("");
  const [details, setDetails] = useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [momFile, setMomFile] = useState(null);
  const [letterFile, setLetterFile] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);

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
  const handleMonUpload = (e) => setMomFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("serialNo", serialNo);
      formData.append("subject", subject);
      formData.append("department", department);
      formData.append("dateOfReview", startDate.toISOString());
      formData.append("keyTakeAways", keyTakeaways);
      formData.append("district", district);
      formData.append("details", details);
      formData.append("dateOfMoMRelease", startDate2.toISOString());
      formData.append("actionTaken", actionTaken);

      if (lastLogin) {
        formData.append("lastLogin", new Date(lastLogin).toISOString());
      }
      if (momFile) {
        formData.append("momFile", momFile);
      }
      if (letterFile) {
        formData.append("letterFile", letterFile);
      }
      if (pictureFile) {
        formData.append("pictureFile", pictureFile);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/review-meetings`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Submission failed");
      }

      alert("Review Meeting submitted successfully!");
    } catch (err) {
      alert("Error: " + err.message);
      console.error(err);
    }
  };

  const departments = [
    "Agriculture Department",
    "Animal Husbandry Department",
    "Budget Department",
    "Cane Development and Sugar Industry Department",
    "Co-operative Department",
    "Uttarakhand Dairy Development Department",
    "Directorate of Departmental Accounts",
    "Directorate of Training & Employment",
    "Disaster Mitigation and Management Centre (DMMC)",
    "Excise Department",
    "Fisheries Department",
    "Food, Civil Supplies & Consumer Affairs Department",
    "Forest Department",
    "Higher Education Department",
    "Information Technology Development Agency (I.T.D.A.)",
    "Information and Public Relation Department",
    "Irrigation Department",
    "Labour Department",
    "Uttarakhand Medical Education Department",
    "Medical Health and Family Welfare Department",
    "Minor Irrigation Department",
    "Panchayati Raj Department",
    "Public Works Department",
    "Renewable Energy Development Agency",
    "Revenue & Board of Revenue Department",
    "Rural Development Department",
    "Rural Works Department",
    "School Education Department",
    "Sericulture Department",
    "Sports Department",
    "Stamps and Registration Department",
    "State Council for Science and Technology",
    "State Horticulture Mission",
    "State Tax Department",
    "State Water & Sanitation Mission",
    "Tourism Department",
    "Town and Country Planning Department",
    "Transport Department",
    "Uttarakhand Jal Sansthan Department",
    "Vigilance Establishment",
    "Uttarakhand",
  ];

  return (
    <form className="mt-0">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">S.No.</span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Enter S.No."
              value={serialNo}
              onChange={(e) => setSerialNo(e.target.value)}
            />
          </div>

          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Subject
            </span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Please Enter the Agenda of the Meeting"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Department
            </span>
            <Select
              value={department}
              onChange={handleChangeDepartment}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value="">
                <em>Select Department</em>
              </MenuItem>

              {departments?.length !== 0 &&
                departments?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Date of review
            </span>
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <SlCalender
                size={18}
                className="absolute top-[12px] right-3 z-50 pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              Key Take Aways of Meeting
            </span>
            <input
              type="text"
              className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
              placeholder="Please enter the direction given /decisions taken in the meeting"
              value={keyTakeaways}
              onChange={(e) => setKeyTakeaways(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-800 font-[500] text-[15px]">
              District
            </span>
            <Select
              value={district}
              onChange={handleChangeDistrict}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value="">
                <em>Select District</em>
              </MenuItem>
              <MenuItem value={"Almora"}>Almora</MenuItem>
              <MenuItem value={"Bageshwar"}>Bageshwar</MenuItem>
              <MenuItem value={"Chamoli"}>Chamoli</MenuItem>
              <MenuItem value={"Champawat"}>Champawat</MenuItem>
              <MenuItem value={"Dehradun"}>Dehradun</MenuItem>
              <MenuItem value={"Haridwar"}>Haridwar</MenuItem>
              <MenuItem value={"Nainital"}>Nainital</MenuItem>
              <MenuItem value={"Pauri Garhwal"}>Pauri Garhwal</MenuItem>
              <MenuItem value={"Pithoragarh"}>Pithoragarh</MenuItem>
              <MenuItem value={"Rudraprayag"}>Rudraprayag</MenuItem>
              <MenuItem value={"Tehri Garhwal"}>Tehri Garhwal</MenuItem>
              <MenuItem value={"Udham Singh Nagar"}>Udham Singh Nagar</MenuItem>
              <MenuItem value={"Udham Singh Nagar"}>Uttarkashi</MenuItem>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">Details</span>
          <textarea
            className="w-full h-[120px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-3 bg-gray-100"
            placeholder="Brief detail about the announcement"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 my-5">
        <div className="flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">
            Date of MoM released{" "}
          </span>
          <div className="relative">
            <DatePicker
              selected={startDate2}
              onChange={(date) => setStartDate2(date)}
            />
            <SlCalender
              size={18}
              className="absolute top-[12px] right-3 z-50 pointer-events-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">
            Upload MoM with Date{" "}
          </span>
          <div className="w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200">
            <input
              type="file"
              className="w-full h-full opacity-0 absolute top-0 left-0 z-50"
              onChange={handleMonUpload}
            />
            <span className="text-[15px] text-gray-800 flex items-center gap-3">
              <MdCloudUpload size={22} /> Upload
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-800 font-[500] text-[15px]">
          Action taken by the Department
        </span>
        <textarea
          className="w-full h-[120px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-3 bg-gray-100"
          placeholder="Brief Description with the Status"
          value={actionTaken}
          onChange={(e) => setActionTaken(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 my-5">
        <div className="flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">
            Uploads (Letter) with Date
          </span>
          <div className="w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200">
            <input
              type="file"
              className="w-full h-full opacity-0 absolute top-0 left-0 z-50"
              onChange={handleLetterUpload}
            />
            <span className="text-[15px] text-gray-800 flex items-center gap-3">
              <MdCloudUpload size={22} /> Upload
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">
            {" "}
            Uploads (Picture with geotagging) with Date{" "}
          </span>
          <div className="w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200">
            <input
              type="file"
              className="w-full h-full opacity-0 absolute top-0 left-0 z-50"
              onChange={handlePictureUpload}
            />
            <span className="text-[15px] text-gray-800 flex items-center gap-3">
              <MdCloudUpload size={22} /> Upload
            </span>
          </div>
        </div>

        <div className="form-group flex flex-col gap-1">
          <span className="text-gray-800 font-[500] text-[15px]">
            Last login by the department
          </span>
          <input
            type="text"
            className="w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100"
            placeholder="Last login"
            value={lastLogin}
            onChange={(e) => setLastLogin(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 my-4">
        <Button className="btn-custom" onClick={handleSubmit}>
          <span>Submit</span>
        </Button>
        <Button variant="outlined" color="error" className="btn-border">
          <span>Cancel</span>
        </Button>
      </div>
    </form>
  );
};

export default DataForms;
