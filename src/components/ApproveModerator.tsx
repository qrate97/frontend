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
import approveModerator from "@/pages/api/addModerator";

const subjects = ["DSA", "Blockchain", "Python", "RDBMS"];

const ApproveModerator = () => {
  const [subject, setSubject] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleSubmit = async () => {
    console.log("inSubmit");
    if (subject != "" && address != "") {
      console.log("inid");
      const res = await approveModerator(address, subject);
      console.log(res);
    }
  };

  return (
    <FormControl className="flex justify-center flex-col w-1/2">
      {/* <FormHelperText>We will never share your email.</FormHelperText> */}
      <FormLabel>Subject</FormLabel>
      <RadioGroup defaultValue="Blockchain">
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
      <FormLabel>Address</FormLabel>
      <Input
        type="text"
        placeholder="Wallet Address of Moderator"
        isRequired
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button
        colorScheme="pink"
        variant="solid"
        className="text-black border border-black"
        onClick={handleSubmit}
      >
        Add Moderator
      </Button>
    </FormControl>
  );
};

export default ApproveModerator;
