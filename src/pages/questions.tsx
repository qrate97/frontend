import React, { useState, useEffect } from "react";
import QuestionTable from "@/components/QuestionTable";
import { Button, Select } from "@chakra-ui/react";
import { gql, useLazyQuery } from "@apollo/client";
import Link from "next/link";
const QUERY = gql`
  query myQuery {
    subjects {
      id
      name
    }
  }
`;

const Questions = () => {
  const [subject, setSubject] = useState<string>("");
  const [fetchQuery, { called, loading, data }] = useLazyQuery(QUERY);

  useEffect(() => {
    fetchQuery();
  }, [fetchQuery]);

  return (
    <>
      <Select
        placeholder="Select Subject"
        onChange={(e) => setSubject(e.target.value)}
      >
        {data &&
          data.subjects.map((subject: { id: string; name: string }) => (
            <option value={subject.name} key={subject.id}>
              {subject.name}
            </option>
          ))}
      </Select>
      <div className="my-10">
        <QuestionTable subject={subject} />
      </div>
      <div>
        <Button>
          <Link href="/generate">Generate Question Paper</Link>
        </Button>
      </div>
    </>
  );
};

export default Questions;
