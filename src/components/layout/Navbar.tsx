import React from "react";
import Image from "next/image";
import Link from "next/link";
import AuthContext from "../../context/authContext";
import { useContext } from "react";
import CustomButton from "../common/CustomButton";

const Navbar = () => {
  const { account, connectWallet, authReady, network, switchNetwork } =
    useContext(AuthContext);

  const renderButton = () => {
    if (account && network != "0x13881") {
      return (
        <CustomButton variant="outline" handleClick={switchNetwork}>
          Switch To Mumbai
        </CustomButton>
      );
    }
    return (
      <CustomButton variant="outline" handleClick={connectWallet}>
        <p className="text-black">
          {account ? (
            <a>
              Wallet: {account.slice(0, 6)}...{account.slice(-4)}
            </a>
          ) : (
            <a>Connect Wallet</a>
          )}
        </p>
      </CustomButton>
    );
  };
  return (
    <div className="w-full flex justify-between">
      <Link href={"/"}>
        <div className="flex text-2xl items-center">
          <Image src={"/qrate.png"} height={40} width={40} alt={"logo"}></Image>
          Qrate
        </div>
      </Link>
      <div>{renderButton()}</div>
    </div>
  );
};

export default Navbar;
