import { ethers } from 'ethers';
import { contractAddress, abi } from '@/utils';

export default async function addModerator(name:string, subject:string, cid:string){
    try{
      const { ethereum } = window;
      if(ethereum){
        const provider =  new ethers.BrowserProvider(ethereum)
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        let tx = await contract.applyAsModerator(name, subject, cid);
        tx.wait();
        console.log(tx);
        return true
      }
      else {
        return false
      }
    }
    catch(error){
      console.error(error)
      return false
    }
}