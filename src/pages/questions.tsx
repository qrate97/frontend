import React, { useState, useEffect } from "react";
import QuestionTable from "@/components/QuestionTable";
import { Select } from "@chakra-ui/react";
import { gql, useLazyQuery } from "@apollo/client";
const QUERY = gql`
  query myQuery {
    subjects {
      id
      subject_name
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
          data.subjects.map((subject: any) => (
            <option value={subject.subject_name} key={subject.id}>
              {subject.subject_name}
            </option>
          ))}
      </Select>
      <div className="my-10">
        <QuestionTable subject={subject} />
      </div>
    </>
  );
};

export default Questions;
