import Toast from 'react-bootstrap/Toast';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { Button } from '../MiscStyling';

const StyledToast = styled(Toast)`
  position: absolute;
  z-index: 1000;

  p {
    color: black;
  }

  button {
    width: fit-content;
  }

  a {
    color: blue;

  }
`

function NotLoggedInToast({onClose}) {
  return (
      <StyledToast onClose={onClose}>
        <Toast.Header>
          <strong className="me-auto">Not Logged in</strong>
          <small className="text-muted">Just now</small>
        </Toast.Header>
        <Toast.Body>
          <p>Need to log in to use this feature</p>
          <NavLink
            to="/login"
            className="nav-link"
          >
            Click to Login
          </NavLink>
        </Toast.Body>
      </StyledToast>
  );
}

export default NotLoggedInToast;