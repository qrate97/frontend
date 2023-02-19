import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  RadioGroup,
  Radio,
  HStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import AuthContext from "../context/authContext";
import addQuestion from "@/pages/api/addQuestion";
import { subjects } from "@/data";

const ContributorForm = () => {
  const [subject, setSubject] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [subTopic, setSubTopic] = useState<string>("");
  const { account, authReady } = useContext(AuthContext);

  const handleSubmit = () => {
    console.log("in submit");
    console.log(account);
    if (question != "" && subject != "" && topic != "" && authReady)
      addQuestion(question, subject, topic, subTopic);
  };
  return (
    <FormControl className="flex justify-center flex-col">
      {/* <FormHelperText>We will never share your email.</FormHelperText> */}
      <FormLabel>Subject</FormLabel>
      <RadioGroup>
        <HStack spacing="24px">
          {subjects.map((s, index) => {
            return (
              <Radio
                value={s}
                checked={subject === s}
                key={index}
                onChange={(e) => setSubject(e.target.value)}
              >
                {s}
              </Radio>
            );
          })}
        </HStack>
      </RadioGroup>
      <FormLabel>Question</FormLabel>
      <Input
        type="text"
        placeholder="Enter your question here"
        isRequired
        onChange={(e) => setQuestion(e.target.value)}
      />
      <FormLabel>Topic</FormLabel>
      <Input
        type="text"
        placeholder="Enter your question's topic'"
        isRequired
        onChange={(e) => setTopic(e.target.value)}
      />
      <FormLabel>SubTopic</FormLabel>
      <Input
        type="text"
        placeholder="Enter subtopic"
        isRequired
        onChange={(e) => setSubTopic(e.target.value)}
      />
      <Button
        colorScheme="pink"
        variant="solid"
        className="text-black border border-black"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </FormControl>
  );
};

export default ContributorForm;
