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
import changeModeratorStatus from "@/pages/api/changeModeratorStatus";

const ApproveModerator = () => {
  const [subject, setSubject] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleSubmit = async () => {
    console.log(address, subject);
    if (subject != "" && address != "") {
      console.log(address, subject);
      const res = await changeModeratorStatus(address);
      console.log(res);
    }
  };

  return <></>;
};

export default ApproveModerator;
