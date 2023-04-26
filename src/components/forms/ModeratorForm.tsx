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
import addModerator from "@/pages/api/addModerator";
import uploadWithWeb3 from "@/helpers/uploadWithWeb3";
import { gql, useLazyQuery } from "@apollo/client";
const QUERY = gql`
  query myQuery {
    subjects {
      id
      name
    }
  }
`;

const ModeratorForm = () => {
  const [subject, setSubject] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<any>();
  const { account, authReady } = useContext(AuthContext);
  const [fetchQuery, { called, loading, data }] = useLazyQuery(QUERY);

  useEffect(() => {
    fetchQuery();
  }, [fetchQuery]);

  const handleSubmit = async () => {
    if (name != "" && subject != "" && file != null && authReady) {
      const cid: string = await uploadWithWeb3(file, name);
      if (cid != "") addModerator(name, subject, cid);
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //const files = Array.from();
    setFile(e.target.files);
  };
  return (
    <FormControl className="flex justify-center flex-col p-5">
      <FormLabel mt={5}>Name</FormLabel>
      <Input
        type="text"
        placeholder="Enter your name here"
        isRequired
        onChange={(e) => setName(e.target.value)}
      />
      <FormLabel mt={5}>Subject</FormLabel>
      <RadioGroup>
        <HStack spacing="24px">
          {data &&
            data["subjects"].map((s: any, index: number) => {
              return (
                <Radio
                  value={s.name}
                  checked={subject === s.name}
                  key={index}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  {s.name}
                </Radio>
              );
            })}
        </HStack>
      </RadioGroup>

      <FormLabel mt={5}>Proof</FormLabel>
      <Input
        type="file"
        placeholder="Enter a proof that you are qualified"
        isRequired
        onChange={handleFileSelected}
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

export default ModeratorForm;
