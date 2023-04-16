import React from "react";
import ConnectButton from "../general/ConnectButton";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between">
      <Link href={"/"}>
        <div className="flex text-2xl items-center">
          <Image src={"/qrate.png"} height={40} width={40} alt={"logo"}></Image>
          Qrate
        </div>
      </Link>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
