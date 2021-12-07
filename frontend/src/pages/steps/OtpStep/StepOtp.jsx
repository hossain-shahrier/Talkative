import { useState } from "react";
import { useHistory } from "react-router-dom";
import { activate } from "../../../http";
import styled from "styled-components";
import { verifyOTP } from "../../../http";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import Loader from "../../../components/shared/Loader/Loader";
const Container = styled.div`
  font-family: "Open Sans", sans-serif;
  display: flex;
  align-items: center;

  height: 80vh;
  width: 80vw;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
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

const StepOtp = () => {
  // Redux
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
        .then(() => {
          try {
            activate({ username, email, phone })
              .then((userData) => {
                const { data } = userData;
                dispatch(setAuth(data));
                history.push("/rooms");
              })
              .catch((err) => {
                setErrorMessage({
                  message: err.response.data.message,
                });
              })
              .finally(() => {
                setLoading(false);
              });
          } catch (error) {
            console.log(error);
          }
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
  if (loading) return <Loader message="Account activation is in Process..." />;
  return (
    <Container>
      <Wrapper>
        <Title>Enter the code, we have just texted you</Title>
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
      </Wrapper>
    </Container>
  );
};

export default StepOtp;
