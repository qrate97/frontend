import React, { useState } from "react";
import QuestionTable from "@/components/QuestionTable";
const Contributor = () => {
  const [contributor, setContributor] = useState();
  return (
    <>
      <div className="shadow m-10">{!contributor && <QuestionTable />}</div>
    </>
  );
};

export default Contributor;
