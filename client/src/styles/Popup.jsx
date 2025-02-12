import { useState, useEffect } from "react";
import styled from "styled-components";
import CloseButton from 'react-bootstrap/CloseButton';

function Popup({ children, onClose }) {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setShowOverlay(true);
    return () => setShowOverlay(false);
  }, []);

  return (
    <>
      <Wrapper>
        <CloseButton onClick={onClose}/>
        <Element>{children}</Element>
      </Wrapper>
      <Overlay show={showOverlay} />
    </>
  );
}

const Wrapper = styled.div`
  position: fixed;
  max-width: 95vw;
  z-index: 1000;
  top: calc(var(--height-header) + 1%);
  left: 50%;
  transform: translateX(-50%);
  border: 3px double var(--honey);
  background: gray;
  margin: 0;
  padding: 0;

  .btn-close:hover {
    color: black;
  }
`;

const Element = styled.div`
  margin: 0;
  background: black;
  max-height: 75vh;
  height: 100%;
  overflow: auto;
  padding: 3%;
  width: 700px;
  max-width: 90vw;
  display: flex;
  justify-content: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
  transition: opacity 0.5s ease-in-out;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

export default Popup;