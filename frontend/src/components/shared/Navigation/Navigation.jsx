import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Container = styled.div`
  font-family: "Lora", serif;
  padding: 20px 0;
  position: fixed;
  z-index: 999;
  background-color: white;
  width: 100%;
  height: 80px;
`;
const Logo = styled.span`
  font-size: 22px;
`;
const Navigation = () => {
  return (
    <Container>
      <NavLink
        to="/"
        style={{
          textDecoration: "none",
          color: "#000000",
          fontWeight: "bold",
        }}
      >
        <Logo>Talkative</Logo>
      </NavLink>
    </Container>
  );
};

export default Navigation;
