import Head from "next/head";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
} from "@chakra-ui/core";
import { useToast } from "@chakra-ui/core";
import { useForm } from "react-hook-form";

import { useAuth } from "../lib/auth";
const IndexPage = () => {
  const toast = useToast();
  const { handleSubmit, register, errors } = useForm();
  const { user, signinWithEmail } = useAuth();
  const onSubmit = (values) => {
    signinWithEmail(values);
    toast({
      title: "Login Successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('trace-origin')) {
            window.location.href = "/dashboard"
          }
        `,
          }}
        />
      </Head>
      <Flex
        justify="center"
        align="center"
        height="100vh"
        width="100vw"
        backgroundColor="gray.800"
      >
        <Box
          as="form"
          width="500px"
          p={8}
          backgroundColor="#fff"
          borderRadius="3px"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Heading fontSize="30px" textAlign="center" mb={8}>
            Sign In {user && user.email}
          </Heading>
          <FormControl mb={4}>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              name="email"
              type="email"
              id="email"
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="email">Password</FormLabel>
            <Input
              name="password"
              type="password"
              id="password"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <Box textAlign="center">
            <Button backgroundColor="teal.500" color="#fff" type="submit">
              Sign In
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default IndexPage;
