import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { setAvatar } from "../../store/userSlice";

const Container = styled.div`
  height: 8vh;
  width: 80vw;
  position: relative;
  top: 80px;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  ${tw`
  text-3xl
  font-semibold
  pb-1
  `}
`;
const UserId = styled.span`
  ${tw`
  font-thin
  italic
  `}
`;
const AvatarWrapper = styled.div`
  width: 110px;
  height: 110px;
  border: 6px solid #0077ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 1rem;
`;
const Label = styled.label`
  cursor: pointer;
`;
const Image = styled.img`
  object-fit: cover;
`;
const ImageUpload = styled.div``;
const ImageInput = styled.input`
  display: none;
`;
const FormInput = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 10px;
`;
const InputSpan = styled.span`
  font-size: medium;
  font-weight: 600;
  margin-bottom: 2px;
  font-size: 12px;
`;
const Input = styled.input`
  border: 0.5px solid #000000;
  outline: none;
  width: 380px;
  height: 49px;
  padding: 10px;
  font-size: 12px;
  margin-bottom: 10px;
  ::placeholder {
    font-style: italic;
  }
`;
const Button = styled.button`
  background-color: #639fab;
  width: 230px;
  height: 50px;
  margin-top: 10px;
  color: #ffffff;
  :hover {
    background-color: #5999a6;
  }
`;
const User = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const [image, setImage] = useState("/images/monkey-avatar.png");
  const dispatch = useDispatch();
  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", image);
    fetch("/api/user/avatar", {
      method: "POST",
      body: formData,
    });
  };
  return (
    <Container>
      {isAuth && (
        <LeftContainer>
          <Title>Welcome, {user.username}</Title>
          <UserId>{user._id}</UserId>
          <AvatarWrapper>
            <Label for="file-upload">
              <Image src={image} alt="Avatar" />
            </Label>
          </AvatarWrapper>
          <ImageUpload>
            <ImageInput
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={captureImage}
            />
          </ImageUpload>
          <FormInput>
            <InputSpan>Username</InputSpan>
            <Input type="text" value={user.username} />
            <InputSpan>Email address</InputSpan>
            <Input type="text" value={user.email} />
            <InputSpan>Phone number</InputSpan>
            <Input type="text" value={user.phone} />
            <Button onClick={handleSubmit}>Update</Button>
          </FormInput>
        </LeftContainer>
      )}
    </Container>
  );
};

export default User;
