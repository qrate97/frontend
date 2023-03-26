import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Navbar from "@/components/header/Navbar";
import { AuthContextProvider } from "@/context/authContext";
import MainLayout from "@/components/layout/MainLayout";

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/aditipolkam/qrate97",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <AuthContextProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </AuthContextProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}
