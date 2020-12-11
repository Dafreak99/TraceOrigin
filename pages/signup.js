import { Box, Flex, Heading, Text } from "@chakra-ui/core";
import { Form, Input, Button, Checkbox, Image } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 3 },
};

const SignUp = () => {
  let [unmatchedPassword, setUnmatchedPassword] = useState(false);
  let [error, setError] = useState();

  const onFinish = (values) => {
    console.log("Success:", values);

    values.password !== values.repassword
      ? setUnmatchedPassword(true)
      : setUnmatchedPassword(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (unmatchedPassword) {
      setError({
        validateStatus: "error",
        help: "Mật khẩu không trùng khớp",
      });
    } else {
      setError({});
    }
  }, [unmatchedPassword]);

  return (
    <Flex
      backgroundColor="#426789"
      h="100vh"
      w="100vw"
      justify="center"
      align="center"
    >
      <Box
        as="form"
        w={{ base: "400px", lg: "600px" }}
        background="#fff"
        px={8}
        py={12}
        boxShadow="0 15px 40px rgb(70 85 109 / 32%)"
        borderRadius="3px"
      >
        <Box textAlign="center">
          <Image src="/water.svg" height="30px" width="40px" />

          <Heading size="lg" mb={12}>
            Sign Up
          </Heading>
        </Box>

        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập vào tên đăng nhập!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập vào mật khẩu!" }]}
          >
            <Input.Password size="large" name="username" />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu"
            name="repassword"
            rules={[{ required: true, message: "Vui lòng nhập laị mật khẩu!" }]}
            {...error}
          >
            <Input.Password size="large" name="password" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              size="large"
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px 30px",
                backgroundColor: "#426789",
                color: "#fff",
                borderRadius: "3px",
              }}
              htmlType="submit"
            >
              Đăng Kí
            </Button>
          </Form.Item>

          <Form.Item wrapperCol="24">
            <Text
              fontSize="md"
              textAlign="center"
              fontStyle="italic"
              color="gray.300"
            >
              Bạn đã có tài khoản ?{" "}
              <Link href="/signin">
                <a>Đăng nhập</a>
              </Link>{" "}
            </Text>
          </Form.Item>
        </Form>
      </Box>
    </Flex>
  );
};

export default SignUp;
