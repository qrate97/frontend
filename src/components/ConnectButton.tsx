import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { ethers } from "ethers";

const ConnectButton = () => {
  const [account, setAccount] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    console.log("in connect wallet");
    setLoading(true);
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <Button
      variant="solid"
      className="text-black border border-black"
      onClick={connectWallet}
    >
      {account ? (
        <a>
          Wallet: {account.slice(0, 6)}...{account.slice(-4)}
        </a>
      ) : (
        <a>Connect Wallet</a>
      )}
    </Button>
  );
};

export default ConnectButton;
