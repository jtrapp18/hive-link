import styled from "styled-components";
import CloseButton from 'react-bootstrap/CloseButton';

function Popup({ children, onClose }) {
  return (
    <Wrapper>
      <CloseButton onClick={onClose}/>
      <Element>{children}</Element>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: var(--height-header);
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid black;
  background: var(--gray);
`;

const Element = styled.p`
  margin: 0;
  color: red;
`;

export default Popup;