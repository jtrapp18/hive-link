import styled from "styled-components";

function GraphSectionHeader({ children }) {
  return (
    <Wrapper>
      <Line />
      <Message>{children}</Message>
      <Line />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  place-items: center;
  display: grid;
`;

const Line = styled.hr`
  border: 1px solid var(--honey);
  padding: 0;
  color: white;
  width: 90%;
`;

const Message = styled.h3`
  color: var(--honey);
  text-align: center;
`;

export default GraphSectionHeader;
