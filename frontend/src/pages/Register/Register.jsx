import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import tw from "twin.macro";
import { useState } from "react";
import { sendOTP } from "../../http";
import { useDispatch } from "react-redux";
import { setUser, setOTP } from "../../store/authSlice";
import Loader from "../../components/shared/Loader/Loader";
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
const Error = styled.span`
  margin-top: 10px;
  font-size: 12px;
  font-family: "Lora", serif;
  letter-spacing: 1px;
  color: red;
`;
const RegistrationButton = styled.button`
  background-color: #639fab;
  width: 230px;
  height: 50px;
  margin-top: 10px;
  color: #ffffff;
  :hover {
    background-color: #5999a6;
  }
`;
const Login = styled.div`
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

const Register = () => {
  // Redux
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      inputs.username === "" ||
      inputs.password === "" ||
      inputs.email === "" ||
      inputs.phone_number === ""
    ) {
      setErrorMessage({
        message: "*Fields can not be empty.",
      });
    } else if (inputs.username.length < 6 || inputs.password.length < 6) {
      setErrorMessage({
        message:
          "*Username or passsword length can not be less than Six letters.",
      });
    } else if (inputs.phone_number.length < 11) {
      setErrorMessage({
        message: "*Phone number can not be less than Eleven letters.",
      });
    } else if (ref.test(inputs.email) === false) {
      setErrorMessage({
        message: "*Invalid email address.",
      });
    } else {
      dispatch(
        setUser({
          username: inputs.username,
          password: inputs.password,
          email: inputs.email,
          phone: inputs.phone_number,
        })
      );
      await sendOTP({ phone: inputs.phone_number })
        .then((data) => {
          dispatch(setOTP({ hash: data.data.hash }));
          history.push("/authenticate");
        })
        .catch((err) => {
          setErrorMessage({
            message: err.response.data.message,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  if (loading) return <Loader message="Sending OTP in Process..." />;
  return (
    <Container>
      <LeftContainer>
        <LeftContainerTitle>Welcome to Talkative</LeftContainerTitle>
        <LeftContainerDescription>
          Get ready to be a talkative.
          <br /> Create or enter in a room and talk.
        </LeftContainerDescription>
        <RegistrationFormContainer>
          <RegistrationForm>
            <FormInput>
              <InputSpan>Username</InputSpan>
              <Input
                type="text"
                name="username"
                autoFocus
                placeholder="Enter your username"
                onChange={(e) => handleChange(e)}
              />
            </FormInput>
            <FormInput>
              <InputSpan>Email</InputSpan>
              <Input
                type="email"
                name="email"
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
            </FormInput>

            <FormInput>
              <InputSpan>Phone number</InputSpan>
              <Input
                style={{ position: "relative" }}
                type="text"
                name="phone_number"
                placeholder="Enter your phone number"
                onChange={(e) => handleChange(e)}
              />

              <Error>{errorMessage.message}</Error>
            </FormInput>

            <RegistrationButton
              style={{}}
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Next
            </RegistrationButton>
            <Login>
              Already have an account?
              <NavLink to="/" style={{ color: "#1C5D99", marginLeft: "5px" }}>
                Login
              </NavLink>
            </Login>
          </RegistrationForm>
        </RegistrationFormContainer>
      </LeftContainer>
      <RightContainer>
        <RightContainerImage src="/images/background.jpg" />
      </RightContainer>
    </Container>
  );
};

export default Register;
