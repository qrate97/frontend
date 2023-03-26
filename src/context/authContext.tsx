import { EthersError } from "ethers";
import { createContext, useEffect, useState } from "react";

// class JsonRpcError extends Error {
//   code: number;
//   constructor(code: number, message: string) {
//     super(message);
//     this.code = code;
//     this.name = "JsonRpcError";
//   }
// }

const AuthContext = createContext({
  account: "",
  connectWallet: () => {},
  authReady: false,
  network: "",
  switchNetwork: () => {},
});

export const AuthContextProvider = ({ children }: any) => {
  const [account, setAccount] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  function handleChange() {
    window.location.reload();
  }

  const connectWallet = async () => {
    console.log("in connect wallet");
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      await checkNetwork();
      setAuthReady(true);
    } catch (err) {
      console.error(err);
    }
  };

  const checkNetwork = async () => {
    try {
      const { ethereum } = window;
      const chainId = await ethereum.request({
        method: "eth_chainId",
      });
      setNetwork(chainId);
      console.log(chainId);
    } catch (err) {
      console.error(err);
    }
  };

  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }],
        });
      } catch (error: any) {
        console.log(error.code);
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  chainName: "Polygon Mumbai Testnet",
                  rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                  nativeCurrency: {
                    name: "Mumbai Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(typeof error);
      }
    } else {
      // If window.ethereum is not found then MetaMask is not installed
      alert(
        "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html"
      );
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        alert("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setAccount(account);
        await checkNetwork();
        ethereum.on("accountsChanged", handleChange);
        ethereum.on("chainChanged", handleChange);
        setAuthReady(true);
      } else {
        console.log("No authorized account found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const context = {
    account,
    connectWallet,
    authReady,
    network,
    switchNetwork,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
