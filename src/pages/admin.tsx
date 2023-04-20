import React, { useState, useEffect, useContext } from "react";
import ApproveModerator from "@/components/ApproveModerator";
import { gql, useLazyQuery } from "@apollo/client";
import { admin } from "@/utils";
import AuthContext from "@/context/authContext";
const QUERY = gql`
  query myQuery {
    moderators {
      id
      moderatorAddress
      name
      subject
      proof
      approved
    }
  }
`;

const Admin = () => {
  const { account, connectWallet, authReady } = useContext(AuthContext);
  const [fetchQuery, { called, loading, data }] = useLazyQuery(QUERY);

  useEffect(() => {
    fetchQuery();
  }, [fetchQuery]);

  if (account != admin) {
    return (
      <>
        Your address is not the admin and you are not authorized to view
        contents of this page
      </>
    );
  }
  return (
    <div className="shadow m-10 flex justify-center p-5">
      {data && <ApproveModerator moderators={data["moderators"]} />}
    </div>
  );
};

export default Admin;
