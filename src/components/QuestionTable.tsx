import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

const QUERY = gql`
  query myQuery($subject: String!) {
    questions(
      orderBy: blockTimestamp
      orderDirection: desc
      where: { question_subject: $subject, question_status: 1 }
    ) {
      quesId
      questionString
      subject
      subTopic
      topic
    }
  }
`;
const QuestionTable = (props: any) => {
  const { subject } = props;

  const [fetchQuery, { called, loading, data }] = useLazyQuery(QUERY, {
    variables: { subject: subject },
  });

  useEffect(() => {
    fetchQuery();
  }, [fetchQuery, subject]);

  if (loading) return <div>Loading...</div>;
  if (data)
    return (
      <>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Questions for subject {subject}</TableCaption>
            <Thead>
              <Tr>
                <Th isNumeric>Sr.</Th>
                <Th>Question</Th>
                <Th>Topic</Th>
                <Th>Subtopic</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data &&
                data["questions"].map((q: any, index: number) => {
                  return (
                    <Tr key={index}>
                      <Td isNumeric>{index}</Td>
                      <Td>{q.question_question_string}</Td>
                      <Td>{q.question_topic}</Td>
                      <Td>{q.question_subTopic}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
        <div>
          <Link
            href={{
              pathname: "/api/getRandomQuestions",
              query: { subject: subject },
            }}
          >
            <Button>Generate Paper</Button>
          </Link>
        </div>
      </>
    );
  return <>No questions present for subject {subject}</>;
};

export default QuestionTable;
