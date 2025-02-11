import styled from "styled-components";
import Toast from 'react-bootstrap/Toast';

const StyledToast = styled(Toast)`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 1000;
  width: 300px; 
  max-width: 90vw;

  color: black;
`

function HiveToast({ children, onClose }) {

  return (
    <StyledToast onClose={onClose}>
        <Toast.Header>
        <strong className="me-auto">Error</strong>
        <small className="text-muted">Just now</small>
        </Toast.Header>
        <Toast.Body>
            {children}
        </Toast.Body>
    </StyledToast>
  );
}

// const Element = styled.div`
//   margin: 0;
//   background: black;
//   max-height: 75vh;
//   overflow-y: scroll;
// `;

export default HiveToast;