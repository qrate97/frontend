import React, { useState } from "react";
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
import { ModeratorType } from "@/types";
import changeModeratorStatus from "@/pages/api/changeModeratorStatus";
import { AiOutlineEye } from "react-icons/ai";
import CustomButton from "./common/CustomButton";
import Link from "next/link";

const ApproveModerator = ({ moderators }: { moderators: ModeratorType[] }) => {
  const handleSubmit = async (address: string) => {
    const res = await changeModeratorStatus(address);
    console.log(res);
  };

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Moderator List</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Subject</Th>
            <Th>Address</Th>
            <Th>Proof</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {moderators.map((moderator: any, index: number) => {
            return (
              <Tr key={index}>
                <Td>{moderator.name}</Td>
                <Td>{moderator.subject}</Td>
                <Td>{moderator.moderatorAddress}</Td>
                <Td>
                  <Link
                    href={`https://w3s.link/ipfs/${moderator.proof}`}
                    target="_blank"
                  >
                    <AiOutlineEye size={24} color={"blue"} />
                  </Link>
                </Td>
                <Td>
                  <CustomButton
                    variant="solid"
                    handleClick={() => handleSubmit(moderator.moderatorAddress)}
                  >
                    {moderator.approved ? <>Disapprove</> : <>Approve</>}
                  </CustomButton>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ApproveModerator;
