// components/AuthWrapper.js
"use client";

import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";
import Sidebar from "./sidebar";
import Login from "./login";

export default function AuthWrapper({ children }) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      </ChakraProvider>
    );
  }

  if (error) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <div>Error: {error.message}</div>
        </Center>
      </ChakraProvider>
    );
  }

  if (!user) {
    return (
      <ChakraProvider>
        <Login />
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      {/* {user ? <Sidebar /> : <Login />} */}
      {children}
    </ChakraProvider>
  );
}
