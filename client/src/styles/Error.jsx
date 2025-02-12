import styled from "styled-components";

function Error({ children }) {
  return (
    <Wrapper>
      <Alert>!</Alert>
      <Message>{children}</Message>
    </Wrapper>
  );
}

const Alert = styled.span`
  border: 1px solid red;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  font-weight: bold;
  display: grid;
  place-content: center;
  color: red;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
`;

const Message = styled.p`
  margin: 0;
  color: red;
`;

export default Error;
