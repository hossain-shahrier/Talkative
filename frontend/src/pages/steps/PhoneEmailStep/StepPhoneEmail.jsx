import { useState } from "react";
import styled from "styled-components";
import Email from "./Email/Email";
import Phone from "./Phone/Phone";
const Container = styled.div``;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const RightContainer = styled.div``;
const Title = styled.span``;
const Button = styled.button``;

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};
const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];

  return (
    <Container>
      <LeftContainer>
        <Component onNext={onNext} />
      </LeftContainer>
    </Container>
  );
};

export default StepPhoneEmail;
