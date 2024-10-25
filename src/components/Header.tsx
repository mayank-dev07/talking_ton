"use client";
import { Address } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

type Props = {};

const Header = (props: Props) => {
  const router = useRouter();
  const [tonConnectedUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleWalletConnection = useCallback((address: string) => {
    setTonWalletAddress(address);
    console.log("wallet connected successfully");
    setIsLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("wallet connected successfully");
    setIsLoading(false);
  }, []);

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
  }, [tonConnectedUI, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    console.log("test");

    if (tonConnectedUI.connected) {
      setIsLoading(true);
      await tonConnectedUI.disconnect();
    } else {
      await tonConnectedUI.openModal();
    }
  };

  const formattedAddress = (address: string) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 12)}...${tempAddress.slice(-5)}`;
  };

  const logout = () => {
    setTonWalletAddress(null);
    localStorage.removeItem("email");
    router.push("/");
  };

  return (
    <div className="fixed w-full top-0 right-0 flex justify-end items-center z-50 text-black p-8">
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          {tonWalletAddress ? (
            <>
              <div className="w-full flex justify-between">
                <div>{formattedAddress(tonWalletAddress)}</div>
                <div className="flex flex-col md:flex-row gap-4 justify-end items-end">
                  <button
                    className="p-auto py-2 rounded-md bg-blue-500 text-white text-center w-[100px]"
                    onClick={handleWalletAction}
                  >
                    Disconnect
                  </button>
                  <button
                    className="p-auto py-2 rounded-md bg-blue-500 text-white text-center w-[100px]"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-center items-center gap-5">
                <button
                  className="p-auto py-2 rounded-md bg-blue-500 text-white text-center w-[100px]"
                  onClick={handleWalletAction}
                >
                  Connect
                </button>
                <button
                  className="p-auto py-2 rounded-md bg-blue-500 text-white text-center w-[100px]"
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
