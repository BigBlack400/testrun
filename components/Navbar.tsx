"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const SunburstIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 py-4 flex items-center justify-between">
      {/* Left Section */}
      <Link href="/" className="flex items-center">
        <SunburstIcon />
        <span className="ml-2 text-white font-semibold text-xl tracking-tight font-instrument-sans">OHMNX</span>
      </Link>

      {/* Center Section */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex items-center gap-1 text-white/80 hover:text-white text-sm font-medium font-instrument-sans cursor-pointer transition-colors group">
          Products
          <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
        </div>
        <Link
          href="#"
          className="text-white/80 hover:text-white text-sm font-medium font-instrument-sans transition-colors"
        >
          Customer Stories
        </Link>
        <Link
          href="#"
          className="text-white/80 hover:text-white text-sm font-medium font-instrument-sans transition-colors"
        >
          Resources
        </Link>
        <Link
          href="#"
          className="text-white/80 hover:text-white text-sm font-medium font-instrument-sans transition-colors"
        >
          Pricing
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="hidden sm:block text-white text-sm font-medium font-instrument-sans hover:text-white/80 transition-colors"
        >
          Book A Demo
        </Link>
        <Link
          href="/admin"
          className="bg-white text-black rounded-full px-5 py-2.5 text-sm font-semibold font-instrument-sans hover:bg-white/90 transition-all"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
