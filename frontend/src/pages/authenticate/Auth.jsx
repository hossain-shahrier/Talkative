import { useState } from "react";
import styled from "styled-components";
import StepPhoneEmail from "../steps/PhoneEmailStep/StepPhoneEmail";
import StepOtp from "../steps/OtpStep/StepOtp";

const Container = styled.div`
  display: flex;
  position: relative;
  top: 80px;
  align-items: center;
  height: 80vh;
  width: 80vw;
  justify-content: space-between;
`;
const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};
const Auth = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];
  const onNext = () => {
    setStep(step + 1);
  };
  return (
    <Container>
      <Step onNext={onNext} />
    </Container>
  );
};

export default Auth;
