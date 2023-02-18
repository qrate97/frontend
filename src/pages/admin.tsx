import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import ApproveModerator from "@/components/ApproveModerator";

const Admin = () => {
  const [admin, setAdmin] = useState<string>("");
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
        <div className="shadow m-10 flex justify-center p-5">
          {!admin && <ApproveModerator />}
        </div>
      </main>
    </>
  );
};

export default Admin;
