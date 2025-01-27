import Toast from 'react-bootstrap/Toast';
import styled from 'styled-components';

const StyledToast = styled(Toast)`
  position: absolute;
  bottom: 10%;
  z-index: 1000;
`

function NotLoggedInToast({onClose}) {
  return (
      <StyledToast onClose={onClose}>
        <Toast.Header>
          <strong className="me-auto">Not Logged in</strong>
          <small className="text-muted">Just now</small>
        </Toast.Header>
        <Toast.Body>Need to log in to use this feature</Toast.Body>
      </StyledToast>
  );
}

export default NotLoggedInToast;