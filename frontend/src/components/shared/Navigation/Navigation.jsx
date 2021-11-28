import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../http";
import { setAuth } from "../../../store/authSlice";
// import { useHistory } from "react-router-dom";

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
const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  justify-content: space-between;
`;
const Name = styled.span`
  padding-top: 5px;
  font-size: 14px;
  font-weight: 300;
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
  // const history = useHistory();

  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);

  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }
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
        {isAuth && (
          <AccountContainer>
            <Name>{user?.username}</Name>
            <Button
              onClick={() => {
                logoutUser();
              }}
            >
              Logout
            </Button>
          </AccountContainer>
        )}
      </NavLink>
    </Container>
  );
};

export default Navigation;
