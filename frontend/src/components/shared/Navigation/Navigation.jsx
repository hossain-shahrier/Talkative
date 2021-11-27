import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { logout } from "../../../http";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";

const Container = styled.div`
  font-family: "Lora", serif;
  padding: 20px 0;
  position: fixed;
  z-index: 999;
  background-color: white;
  width: 100%;
  height: 80px;
  max-width: 90%;
`;
const Logo = styled.span`
  font-size: 22px;
`;
const Button = styled.button`
  font-family: "Open Sans", sans-serif;
  background-color: #639fab;
  width: 100px;
  height: 40px;
  margin-top: 10px;
  color: #ffffff;
  :hover {
    background-color: #5999a6;
  }
`;
const Navigation = () => {
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      const data = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Container>
      <NavLink
        to="/"
        style={{
          textDecoration: "none",
          color: "#000000",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo>Talkative</Logo>
        <Button onClick={logoutUser()}>Logout</Button>
      </NavLink>
    </Container>
  );
};

export default Navigation;
