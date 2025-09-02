"use client"
import { Button } from "@mui/material";
import HomeSlider from "./components/HomeSlider";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function Home() {
  return (
    <>

      <div className="bg-secondary py-3">
        <Marquee speed={100}>
          <p className="text-white text-[18px] pr-5">Known as Uttarakhand </p> <p className="text-white text-[18px] pr-5"> • Dev Bhoomi (Land of Gods) </p> <p className="text-white text-[18px] pr-5"> • Himalayan State </p> <p className="text-white text-[18px] pr-5"> • Spiritual & Adventure Tourism Hub </p> <p className="text-white text-[18px] pr-5"> • Home to Char Dham Yatra </p>  <p className="text-white text-[18px] pr-5"> • Land of Glaciers and Rivers </p> <p className="text-white text-[18px] pr-5"> • Abode of the Himalayas </p> <p className="text-white text-[18px] pr-5"> • Known as Uttarakhand </p> <p className="text-white text-[18px] pr-5">• Dev Bhoomi (Land of Gods) </p> <p className="text-white text-[18px] pr-5"> • System maintenance this weekend
          </p>
        </Marquee>
      </div>

      <HomeSlider />


      <section className="py-0 mb-5">
        <div className="container">
          <h2 className="text-[25px] font-semibold leading-[40px] pr-5 text-gray-800">Latest Announcement</h2>


          <div className="flex flex-col lg:flex-row gap-6 mt-5">

            {/* Left Section – 70% */}
            <div className="w-full lg:w-[50%]">
              <Link href="/">
                <div className="relative h-full rounded-lg overflow-hidden shadow-md group">
                  <img
                    src="https://pushkarsinghdhami.in/uploads/gallery/67912.jpg"
                    alt="Yoga Hub"
                    className="w-full h-[420px] object-cover transition-all group-hover:scale-105"
                  />
                  <div className="absolute -bottom-[100%] transition-all delay-100 opacity-0 group-hover:bottom-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 w-full">
                    <h3 className="text-xl font-semibold leading-snug">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                    </h3>
                    <p className="text-sm mt-2">
                      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum...
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Section – 30% */}
            <div className="w-[50%] grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <Link href="/">
                <div className="relative rounded-lg overflow-hidden shadow-md h-[200px] group">
                  <img
                    src="https://pushkarsinghdhami.in/uploads/gallery/52877.jpeg"
                    alt="News 1"
                    className="w-full h-full object-cover  transition-all group-hover:scale-105"
                  />
                  <div className="absolute -bottom-[100%] transition-all delay-100 opacity-0 group-hover:bottom-0 group-hover:opacity-100  bg-black bg-opacity-70 text-white p-3 w-full">
                    <h4 className="text-sm font-semibold leading-snug">
                      Lorem Ipsum is simply dummy text of the printing and typesetting
                    </h4>
                  </div>
                </div>
              </Link>

              {/* Card 2 */}
              <Link href="/">
                <div className="relative rounded-lg overflow-hidden shadow-md h-[200px] group">
                  <img
                    src="https://pushkarsinghdhami.in/uploads/gallery/63637.jpeg"
                    alt="News 2"
                    className="w-full h-full  object-cover transition-all group-hover:scale-105"
                  />
                  <div className="absolute -bottom-[100%] transition-all delay-100 opacity-0 group-hover:bottom-0 group-hover:opacity-100  bg-black bg-opacity-70 text-white p-3 w-full">
                    <h4 className="text-sm font-semibold leading-snug">
                      Lorem Ipsum is simply dummy text of the printing and typesetting
                    </h4>
                  </div>
                </div>
              </Link>

              {/* Card 3 */}
              <Link href="/">
                <div className="relative rounded-lg overflow-hidden shadow-md h-[200px] group">
                  <img
                    src="https://pushkarsinghdhami.in/uploads/gallery/15302.jpg"
                    alt="News 3"
                    className="w-full h-full  object-cover transition-all group-hover:scale-105"
                  />
                  <div className="absolute -bottom-[100%] transition-all delay-100 opacity-0 group-hover:bottom-0 group-hover:opacity-100  bg-black bg-opacity-70 text-white p-3 w-full">
                    <h4 className="text-sm font-semibold leading-snug">
                      Lorem Ipsum is simply dummy text of the printing and typesetting
                    </h4>
                  </div>
                </div>
              </Link>

              {/* Card 4 */}
              <Link href="/">
                <div className="relative rounded-lg overflow-hidden shadow-md h-[200px] group">
                  <img
                    src="https://pushkarsinghdhami.in/uploads/gallery/21096.png"
                    alt="News 4"
                    className="w-full h-full  object-cover transition-all group-hover:scale-105 "
                  />
                  <div className="absolute -bottom-[100%] transition-all delay-100 opacity-0 group-hover:bottom-0 group-hover:opacity-100  bg-black bg-opacity-70 text-white p-3 w-full">
                    <h4 className="text-sm font-semibold leading-snug">
                      Lorem Ipsum is simply dummy text of the printing and typesetting
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          </div>


        </div>
      </section>



      

      <section className="py-5">
        <div className="container">
          <h2 className="text-[25px] font-semibold leading-[40px] pr-5 text-gray-800">Social Media</h2>


          <div className="grid grid-cols-4 gap-5 mt-4">
            <div className="box bg-white shadow-md py-4 rounded-md">
              <div class="feed-frame flex flex-col gap-4">
                <div class="feed-header flex items-center gap-2 px-3">
                  <img src="https://img.icons8.com/?size=100&id=13912&format=png&color=000000" alt="Facebook"
                    className="feed-logo w-8 h-8" />
                  <span>Facebook</span>
                </div>

                <iframe width="100%" height="300" src="https://rss.app/embed/v1/feed/pbO26rbkeQLQ5rVM"
                  frameborder="0"></iframe>
              </div>
            </div>

            <div className="box bg-white shadow-md py-4 rounded-md">
              <div class="feed-frame flex flex-col gap-4">
                <div class="feed-header flex items-center gap-2 px-3">
                  <img src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000" alt="Twitter"
                    className="feed-logo w-8 h-8" />
                  <span>Twitter</span>
                </div>

                <iframe width="100%" height="300" src="https://rss.app/embed/v1/feed/8avN8WSKjN8064pr"
                  frameborder="0"></iframe>
              </div>
            </div>


            <div className="box bg-white shadow-md py-4 rounded-md">
              <div class="feed-frame flex flex-col gap-4">
                <div class="feed-header flex items-center gap-2 px-3">
                  <img src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000" alt="Instagram"
                    className="feed-logo w-8 h-8" />
                  <span>Instagram</span>
                </div>

                <iframe width="100%" height="300" src="https://rss.app/embed/v1/feed/hHAGK13yb97tRTBQ"
                  frameborder="0"></iframe>
              </div>
            </div>


            <div className="box bg-white shadow-md py-4 rounded-md">
              <div class="feed-frame flex flex-col gap-4">
                <div class="feed-header flex items-center gap-2 px-3">
                  <img src="https://img.icons8.com/?size=100&id=19318&format=png&color=000000" alt="Youtube"
                    className="feed-logo w-8 h-8" />
                  <span>Youtube</span>
                </div>

                <iframe width="100%" height="300" src="https://rss.app/embed/v1/feed/pkJcFgwJhhrBZKPA"
                  frameborder="0"></iframe>
              </div>
            </div>


          </div>

        </div>
      </section>


    </>
  );
}
