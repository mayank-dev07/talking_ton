"use client";
// import { useUserStore } from "@/zustand/zustand";
import { Address } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";
import React, { useCallback, useEffect, useState } from "react";

type Props = {};

const Header = (props: Props) => {
  // const { clearEmail } = useUserStore();
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
      // clearEmail();
    } else {
      await tonConnectedUI.openModal();
    }
  };

  const formattedAddress = (address: string) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 6)}...${tempAddress.slice(-4)}`;
  };

  return (
    <div className="fixed w-full top-0 right-0 flex justify-between items-center z-50 text-black p-8">
      <h1>Talking Ton</h1>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          {tonWalletAddress ? (
            <>
              <div>{formattedAddress(tonWalletAddress)}</div>
              <button onClick={handleWalletAction}>Disconnect</button>
            </>
          ) : (
            <>
              <button onClick={handleWalletAction}>Connect Wallet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Header;
