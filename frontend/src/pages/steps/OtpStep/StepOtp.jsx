import { useState } from "react";
import styled from "styled-components";

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

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  return (
    <Container>
      <LeftContainer>
        <LeftContainerTitle>
          Enter the code, we have just texted you
        </LeftContainerTitle>
        <OTPInput
          type="number"
          placeholder="Enter your OTP number"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button onClick={onNext}>Next</Button>
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