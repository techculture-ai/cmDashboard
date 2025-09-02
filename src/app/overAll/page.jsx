"use client"
import React, { useState } from 'react'
import { GoShieldCheck } from "react-icons/go";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Button } from '@mui/material';
import { IoSearch } from "react-icons/io5";

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MdOutlinePentagon } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { CiBullhorn } from "react-icons/ci";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SlCalender } from "react-icons/sl";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border rounded shadow text-sm">
                <p className="font-semibold">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }

    return null;
};

const OverAll = () => {
    const [districts, setDistricts] = useState('');
    const [status, setStatus] = useState('');
    const [department, setDepartment] = useState('');



    const [startDate, setStartDate] = useState(new Date());

    const handleChangeDistricts = (event) => {
        setDistricts(event.target.value);
    };


    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    const handleChangeDepartment = (event) => {
        setDepartment(event.target.value);
    };

    return (
        <>
            <div className='py-0'>

                <div className='w-full bg-secondary p-2 py-4 px-0'>
                    <div className='container flex items-center justify-between'>
                        <div className='leftSec flex items-center gap-3'>
                            <span className='rounded-full flex items-center justify-center w-12 h-12 bg-white'>
                                <GoShieldCheck size={30} className='text-secondary' />
                            </span>

                            <div className='info'>
                                <h4 className='text-white text-[20px] font-bold leading-5'>Monitoring Dashboard</h4>
                                <span className='text-white text-[14px] opacity-70'>Government of Uttarakhand</span>
                            </div>

                        </div>

                        <div className='rightSec flex items-center gap-8'>
                            <div className='relative'>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='small' />
                                <SlCalender size={18} className='absolute top-[10px] right-3 z-50 pointer-events-none' />
                            </div>
                            <Button className="!bg-white !text-secondary !capitalize gap-1 !px-4 !font-[600]">
                                <FaRegUser size={16} /> Admin</Button>
                        </div>
                    </div>

                </div>

                <div className='container py-5'>

                    <div className='w-full bg-white shadow-md p-2 px-4 h-20 rounded-lg flex items-center justify-between'>
                        <div className='search w-[300px] relative'>
                            <IoSearch size={20} className='text-gray-500 absolute top-3 left-2 z-50' />
                            <input type="text" className='w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-8 bg-gray-100' placeholder="Search Projects..." />
                        </div>

                        <div className='filtersSec flex items-center justify-end gap-3'>
                            <div className='field w-[150px]'>
                                <Select
                                    value={districts}
                                    onChange={handleChangeDistricts}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    size="small"
                                    className='w-full'
                                >
                                    <MenuItem value="">
                                        All Districts
                                    </MenuItem>
                                    <MenuItem value={"Dehradun"}>Dehradun</MenuItem>
                                    <MenuItem value={"Haridwar"}>Haridwar</MenuItem>
                                    <MenuItem value={"Nainital"}>Nainital</MenuItem>
                                    <MenuItem value={"Udham Singh Nagar"}>Udham Singh Nagar</MenuItem>
                                    <MenuItem value={"Almora"}>Almora</MenuItem>
                                    <MenuItem value={"Pauri Garhwal"}>Pauri Garhwal</MenuItem>
                                </Select>
                            </div>

                            <div className='field w-[150px]'>
                                <Select
                                    value={status}
                                    onChange={handleChangeStatus}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    size="small"
                                    className='w-full'
                                >
                                    <MenuItem value="">
                                        All Status
                                    </MenuItem>
                                    <MenuItem value={"Completed"}>Completed</MenuItem>
                                    <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                    <MenuItem value={"Pending"}>Pending</MenuItem>
                                    <MenuItem value={"Delayed"}>Delayed</MenuItem>
                                </Select>
                            </div>


                            <div className='field w-[150px]'>
                                <Select
                                    value={department}
                                    onChange={handleChangeDepartment}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    size="small"
                                    className='w-full'
                                >
                                    <MenuItem value="">
                                        All Departments
                                    </MenuItem>
                                    <MenuItem value={"Education"}>Education</MenuItem>
                                    <MenuItem value={"Health"}>Health</MenuItem>
                                    <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
                                    <MenuItem value={"Tourism"}>Tourism</MenuItem>
                                    <MenuItem value={"PWD"}>PWD</MenuItem>
                                </Select>
                            </div>


                        </div>

                    </div>


                    {/* Dashboard boxes start here */}
                    <div className='grid grid-cols-4 gap-4 my-5 dashboardBoxes'>
                        <div className='box rounded-md bg-gradient-to-br from-blue-400 to-blue-700  flex justify-between gap-4 p-5 relative '>
                            <div className='info flex flex-col'>
                                <span className='text-[14px] text-white opacity-80'>Total Monitoring Points</span>
                                <span className='text-[30px] text-white font-bold leading-[50px]'>10</span>
                                <span className='text-[14px] text-white font-[600] block pt-1'>A to J Categories</span>
                            </div>

                            <span className='bg-[rgba(255,255,255,0.4)] flex items-center justify-center w-12 h-12 rounded-full'>
                                <MdOutlinePentagon size={28} className='text-white' />
                            </span>

                        </div>


                        <div className='box rounded-md bg-gradient-to-br from-green-600 to-green-800  flex justify-between gap-4 p-5'>
                            <div className='info flex flex-col'>
                                <span className='text-[14px] text-white opacity-80'>CM Announcements</span>
                                <span className='text-[30px] text-white font-bold leading-[50px]'>532</span>
                                <span className='text-[14px] text-gray-200 font-[500] block pt-1'>+8% from last month</span>
                            </div>

                            <span className='bg-[rgba(255,255,255,0.4)] flex items-center justify-center w-12 h-12 rounded-full'>
                                <CiBullhorn size={28} className='text-white' />
                            </span>

                        </div>


                        <div className='box rounded-md bg-gradient-to-br from-orange-600 to-orange-800  flex justify-between gap-4 p-5'>
                            <div className='info flex flex-col'>
                                <span className='text-[14px] text-white opacity-80'>Total Schemes</span>
                                <span className='text-[30px] text-white font-bold leading-[50px]'>328</span>
                                <span className='text-[14px] text-gray-200 font-[500] block pt-1'>+12% from last month</span>
                            </div>

                            <span className='bg-[rgba(255,255,255,0.4)] flex items-center justify-center w-12 h-12 rounded-full'>
                                <GoShieldCheck size={28} className='text-white' />
                            </span>

                        </div>


                        <div className='box rounded-md bg-gradient-to-br from-purple-600 to-purple-700  flex justify-between gap-4 p-5'>
                            <div className='info flex flex-col'>
                                <span className='text-[14px] text-white opacity-80'>New Initiatives</span>
                                <span className='text-[30px] text-white font-bold leading-[50px]'>42</span>
                                <span className='text-[14px] text-gray-200 font-[500] block pt-1'>+5% from last month</span>
                            </div>

                            <span className='bg-[rgba(255,255,255,0.4)] flex items-center justify-center w-12 h-12 rounded-full'>
                                <IoMdTime size={28} className='text-white' />
                            </span>

                        </div>


                    </div>
                    {/* Dashboard boxes ends here */}




                    <StatusOverviewByCategory />




                   


                </div>
            </div>
        </>
    )
}


const StatusOverviewByCategory = () => {
    const data = [
        {
            name: "CM Announcements",
            Completed: 120,
            InProgress: 90,
            Pending: 25,
            Delayed: 10
        },
        {
            name: "Central Schemes",
            Completed: 30,
            InProgress: 25,
            Pending: 10,
            Delayed: 5
        },
        {
            name: "State Schemes",
            Completed: 40,
            InProgress: 30,
            Pending: 15,
            Delayed: 5
        },
        {
            name: "PM Announcements",
            Completed: 20,
            InProgress: 15,
            Pending: 5,
            Delayed: 2
        },
        {
            name: "New Proposals",
            Completed: 18,
            InProgress: 12,
            Pending: 6,
            Delayed: 1
        },
        {
            name: "New Initiatives",
            Completed: 17,
            InProgress: 11,
            Pending: 4,
            Delayed: 1
        },
        {
            name: "HCM Instructions",
            Completed: 25,
            InProgress: 15,
            Pending: 6,
            Delayed: 2
        },
        {
            name: "MP/MLA Statements",
            Completed: 15,
            InProgress: 10,
            Pending: 5,
            Delayed: 2
        },
        {
            name: "CM Helpline",
            Completed: 35,
            InProgress: 25,
            Pending: 10,
            Delayed: 5
        },
        {
            name: "Major Events",
            Completed: 10,
            InProgress: 8,
            Pending: 4,
            Delayed: 1
        }
    ];

    const COLORS = {
        Completed: "#22c55e",     // green
        InProgress: "#3b82f6",    // blue
        Pending: "#fbbf24",       // yellow
        Delayed: "#ef4444"        // red
    };



    return (
        <div className='card bg-white p-4 shadow-md rounded-md'>
            <h4 className='text-[15px] font-bold mb-3'>Status Overview by Category</h4>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: -20, bottom: 10 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar dataKey="Completed" stackId="a" fill={COLORS.Completed} />
                    <Bar dataKey="InProgress" stackId="a" fill={COLORS.InProgress} />
                    <Bar dataKey="Pending" stackId="a" fill={COLORS.Pending} />
                    <Bar dataKey="Delayed" stackId="a" fill={COLORS.Delayed} />
                </BarChart>
            </ResponsiveContainer>

        </div>
    )
}

export default OverAll