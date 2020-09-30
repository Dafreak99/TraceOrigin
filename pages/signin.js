import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  Text,
  Image,
} from "@chakra-ui/core";
import { auth } from "firebase";
import { useForm } from "react-hook-form";
import { useAuth } from "../lib/auth";

const SignIn = () => {
  const { handleSubmit, register, errors } = useForm();
  const { user, signinWithEmail, signinWithGoogle, signout } = useAuth();

  const onSubmit = (values) => signinWithEmail(values);

  return (
    <Flex
      height="100vh"
      width="100vw"
      justify="center"
      align="center"
      backgroundColor="#426789"
    >
      <Box
        as="form"
        width="800px"
        px={8}
        py={12}
        backgroundColor="#fff"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading textAlign="center">Sign In</Heading>

        <FormControl mb={6}>
          <FormLabel htmlFor="email" color="#58617A">
            Email address
          </FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            height="50px"
            ref={register({
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
          />
        </FormControl>
        <FormControl mb={6}>
          <FormLabel htmlFor="password" color="#58617A">
            Password
          </FormLabel>
          <Input
            name="password"
            type="password"
            id="password"
            height="50px"
            ref={register({
              required: "Required",
            })}
          />
        </FormControl>
        <FormControl textAlign="center">
          <Button type="submit" backgroundColor="#426789" color="#fff">
            Sign In
          </Button>
        </FormControl>
        <FormControl position="relative" py={8}>
          <Text
            position="absolute"
            right="50%"
            top="50%"
            transform="translateY(-50%);"
            fontWeight="bold"
            backgroundColor="#fff"
            zIndex="1"
          >
            OR
          </Text>
          <Divider></Divider>
        </FormControl>

        <FormControl>
          <Button
            height="auto"
            backgroundColor="#1481F5"
            px={4}
            py={2}
            color="#fff"
            onClick={signinWithGoogle}
          >
            <Box backgroundColor="#fff" mr={2}>
              <Image src="/google.svg" height="32px"></Image>
            </Box>
            Google
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
};

export default SignIn;
