import React, { useState, useEffect } from "react";
import ApproveModerator from "@/components/ApproveModerator";
import { gql, useLazyQuery } from "@apollo/client";
const QUERY = gql`
  query myQuery {
    moderators {
      moderatorAddress
    }
  }
`;

const Admin = () => {
  const [admin, setAdmin] = useState<string>("");
  const [fetchQuery, { called, loading, data }] = useLazyQuery(QUERY);

  // useEffect(() => {
  //   fetchQuery();
  // }, [fetchQuery]);
  return (
    <div className="shadow m-10 flex justify-center p-5">
      {!admin && <ApproveModerator />}
    </div>
  );
};

export default Admin;
