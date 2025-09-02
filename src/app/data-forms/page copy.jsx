"use client"
import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MdCloudUpload } from "react-icons/md";
import { Button } from '@mui/material';
import { SlCalender } from "react-icons/sl";


const DataForms = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <section className='py-8'>
            <div className='container'>
                <h1 className='text-center text-[30px] font-bold text-secondary'>Monitoring Dashboard</h1>
                <p className='text-center text-[16px] font-[500] text-secondary mb-5'>Data Entry and Tracking System</p>
                <div className='w-[80%] m-auto'>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="CM Announcement" />
                        <Tab label="Schemes (Central)" />
                        <Tab label="Schemes (State)" />
                        <Tab label="PM Announcement" />
                        <Tab label="Innovative Proposals" />
                        <Tab label="New Initiatives" />
                        <Tab label="HCM Instructions" />
                        <Tab label="MP/MLA Statements" />
                        <Tab label="CM Helpline" />
                    </Tabs>


                    <div className='w-full bg-white shadow-md rounded-md mt-5 overflow-hidden'>
                        {
                            value === 0 && <CMAnnouncement />
                        }

                        {
                            value === 1 && <SchemesCentralGovernment />
                        }



                    </div>


                </div>
            </div>
        </section>
    )
}

export default DataForms



const CMAnnouncement = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const [startDate3, setStartDate3] = useState(new Date());

    const [status, setStatus] = useState('');

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };


    return (
        <>
            <div className='headerTitle bg-secondary p-4 text-white font-bold'>
                A. CM Announcement
            </div>

            <div className='p-5 flex flex-col gap-4'>
                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>S.No.</span>
                    <input type="text" className='w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100' placeholder="Enter S.No." />
                </div>


                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>Announcement No. (migrated from Portal)</span>
                    <input type="text" className='w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100' placeholder="Enter Announcement No." />
                </div>


                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>Date of Announcements</span>
                    <div className='relative'>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        <SlCalender size={18} className='absolute top-[12px] right-3 z-50 pointer-events-none' />
                    </div>
                </div>



                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>Details</span>
                    <textarea className='w-full h-[120px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-3 bg-gray-100' placeholder="Enter Details" />
                </div>


                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>List of Dept</span>
                    <input type="text" className='w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100' placeholder="Enter List of Departments" />
                </div>


                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>Date of Completion (Tentative)</span>
                    <div className='relative'>
                        <DatePicker selected={startDate2} onChange={(date) => setStartDate2(date)} />
                        <SlCalender size={18} className='absolute top-[12px] right-3 z-50 pointer-events-none' />
                    </div>

                </div>


                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>Status</span>
                    <Select
                        value={status}
                        onChange={handleChangeStatus}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
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



                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>Uploads (Letter and Picture with geotagging)</span>
                    <div className='w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200'>
                        <input type='file' className='w-full h-full opacity-0 absolute top-0 left-0 z-50' />
                        <span className='text-[15px] text-gray-800 flex items-center gap-3'><MdCloudUpload size={22} /> Upload</span>
                    </div>
                </div>

                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>Last login by the department</span>
                    <div className='relative'>
                        <DatePicker selected={startDate3} onChange={(date) => setStartDate3(date)} />
                        <SlCalender size={18} className='absolute top-[12px] right-3 z-50 pointer-events-none' />
                    </div>

                </div>



                <div className='flex items-center justify-end gap-2'>
                    <Button className='btn-custom'><span>Submit</span></Button>
                    <Button className='btn-border'><span>Reset</span></Button>
                </div>



            </div>
        </>
    )
}



const SchemesCentralGovernment = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const [startDate3, setStartDate3] = useState(new Date());

    const [status, setStatus] = useState('');

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };


    return (
        <>
            <div className='headerTitle bg-secondary p-4 text-white font-bold'>
                B. Schemes (Central Government)
            </div>

            <div className='p-5 flex flex-col gap-4'>
                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>S.No.</span>
                    <input type="text" className='w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100' placeholder="Enter S.No." />
                </div>


                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>Scheme Launch Date</span>
                    <div className='relative'>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        <SlCalender size={18} className='absolute top-[12px] right-3 z-50 pointer-events-none' />
                    </div>

                </div>


                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>Date of Implementation</span>
                    <div className='relative'>
                        <DatePicker selected={startDate2} onChange={(date) => setStartDate2(date)} />
                        <SlCalender size={18} className='absolute top-[12px] right-3 z-50 pointer-events-none' />
                    </div>

                </div>



                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>Details</span>
                    <textarea className='w-full h-[120px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 py-3 bg-gray-100' placeholder="Enter Details" />
                </div>


                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>List of Dept</span>
                    <input type="text" className='w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100' placeholder="Enter List of Departments" />
                </div>


                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>Date of Completion if any (Tentative)</span>
                    <DatePicker selected={startDate2} onChange={(date) => setStartDate2(date)} />
                </div>


                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>Status</span>
                    <Select
                        value={status}
                        onChange={handleChangeStatus}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
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


                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>No. of Benefeciaries till date</span>
                    <input type="text" className='w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100' placeholder="Enter Number" />
                </div>


                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>Uploads (Letter and Picture with geotagging)</span>
                    <div className='w-full h-[45px] border-2 border-dashed  border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100 relative flex items-center justify-center gap-2 hover:bg-gray-200'>
                        <input type='file' className='w-full h-full opacity-0 absolute top-0 left-0 z-50' />
                        <span className='text-[15px] text-gray-800 flex items-center gap-3'><MdCloudUpload size={22} /> Upload</span>
                    </div>
                </div>

                <div className='grid grid-cols-2 items-center'>
                    <span className='text-gray-800 font-[500] text-[15px]'>Last login by the department</span>
                      <div className='relative'>
                        <DatePicker selected={startDate3} onChange={(date) => setStartDate3(date)} />
                        <SlCalender size={18} className='absolute top-[12px] right-3 z-50 pointer-events-none' />
                    </div>
                   
                </div>



                <div className='flex items-center justify-end gap-2'>
                    <Button className='btn-custom'><span>Submit</span></Button>
                    <Button className='btn-border'><span>Reset</span></Button>
                </div>



            </div>
        </>
    )
}