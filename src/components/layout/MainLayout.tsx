import React from "react";
import Footer from "./Footer";
import Head from "next/head";
import Navbar from "./Navbar";

const MainLayout = ({ children }: { children: any }) => {
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
      <div className="min-h-screen flex flex-col justify-between">
        <main className="w-full py-10 lg:px-40 px-10">
          <Navbar />
          <div className="mt-20 flex-grow">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
