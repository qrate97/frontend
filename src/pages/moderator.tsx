import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import ModeratorQuestion from "@/components/ModeratorQuestions";
import { gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import AuthContext from "../context/authContext";

const QUERY = gql`
  {
    questions(first: 5) {
      id
      question_id
      question_question_string
      question_subject
      blockTimestamp
      question_applicant
      question_downvotes
      question_incentives
      question_status
      question_subTopic
      question_topic
      question_upvotes
      transactionHash
    }
  }
`;

const Moderator = () => {
  const { account, connectWallet, authReady } = useContext(AuthContext);
  // const [fetchQuery, { called, loading, data }] = useLazyQuery(QUERY);

  // useEffect(() => {
  //   fetchQuery();
  // }, [fetchQuery]);
  const { data, loading, error } = useQuery(QUERY);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);

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
        <div className="shadow m-10">{<ModeratorQuestion />}</div>
        {data && <>data is here</>}
      </main>
    </>
  );
};

export default Moderator;
