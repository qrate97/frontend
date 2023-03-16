import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { gql, useLazyQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import updateQuestion from "@/pages/api/updateQuestion";

const QUERY = gql`
  query myQuery($subject: String!) {
    questions(where: { question_subject: $subject }) {
      id
      question_id
      question_question_string
      question_subject
      blockTimestamp
      question_applicant
      question_downvotes
      question_incentives
      question_status
      question_subTopic
      question_topic
      question_upvotes
      transactionHash
    }
  }
`;
const QuestionTable = (props: any) => {
  const { subject } = props;

  const { account, connectWallet, authReady } = useContext(AuthContext);
  const [fetchQuery, { called, loading, data }] = useLazyQuery(QUERY, {
    variables: { subject: subject },
  });

  const handleChange = async (id: number, status: boolean) => {
    await updateQuestion(id, subject, status);
  };

  useEffect(() => {
    console.log(account);
    if (account != "") fetchQuery();
  }, [fetchQuery, account, subject]);

  if (loading) return <div>Loading...</div>;
  console.log(data);
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Questions for subject {subject}</TableCaption>
        <Thead>
          <Tr>
            <Th isNumeric>Sr.</Th>
            <Th>Question</Th>
            <Th>Topic</Th>
            <Th>Subtopic</Th>
            <Th>Status</Th>
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
                  <Td>
                    {q.question_status == 0 && <>PENDING</>}
                    {q.question_status == 1 && <>ACCEPTED</>}
                    {q.question_status == 2 && <>REJECTED</>}
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default QuestionTable;
