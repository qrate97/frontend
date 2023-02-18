import ContributorForm from "@/components/ContributorForm";
import Navbar from "@/components/Navbar";
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
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
        <div className="flex h-full items-center shadow my-5">
          <div className="text-4xl text-center font-semibold w-1/2 p-5">
            <p>The largest question bank </p>
            <p>of crowd sourced questions</p>
            <Button className="mt-5">Generate Question Paper</Button>
          </div>
          <div className="flex justify-center p-5 w-1/2">
            <ContributorForm />
          </div>
        </div>
      </main>
    </>
  );
}
