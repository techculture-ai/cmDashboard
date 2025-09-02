// "use client";
// import { Button } from "@mui/material";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import { FaAngleDown } from "react-icons/fa6";
// import { Collapse } from "react-collapse";
// import CampaignTwoToneIcon from "@mui/icons-material/CampaignTwoTone";

// // Sidebar menu data with only Announcements
// const sidebarMenu = [
//   {
//     title: "Announcements",
//     href: "/announcement",
//     icon: <CampaignTwoToneIcon size={16} />,
//     items: [
//       { title: "PM Announcement", href: "/form-Data/pmAnnouncement" },
//       { title: "CM Announcement", href: "/form-Data/cmAnnouncement" },
//       { title: "Central Scheme", href: "/form-Data/schemeCentralGovt" },
//       { title: "State Scheme", href: "/form-Data/schemeStateGovt" },
//       {
//         title: "Innovative Proposal",
//         href: "/form-Data/innovativeProposals",
//       },
//       // { title: "Review Meetings", href: "/form-Data/reviewMeetings" },
//     ],
//   },
// ];

// const Sidebar = () => {
//   const [isToggleSubMenu, setisToggleSubMenu] = useState(false);
//   const [toggleIndex, settoggleIndex] = useState(null);
//   const [activeMenuItem, setActiveMenuItem] = useState(null);

//   const toggleTab = (index) => {
//     if (toggleIndex === index) {
//       setisToggleSubMenu(!isToggleSubMenu);
//     } else {
//       settoggleIndex(index);
//       setisToggleSubMenu(true);
//     }
//   };

//   const handleMenuItemClick = (index) => {
//     setActiveMenuItem(index);
//   };

//   return (
//     <aside
//       className="h-screen max-h-screen overflow-y-scroll overflow-x-hidden border-r-[1px] border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] fixed top-0 left-0 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 backdrop-blur-sm transition-all duration-300 z-40 shadow-lg"
//       style={{ width: "20%" }}
//     >
//       {/* Logo Section with enhanced styling */}
//       <div className=" p-6 border-b border-gray-100 dark:border-gray-800/50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/30 dark:to-gray-700/30  ">
//         <Link
//           href="/"
//           className="block transition-transform hover:scale-105 duration-200"
//         >
//           <Image
//             src="/logo.png"
//             width={130}
//             height={43}
//             alt="Logo"
//             className="drop-shadow-sm"
//           />
//         </Link>
//       </div>

//       <div className="sidebarMenu p-4">
//         {sidebarMenu?.length !== 0 && (
//           <ul className="w-full flex flex-col gap-2">
//             {sidebarMenu?.map((menu, index) => {
//               return (
//                 <li className="w-full relative group" key={index}>
//                   {menu?.items?.length > 0 ? (
//                     // Menu with submenu - Enhanced styling
//                     <>
//                       <Button
//                         variant="text"
//                         className={`w-full !capitalize text-left !justify-start !rounded-xl !transition-all !duration-300 group-hover:!bg-gradient-to-r group-hover:!from-blue-50 group-hover:!to-indigo-50 dark:group-hover:!from-gray-800/50 dark:group-hover:!to-gray-700/50 !text-medium gap-3 !font-[600] !text-[14px] !py-[12px] !px-[16px] dark:!text-gray-200 !border !border-transparent group-hover:!border-blue-100 dark:group-hover:!border-gray-700 !shadow-sm hover:!shadow-md ${
//                           toggleIndex === index && isToggleSubMenu === true
//                             ? "!bg-gradient-to-r !from-blue-100 !to-indigo-100 dark:!from-gray-800 dark:!to-gray-700 !border-blue-200 dark:!border-gray-600 !shadow-md"
//                             : ""
//                         }`}
//                         onClick={() => toggleTab(index)}
//                       >
//                         <span className="text-blue-600 dark:text-blue-400 text-[16px]">
//                           {menu?.icon}
//                         </span>
//                         <span className="flex-1">{menu?.title}</span>
//                       </Button>

//                       <Button
//                         className="!absolute !min-w-[32px] !rounded-full !w-[32px] !h-[32px] z-[50] top-[6px] right-[12px] flex items-center justify-center cursor-pointer !text-medium dark:!text-gray-300 !transition-all !duration-300 hover:!bg-blue-100 dark:hover:!bg-gray-700"
//                         onClick={() => toggleTab(index)}
//                       >
//                         <FaAngleDown
//                           size={14}
//                           className={`${
//                             toggleIndex === index && isToggleSubMenu === true
//                               ? "rotate-180"
//                               : ""
//                           } dark:text-gray-300 transition-transform duration-300 text-blue-600 dark:text-blue-400`}
//                         />
//                       </Button>

//                       <Collapse
//                         isOpened={
//                           toggleIndex === index ? isToggleSubMenu : false
//                         }
//                       >
//                         <div className="submenu w-full flex flex-col py-2 ml-4 border-l-2 border-blue-100 dark:border-gray-700 pl-2">
//                           {menu?.items?.map((item, index_) => {
//                             return (
//                               <Link
//                                 className="block w-full"
//                                 key={index_}
//                                 href={item?.href}
//                               >
//                                 <Button
//                                   className="!capitalize !text-[13px] !text-left !justify-start !rounded-lg hover:!bg-gradient-to-r hover:!from-blue-50 hover:!to-indigo-50 dark:hover:!from-gray-800/30 dark:hover:!to-gray-700/30 w-full !text-medium dark:!text-gray-400 gap-3 !pl-4 !py-[10px] !transition-all !duration-200 hover:!shadow-sm !border !border-transparent hover:!border-blue-100 dark:hover:!border-gray-700"
//                                   onClick={() =>
//                                     handleMenuItemClick(`${index}-${index_}`)
//                                   }
//                                 >
//                                   <span className="w-[6px] h-[6px] rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 shadow-sm"></span>
//                                   <span className="hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
//                                     {item?.title}
//                                   </span>
//                                 </Button>
//                               </Link>
//                             );
//                           })}
//                         </div>
//                       </Collapse>
//                     </>
//                   ) : (
//                     // Regular menu item - Enhanced styling
//                     <Link href={menu?.href}>
//                       <Button
//                         variant="text"
//                         className={`w-full !capitalize text-left !justify-start !rounded-xl !transition-all !duration-300 group-hover:!bg-gradient-to-r group-hover:!from-blue-50 group-hover:!to-indigo-50 dark:group-hover:!from-gray-800/50 dark:group-hover:!to-gray-700/50 !text-medium gap-3 !font-[600] !text-[14px] !py-[12px] !px-[16px] dark:!text-gray-200 !border !border-transparent group-hover:!border-blue-100 dark:group-hover:!border-gray-700 !shadow-sm hover:!shadow-md ${
//                           activeMenuItem === index
//                             ? "!bg-gradient-to-r !from-blue-100 !to-indigo-100 dark:!from-gray-800 dark:!to-gray-700 !border-blue-200 dark:!border-gray-600 !shadow-md !text-blue-700 dark:!text-blue-300"
//                             : ""
//                         }`}
//                         onClick={() => handleMenuItemClick(index)}
//                       >
//                         <span className="text-blue-600 dark:text-blue-400 text-[16px] group-hover:scale-110 transition-transform duration-200">
//                           {menu?.icon}
//                         </span>
//                         <span className="group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
//                           {menu?.title}
//                         </span>
//                       </Button>
//                     </Link>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>

//       {/* Optional: Add a subtle footer gradient */}
//       <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-900 pointer-events-none"></div>
//     </aside>
//   );
// };

// export default Sidebar;

"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { Collapse } from "react-collapse";
import CampaignTwoToneIcon from "@mui/icons-material/CampaignTwoTone";
import { usePathname } from "next/navigation";

// Sidebar menu data with only Announcements
const sidebarMenu = [
  {
    title: "Announcements",
    href: "/announcement",
    icon: <CampaignTwoToneIcon size={16} />,
    items: [
      { title: "PM Announcement", href: "/form-Data/pmAnnouncement" },
      { title: "CM Announcement", href: "/form-Data/cmAnnouncement" },
      { title: "Central Scheme", href: "/form-Data/schemeCentralGovt" },
      { title: "State Scheme", href: "/form-Data/schemeStateGovt" },
      {
        title: "Innovative Proposal",
        href: "/form-Data/innovativeProposals",
      },
      { title: "Review Meetings", href: "/form-Data/reviewMeetings" },
      { title: "New Initiatives", href: "/form-Data/newInitiatives" },
      { title: "HCM Instruction", href: "/form-Data/hcmInstruction" },
      { title: "Statement", href: "/form-Data/statement" },
      { title: "CM Helpline", href: "/form-Data/cmHelpline" },
    ],
  },
];

const Sidebar = () => {
  const [isToggleSubMenu, setisToggleSubMenu] = useState(true); // Set to true by default
  const [toggleIndex, settoggleIndex] = useState(0); // Set to 0 to open first menu by default
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const pathname = usePathname();

  // Initialize the sidebar to show announcements by default
  useEffect(() => {
    setisToggleSubMenu(true);
    settoggleIndex(0);
  }, []);

  // Check if current path matches any menu item
  useEffect(() => {
    sidebarMenu.forEach((menu, menuIndex) => {
      if (menu.items) {
        menu.items.forEach((item, itemIndex) => {
          if (pathname === item.href) {
            setActiveMenuItem(`${menuIndex}-${itemIndex}`);
            settoggleIndex(menuIndex);
            setisToggleSubMenu(true);
          }
        });
      } else if (pathname === menu.href) {
        setActiveMenuItem(menuIndex);
      }
    });
  }, [pathname]);

  const toggleTab = (index) => {
    if (toggleIndex === index) {
      setisToggleSubMenu(!isToggleSubMenu);
    } else {
      settoggleIndex(index);
      setisToggleSubMenu(true);
    }
  };

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
  };

  return (
    <aside
      className="fixed top-0 left-0 h-full w-[18%] flex flex-col border-r border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] bg-transparent  shadow-lg z-40"
      style={{ width: "18%" }} // added changes
    >
      {/* Logo Section Removed */}

      <div className="flex-1 overflow-y-auto sidebarMenu p-8 pt-16">
        {sidebarMenu?.length !== 0 && (
          <ul className="w-full flex flex-col gap-2 pt-28">
            {sidebarMenu?.map((menu, index) => {
              return (
                <li className="w-full relative group" key={index}>
                  {menu?.items?.length > 0 ? (
                    // Menu with submenu - Enhanced styling
                    <>
                      <Button
                        variant="text"
                        className={`w-full !capitalize text-left !justify-start !rounded-xl !transition-all !duration-300 group-hover:!bg-gradient-to-r group-hover:!from-blue-50 group-hover:!to-indigo-50 dark:group-hover:!from-gray-800/50 dark:group-hover:!to-gray-700/50 !text-medium gap-3 !font-[600] !text-[14px] !py-[12px] !px-[16px] dark:!text-gray-200 !border !border-transparent group-hover:!border-blue-100 dark:group-hover:!border-gray-700 !shadow-sm hover:!shadow-md ${
                          toggleIndex === index && isToggleSubMenu === true
                            ? "!bg-gradient-to-r !from-blue-100 !to-indigo-100 dark:!from-gray-800 dark:!to-gray-700 !border-blue-200 dark:!border-gray-600 !shadow-md"
                            : ""
                        }`}
                        onClick={() => toggleTab(index)}
                      >
                        <span className="text-blue-600 dark:text-blue-400 text-[16px]">
                          {menu?.icon}
                        </span>
                        <span className="flex-1">{menu?.title}</span>
                      </Button>

                      <Button
                        className="!absolute !min-w-[32px] !rounded-full !w-[32px] !h-[32px] z-[50] top-[6px] right-[12px] flex items-center justify-center cursor-pointer !text-medium dark:!text-gray-300 !transition-all !duration-300 hover:!bg-blue-100 dark:hover:!bg-gray-700"
                        onClick={() => toggleTab(index)}
                      >
                        {/* <FaAngleDown
                          size={14}
                          className={`${
                            toggleIndex === index && isToggleSubMenu === true
                              ? "rotate-180"
                              : ""
                          } dark:text-gray-300 transition-transform duration-300 text-blue-600 dark:text-blue-400`}
                        /> */}
                      </Button>

                      <Collapse
                        isOpened={
                          toggleIndex === index ? isToggleSubMenu : false
                        }
                      >
                        <div className="sidebarMenu p-4 pt-8">
                          {menu?.items?.map((item, index_) => {
                            const isActive =
                              activeMenuItem === `${index}-${index_}` ||
                              pathname === item.href;
                            return (
                              <Link
                                className="block w-full"
                                key={index_}
                                href={item?.href}
                              >
                                <Button
                                  className={`!capitalize !text-[13px] !text-left !justify-start !rounded-lg w-full !text-medium gap-3 !pl-4 !py-[10px] !transition-all !duration-200 !border !border-transparent ${
                                    isActive
                                      ? "!bg-gradient-to-r !from-blue-100 !to-indigo-100 dark:!from-gray-800 dark:!to-gray-700 !border-blue-200 dark:!border-gray-600 !text-blue-700 dark:!text-blue-300 !shadow-sm"
                                      : "hover:!bg-gradient-to-r hover:!from-blue-50 hover:!to-indigo-50 dark:hover:!from-gray-800/30 dark:hover:!to-gray-700/30 dark:!text-gray-400 hover:!shadow-sm hover:!border-blue-100 dark:hover:!border-gray-700"
                                  }`}
                                  onClick={() =>
                                    handleMenuItemClick(`${index}-${index_}`)
                                  }
                                >
                                  <span
                                    className={`w-[6px] h-[6px] rounded-full shadow-sm ${
                                      isActive
                                        ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                                        : "bg-gradient-to-r from-blue-400 to-indigo-400"
                                    }`}
                                  ></span>
                                  <span
                                    className={`transition-colors duration-200 ${
                                      isActive
                                        ? "text-blue-700 dark:text-blue-300 font-medium"
                                        : "hover:text-blue-700 dark:hover:text-blue-300"
                                    }`}
                                  >
                                    {item?.title}
                                  </span>
                                </Button>
                              </Link>
                            );
                          })}
                        </div>
                      </Collapse>
                    </>
                  ) : (
                    // Regular menu item - Enhanced styling
                    <Link href={menu?.href}>
                      <Button
                        variant="text"
                        className={`w-full !capitalize text-left !justify-start !rounded-xl !transition-all !duration-300 group-hover:!bg-gradient-to-r group-hover:!from-blue-50 group-hover:!to-indigo-50 dark:group-hover:!from-gray-800/50 dark:group-hover:!to-gray-700/50 !text-medium gap-3 !font-[600] !text-[14px] !py-[12px] !px-[16px] dark:!text-gray-200 !border !border-transparent group-hover:!border-blue-100 dark:group-hover:!border-gray-700 !shadow-sm hover:!shadow-md ${
                          activeMenuItem === index || pathname === menu.href
                            ? "!bg-gradient-to-r !from-blue-100 !to-indigo-100 dark:!from-gray-800 dark:!to-gray-700 !border-blue-200 dark:!border-gray-600 !shadow-md !text-blue-700 dark:!text-blue-300"
                            : ""
                        }`}
                        onClick={() => handleMenuItemClick(index)}
                      >
                        <span className="text-blue-600 dark:text-blue-400 text-[16px] group-hover:scale-110 transition-transform duration-200">
                          {menu?.icon}
                        </span>
                        <span className="group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                          {menu?.title}
                        </span>
                      </Button>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
