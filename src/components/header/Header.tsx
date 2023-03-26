import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <Head>
        <title>Qrate</title>
        <meta
          name="description"
          content="Automate question paper generation from a crowd-sourced question bank."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/qrate.png" />
      </Head>
      <Navbar />
    </>
  );
};

export default Header;
