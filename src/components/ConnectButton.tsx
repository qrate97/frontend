import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext } from "react";
import AuthContext from "../context/authContext";

const ConnectButton = () => {
  const [loading, setLoading] = useState(false);
  const { account, connectWallet, authReady } = useContext(AuthContext);

  console.log("connect button", account);
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
