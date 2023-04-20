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
  Center,
} from "@chakra-ui/react";
import { gql, useLazyQuery } from "@apollo/client";
import { useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import updateQuestion from "@/pages/api/updateQuestion";

const QUERY = gql`
  query myQuery($subject: String!) {
    questions(where: { subject: $subject }) {
      quesId
      questionString
      subject
      blockTimestamp
      applicant
      downvotes
      status
      subTopic
      topic
      upvotes
    }
  }
`;
const ModeratorQuestion = (props: any) => {
  const { subject } = props;

  const { account, connectWallet, authReady } = useContext(AuthContext);
  const [fetchQuery, { called, loading, data }] = useLazyQuery(QUERY, {
    variables: { subject: subject },
  });

  const handleChange = async (id: number, status: boolean) => {
    await updateQuestion(id, status);
  };

  useEffect(() => {
    if (account != "") fetchQuery();
  }, [fetchQuery, account, subject]);

  if (account == "") return <div>Please connect your wallet</div>;
  if (loading) return <div>Loading...</div>;
  if (data["questions"].length > 0)
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
              <Th>Upvotes</Th>
              <Th>DownVotes</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data["questions"].map((q: any, index: number) => {
                return (
                  <Tr key={index}>
                    <Td isNumeric>{index}</Td>
                    <Td>{q.questionString}</Td>
                    <Td>{q.topic}</Td>
                    <Td>{q.subTopic}</Td>
                    <Td>
                      {q.status == 0 && <>PENDING</>}
                      {q.status == 1 && <>ACCEPTED</>}
                      {q.status == 2 && <>REJECTED</>}
                    </Td>
                    <Td>
                      <Center>{q.upvotes}</Center>
                    </Td>
                    <Td>
                      <Center>{q.downvotes}</Center>
                    </Td>
                    <Td>
                      <div className="flex">
                        <div
                          className="m-1 p-1 rounded border border-black cursor-pointer"
                          onClick={() => handleChange(q.quesId, true)}
                        >
                          Upvote
                        </div>
                        <div
                          className="m-1 p-1 rounded border border-black cursor-pointer"
                          onClick={() => handleChange(q.quesId, false)}
                        >
                          Downvote
                        </div>
                      </div>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  return <>No questions present for your subject {subject}</>;
};

export default ModeratorQuestion;
