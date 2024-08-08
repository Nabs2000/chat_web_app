import { Box, Flex, Text } from "@chakra-ui/react";
import Sidebar from "../../components/sidebar";

// app/page.js
export default function HomePage() {
  return (
    <Box>
      <Text align="center" marginTop={5}>
        Welcome to the Chat App!
        <Sidebar />
      </Text>
    </Box>
  );
}
