import ContributorForm from "@/components/ContributorForm";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-full flex-col md:flex-row items-center shadow my-5">
      <div className="text-4xl text-center font-semibold w-1/2 p-5 justify-center flex flex-col items-center">
        <p>The largest question bank </p>
        <p>of crowd sourced questions</p>
        <div className="flex">
          <Link href={"/questions"}>
            <Button className="m-5">View Questions</Button>
          </Link>
          <Link href={"/moderator"}>
            <Button className="m-5">Moderator</Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center p-5 w-1/2">
        <ContributorForm />
      </div>
    </div>
  );
}
