import { Button } from "@chakra-ui/react";
import React from "react";

interface ButtonProps {
  variant: string;
  handleClick?: () => void;
  children?: React.ReactNode;
}
const CustomButton = ({ children, handleClick, variant }: ButtonProps) => {
  return (
    <Button variant={variant} colorScheme="pink" onClick={handleClick} m={2}>
      {children}
    </Button>
  );
};

export default CustomButton;
