"use client";
import { POST } from "@/config/axios/requests";
import { Address } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  email: string | null | undefined;
  wallet: string | null;
  fetch: (email: string) => Promise<void>;
};

const Header = ({ email, wallet, fetch }: Props) => {
  const router = useRouter();
  const [tonConnectedUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(
    wallet
  );
  const [isLoading, setIsLoading] = useState(false);

  // Use the wallet prop directly to check the wallet address
  useEffect(() => {
    if (email && wallet && tonWalletAddress && wallet !== tonWalletAddress) {
      // Clear the wallet if it does not match the user
      console.log("Mismatched wallet detected. Prompting user to reconnect.");
      setTonWalletAddress(null);
    }
  }, [email, wallet, tonWalletAddress]);

  const setWalletAddress = async (email: string, address: string) => {
    if (!email) {
      console.error("Email is required but is undefined or null");
      return;
    }

    try {
      await POST("/update-wallet", {
        email: email,
        walletAddress: address,
      });
      console.log("Wallet address stored successfully");
      fetch(email);
    } catch (error) {
      console.error("Error storing wallet address:", error);
    }
  };

  const removeWalletAddress = async () => {
    if (!email) {
      console.error("Email is required but is undefined or null");
      return;
    }

    try {
      await POST("/update-wallet", {
        email: email,
        walletAddress: "",
      });
      console.log("Wallet address removed successfully");
      fetch(email);
    } catch (error) {
      console.error("Error removing wallet address:", error);
    }
  };

  const handleWalletConnection = (address: string) => {
    if (wallet && wallet !== address) {
      console.warn("Attempting to connect a different wallet.");
      return;
    }
    console.log("Connected address:", address);
    setTonWalletAddress(address);

    if (email) {
      try {
        setWalletAddress(email, address);
      } catch (error) {
        console.error("Error storing wallet address:", error);
      }
    }
    setIsLoading(false);
  };

  const handleWalletDisconnection = () => {
    setTonWalletAddress(null);
    removeWalletAddress();
    setIsLoading(false);
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectedUI.account?.address) {
        handleWalletConnection(tonConnectedUI.account.address);
      } else {
        handleWalletDisconnection();
      }
    };
    checkWalletConnection();

    const unsubscribe = tonConnectedUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectedUI, wallet]);

  const handleWalletAction = async () => {
    if (tonConnectedUI.connected) {
      setIsLoading(true);
      await tonConnectedUI.disconnect();
    } else {
      await tonConnectedUI.openModal();
    }
  };

  const formattedAddress = (address: string) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 6)}...${tempAddress.slice(-4)}`;
  };

  const logout = () => {
    setTonWalletAddress(null);
    localStorage.removeItem("email");
    router.push("/");
  };

  return (
    <div className="fixed w-full top-0 right-0 flex justify-between items-center z-50 text-black p-8">
      <h1>Talking Ton</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {tonWalletAddress ? (
            <>
              <div>{formattedAddress(tonWalletAddress)}</div>
              <div className="flex gap-4 justify-center items-center">
                <button
                  className="px-4 py-2 rounded-md bg-blue-500 text-white"
                  onClick={handleWalletAction}
                >
                  Disconnect
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-blue-500 text-white"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center gap-5">
                <button
                  className="px-4 py-2 rounded-md bg-blue-500 text-white"
                  onClick={handleWalletAction}
                >
                  Connect Wallet
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-blue-500 text-white"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Header;
