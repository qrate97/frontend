import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

const ConnectButton = () => {
  const { account, connectWallet, authReady, network, switchNetwork } =
    useContext(AuthContext);

  //network - Polygon Mumbai
  if (network != "0x13881") {
    return (
      <Button
        variant="solid"
        className="text-black border border-black"
        onClick={switchNetwork}
      >
        Switch To Mumbai
      </Button>
    );
  }
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
