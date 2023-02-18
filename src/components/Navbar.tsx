import React from "react";
import ConnectButton from "./ConnectButton";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between">
      <div className="text-2xl">Qrate</div>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
