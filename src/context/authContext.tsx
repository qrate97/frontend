import { createContext, useEffect, useState } from "react";
const AuthContext = createContext({
  account: "",
  connectWallet: () => {},
  authReady: false,
});

export const AuthContextProvider = ({ children }: any) => {
  const [account, setAccount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    console.log("in connect wallet");
    setLoading(true);
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
      setAuthReady(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setAccount(account);
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
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
