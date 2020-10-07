import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { useAuth } from "../lib/AuthContext";
import Link from "next/link";

const SignIn = () => {
  const { handleSubmit, register, errors } = useForm();
  const { signIn } = useAuth();

  const onSubmit = (values) => signIn(values);

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
        width="700px"
        p={12}
        backgroundColor="#fff"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading textAlign="center" mb={12}>
          Đăng nhập
        </Heading>

        <FormControl mb={6}>
          <FormLabel htmlFor="email" color="#58617A">
            Tên tài khoản
          </FormLabel>
          <Input
            type="text"
            id="username"
            name="username"
            height="50px"
            ref={register({
              required: "Required",
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password" color="#58617A">
            Mật khẩu
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
        <FormControl textAlign="center" mt={12}>
          <Button type="submit" backgroundColor="#426789" color="#fff">
            Đăng nhập
          </Button>
        </FormControl>

        <FormControl
          display="flex"
          flexDirection="row"
          justifyContent="center"
          textAlign="center"
          fontStyle="italic"
          color="gray.500"
          mt={4}
        >
          Chưa có tài khoản ?
          <Link href="/signup">
            <a>
              <Text color="#007bff" ml={1} textDecoration="underline">
                Đăng kí
              </Text>
            </a>
          </Link>
        </FormControl>
      </Box>
    </Flex>
  );
};

export default SignIn;
