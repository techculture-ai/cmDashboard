// src/app/summariseDashboard/ClientWrapper.jsx
"use client";
import { useSearchParams } from "next/navigation";
import SummariseDashboard2 from "./dashboard2/page";

const ClientWrapper = () => {
  const searchParams = useSearchParams();
  const typeFromURL = searchParams.get("type") || "cm-announcements";

  return <SummariseDashboard2 type={typeFromURL} />;
};

export default ClientWrapper;
