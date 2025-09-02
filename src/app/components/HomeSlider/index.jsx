"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Button } from '@mui/material';


const HomeSlider = () => {
    return (
        <>
            <div className='flex gap-4 py-8'>
                <div className='container flex gap-4'>

                    <div className="homeBanner overflow-hidden rounded-md w-[70%]">
                        <Swiper navigation={true} loop={true}
                            pagination={{
                                clickable: true,
                            }}
                             effect={'fade'}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[EffectFade, Navigation, Pagination, Autoplay]} className="mySwiper">
                            <SwiperSlide>

                                <img src={"../slide1.jpg"} alt='slide' className='w-full' />
                            </SwiperSlide>



                            <SwiperSlide>

                                <img src={"../slide2.jpg"} alt='slide' className='w-full' />
                            </SwiperSlide>


                        </Swiper>
                    </div>

                    <div className="col1 w-[30%] flex flex-col gap-3">
                        <div className='flex flex-col gap-3'>
                            <div className="updates px-5 pb-5 bg-white shadow-md rounded-md py-4">

                                <div className="flex items-center gap-3">
                                    <h3 className="text-[18px] font-bold text-primary">Bulletin Board</h3>
                                    <span className="inline-block py-0 px-2 bg-yellow-200 text-orange-800  text-[11px] font-[600] rounded-md leading-7">Updates</span>
                                </div>

                                <div className="border border-orange-200 rounded-md my-2 flex flex-col bg-[#fffbeb] max-h-[260px] overflow-y-auto">
                                    <div className="update flex gap-2 hover:bg-[#f7f2dd] p-2 ">
                                        <span className="dot block w-2 h-2 rounded-full bg-[#ef4444] relative top-2"></span>
                                        <div className="info flex flex-col gap-0">
                                            <h3 className="text-[14px] font-[600]">Important Notice</h3>
                                            <span className="text-[12px] font-[400]">System maintenance scheduled for this weekend. Today</span>
                                        </div>
                                    </div>


                                    <div className="update flex gap-2  p-2 hover:bg-[#f7f2dd] ">
                                        <span className="dot block w-2 h-2 rounded-full bg-[#3b82f6] relative top-2"></span>
                                        <div className="info flex flex-col gap-0">
                                            <h3 className="text-[14px] font-[600]">Department Meeting</h3>
                                            <span className="text-[12px] font-[400]">Quarterly review on Friday at 2:00 PM. Yesterday</span>
                                        </div>
                                    </div>



                                    <div className="update flex gap-2  p-2 hover:bg-[#f7f2dd] ">
                                        <span className="dot block w-2 h-2 rounded-full bg-[#22c55e] relative top-2"></span>
                                        <div className="info flex flex-col gap-0">
                                            <h3 className="text-[14px] font-[600]">New Policy Update</h3>
                                            <span className="text-[12px] font-[400]">Review updated security protocols.3 days ago</span>
                                        </div>
                                    </div>


                                     <div className="update flex gap-2 hover:bg-[#f7f2dd] p-2 ">
                                        <span className="dot block w-2 h-2 rounded-full bg-[#ef4444] relative top-2"></span>
                                        <div className="info flex flex-col gap-0">
                                            <h3 className="text-[14px] font-[600]">Important Notice</h3>
                                            <span className="text-[12px] font-[400]">System maintenance scheduled for this weekend. Today</span>
                                        </div>
                                    </div>


                                    <div className="update flex gap-2  p-2 hover:bg-[#f7f2dd] ">
                                        <span className="dot block w-2 h-2 rounded-full bg-[#3b82f6] relative top-2"></span>
                                        <div className="info flex flex-col gap-0">
                                            <h3 className="text-[14px] font-[600]">Department Meeting</h3>
                                            <span className="text-[12px] font-[400]">Quarterly review on Friday at 2:00 PM. Yesterday</span>
                                        </div>
                                    </div>



                                    <div className="update flex gap-2  p-2 hover:bg-[#f7f2dd] ">
                                        <span className="dot block w-2 h-2 rounded-full bg-[#22c55e] relative top-2"></span>
                                        <div className="info flex flex-col gap-0">
                                            <h3 className="text-[14px] font-[600]">New Policy Update</h3>
                                            <span className="text-[12px] font-[400]">Review updated security protocols.3 days ago</span>
                                        </div>
                                    </div>


                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomeSlider