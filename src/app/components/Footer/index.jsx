"use client";
import React, { useContext } from "react";

import Button from "@mui/material/Button";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="py-6 bg-secondary z-50">
        <div className="container flex items-center justify-center">
          <p className="text-center text-white text-[13px]">
            © 2025 Government of Uttarakhand. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
