import React, { useState } from "react";
import ApproveModerator from "@/components/ApproveModerator";

const Admin = () => {
  const [admin, setAdmin] = useState<string>("");
  return (
    <>
      <div className="shadow m-10 flex justify-center p-5">
        {!admin && <ApproveModerator />}
      </div>
    </>
  );
};

export default Admin;
