import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import QuestionTable from "@/components/QuestionTable";
const Contributor = () => {
  const [contributor, setContributor] = useState();
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
        <Navbar />
        <div className="shadow m-10">{!contributor && <QuestionTable />}</div>
      </main>
    </>
  );
};

export default Contributor;
