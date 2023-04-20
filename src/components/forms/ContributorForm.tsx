import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  HStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import addQuestion from "@/pages/api/addQuestion";
import { gql, useLazyQuery } from "@apollo/client";
const QUERY = gql`
  query myQuery {
    subjects {
      id
      subject_name
    }
  }
`;

const ContributorForm = () => {
  const [subject, setSubject] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [subTopic, setSubTopic] = useState<string>("");
  const { account, authReady } = useContext(AuthContext);

  const [fetchQuery, { called, loading, data }] = useLazyQuery(QUERY);

  useEffect(() => {
    fetchQuery();
  }, [fetchQuery]);

  const handleSubmit = () => {
    console.log("in submit");
    console.log(account);
    if (question != "" && subject != "" && topic != "" && authReady)
      addQuestion(question, subject, topic, subTopic);
  };
  return (
    <FormControl className="flex justify-center flex-col p-5">
      <FormLabel>Subject</FormLabel>
      <RadioGroup>
        <HStack spacing="24px">
          {data &&
            data["subjects"].map((s: any, index: number) => {
              return (
                <Radio
                  value={s.subject_name}
                  checked={subject === s.subject_name}
                  key={index}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  {s.subject_name}
                </Radio>
              );
            })}
        </HStack>
      </RadioGroup>
      <FormLabel mt={5}>Question</FormLabel>
      <Input
        type="text"
        placeholder="Enter your question here"
        isRequired
        onChange={(e) => setQuestion(e.target.value)}
      />
      <FormLabel mt={5}>Topic</FormLabel>
      <Input
        type="text"
        placeholder="Enter your question's topic'"
        isRequired
        onChange={(e) => setTopic(e.target.value)}
      />
      <FormLabel mt={5}>SubTopic</FormLabel>
      <Input
        type="text"
        placeholder="Enter subtopic"
        isRequired
        onChange={(e) => setSubTopic(e.target.value)}
      />
      <Button
        colorScheme="pink"
        variant="solid"
        className="text-black"
        onClick={handleSubmit}
        mt={5}
      >
        Submit
      </Button>
    </FormControl>
  );
};

export default ContributorForm;
