import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import QuestionTable from "@/components/QuestionTable";
import { Select } from "@chakra-ui/react";

const Questions = () => {
  const [subject, setSubject] = useState<string>("");
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
        <Select
          placeholder="Select Subject"
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="Blockchain">Blockchain</option>
          <option value="DSA">DSA</option>
          <option value="RDBMS">RDBMS</option>
          <option value="Python">Python</option>
        </Select>
        <div className="shadow m-10">
          <QuestionTable subject={subject} />
        </div>
      </main>
    </>
  );
};

export default Questions;
