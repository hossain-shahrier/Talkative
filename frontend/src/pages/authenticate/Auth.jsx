import { useState } from "react";
import styled from "styled-components";
import StepOtp from "../steps/OtpStep/StepOtp";
import tw from "twin.macro";

const Container = styled.div`
  ${tw`
    flex
    items-center
`}
  justify-content:space-between;
  position: relative;
  top: 80px;
  height: 80vh;
  width: 80vw;
`;
const steps = {
  1: StepOtp,
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
