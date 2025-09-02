// src/app/summariseDashboard/susdashboard/page.jsx
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the ClientWrapper to disable SSR
const ClientWrapper = dynamic(() => import("../ClientWrapper"), {
  ssr: false,
});

const SusdashboardPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientWrapper />
    </Suspense>
  );
};

export default SusdashboardPage;
