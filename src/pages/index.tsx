import ContributorForm from "@/components/forms/ContributorForm";
import CustomButton from "@/components/common/CustomButton";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@/context/authContext";

export default function Home() {
  const { account, connectWallet, authReady } = useContext(AuthContext);

  if(!account){
    return(
      <div className="flex h-full flex-col items-center justify-center shadow my-5 p-10">
        <p>Login and contribute to create a resourceful question bank.</p>
        <div className="flex my-10">
          <CustomButton handleClick={()=>{}} variant="solid">Continue with EOA</CustomButton>
          <CustomButton handleClick={()=>{}} variant="outline">Continue with Google</CustomButton>
        </div>
        
      </div>
    )
  } 
  else{
    return (
      <div className="flex h-full flex-col md:flex-row items-center shadow my-5">
        <div className="text-4xl text-center font-semibold w-1/2 p-5 justify-center flex flex-col items-center">
          <p>The largest question bank </p>
          <p>of crowd sourced questions</p>
          <div className="flex mt-10">
            <Link href={"/questions"}>
              <CustomButton variant="solid">View Questions</CustomButton>
            </Link>
            <Link href={"/moderator"}>
              <CustomButton variant="outline">Moderator</CustomButton>
            </Link>
          </div>
        </div>
        <div className="flex justify-center p-5 w-1/2">
          <ContributorForm />
        </div>
      </div>
    );
  }
  
  
}
