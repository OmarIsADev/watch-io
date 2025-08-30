/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client";
import Navbar from "@/components/core/navbar";
import TopNavbar from "@/components/core/top-navbar";
import userStore from "@/store/user";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { getUser } = userStore();

  useEffect(() => {
    getUser()
  }, [])
  
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
