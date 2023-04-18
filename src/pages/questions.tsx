import React, { useState } from "react";
import QuestionTable from "@/components/QuestionTable";
import { Button, Select } from "@chakra-ui/react";
import Link from "next/link";

const Questions = () => {
  const [subject, setSubject] = useState<string>("");
  return (
    <>
      <Select
        placeholder="Select Subject"
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="Blockchain">Blockchain</option>
        <option value="DSA">DSA</option>
        <option value="RDBMS">RDBMS</option>
        <option value="Python">Python</option>
      </Select>
      <div className="shadow my-10">
        <QuestionTable subject={subject} />
      </div>
      <div>
        <Link
          href={{
            pathname: "/api/getRandomQuestions",
            query: { subject: subject },
          }}
        >
          <Button>
            <Link href="/generate">Generate Question Paper</Link>
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Questions;
