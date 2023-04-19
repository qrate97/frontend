import { ethers } from 'ethers';
import { contractAddress, abi } from '@/utils';

export default async function updateQuestion(id: number, status:boolean){
 
    try{
      const { ethereum } = window;
      if(ethereum){
        const provider =  new ethers.BrowserProvider(ethereum)
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        //console.log(contract)
        let tx = await contract.updateQuestion(id, status);
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