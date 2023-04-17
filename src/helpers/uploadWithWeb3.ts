import { Web3Storage } from 'web3.storage';

const apiToken:string = process.env.NEXT_PUBLIC_WEB3STORAGE_API_TOKEN ?? "";
console.log(apiToken);
const client = new Web3Storage({ token: apiToken });

export default async function uploadWithWeb3(file:File[], name:string){
// Pack files into a CAR and send to web3.storage
const rootCid = await client.put(file, {
  name: name,
  maxRetries: 3,
});
 return rootCid;
}