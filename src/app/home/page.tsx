"use client";
import React, { useEffect, useState } from "react";
import Main from "@/components/Main";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { GET } from "@/config/axios/requests";

const Home = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>();
  const [streak, setStreak] = useState<number | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [xp, setXp] = useState<number | null>(null);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      console.log(localStorage.getItem("email"));
      setEmail(localStorage.getItem("email"));
    } else {
      router.push("/");
    }
  }, [email]);

  const fetchUserData = async (email: string) => {
    try {
      const response = await GET(`/login/${email}`);
      console.log(response);
      setXp(response?.xp);
      setStreak(response?.streak);
      setWallet(response?.walletAddress);
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (email) {
      fetchUserData(email);
      console.log(email);
    }
    console.log(wallet);
  }, [email]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header email={email} wallet={wallet} fetch={fetchUserData} />
        <Main streak={streak} xp={xp} />
      </div>
    </>
  );
};

export default Home;
