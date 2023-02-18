import React from "react";
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

const ContributorForm = () => {
  return (
    <FormControl className="flex justify-center flex-col">
      {/* <FormHelperText>We will never share your email.</FormHelperText> */}
      <FormLabel>Subject</FormLabel>
      <RadioGroup defaultValue="Itachi">
        <HStack spacing="24px">
          <Radio value="DSA">DSA</Radio>
          <Radio value="Blockchain">Blockchain</Radio>
          <Radio value="Python">Python</Radio>
          <Radio value="RDBMS">RDBMS</Radio>
        </HStack>
      </RadioGroup>
      <FormLabel>Question</FormLabel>
      <Input type="text" placeholder="Enter your question here" isRequired />

      <FormLabel>Topic</FormLabel>
      <Input type="text" placeholder="Enter your question here" isRequired />
      <FormLabel>SubTopic</FormLabel>
      <Input type="text" placeholder="Enter your question here" isRequired />
      <Button
        colorScheme="pink"
        variant="solid"
        className="text-black border border-black"
      >
        Submit
      </Button>
    </FormControl>
  );
};

export default ContributorForm;
