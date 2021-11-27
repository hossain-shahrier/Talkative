import { useState } from "react";
import { useHistory } from "react-router-dom";
import { activate } from "../../../http";
import styled from "styled-components";
import { verifyOTP } from "../../../http";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
const Container = styled.div``;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const LeftContainerTitle = styled.span`
  font-size: xx-large;
  margin-bottom: 10px;
`;
const OTPInput = styled.input`
  border: 0.5px solid #000000;
  outline: none;
  width: 380px;
  height: 49px;
  padding: 10px;
  ::placeholder {
    font-style: italic;
  }
  margin-bottom: 10px;
`;
const Error = styled.span`
  font-size: 12px;
  font-family: "Lora", serif;
  letter-spacing: 1px;
  color: red;
`;
const BottomParagraph = styled.span``;
const Button = styled.button`
  background-color: #639fab;
  width: 230px;
  height: 50px;
  margin-top: 10px;
  color: #ffffff;
  :hover {
    background-color: #5999a6;
  }
  margin-bottom: 10px;
`;
const RightContainer = styled.div``;

const StepOtp = () => {
  // Redux
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    message: "",
  });
  const history = useHistory();
  const { phone, username, email, password } = useSelector(
    (state) => state.auth.user
  );

  const { hash } = useSelector((state) => state.auth.otp);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length === 0) {
      setErrorMessage({
        message: "OTP is required",
      });
    } else {
      await verifyOTP({
        otp,
        phone,
        username,
        email,
        password,
        hash,
      })
        .then((data) => {
          try {
            activate({ username, email, phone })
              .then((user) => {
                console.log(user);
                dispatch(setAuth(user));
                history.push("/rooms");
              })
              .catch((err) => {
                console.log(err);
              });
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => {
          setErrorMessage({
            message: err.response.data.message,
          });
        });
    }
  };
  return (
    <Container>
      <LeftContainer>
        <LeftContainerTitle>
          Enter the code, we have just texted you
        </LeftContainerTitle>
        <OTPInput
          type="number"
          name="otp"
          autoFocus
          placeholder="Enter your OTP number"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Error>{errorMessage.message}</Error>
        <Button onClick={(e) => handleSubmit(e)}>Next</Button>
        <BottomParagraph>
          By entering your number, you're agreeing to our Terms of Service and
          Privacy Policy.
        </BottomParagraph>
      </LeftContainer>
      <RightContainer></RightContainer>
    </Container>
  );
};

export default StepOtp;
