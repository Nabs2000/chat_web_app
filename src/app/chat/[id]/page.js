"use client";

import {
  Avatar,
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import Sidebar from "../../../../components/sidebar";
import { useParams } from "next/navigation";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../../firebaseconfig";
import { auth } from "../../../../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import getOtherEmail from "../../../../utils/getOtherEmail";
import { useState, useRef, useEffect } from "react";

const Topbar = ({ email }) => {
  return (
    <Flex bg="gray.100" h="81px" w="100%" align="center" p={5}>
      <Avatar src="" marginEnd={3} />
      <Heading size="lg">{email}</Heading>
    </Flex>
  );
};

const Bottombar = ({ id, email }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      timestamp: serverTimestamp(),
      sender: email,
    });
    setInput("");
  };
  return (
    <FormControl p={3} onSubmit={sendMessage} as="form">
      <Input
        placeholder="Type a message..."
        autoComplete="off"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit" hidden>
        Submit
      </Button>
    </FormControl>
  );
};
export default function Chat() {
  const [user] = useAuthState(auth);
  const params = useParams();
  const { id } = params;
  // Create a query to get the messages ordered by timestamp
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const [chat] = useDocumentData(doc(db, "chats", id));
  const bottomOfChat = useRef(null);
  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (bottomOfChat.current) {
      bottomOfChat.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const getMessages = () =>
    messages?.map((msg) => {
      return (
        <Flex
          key={Math.random()}
          bg={msg.sender == user.email ? "green.100" : "blue.100"}
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={3}
          m={1}
          alignSelf={msg.sender == user.email ? "flex-end" : null}
        >
          <Text>{msg.text}</Text>
        </Flex>
      );
    });

  return (
    <Flex>
      <Sidebar />

      <Flex flex={1} direction="column">
        <Topbar email={getOtherEmail(chat?.users, user)} />

        <Flex
          flex={1}
          direction="column"
          pt={4}
          mx={5}
          overflowX="scroll"
          sx={{ scrollbarWidth: "none" }}
        ></Flex>
        {getMessages()}
        <div ref={bottomOfChat}></div>
        <Bottombar id={id} email={user.email} />
      </Flex>
    </Flex>
  );
}
