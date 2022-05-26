import { API } from "config";
import { useFormik } from "formik";
import { ApiPostHelper, setCookie, setLocalStorage } from "helper";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import * as yup from "yup";
import Box from "../Box";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan, Small, Span } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

const Login: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values: any) => {
    // console.log(values);
    const respons = await ApiPostHelper(`${API}/auth/user/signin`, values);
    if (respons.status === 200) {
      // console.log("respons", respons);
      const { existingUser, token } = respons.data.message;
      const {
        id,
        email,
        firstName,
        lastName,
        phoneNumber,
        accountType,
      } = existingUser;

      const user = {
        id,
        email,
        phone: phoneNumber,
        first_name: firstName,
        last_name: lastName,
        rules: accountType,
      };
      setCookie("token", token);
      setLocalStorage("user", JSON.stringify(user));
      setMessage("User login successfully...");
      // router.push("/");
      router.reload();
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });

  return (
    <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          Welcome To Library
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Log in with email & password
        </H5>
        {
          message && (
            <H5
              fontWeight="600"
              fontSize="12px"
              color="green"
              textAlign="center"
              mb="2.25rem"
            >
              {message}
            </H5>
          )
        }

        <TextField
          mb="0.75rem"
          name="email"
          placeholder="exmple@mail.com"
          label="Email or Phone Number"
          type="email"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ""}
          errorText={touched.email && errors.email}
        />
        <TextField
          mb="1rem"
          name="password"
          placeholder="*********"
          autoComplete="on"
          type={passwordVisibility ? "text" : "password"}
          label="Password"
          fullwidth
          endAdornment={
            <IconButton
              size="small"
              type="button"
              p="0.25rem"
              mr="0.25rem"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password || ""}
          errorText={touched.password && errors.password}
        />

        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
        >
          Login
        </Button>

        <Box mb="1rem">
          <Divider width="200px" mx="auto" />
          <FlexBox justifyContent="center" mt="-14px">
            <Span color="text.muted" bg="body.paper" px="1rem">
              on
            </Span>
          </FlexBox>
        </Box>

        <FlexBox
          justifyContent="center"
          alignItems="center"
          bg="#3B5998"
          borderRadius={5}
          height="40px"
          color="white"
          cursor="pointer"
          mb="0.75rem"
        >
          <Icon variant="small" defaultcolor="auto" mr="0.5rem">
            facebook-filled-white
          </Icon>
          <Small fontWeight="600">Continue with Facebook</Small>
        </FlexBox>

        <FlexBox
          justifyContent="center"
          alignItems="center"
          bg="#4285F4"
          borderRadius={5}
          height="40px"
          color="white"
          cursor="pointer"
          mb="1.25rem"
        >
          <Icon variant="small" defaultcolor="auto" mr="0.5rem">
            google-1
          </Icon>
          <Small fontWeight="600">Continue with Google</Small>
        </FlexBox>

        <FlexBox justifyContent="center" mb="1.25rem">
          <SemiSpan>Don’t have account?</SemiSpan>
          <Link href="/signup">
            <a>
              <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                Sign Up
              </H6>
            </a>
          </Link>
        </FlexBox>
      </form>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Forgot your password?</SemiSpan>
        <Link href="/">
          <a>
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Reset It
            </H6>
          </a>
        </Link>
      </FlexBox>
    </StyledSessionCard>
  );
};

const initialValues = {
  email: "",
  password: "",
};

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
});

export default Login;
