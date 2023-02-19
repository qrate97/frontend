import React from "react";
import ConnectButton from "./ConnectButton";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between px-40 py-10">
      <div className="text-2xl">Qrate</div>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
