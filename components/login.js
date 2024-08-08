"use client"

import { ChatIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Stack } from "@chakra-ui/react"
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";

export default function Login(params) {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    return (
        <>
            <Center h="100vh">
                <Stack 
                align="center"
                bgColor="gray.600"
                p={16}
                rounded="3xl"
                spacing={12}
                boxShadow="lg">
                    <Box 
                    bgColor="blue.500"
                    w="fit-content"
                    padding={5}
                    rounded="3xl"
                    boxShadow="md">
                    
                    
                    <ChatIcon w="100px" h="100px" color="white" />
                    </Box>
                    <Button boxShadow="md" onClick={() => signInWithGoogle("", {prompt: "select_account"})}>Sign In with Google</Button>
                </Stack>
            </Center>
        </>
        
    )
}