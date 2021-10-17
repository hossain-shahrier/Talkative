import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import tw from "twin.macro";
import { useState } from "react";

const Container = styled.div`
  font-family: "Open Sans", sans-serif;
  display: flex;
  position: relative;
  top: 80px;
  align-items: center;
  height: 80vh;
  width: 80vw;
  justify-content: space-between;
`;
const LeftContainer = styled.div``;
const LeftContainerTitle = styled.h1`
  font-family: "Lora", serif;
  ${tw`
  lg:text-4xl
  text-3xl
  font-bold
`}
`;
const LeftContainerDescription = styled.p`
  font-size: medium;
  ${tw`
  mt-2.5
  font-semibold
`}
`;
const RegistrationFormContainer = styled.div``;
const RegistrationForm = styled.form`
  ${tw`
  mt-5
`}
`;
const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  font-size: 12px;
`;
const InputSpan = styled.span`
  font-size: medium;
  font-weight: 600;
  margin-bottom: 2px;
`;
const Input = styled.input`
  border: 0.5px solid #000000;
  outline: none;
  width: 380px;
  height: 49px;
  padding: 10px;
  ::placeholder {
    font-style: italic;
  }
`;
const ForgotPassword = styled.span`
  text-decoration: underline;
  margin-top: 5px;
  font-weight: 500;
  cursor: pointer;
`;
const Error = styled.span`
  margin-top: 10px;
  font-size: 12px;
  font-family: "Lora", serif;
  letter-spacing: 1px;
  color: red;
`;
const LoginButton = styled.button`
  background-color: #639fab;
  width: 230px;
  height: 50px;
  margin-top: 10px;
  color: #ffffff;
  :hover {
    background-color: #5999a6;
  }
`;
const Register = styled.div`
  margin-top: 10px;
  font-size: small;
  font-weight: 600;
`;
const RightContainer = styled.div`
  width: 50%;
  ${tw`
    hidden
    md:hidden
    lg:flex
  `}
`;
const RightContainerImage = styled.img`
  object-fit: cover;
  border-radius: 25px;
  box-shadow: 1px 1px 15px 5px lightgray;
`;

const Login = () => {
  // Form Handling
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState({
    message: "",
  });
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    phone_number: "",
  });
  const handleChange = (e) => {
    setErrorMessage({
      username: "",
      password: "",
      email: "",
      phone_number: "",
    });
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const ref =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputs.email === "" || inputs.password === "") {
      setErrorMessage({
        message: "*Fields can not be empty.",
      });
    } else if (inputs.password.length < 6) {
      setErrorMessage({
        message: "*Passsword length can not be less than Six letters.",
      });
    } else if (ref.test(inputs.email) === false) {
      setErrorMessage({
        message: "*Invalid email address.",
      });
    } else {
      history.push("/dashboard");
    }
  };
  return (
    <Container>
      <LeftContainer>
        <LeftContainerTitle>Welcome back to Talkative</LeftContainerTitle>
        <LeftContainerDescription>
          Get ready to be connected.
          <br /> Create or enter in your room and talk.
        </LeftContainerDescription>
        <RegistrationFormContainer>
          <RegistrationForm>
            <FormInput>
              <InputSpan>Email</InputSpan>
              <Input
                type="email"
                name="email"
                autoFocus
                placeholder="Enter your email address"
                onChange={(e) => handleChange(e)}
              />
            </FormInput>
            <FormInput>
              <InputSpan>Password</InputSpan>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => handleChange(e)}
              />
              {/* <NavLink to="/"> */}
              <ForgotPassword>Forgot your password?</ForgotPassword>
              {/* </NavLink> */}
              <Error>{errorMessage.message}</Error>
            </FormInput>

            <LoginButton
              style={{}}
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </LoginButton>
            <Register>
              Does't have an account?
              <NavLink to="/" style={{ color: "#1C5D99", marginLeft: "5px" }}>
                Register
              </NavLink>
            </Register>
          </RegistrationForm>
        </RegistrationFormContainer>
      </LeftContainer>
      <RightContainer>
        <RightContainerImage src="/images/login_background.jpg" />
      </RightContainer>
    </Container>
  );
};

export default Login;
