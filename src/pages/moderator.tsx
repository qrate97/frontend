import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import ModeratorQuestion from "@/components/ModeratorQuestions";
import { gql, useLazyQuery } from "@apollo/client";
import { useContext } from "react";
import AuthContext from "../context/authContext";

const QUERY = gql`
  query myQuery($addr: String!) {
    moderators(where: { moderatorAddress: $addr }) {
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
    console.log(data);
    if (data) setSubject(data["questions"][0].subject);
  }, []);

  useEffect(() => {
    console.log(account);
    if (account != "") fetchQuery();
  }, [fetchQuery, account]);

  if (loading) return "Loading...";

  return (
    <>
      <Head>
        <title>Qrate</title>
        <meta
          name="description"
          content="Automate question paper generation from a crowd-sourced question bank."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-full  py-5 px-40 h-screen">
        <div className="shadow m-10">
          <ModeratorQuestion subject={"DSA"} />
          {data && console.log(data)}
        </div>
      </main>
    </>
  );
};

export default Moderator;
