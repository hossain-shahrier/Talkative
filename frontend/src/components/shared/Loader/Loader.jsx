import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: 100vh;
  justify-content: center;
`;
const Card = styled.div`
  width: 500px;
  max-width: 90%;
  min-height: 300px;
  padding: 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Spinner = styled.svg`
  margin-bottom: 20px;
  animation: spin 1s ease-in-out infinite;
`;
const Message = styled.span`
  font-weight: bold;
  font-style: italic;
  font-size: 1rem;
`;
const Loader = ({ message }) => {
  return (
    <Container>
      <Card>
        <Spinner
          width="42"
          height="42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="21" cy="21" r="18" stroke="#C4C5C5" strokeWidth="4" />
          <path
            d="M20.778 1.001A20 20 0 111.542 25.627l3.876-.922a16.016 16.016 0 1015.404-19.72l-.044-3.984z"
            fill="#639fab"
          />
        </Spinner>
        <Message>{message}</Message>
      </Card>
    </Container>
  );
};

export default Loader;
