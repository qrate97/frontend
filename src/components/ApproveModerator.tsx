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

const ApproveModerator = () => {
  return (
    <FormControl className="flex justify-center flex-col w-1/2">
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
      <FormLabel>Address</FormLabel>
      <Input type="text" placeholder="Wallet Address of Moderator" isRequired />
      <Button
        colorScheme="pink"
        variant="solid"
        className="text-black border border-black"
      >
        Add Moderator
      </Button>
    </FormControl>
  );
};

export default ApproveModerator;
