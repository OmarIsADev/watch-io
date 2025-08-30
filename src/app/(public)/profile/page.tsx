"use client";
import React from "react";
import userStore from "@/store/user";

export default function Page() {
  const { user } = userStore();

  return <div>{user?.email}</div>;
}
