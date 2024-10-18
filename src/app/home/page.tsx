"use client";
import React, { useEffect } from "react";
import Main from "@/components/Main";
import Header from "@/components/Header";
// import { useUserStore } from "@/zustand/zustand";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  // const email = useUserStore((state) => state.email);
  useEffect(() => {
    if (localStorage.getItem("email"))
      console.log(localStorage.getItem("email"));
    else {
      router.push("/");
    }
  });
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Main />
      </div>
    </>
  );
};

export default Home;
