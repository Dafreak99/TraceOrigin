import { Box, Flex, Heading, Text } from "@chakra-ui/core";
import { Form, Input, Button, Image } from "antd";
import Link from "next/link";
import { useState } from "react";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 3 },
};

const SignIn = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
            Sign In
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
            <Input size="large" name="username" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập vào mật khẩu!" }]}
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
              Đăng Nhập
            </Button>
          </Form.Item>

          <Form.Item wrapperCol="24">
            <Text
              fontSize="md"
              textAlign="center"
              fontStyle="italic"
              color="gray.300"
            >
              Bạn chưa có tài khoản ?{" "}
              <Link href="/signup">
                <a>Tạo tài khoản</a>
              </Link>{" "}
            </Text>
          </Form.Item>
        </Form>
      </Box>
    </Flex>
  );
};

export default SignIn;
