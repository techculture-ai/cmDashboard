"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [cmLoggedIn, setCmLoggedIn] = useState(false);
  const [deptLoggedIn, setDeptLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const [cmRes, deptRes] = await Promise.allSettled([
          axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check`, {
            withCredentials: true,
          }),
          axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth/check`,
            { withCredentials: true }
          ),
        ]);

        setCmLoggedIn(false);
        setDeptLoggedIn(false);

        if (
          cmRes.status === "fulfilled" &&
          (cmRes.value.data.success || cmRes.value.data.isAuthenticated)
        ) {
          setCmLoggedIn(true);
        }
        if (
          deptRes.status === "fulfilled" &&
          (deptRes.value.data.success || deptRes.value.data.isAuthenticated)
        ) {
          setDeptLoggedIn(true);
        }
      } catch (err) {
        console.error("Error checking login:", err);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [pathname]);

  const handleCMLogin = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check`,
        { withCredentials: true }
      );
      if (res.data.success || res.data.isAuthenticated) {
        router.push("/summariseDashboard");
      } else {
        router.push("/login");
      }
    } catch {
      router.push("/login");
    }
  };

  const handleDMLogin = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth/check`,
        { withCredentials: true }
      );
      if (res.data.success || res.data.isAuthenticated) {
        router.push("/form-Data/cmAnnouncement");
      } else {
        router.push("/department-login");
      }
    } catch {
      router.push("/department-login");
    }
  };

  const handleLogout = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth/logout`,
      {},
      { withCredentials: true }
    );
    setDeptLoggedIn(false);
    router.push("/");
  };

  const handleCmLogout = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    setCmLoggedIn(false);
    router.push("/");
  };

  const handleGoHome = () => router.push("/");

  const showFormDataButtons = pathname?.startsWith("/form-Data");
  const showCmButtons = pathname?.startsWith("/summariseDashboard");

  return (
    <div className="header sticky top-0 z-[100]">
      <div className="w-full h-1 bg-orange-500"></div>
      <header className="py-4 bg-white">
        <div className="container">
          <div className="flex items-center justify-between gap-5">
            <div className="logo flex items-center gap-3">
              <Link href="/">
                <img src={"/logo.png"} alt="logo" className="w-[90px]" />
              </Link>
              <span className="text-secondary text-[25px] font-bold">
                CM DASHBOARD
              </span>
            </div>

            {/* CASE 1: Home page */}
            {pathname === "/" && (
              <div className="ml-auto flex items-center gap-3">
                {loading ? (
                  <>
                    <Skeleton variant="rounded" width={160} height={40} />
                    <Skeleton variant="rounded" width={160} height={40} />
                  </>
                ) : cmLoggedIn ? (
                  <>
                    <Button
                      className="rounded-full btn-cm"
                      onClick={() => router.push("/summariseDashboard")}
                    >
                      Back to CM Dashboard
                    </Button>
                    <Button
                      className="rounded-full btn-dept"
                      onClick={handleCmLogout}
                      color="error"
                    >
                      Logout
                    </Button>
                  </>
                ) : deptLoggedIn ? (
                  <>
                    <Button
                      className="rounded-full btn-cm"
                      onClick={() => router.push("/form-Data/cmAnnouncement")}
                    >
                      Back to Department
                    </Button>
                    <Button
                      className="rounded-full btn-dept"
                      onClick={handleLogout}
                      color="error"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="rounded-full btn-cm"
                      onClick={handleCMLogin}
                    >
                      CM Dashboard Login
                    </Button>
                    <Button
                      className="rounded-full btn-dept"
                      onClick={handleDMLogin}
                    >
                      Department Login
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* CASE 2: Inside Department Portal */}
            {showFormDataButtons && (
              <div className="flex gap-3 ml-auto">
                {loading ? (
                  <>
                    <Skeleton variant="rounded" width={100} height={40} />
                    <Skeleton variant="rounded" width={100} height={40} />
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleGoHome}
                      className="rounded-lg btn-cm"
                    >
                      Home
                    </button>
                    <button
                      onClick={handleLogout}
                      className="rounded-lg btn-dept"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}

            {/* CASE 3: Inside CM Dashboard */}
            {showCmButtons && (
              <div className="flex gap-3 ml-auto">
                {loading ? (
                  <>
                    <Skeleton variant="rounded" width={100} height={40} />
                    <Skeleton variant="rounded" width={100} height={40} />
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleGoHome}
                      className="rounded-lg btn-cm"
                    >
                      Home
                    </button>
                    <button
                      onClick={handleCmLogout}
                      className="rounded-lg btn-dept"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

// ==========================================================

// "use client";
// import React, { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";
// import axios from "axios";
// import Skeleton from "@mui/material/Skeleton";

// const Header = () => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const [cmLoggedIn, setCmLoggedIn] = useState(false);
//   const [deptLoggedIn, setDeptLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const [cmRes, deptRes] = await Promise.allSettled([
//           axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check`, {
//             withCredentials: true,
//           }),
//           axios.get(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth/check`,
//             { withCredentials: true }
//           ),
//         ]);

//         setCmLoggedIn(false);
//         setDeptLoggedIn(false);

//         if (
//           cmRes.status === "fulfilled" &&
//           (cmRes.value.data.success || cmRes.value.data.isAuthenticated)
//         ) {
//           setCmLoggedIn(true);
//         }
//         if (
//           deptRes.status === "fulfilled" &&
//           (deptRes.value.data.success || deptRes.value.data.isAuthenticated)
//         ) {
//           setDeptLoggedIn(true);
//         }
//       } catch (err) {
//         console.error("Error checking login:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkLoginStatus();
//   }, [pathname]); // ✅ run again on every route change

//   const handleCMLogin = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check`,
//         { withCredentials: true }
//       );
//       if (res.data.success || res.data.isAuthenticated) {
//         router.push("/summariseDashboard");
//       } else {
//         router.push("/login");
//       }
//     } catch {
//       router.push("/login");
//     }
//   };

//   const handleDMLogin = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth/check`,
//         { withCredentials: true }
//       );
//       if (res.data.success || res.data.isAuthenticated) {
//         router.push("/form-Data/cmAnnouncement");
//       } else {
//         router.push("/department-login");
//       }
//     } catch {
//       router.push("/department-login");
//     }
//   };

//   const handleLogout = async () => {
//     await axios.post(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth/logout`,
//       {},
//       { withCredentials: true }
//     );
//     setDeptLoggedIn(false);
//     router.push("/");
//   };

//   const handleCmLogout = async () => {
//     await axios.post(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`,
//       {},
//       { withCredentials: true }
//     );
//     setCmLoggedIn(false);
//     router.push("/");
//   };

//   const handleGoHome = () => router.push("/");

//   const showFormDataButtons = pathname?.startsWith("/form-Data");
//   const showCmButtons = pathname?.startsWith("/summariseDashboard");

//   // if (loading) return null;

//   return (
//     <div className="header sticky top-0 z-[100]">
//       <div className="w-full h-1 bg-orange-500"></div>
//       <header className="py-4 bg-white">
//         <div className="container">
//           <div className="flex items-center justify-between gap-5">
//             <div className="logo flex items-center gap-3">
//               <Link href="/">
//                 <img src={"/logo.png"} alt="logo" className="w-[90px]" />
//               </Link>
//               <span className="text-secondary text-[25px] font-bold">
//                 CM DASHBOARD
//               </span>
//             </div>

//             {/* CASE 1: Home page */}
//             {pathname === "/" && (
//               <div className="ml-auto flex items-center gap-3">
//                 {cmLoggedIn ? (
//                   <>
//                     <Button
//                       className="rounded-full  btn-cm"
//                       onClick={() => router.push("/summariseDashboard")}
//                     >
//                       Back to CM Dashboard
//                     </Button>
//                     <Button
//                       className="rounded-full btn-dept"
//                       onClick={handleCmLogout}
//                       color="error"
//                     >
//                       Logout
//                     </Button>
//                   </>
//                 ) : deptLoggedIn ? (
//                   <>
//                     <Button
//                       className="rounded-full  btn-cm"
//                       onClick={() => router.push("/form-Data/cmAnnouncement")}
//                     >
//                       Back to Department
//                     </Button>
//                     <Button
//                       className="rounded-full btn-dept"
//                       onClick={handleLogout}
//                       color="error"
//                     >
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button
//                       className="rounded-full  btn-cm"
//                       onClick={handleCMLogin}
//                     >
//                       CM Dashboard Login
//                     </Button>
//                     <Button
//                       className="rounded-full btn-dept"
//                       onClick={handleDMLogin}
//                     >
//                       Department Login
//                     </Button>
//                   </>
//                 )}
//               </div>
//             )}

//             {/* CASE 2: Inside Department Portal */}
//             {showFormDataButtons && (
//               <div className="flex gap-3 ml-auto">
//                 <button onClick={handleGoHome} className="rounded-lg  btn-cm">
//                   Home
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   // className="bg-red-50 text-red-700 px-6 py-3 rounded-xl border"
//                   className="rounded-lg btn-dept"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}

//             {/* CASE 3: Inside CM Dashboard */}
//             {showCmButtons && (
//               <div className="flex gap-3 ml-auto">
//                 <button
//                   onClick={handleGoHome}
//                   // className="bg-blue-50 text-blue-700 px-6 py-3 rounded-xl border"
//                   className="rounded-lg  btn-cm"
//                 >
//                   Home
//                 </button>
//                 <button
//                   onClick={handleCmLogout}
//                   // className="bg-red-50 text-red-700 px-6 py-3 rounded-xl border"
//                   className="rounded-lg btn-dept"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;
