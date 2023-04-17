import React, { useEffect, useState } from "react";
import ModeratorQuestion from "@/components/ModeratorQuestions";
import { gql, useLazyQuery } from "@apollo/client";
import { useContext } from "react";
import AuthContext from "../context/authContext";
import ModeratorForm from "@/components/forms/ModeratorForm";

const QUERY = gql`
  query myQuery($moderatorAddress: String!) {
    moderators(where: { moderatorAddress: $moderatorAddress }) {
      id
      moderatorAddress
      subject
      approved
    }
  }
`;

const Moderator = () => {
  const { account, connectWallet, authReady } = useContext(AuthContext);
  const [fetchQuery, { called, loading, data }] = useLazyQuery(QUERY, {
    variables: { moderatorAddress: account },
  });
  const [subject, setSubject] = useState<string>("");

  useEffect(() => {
    if (data)
      if (data.moderators.length >= 1)
        setSubject(data["moderators"][0].subject);
  }, [data]);

  useEffect(() => {
    console.log(account);
    if (account != "") fetchQuery();
  }, [fetchQuery, account]);

  if (loading) return "Loading...";
  if (!subject) return <ModeratorForm />;
  console.log(account);
  return (
    <>
      <div className="shadow m-10">
        <ModeratorQuestion subject={subject} />
      </div>
    </>
  );
};

export default Moderator;
