import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // Fetch content from database
  let content: Record<string, string> = {};
  try {
    const contentArray = await prisma.websiteContent.findMany();
    content = contentArray.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (e) {
    console.error("Failed to fetch content", e);
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero
        preHeadline={content["hero_pre_headline"]}
        mainHeadline={content["hero_main_headline"]}
        subHeadline={content["hero_sub_headline"]}
      />

      {/* Footer (Simplified for now) */}
      <footer className="w-full py-12 px-6 border-t border-white/10 flex flex-col items-center justify-center space-y-4">
        <div className="text-white font-semibold text-xl tracking-tight font-instrument-sans">OHMNX</div>
        <p className="text-white/40 text-sm font-instrument-sans">
          &copy; {new Date().getFullYear()} OHMNX Technologies. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
