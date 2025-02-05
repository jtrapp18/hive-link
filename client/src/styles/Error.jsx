import styled from "styled-components";
import { Alert } from "../MiscStyling";

function Error({ children }) {
  return (
    <Wrapper>
      <Alert>!</Alert>
      <Message>{children}</Message>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
`;

const Message = styled.p`
  margin: 0;
  color: red;
`;

export default Error;
