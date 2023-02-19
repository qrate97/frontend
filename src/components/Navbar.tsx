import React from "react";
import ConnectButton from "./ConnectButton";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between px-40 py-10">
      <div className="flex text-2xl items-center">
        <Image src={"/qrate.png"} height={40} width={40} alt={"logo"}></Image>
        Qrate
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
