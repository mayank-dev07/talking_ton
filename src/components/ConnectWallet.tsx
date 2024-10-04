"use client";
import { useState, useEffect } from "react";
import {
  TonConnect,
  Wallet,
  WalletConnectionSource,
  WalletConnectionSourceHTTP,
} from "@tonconnect/sdk"; // Import necessary types

// Initialize TonConnect instance (outside the component to avoid multiple instances)
const tonConnect = new TonConnect();

function ConnectWallet() {
  // Define state variables with proper TypeScript types
  const [connected, setConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null); // Store wallet address as a string or null

  // Effect to check wallet connection status on component mount
  useEffect(() => {
    const checkConnection = () => {
      const wallet: Wallet | null = tonConnect.wallet; // Fetch the connected wallet, if any
      if (wallet) {
        setConnected(true);
        setAddress(wallet.account.address); // Set the connected wallet address
      }
    };

    checkConnection();
  }, []);

  // Handle wallet connection
  const handleConnect = async () => {
    try {
      // Specify how you want to connect to the wallet
      const walletConnectionSource: WalletConnectionSourceHTTP = {
        bridgeUrl: "https://your-bridge-url.com", // Use a valid bridge URL for HTTP wallet connection
        universalLink: "https://ton-wallet-url.com", // Use a valid universal link if applicable
      };

      await tonConnect.connect([walletConnectionSource]); // Pass the wallet connection source(s)

      const wallet: Wallet | null = tonConnect.wallet; // Check the newly connected wallet
      if (wallet) {
        setConnected(true);
        setAddress(wallet.account.address); // Store connected wallet address
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Handle wallet disconnection
  const handleDisconnect = () => {
    tonConnect.disconnect(); // Disconnect the wallet
    setConnected(false);
    setAddress(null); // Clear the wallet address
  };

  return (
    <div className="bg-blue-600 text-white font-bold rounded-md p-3">
      {!connected ? (
        <button onClick={handleConnect}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected with address: {address}</p>
          <button onClick={handleDisconnect}>Disconnect Wallet</button>
        </div>
      )}
    </div>
  );
}

export default ConnectWallet;
