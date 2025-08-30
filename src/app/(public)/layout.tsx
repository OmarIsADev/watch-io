"use client";
import { useEffect } from "react";
import Navbar from "@/components/core/navbar";
import TopNavbar from "@/components/core/top-navbar";
import userStore from "@/store/user";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { getUser } = userStore();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col gap-4">
        <TopNavbar />
        {children}
      </div>
    </>
  );
}
